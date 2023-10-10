// 'use strict'

import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { app, protocol, BrowserWindow, shell, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const { SerialPort } = require('serialport')
const Menu = require("electron-create-menu")
import i18next from 'i18next'
const { autoUpdater } = require("electron-updater")
const { yModem } = require('./ymodem')
import { formatLocale, bufferToHexWithSpace, delayMs } from './utils'
const path = require('path')
const fs = require('fs')
const fsPromises = fs.promises
const Store = require('electron-store')
const store = new Store()
const { Readable } = require('stream')
const { ReadlineParser } = require('@serialport/parser-readline')
const { BinaryParser } = require('./parser-binary')
const dateFormat = require('dateformat')
const { once, EventEmitter } = require('events')
const { crc16kermit } = require('crc')
const crypto = require('crypto')

let appName = "Sensor Hub Configuration Tool NG"
app.name = appName

const logger = require("electron-log")
autoUpdater.logger = logger
const isDevelopment = process.env.NODE_ENV !== 'production'
autoUpdater.logger.transports.file.level = isDevelopment ? "debug" : "info"

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let winGeneral
let winGeneralStartTimer
let winSensor
let winSensorStartTimer
let sysLocale

let serialPorts = []
let selectedSerialPort
let connectAsConfigMode = false
let serial
let ymodem = new yModem(true, logger.debug)
let updating = false

//stream
const stream = new Readable({
  read: (size) => {}
})
const streamBin = new Readable({
  read: (size) => {}
})
//parser
const parser = stream.pipe(new ReadlineParser())
const parserBin = new BinaryParser(1024, logger.debug)
parserBin.turnOff()
streamBin.pipe(parserBin)
//ASCII/Binary protocol
let ee = new EventEmitter()
let ee2 = new EventEmitter()
let binCmdProcessing = false
let binCmdQueue = []

//other global var
let menuContext = 'unknown'
let autoUpdateTimeHandler = null
let exportFileName =''
let startReadMeasuredData =false
let writerStream

/**
 * The Menu's locale only follows the system, the user selection from the GUI doesn't affect
 */
async function translateMenu() {
  sysLocale = formatLocale(store.get('selectedLocale') || process.env.LOCALE || app.getLocale())
  logger.info('the sys locale:', sysLocale)

  await i18next.init({
    lng: sysLocale,
    fallbackLng: 'en',
    debug: isDevelopment,
    resources: {
      zh: {
        translation: {
          "File": "文件",
          "Edit": "编辑",
          "Speech": "语音",
          "View": "视图",
          "Window": "窗口",
          "Help": "帮助",
          "About": "关于",
          "Hide": "隐藏",
          "Quit": "退出",
          "Report an issue": "报告错误",
        } //other keywords are translated by the OS automatically
      }
    }
  }).then((t) => {
    Menu((defaultMenu, separator) => {
      defaultMenu[0].submenu[0].label = t('About') + " " + appName
      defaultMenu[0].submenu[4].label = t('Hide') + " " + appName
      defaultMenu[0].submenu[8].label = t('Quit') + " " + appName
      if (!isDevelopment) defaultMenu[3].submenu[2].showOn = 'neverMatch'
      defaultMenu[4].label = t('Window')
      defaultMenu[5].label = t('Help')
      defaultMenu[5].showOn = ['darwin', 'win32', 'linux']
      defaultMenu[5].submenu.push({
        label: t('Report an issue'),
        click: () => {
          shell.openExternal('https://github.com/Seeed-Solution/SenseCAP-Sensor-Hub-Configuration-Tool-NG/issues')
        }
      })
      logger.debug(JSON.stringify(defaultMenu))
      return defaultMenu
    },
    // This function is used to translate the default labels
    t
  )})
}

if (process.platform === 'darwin') {
  app.setAboutPanelOptions({
    applicationName: appName,
  })
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{scheme: 'app', privileges: { secure: true, standard: true } }])

function createMainWindow () {
  // Create the browser window.
  let w = 1024
  let h = 800

  if (process.platform === 'win32') {
    h += 30  //for menu bar
  }

  win = new BrowserWindow({
    show: false,
    width: w,
    height: h,
    minWidth: w,
    minHeight: h,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
    if (winGeneral) {
      winGeneral.close()
    }
    if (winSensor) {
      winSensor.close()
    }
  })

  win.once('ready-to-show', () => {
    win.show()
    scheduleOpenGeneralWindow()
    scheduleOpenSensorWindow()
  })
}

function scheduleOpenGeneralWindow() {
  if (!winGeneralStartTimer) {
    winGeneralStartTimer = setTimeout(() => {
      winGeneralStartTimer = null
      if (!winGeneral) {
        createGeneralWindow(false)
      } else {
        logger.debug(`winGeneralStartTimer: winGeneral already created, skip ...`)
      }
    }, 200)
  }
}

function createGeneralWindow (showAfterCreated = false) {
  // Create the browser window.
  let w = 600
  let h = 650

  if (process.platform === 'win32') {
    h += 30  //for menu bar
  }

  winGeneral = new BrowserWindow({
    show: false,
    width: w,
    height: h,
    minWidth: w,
    minHeight: h,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true
    },
    // menuBarVisible: false,
    // skipTaskbar: true,
  })
  winGeneral.setMenuBarVisibility(false)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    winGeneral.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "general.html")
    logger.debug(`load the general windows from dev server...`)
    if (!process.env.IS_TEST) winGeneral.webContents.openDevTools()
  } else {
    // Load the index.html when not in development
    winGeneral.loadURL('app://./general.html')
  }

  winGeneral.on('close', (e) => {
    if (win) {
      logger.debug(`winGeneral is going to be closed, but we skip that`)
      e.preventDefault()
      winGeneral.hide()
    } else {
      logger.debug(`winGeneral is going to be closed, since win = null`)
    }
  })

  winGeneral.on('closed', () => {
    winGeneral = null
  })

  winGeneral.once('ready-to-show', () => {
    logger.debug(`winGeneral is ready to show`)
    if (showAfterCreated) {
      winGeneral.show()
    }
  })
}

function scheduleOpenSensorWindow() {
  if (!winSensorStartTimer) {
    winSensorStartTimer = setTimeout(() => {
      winSensorStartTimer = null
      if (!winSensor) {
        createSensorWindow(false)
      } else {
        logger.debug(`winSensorStartTimer: winSensor already created, skip ...`)
      }
    }, 500)
  }
}

function createSensorWindow (showAfterCreated = false) {
  // Create the browser window.
  let w = 1200
  let h = 900

  if (process.platform === 'win32') {
    h += 30  //for menu bar
  }

  winSensor = new BrowserWindow({
    show: false,
    width: w,
    height: h,
    minWidth: w,
    minHeight: h,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true
    },
    // menuBarVisible: false,
    // skipTaskbar: true,
  })
  winSensor.setMenuBarVisibility(false)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    winSensor.loadURL(process.env.WEBPACK_DEV_SERVER_URL + "sensor.html")
    logger.debug(`load the Sensor window from dev server...`)
    if (!process.env.IS_TEST) winSensor.webContents.openDevTools()
  } else {
    // Load the index.html when not in development
    winSensor.loadURL('app://./sensor.html')
  }

  winSensor.on('close', (e) => {
    if (win) {
      logger.debug(`winSensor is going to be closed, but we skip that`)
      e.preventDefault()
      winSensor.hide()
    } else {
      logger.debug(`winSensor is going to be closed, since win = null`)
    }
  })

  winSensor.on('closed', () => {
    winSensor = null
  })

  winSensor.once('ready-to-show', () => {
    logger.debug(`winSensor is ready to show`)
    if (showAfterCreated) {
      winSensor.show()
    }
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
    serialClose()
    app.quit()
  // }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createMainWindow()
  }
})

app.on('before-quit', () => {
  if (autoUpdateTimeHandler) clearTimeout(autoUpdateTimeHandler)
  serialClose()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {

  await translateMenu()

  if (isDevelopment && !process.env.IS_TEST) {
    let name = await installExtension(VUEJS_DEVTOOLS)
    logger.debug(`Added Extension:  ${name}`)
    logger.debug(`process.env.WEBPACK_DEV_SERVER_URL: ${process.env.WEBPACK_DEV_SERVER_URL}`)
  }

  createMainWindow()

  autoUpdateTimeHandler = setTimeout(() => {
    autoUpdater.checkForUpdatesAndNotify()
    autoUpdateTimeHandler = null
  }, 10000)
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        serialClose()
        ipcMain.removeAllListeners()
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      serialClose()
      ipcMain.removeAllListeners()
      app.quit()
    })
  }
}

// Serial
ipcMain.on('init-serial-req', (event, arg) => {
  logger.info('init-serial-req ...')

  SerialPort.list().then(ports => {
    serialPorts = ports
    logger.debug(ports)

    let opened = false
    if (serial && serial.isOpen) opened = true

    let resp = {
      ports: ports,
      selectedPort: selectedSerialPort,
      opened: opened
    }

    event.reply('init-serial-resp', resp)
  })
})

function serialOpen(event) {
  serial = new SerialPort({
    path: selectedSerialPort,
    baudRate: 115200,
    autoOpen: false
  })

  let h = setTimeout(() => {
    event.reply('serial-open-resp', {opened: false, reason: 'timeout'})
  }, 5000)

  serial.on('open', () => {
    clearTimeout(h)
    event.reply('serial-open-resp', {opened: true, reason: ''})
  })

  serial.on('data', (data) => {
    if (['unknown', 'home', 'general', 'normal', 'updateFw'].includes(menuContext)) {
      sendToTerm(data)
    }
    if (['unknown', 'general', 'normal'].includes(menuContext)) {
      if (winGeneral) {
        winGeneral.webContents.send('serial-tx', data)
      }
    }
    stream.push(data)
    streamBin.push(data)
    if (ymodem && updating) {
      ymodem.emit('rx', data)
    }
  })

  serial.on('error', (err) => {
    logger.warn('serial error:', err)
  })

  serial.open()
}

function serialClose(cb) {
  if (serial) {
    serial.close((err) => {
      serial = null
      if (cb) cb()
    })
  }
}

async function serialCloseAsync() {
  return new Promise((resolve, reject) => {
    serialClose(resolve)
  })
}

ipcMain.on('serial-open-req', (event, selPort, _connectAsConfigMode) => {
  logger.info('serial-open-req ...', selPort)
  logger.debug('connectAsConfigMode:', _connectAsConfigMode)
  connectAsConfigMode = _connectAsConfigMode

  if (serial && serial.isOpen) {
    if (selPort === selectedSerialPort) {
      logger.info('already opened')
      event.reply('serial-open-resp', {opened: true, reason: 'already opened'})
      return
    } else {
      logger.warn('request to open another port, rather', selectedSerialPort)
      selectedSerialPort = selPort
      serialClose(() => {
        serialOpen(event)
      })
    }
  } else {
    selectedSerialPort = selPort
    serialOpen(event)
  }
})

ipcMain.on('serial-close-req', (event, arg) => {
  logger.info('serial-close-req ...')

  if (!serial || !serial.isOpen) {
    logger.info('already closed')
    event.reply('serial-close-resp', {closed: true, reason: 'already closed'})
    return
  }

  let h = setTimeout(() => {
    event.reply('serial-close-resp', {closed: false, reason: 'timeout'})
  }, 1000)

  serialClose(() => {
    clearTimeout(h)
    menuContext = 'unknown'
    event.reply('serial-close-resp', {closed: true, reason: ''})
    broadcastMultiWindows('menu-context', menuContext, win, winGeneral, winSensor)
  })
})

ipcMain.on('connect-as-config-change', (event, arg) => {
  logger.info('connect-as-config-change ...')
  connectAsConfigMode = arg
})

ipcMain.on('serial-rx', (event, data) => {
  if (serial && serial.isOpen && ['general'].includes(menuContext)) {
    serial.write(data)
  }
})

ipcMain.on('xterm-input', (event, arg) => {
  if (serial && serial.isOpen && ['unknown', 'home', 'general'].includes(menuContext)) {
    serial.write(arg)
  }
})

async function sendToTerm(str) {
  if (win) {
    await win.webContents.send('xterm-disp', str)
  }
}

// ASCII Protocol
function parseLine(line) {
  logger.debug(`parseLine: ${line}`)
  let line_ram = line
  line = line.trim()

  let found

  found = line.match(/SensorHub\d{1}G-bootloader-v(\d{1,2})\.\d{1,3}\.\d{1,3}/i)
  if (found) {
    let ver = parseInt(found[1])
    logger.debug('found bootloader printing, version:', ver)
    if (ver < 2) {
      broadcastMultiWindows('v1-firmware', null, win)
    }
    return
  }

  found = line.match(/Please input 'c' to enter/i)
  if (found) {
    logger.debug('found enter config mode prompt')
    if (connectAsConfigMode) {
      logger.debug('enter c automatically ...')
      if (serial && serial.isOpen) {
        serial.write('c')
      }
    }
    startReadMeasuredData = false;
    return
  }

  found = line.match(/SensorHub command-line tool/i)
  if (found) {
    logger.debug('entered bootloader menu')
    menuContext = 'home'
    parserBin.turnOff()
    broadcastMultiWindows('menu-context', menuContext, win, winGeneral, winSensor)
    return
  }

  found = line.match(/App run in\s(.+?)\smode/i)
  if (found) {
    let mode = String(found[1]).trim()
    logger.debug('entered special mode:', mode)
    if (mode.includes('general')) menuContext = 'general'
    else if (mode.includes('DBG')) menuContext = 'home'  //debug mode, manual operation, assuming it's home
    else if (mode.includes('sensor')) menuContext = 'sensor'
    broadcastMultiWindows('menu-context', menuContext, win, winGeneral, winSensor)
    ee.emit('menu-context-change', menuContext)
    return
  }

  found = line.match(/APP START RUN/i)
  if (found) {
    logger.debug('entered normal mode')
    menuContext = 'normal'
    broadcastMultiWindows('menu-context', menuContext, win, winGeneral, winSensor)
    ee.emit('menu-context-change', menuContext)
    if (winGeneral) winGeneral.show()
    return
  }


  found = line.match(/Waiting for data/i)
  if (found) {
    logger.debug('entered firmware update mode')
    menuContext = 'updateFw'
    broadcastMultiWindows('menu-context', menuContext, win, winGeneral, winSensor)
    ee.emit('menu-context-change', menuContext)
    return
  }

  found = line.match(/start read measurement data/i)
  if( found  && (exportFileName != '') ) {
    logger.debug('start read measurement data')
    startReadMeasuredData = true;
    winGeneral.webContents.send('export-measured-data-end', true)
    writerStream = fs.createWriteStream(exportFileName);
    return 
  }

  found = line.match(/end read measurement data/i)
  if( found  &&  startReadMeasuredData ) {
    logger.debug('end read measurement data')
    startReadMeasuredData = false;
    winGeneral.webContents.send('export-measured-data-end', false)
    exportFileName = ''
    writerStream.end();
    return  
  }
  if( startReadMeasuredData ==  true) {

    writerStream.write(line_ram,'UTF8');
  }
}


parser.on('data', (line) => {
  parseLine(line)
})

async function switchMode(mode) {
  if (menuContext !== 'home') {
    throw new Error('menu context should be at home')
  }
  if (serial && serial.isOpen) {
    if (updating) {
      throw new Error('skip this request during fw updating')
    }
    serial.write('x\r\n')
    await delayMs(500)
    serial.write(mode + '\r\n')

    let h = setTimeout(() => {
      ee.emit('error', new Error('switching mode timeout'))
    }, 15000)

    let [modeNow] = await once(ee, 'menu-context-change')
    clearTimeout(h)

    return modeNow
  } else {
    throw new Error('serial not ready')
  }
}

//TODO: menuContext
ipcMain.handle('enter-general-settings', async (event) => {
  logger.info('handing', 'enter-general-settings', '...')
  if (menuContext === 'general') return menuContext
  else return await switchMode('1')
})

ipcMain.handle('enter-sensor-settings', async (event) => {
  logger.info('handing', 'enter-sensor-settings', '...')
  if (menuContext === 'sensor') return menuContext
  let modeNow = await switchMode('3')
  if (modeNow === 'sensor') parserBin.turnOn()
  return modeNow
})

//Binary Protocol, for Sensor Config
function parseFrame(frame) {
  logger.debug('parseFrame:', frame.toString('hex'))

  if (!Buffer.isBuffer(frame) || frame.length === 0) return

  switch (frame[0]) {
    case 0xF0: {
      ee2.emit('binary-cmd-resp', frame)
      break
    }
    case 0xF1: {
      ee2.emit('error', new Error('crc error in the sent frame'))
      break
    }
    case 0xF2: {
      ee2.emit('error', new Error('unknown cmd'))
      break
    }
    case 0xF3: {
      ee2.emit('error', new Error('cmd failed in writing'))
      break
    }
    case 0xF4: {
      ee2.emit('error', new Error('cmd failed in reading'))
      break
    }
    case 0xF5: {
      ee2.emit('error', new Error('cmd failed without specific cause'))
      break
    }
    case 0xF6: {
      ee2.emit('error', new Error('cmd invalid'))
      break
    }
    default:
      break
  }
}

parserBin.on('data', (frame) => {
  parseFrame(frame)
})

parserBin.on('crc-error', () => {
  ee2.emit('error', new Error('crc error in the received frame'))
})

function encodeBinaryFrame(cmd, payload) {
  let buffer = Buffer.alloc(5)
  buffer.writeUInt8(0xAA, 0)
  buffer.writeUInt8(0x55, 1)
  buffer.writeUInt8(cmd, 2)
  let payloadLen = 0
  if (payload) payloadLen = payload.length
  buffer.writeUInt16LE(payloadLen, 3)
  if (payload) buffer = Buffer.concat([buffer, payload])

  const crc = crc16kermit(buffer)
  let bufferCrc = Buffer.alloc(2)
  bufferCrc.writeUInt16LE(crc)

  return Buffer.concat([buffer, bufferCrc])
}

async function binaryCmdDevRequest (cmd, payload, timeoutMs=2000) {
  if (serial && serial.isOpen) {
    if (updating) {
      throw new Error('skip this request during fw updating')
    }
    logger.debug(`send binary cmd: 0x${cmd.toString(16)},`)
    let frame = encodeBinaryFrame(cmd, payload)
    logger.debug(`encoded frame:`, frame.toString('hex'))
    serial.write(frame)

    let h = setTimeout(() => {
      ee2.emit('error', new Error('binary cmd request timeout'))
    }, timeoutMs)

    try {
      const [resp] = await once(ee2, 'binary-cmd-resp')
      clearTimeout(h)
      return resp
    } catch (e) {
      clearTimeout(h)
      throw e
    }
  } else {
    throw new Error('serial is not ready')
  }
}

async function startProcBinaryCmds () {
  if (binCmdQueue.length === 0) return
  binCmdProcessing = true
  let {args, promiseResolvers} = binCmdQueue.shift()
  let [resolve, reject] = promiseResolvers
  try {
    let resp = await binaryCmdDevRequest(...args)
    resolve(resp)
  } catch (e) {
    logger.warn(`binaryCmdDevRequest error:`, e)
    reject(e)
  } finally {
    binCmdProcessing = false
    setImmediate(startProcBinaryCmds)
  }
}

async function binaryCmdRequestAsync (cmd, payload, timeoutMs = 2000) {
  for (let i = 0; i < 2; i++) {
    let promise = new Promise((resolve, reject) => {
      let binCmd = {args: [cmd, payload, timeoutMs], promiseResolvers: [resolve, reject]}
      binCmdQueue.push(binCmd)
      if (!binCmdProcessing) {
        startProcBinaryCmds()
      }
    })
    try {
      return await promise
    } catch (e) {
      logger.warn(`binaryCmdRequestAsync failed ${i} try, error:`, e)
    }
  }
  throw new Error(`binaryCmdRequestAsync failed after multiple retries`)
}

ipcMain.handle('binary-cmd-get-proto-version', async (event) => {
  logger.info('handling', 'binary-cmd-get-proto-version', '...')
  let resp = await binaryCmdRequestAsync(0x00, null)
  return resp[3]
})
ipcMain.handle('binary-cmd-get-sinfo-version', async (event, whose) => {
  logger.info('handling', 'binary-cmd-get-sinfo-version', '...')
  let resp = await binaryCmdRequestAsync(0x10, Buffer.from([whose]))
  let sinfoVersion = resp.readUInt32LE(3)
  return sinfoVersion & 0xffffff
})
ipcMain.handle('binary-cmd-get-sensor-addr-list', async (event, whose) => {
  logger.info('handling', 'binary-cmd-get-sensor-addr-list', '...')
  let resp = await binaryCmdRequestAsync(0x11, Buffer.from([whose]))
  let len = resp.readUInt16LE(1)
  let cnt = resp.readUInt8(3)
  if ((cnt + 1) !== len) throw new Error('invalid frame: sensor-addr-list')
  let addrs = []
  for (let i = 0; i < cnt; i++) {
    addrs.push(resp.readUInt8(4 + i))
  }
  return addrs
})
ipcMain.handle('binary-cmd-get-sensor-enable-list', async (event, whose) => {
  logger.info('handling', 'binary-cmd-get-sensor-enable-list', '...')
  let resp = await binaryCmdRequestAsync(0x12, Buffer.from([whose]))
  let len = resp.readUInt16LE(1)
  let cnt = resp.readUInt8(3)
  if ((cnt + 1) !== len) throw new Error('invalid frame: sensor-enable-list')
  let addrs = []
  for (let i = 0; i < cnt; i++) {
    addrs.push(resp.readUInt8(4 + i))
  }
  return addrs
})
ipcMain.handle('binary-cmd-get-enable-all-builtin', async (event) => {
  logger.info('handling', 'binary-cmd-get-enable-all-builtin', '...')
  let resp = await binaryCmdRequestAsync(0x18, Buffer.from([0]))
  let enableAll = resp.readUInt8(3)
  return enableAll
})
ipcMain.handle('binary-cmd-get-sensor-info', async (event, modbusAddr) => {
  logger.info('handling', 'binary-cmd-get-sensor-info', `, modbusAddr ${modbusAddr} ...`)
  let resp = await binaryCmdRequestAsync(0x13, Buffer.from([modbusAddr]))
  let len = resp.readUInt16LE(1)
  let mbAddrGot = resp.readUInt8(3)
  if (mbAddrGot !== modbusAddr) throw new Error('invalid frame: sensor-info, modbus addr not match')
  let storageSchemaVersion = resp.readUInt8(4)
  let sinfo = {
    "mbAddr": mbAddrGot,
    "storageSchemaVersion": storageSchemaVersion
  }
  if (storageSchemaVersion === 0x1) {
    if ((len - 1 - 1 - 8) % 33 !== 0) throw new Error('invalid frame: sensor-info, wrong length')
    sinfo['measCnt'] = resp.readUInt8(5)
    if ((len - 10) / 33 !== sinfo['measCnt']) throw new Error('invalid frame: sensor-info, meas cnt not match')
    sinfo['powerSchema'] = resp.readUInt8(6)
    sinfo['respTimeout'] = resp.readUInt8(7)
    sinfo['measDelay'] = resp.readUInt16LE(8)
    sinfo['sensorTypeId'] = resp.readUInt16LE(10)
    sinfo['startupTime'] = resp.readUInt8(12)

    sinfo['measurements'] = []
    let offsetMeasInfo = 13
    for (let i = 0; i < sinfo['measCnt']; i++) {
      let offset = offsetMeasInfo + 33 * i
      let m = {}
      m['measId'] = resp.readUInt16LE(offset); offset += 2;
      //read cmd
      m['readFuncCode'] = resp.readUInt8(offset); offset += 1;
      m['readRegAddr'] = resp.readUInt16LE(offset); offset += 2;
      m['readRegCnt'] = resp.readUInt16LE(offset); offset += 2;
      //data desc
      m['dataType'] = resp.readUInt8(offset); offset += 1;
      m['dataPrecision'] = resp.readUInt8(offset); offset += 1;
      m['dataFactorA'] = resp.readFloatLE(offset); offset += 4;
      m['dataFactorB'] = resp.readFloatLE(offset); offset += 4;
      //write cmd
      m['writeStrategy'] = resp.readUInt8(offset); offset += 1;
      m['writeCmdLen'] = resp.readUInt8(offset); offset += 1;
      m['writeCmd'] = bufferToHexWithSpace(resp.slice(offset, offset + m['writeCmdLen'])); offset += 10;
      //moving avg
      m['movingTimeSlice'] = resp.readUInt16LE(offset); offset += 2;
      m['movingSliceCnt'] = resp.readUInt16LE(offset); offset += 2;

      sinfo['measurements'].push(m)
    }
  }

  logger.debug(`got valid sensor info for modbus addr ${modbusAddr}:`, sinfo)

  return sinfo
})
ipcMain.handle('binary-cmd-start-update', async (event, who) => {
  logger.info('handling', 'binary-cmd-start-update', '...')
  let resp = await binaryCmdRequestAsync(0x14, Buffer.from([who]), 5000)
  return 'ok'
})
ipcMain.handle('binary-cmd-end-update', async (event, who, version=0xffffff, enableAll) => {
  logger.info('handling', 'binary-cmd-end-update', '...')
  let buffer = Buffer.alloc(6)
  buffer[0] = who
  buffer.writeUInt32LE(version & 0xffffff, 1)
  buffer.writeUInt8(enableAll, 5)  //the 'enableAllByDefault' flag
  let resp = await binaryCmdRequestAsync(0x17, buffer, 5000)
  return 'ok'
})
function buildSensorInfoFrame(sinfo) {
  let {mbAddr, storageSchemaVersion, measCnt, powerSchema, respTimeout, measDelay,
    sensorTypeId, startupTime, measurements} = sinfo
  mbAddr = Number(mbAddr)
  storageSchemaVersion = Number(storageSchemaVersion)
  measCnt = Number(measCnt)
  powerSchema = Number(powerSchema)
  respTimeout = Number(respTimeout)
  measDelay = Number(measDelay)
  sensorTypeId = Number(sensorTypeId)
  startupTime = Number(startupTime)
  if (!Array.isArray(measurements) || measCnt !== measurements.length) {
    throw new Error('invalid sinfo, meas cnt not match')
  }
  let frame = Buffer.alloc(10 + 33 * measCnt)
  let offset = 0
  frame.writeUInt8(mbAddr, offset); offset += 1;
  frame.writeUInt8(storageSchemaVersion, offset); offset += 1;
  //
  frame.writeUInt8(measCnt, offset); offset += 1;
  frame.writeUInt8(powerSchema, offset); offset += 1;
  frame.writeUInt8(respTimeout, offset); offset += 1;
  frame.writeUInt16LE(measDelay, offset); offset += 2;
  frame.writeUInt16LE(sensorTypeId, offset); offset += 2;
  frame.writeUInt8(startupTime, offset); offset += 1;
  //
  for (let i = 0; i < measCnt; i++) {
    let {measId, readFuncCode, readRegAddr, dataType, dataPrecision, dataFactorA, dataFactorB,
      writeStrategy, writeCmd, movingTimeSlice, movingSliceCnt} = measurements[i]
    measId = Number(measId)
    readFuncCode = Number(readFuncCode)
    readRegAddr = Number(readRegAddr)
    dataType = Number(dataType)
    dataPrecision = Number(dataPrecision)
    dataFactorA = Number(dataFactorA)
    dataFactorB = Number(dataFactorB)
    writeStrategy = Number(writeStrategy)
    movingTimeSlice = Number(movingTimeSlice)
    movingSliceCnt = Number(movingSliceCnt)
    //calc the reg cnt for specified data type
    let readRegCnt = 1
    if (dataType >=3 && dataType <= 14) readRegCnt = 2
    else if (dataType === 15) readRegCnt = 4
    let writeCmdLen = 0
    if (writeCmd) {
      writeCmd = String(writeCmd).replace(/\s/g, '')
      if (writeCmd.length % 2 !== 0 || writeCmd.length > 20) {
        throw new Error('invalid sinfo, invalid write cmd')
      }
      writeCmdLen = writeCmd.length / 2
    }

    //fill the buffer
    frame.writeUInt16LE(measId, offset); offset += 2;
    //read cmd
    frame.writeUInt8(readFuncCode, offset); offset += 1;
    frame.writeUInt16LE(readRegAddr, offset); offset += 2;
    frame.writeUInt16LE(readRegCnt, offset); offset += 2;
    //data desc
    frame.writeUInt8(dataType, offset); offset += 1;
    frame.writeUInt8(dataPrecision, offset); offset += 1;
    frame.writeFloatLE(dataFactorA, offset); offset += 4;
    frame.writeFloatLE(dataFactorB, offset); offset += 4;
    //write cmd
    frame.writeUInt8(writeStrategy, offset); offset += 1;
    frame.writeUInt8(writeCmdLen, offset); offset += 1;
    Buffer.from(writeCmd, 'hex').copy(frame, offset); offset += 10;
    //moving avg
    frame.writeUInt16LE(movingTimeSlice, offset); offset += 2;
    frame.writeUInt16LE(movingSliceCnt, offset); offset += 2;
  }

  return frame
}
ipcMain.handle('binary-cmd-update-sensor-info', async (event, sinfo) => {
  logger.info('handling', 'binary-cmd-update-sensor-info', '...')
  // logger.debug(sinfo)

  let frame = buildSensorInfoFrame(sinfo)

  logger.info(`frame is built, length is ${frame.length}`)
  logger.debug(frame.toString('hex'))
  await binaryCmdRequestAsync(0x15, frame)
  return 'ok'
})
ipcMain.handle('binary-cmd-update-sensor-enable-list', async (event, who, addrList) => {
  logger.info('handling', 'binary-cmd-update-sensor-enable-list', '...')
  logger.debug(`who: ${who}, addrList:`, addrList)

  //front-end should ensure the order of addresses, soring by the measDelay time
  let cnt = addrList.length
  let buffer = Buffer.alloc(cnt + 2)
  let offset = 0
  buffer.writeUInt8(who, offset); offset += 1;
  buffer.writeUInt8(cnt, offset); offset += 1;
  for (const addr of addrList) {
    buffer.writeUInt8(addr, offset); offset += 1;
  }
  await binaryCmdRequestAsync(0x16, buffer)
  return 'ok'
})
ipcMain.handle('binary-cmd-test-sensor-info', async (event, sinfo) => {
  logger.info('handling', 'binary-cmd-test-sensor-info', '...')
  logger.debug(sinfo)

  let frame = buildSensorInfoFrame(sinfo)

  logger.info(`frame is built, length is ${frame.length}`)
  logger.debug(frame.toString('hex'))
  await binaryCmdRequestAsync(0x20, frame)
  return 'ok'
})
ipcMain.handle('binary-cmd-get-log-print', async (event, timeout=2000) => {
  logger.info('handling', 'binary-cmd-get-log-print', '...')
  let resp = await binaryCmdRequestAsync(0x30, null, timeout)
  let len = resp.readUInt16LE(1)
  logger.debug(`got log print, len ${len}`)
  return resp.slice(3).toString()
})



// App self update, AutoUpdater
autoUpdater.on('update-available', (info) => {
  logger.info('update-available', JSON.stringify(info))
  let {version} = info
  if (win && version) win.webContents.send('update-available', version)
})

autoUpdater.on('update-not-available', (info) => {
  logger.info('update-not-available', JSON.stringify(info))
})

ipcMain.on('current-version-req', (event, arg) => {
  logger.info('current-version-req ...')
  let currentVersion = autoUpdater.currentVersion.version
  logger.info(`the current version is: ${currentVersion}`)
  event.reply('current-version-resp', {currentVersion: currentVersion})
})


// yModem Fw Update
let updateTimeoutHandler
async function progressCallback(val) {
  let percent = `${val.toFixed(1)}%`
  await sendToTerm('\r' + percent)
}

async function updateTimeout() {
  await sendToTerm('update firmware timeout!\r\n')
  updating = false
  updateTimeoutHandler = null
}

function ymodemWrite(chunk, resolve, reject) {
  if (serial) {
    serial.write(chunk, (err) => {
      if (err) reject()
      else resolve()
    })
  }
}

ipcMain.handle('start-update-fw', async (event) => {
  logger.info('handling start-update-fw ...')

  if (menuContext !== 'home') {
    throw new Error('the menu context should be at home')
  }

  let {canceled, filePaths} = await dialog.showOpenDialog({
    filters: [{ name: 'Binaries', extensions: ['bin', 'hex']}, { name: 'All Files', extensions: ['*']}],
    properties: ['openFile', 'noResolveAliases']
  })

  if (!canceled) {
    let filePath = filePaths[0]
    logger.info('selected file:', filePath)
    if (!filePath) throw new Error('empty file path')

    try {
      await fsPromises.access(filePath, fs.constants.R_OK)
    } catch (error) {
      logger.warn('can not access file:', filePath)
      logger.debug(error)
      throw new Error('file not readable')
    }

    let fileName = path.basename(filePath)
    let {size} = await fsPromises.stat(filePath)
    let fileContent = await fsPromises.readFile(filePath)
    if (fileContent) {
      //menu operation
      serial.write('u\r\n')
      //print Waiting for data

      let h = setTimeout(() => {
        ee.emit('error', new Error('failed to enter firmware update menu'))
      }, 1000)

      let toBeThrown
      try {
        await once(ee, 'menu-context-change')
      } catch (e) {
        logger.warn(e)
        toBeThrown = e
      } finally {
        clearTimeout(h)
      }
      if (toBeThrown) {
        throw toBeThrown
      }

      await sendToTerm('\n\r\nStart Ymodem transfer ...\r\n')
      // event.reply('update-fw-begin')
      await sendToTerm(`${fileName}\r\nsize: ${size}\r\n`)

      updateTimeoutHandler = setTimeout(updateTimeout, 300000)

      ymodem.clearStream()
      ymodem.on('progress', progressCallback)
      ymodem.on('tx', ymodemWrite)
      updating = true
      try {
        await ymodem.transfer(fileContent)
      } catch (error) {
        logger.warn('ymodem transfer error:', error)
        toBeThrown = error
      }
      updating = false
      ymodem.removeAllListeners('progress')
      ymodem.removeAllListeners('tx')
      if (updateTimeoutHandler) {
        clearTimeout(updateTimeoutHandler)
        updateTimeoutHandler = null
      }
      if (toBeThrown) {
        throw toBeThrown
      }
      menuContext = 'normal'
      broadcastMultiWindows('menu-context', menuContext, win, winGeneral, winSensor)
      return 'ok'
    } else {
      throw new Error('firmware file is empty')
    }
  } else {
    logger.warn('file selection cancelled by user')
    throw new Error('canceled file selection')
  }
})

// locale
ipcMain.on('locale-req', (event) => {
  logger.info('locale-req ...')
  event.reply('locale-resp', sysLocale)
})

ipcMain.on('locale-change', (event, arg) => {
  logger.info('locale-change, ', arg)
  if (arg === sysLocale) return
  i18next.changeLanguage(arg)
  translateMenu()
  broadcastMultiWindows('locale-change', arg, winGeneral, winSensor)
})

// System Call
ipcMain.on('goto-new-version', (event) => {
  shell.openExternal('https://github.com/Seeed-Solution/SenseCAP-Sensor-Hub-Configuration-Tool-NG/releases/latest')
})

//Other Windows and Windows Communication
ipcMain.on('open-general-window', (event) => {
  logger.info('ipc: open-general-window ...')
  if (winGeneral) {
    winGeneral.show()
    winGeneral.focus()
  } else {
    createGeneralWindow(true)
  }
})
ipcMain.on('close-general-window', (event) => {
  logger.info('ipc: close-general-window ...')
  if (winGeneral) {
    winGeneral.hide()
    //winGeneral.close()
  }
})
ipcMain.on('open-sensor-window', (event) => {
  logger.info('ipc: open-sensor-window ...')
  if (winSensor) {
    winSensor.show()
    winSensor.focus()
  } else {
    createSensorWindow(true)
  }
})
ipcMain.on('close-sensor-window', (event) => {
  logger.info('ipc: close-sensor-window ...')
  if (winSensor) {
    winSensor.hide()
    //winSensor.close()
  }
})

function broadcastMultiWindows(eventName, eventValue, ...windows) {
  for (const w of windows) {
    if (w && w instanceof BrowserWindow) {
      logger.debug(`send event ${eventName} = ${eventValue} to `, w.title)
      w.webContents.send(eventName, eventValue)
    }
  }
}

ipcMain.on('broadcast-to-others', (event, eventName, ...args) => {
  let windows = [win, winGeneral, winSensor]
  let wContent = event.webContents
  logger.info('broadcast-to-others:', eventName)
  for (const w of windows) {
    if (w && w instanceof BrowserWindow) {
      if (w.webContents === wContent) continue
      logger.debug(`going to broadcast event ${eventName} to `, w.title)
      w.webContents.send(eventName, ...args)
    }
  }
})


// Settings Save to File / Load from File
function genFilePath(ext) {
  let now = new Date()
  let datetimeStr = dateFormat(now, "yyyymmdd-HHMMss")
  let _ext = ext || "txt"

  return `SensorHub_Sensors_Cfg-${datetimeStr}.${_ext}`
}

ipcMain.handle('save-to-file', async (event, configProfileJson) => {
  logger.info('handle save-to-file call ...')
  logger.debug('configProfileJson:', configProfileJson)

  let {canceled, filePath} = await dialog.showSaveDialog({
    defaultPath: genFilePath('json'),
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['createDirectory']
  })
  if (!canceled) {
    if (!filePath) throw new Error('saveDialog get empty filePath.')

    try {
      let s = Buffer.from(JSON.stringify(configProfileJson)).toString('base64')
      let c = crypto.createHash('sha256').update(s).digest('hex')
      await fsPromises.writeFile(filePath, Buffer.from(c+s))
      return 'succ'
    } catch (error) {
      logger.warn('error when write file:', filePath)
      logger.debug(error)
      throw new Error('write file error')
    }
  } else {
    return 'canceled'
  }
})


ipcMain.handle('read-measured-data', async (event, data) => {

  logger.info('handle read-measured-data call ...')

  exportFileName ='';

  let now = new Date()
  let datetimeStr = dateFormat(now, "yyyymmdd-HHMMss")
  let path = `Measurement-Data-${datetimeStr}.csv`

  let {canceled, filePath} = await dialog.showSaveDialog({
    defaultPath: path,
    filters: [
      { name: 'CSV Files', extensions: ['csv'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['createDirectory']
  })
  if (!canceled) {
    if (!filePath) throw new Error('saveDialog get empty filePath.')

    if (serial && serial.isOpen && ['general'].includes(menuContext)) {
      serial.write(data);
      await delayMs(500)
      serial.write('Y\r\n')

      exportFileName  = filePath;
      startReadMeasuredData = false;
      return 'succ'
    }
    return 'canceled'
  } else {
    return 'canceled'
  }
})

ipcMain.handle('load-from-file', async (event) => {
  logger.info('handle load-from-file call ...')

  let {canceled, filePaths} = await dialog.showOpenDialog({
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile', 'noResolveAliases']
  })
  if (!canceled) {
    let filePath = filePaths[0]
    logger.info('selected file:', filePath)
    if (!filePath) throw new Error('openDialog get empty filePath.')

    try{
      await fsPromises.access(filePath, fs.constants.R_OK)
    } catch (error) {
      logger.warn('can not access file:', filePath)
      logger.debug(error)
      throw new Error('no read permission')
    }

    let content
    try {
      content = await fsPromises.readFile(filePath, {
        encoding: 'utf8'
      })
    } catch (error) {
      logger.warn('error when read file:', filePath)
      logger.debug(error)
      throw new Error('read file error')
    }

    if (content && content.length > 64) {
      let c = content.slice(0, 64)
      let s = content.slice(64)
      if (crypto.createHash('sha256').update(s).digest('hex') === c.toString()) {
        return Buffer.from(s, 'base64').toString()
      }
    }
    logger.warn('the config file is corrupted!')
    throw new Error('The configuration file is corrupted')
  } else {
    return 'canceled'
  }
})













