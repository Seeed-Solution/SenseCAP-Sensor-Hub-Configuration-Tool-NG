<i18n>
{
  "en": {
    "text: connectAsConfigMode": "Enter configuration mode automatically on device's booted",
    "text: clear data confirm": "This will clear all the storaged measurements in the flash. Once confirmed, the bootloader will launch the Application Firmware and storaged measurements will be wiped out.",
    "Maximum 32 chars allowed": "Maximum 32 non-whitespace chars",
    "text: menu context home": "The menu context is not home, please reset the sensor hub.",
    "text: how to back menu home": "Once entered general/sensor settings, rebooting the device is the only way to enable the above buttons again.",
    "text: v1 device warning": "Please download the v1.x tool for the devices with v1 firmware.",

    "end": "end"
  },
  "zh": {
    "Serial Port": "串口",
    "text: connectAsConfigMode": "设备启动后自动进入配置模式",
    "Device Type": "设备类型",
    "Device EUI": "设备EUI",
    "App Key": "App密钥",
    "Card ICCID": "SIM卡ICCID",
    "Signal RSSI": "网络信号",
    "Data Interval": "上报周期",
    "Server Address": "服务器IP/域名",
    "Server Port": "端口",
    "Enable GPS": "使能GPS",
    "OTA Prepub": "使能OTA预发布固件",
    "APN Username": "APN用户名",
    "APN Password": "APN密码",
    "Hardware Version": "硬件版本",
    "Software Version": "软件版本",
    "Read": "读取",
    "Write": "写入",
    "Update Fw": "更新固件",
    "Clear Data": "清空数据存储",
    "text: clear data confirm": "这个操作将会清空存储在Flash中的测量数据，点击\"清空\"后，设备将退出配置模式，进入正常工作模式，并执行清空操作。",
    "Do it": "清空",
    "Connect": "连接",
    "Disconnect": "断开",

    "Must between [5, 43200]": "必须在[5, 43200]范围内",
    "Must between [5, 720]": "必须在[5, 720]范围内",
    "Must between [1, 43200]": "必须在[1, 43200]范围内",
    "Must between [1, 65535]": "必须在[1, 65535]范围内",
    "Invalid LoRaWAN EUI (16 chars)": "无效的LoRaWAN EUI (16字符)",
    "Invalid LoRaPP EUI (32 chars)": "无效的LoRaPP EUI (32字符)",
    "Invalid domain": "不正确的域名格式",
    "Maximum 32 chars allowed": "最多32个(非空白)字符",

    "text: menu context home": "选择菜单不在最顶层位置，请复位Sensor Hub。",
    "text: how to back menu home": "进入通用设置或传感器设置后，只能复位设备，以重新使用上面的按钮。",
    "text: v1 device warning": "您的设备正运行v1版固件，请下载v1版本上位机。",

    "General Settings": "通用设置",
    "Sensor Settings": "传感器设置",
    "Update Firmware": "更新固件",

    "end": "结束"
  }
}
</i18n>
<template>
  <v-container fluid class="py-0" fill-height>
    <v-row class="main-body-fill-height">
      <!-- 左半屏，输入框 -->
      <v-col cols="4" lg="3" xl="2">
        <v-row class="pt-1">
          <!-- Fields -->
          <!-- connection -->
          <v-col cols="12" class="d-flex justify-space-around">
            <v-select v-model="selectedSerialPort" :label="$t('Serial Port')"
              :items="serialPorts"
              :disabled="serialVSelectDisable"
              @focus="onSerialVSelectClicked"
              outlined dense hide-details>
            </v-select>
          </v-col>
          <v-col cols="12" class="py-0 d-flex justify-start">
            <v-checkbox class="pt-0 mt-0"
              v-model="connectAsConfigMode"
              @change="configModeChangedFn"
              dense hide-details></v-checkbox>
            <p class="text-caption">{{$t('text: connectAsConfigMode')}}</p>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-around">
            <v-btn rounded :color="connectBtnColor" width="200"
              @click="ConnectFn"
              dense>{{connectBtnText}}</v-btn>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-around">
            <v-divider></v-divider>
          </v-col>

          <!-- Buttons -->
          <v-col cols="12" class="d-flex justify-space-around">
            <v-btn rounded color="secondary" width="200"
              @click.stop="openGeneralSettingFn()"
              :loading="generalSettingsLoading"
              :disabled="btnDisabled"
            >{{$t('General Settings')}}</v-btn>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-around">
            <v-btn rounded color="secondary" width="200"
              @click.stop="openSensorSettingFn()"
              :loading="sensorSettingsLoading"
              :disabled="btnDisabled"
            >{{$t('Sensor Settings')}}</v-btn>
          </v-col>
          <v-col cols="12" class="d-flex justify-space-around">
            <v-btn rounded color="secondary" width="200"
              @click.stop="updateFwFn()"
              :loading="updateFwLoading"
              :disabled="btnDisabled"
            >{{$t('Update Firmware')}}</v-btn>
          </v-col>
          <v-col cols="12" class="py-0 d-flex justify-start">
            <v-icon color="deep-orange darken-4" class="text-body-1">mdi-information-outline</v-icon>
            <p class="text-caption black--text my-0 mx-2">{{$t('text: how to back menu home')}}</p>
          </v-col>
          <v-col cols="12" class="py-5 d-flex justify-start" v-if="v1Firmware">
            <v-icon color="red" class="text-body-1">mdi-alert-circle</v-icon>
            <p class="text-caption red--text my-0 mx-2">{{$t('text: v1 device warning')}}</p>
          </v-col>
        </v-row>
      </v-col>
      <!-- 右半屏，console -->
      <v-col>
        <v-card outlined class="pl-2 pt-0" height="100%">
          <div style="height:100%" id="terminal"></div>
        </v-card>
      </v-col>
    </v-row>
    <!-- footer -->
    <v-row>
      <v-col cols="12" class="pa-0">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="auto" class="d-flex flex-column align-center justify-center">
        <div style="width: 40px">
          <v-menu top offset-y close-on-click>
            <template v-slot:activator="{ on }">
              <span class="flag-icon" :class="flagIconClass" v-on="on"></span>
            </template>
            <v-list dense class="pa-0">
              <v-list-item-group v-model="selectedLocale" color="primary" @change="onLocaleListClick">
                <v-list-item key="item1" class="py-0" link style="min-height: 30px;" value="en">
                  <v-list-item-title class="caption">English</v-list-item-title>
                </v-list-item>
                <v-list-item key="item2" class="py-0" link style="min-height: 30px;" value="zh">
                  <v-list-item-title class="caption">简体中文</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </div>
      </v-col>
      <v-col class="d-flex justify-center">
        <div>
          <v-img src="../assets/sensecap.png" width="100px" @click.stop="logoClicked()"></v-img>
        </div>
      </v-col>
      <v-col cols="auto" class="d-flex flex-column align-center justify-center caption grey--text">
        <div>
          <v-tooltip top open-delay="1000" :disabled="!newVersion">
            <template v-slot:activator="{ on }">
              <v-badge color="pink" dot top :value="newVersion">
                <span v-on="on" @click="versionClicked()" id="versionText">v{{currentVersion}}</span>
              </v-badge>
            </template>
            <span>v{{newVersion}} available</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.main-body-fill-height {
  height: calc(100% - 60px);
}
</style>
<style>
.xterm .xterm-viewport {
  overflow-y: auto !important;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
const { ipcRenderer } = require('electron')
const Store = require('electron-store');
const store = new Store();

const delayMs = ms => new Promise(res => setTimeout(res, ms))

export default {
  name: 'Home',
  data() {
    return {
      //global
      menuContext: 'unknown',  //home, general, sensor TODO: change back to unknown after debugging
      v1Firmware: false,
      //loading
      generalSettingsLoading: false,
      sensorSettingsLoading: false,
      updateFwLoading: false,
      //serial
      selectedSerialPort: null,
      serialPorts: [],
      serialOpened: false,
      connectAsConfigMode: false,
      //ota
      currentVersion: '',
      newVersion: '',
      //i18n
      selectedLocale: 'en',
      localeBackup: 'en',
      //hidden function
      logoClickCnt: 0,
      timeoutHandler: null,
      hTimeoutOpenWin: null,
    }
  },
  computed: {
    flagIconClass: function() {
      return this.selectedLocale === 'zh' ? 'flag-icon-cn' : 'flag-icon-us'
    },
    connectBtnText: function() {
      return this.serialOpened ? this.$t('Disconnect') : this.$t('Connect')
    },
    connectBtnColor: function() {
      return this.serialOpened ? 'primary' : 'secondary'
    },
    serialVSelectDisable: function() {
      return this.serialOpened
    },
    btnDisabled: function () {
      return !this.serialOpened || !this.connectAsConfigMode || this.updateFwLoading ||
        this.generalSettingsLoading || this.sensorSettingsLoading || this.menuContext !== 'home';
    }
  },
  methods: {
    onSerialVSelectClicked() {
      ipcRenderer.send('init-serial-req')
      return true
    },
    ConnectFn() {
      console.log('start to connect:', this.selectedSerialPort)
      if (!this.selectedSerialPort) return
      if (!this.serialOpened) {
        ipcRenderer.send('serial-open-req', this.selectedSerialPort, this.connectAsConfigMode)
      } else {
        ipcRenderer.send('serial-close-req')
      }
    },
    openGeneralSettingFn() {
      console.log('going to send IPC open-general-window')

      this.generalSettingsLoading = true
      let self = this
      this.hTimeoutOpenWin = setTimeout(() => {
        self.hTimeoutOpenWin = null
        self.generalSettingsLoading = false
        console.log('open general setting window failed!')
      }, 10000)
      ipcRenderer.invoke('enter-general-settings').then((result) => {
        if (result === 'general') {
          ipcRenderer.send('open-general-window')
        }
      }).catch((error) => {
        console.log('openGeneralSettingFn failed:', error)
        let errorMsg = error.message
        if (errorMsg.includes('the menu context should be at home')) {
          let s = this.$t('text: menu context home')
          this.term.write(`\r\n${s}\r\n`)
        } else {
          this.term.write(`\r\n${errorMsg}\r\n`)
        }
      }).finally(() => {
        if (this.hTimeoutOpenWin) {
          clearTimeout(this.hTimeoutOpenWin)
          this.hTimeoutOpenWin = null
        }
        self.generalSettingsLoading = false
      })
    },
    openSensorSettingFn() {
      console.log('going to send IPC open-sensor-window')

      this.sensorSettingsLoading = true
      let self = this
      this.hTimeoutOpenWin = setTimeout(() => {
        self.hTimeoutOpenWin = null
        self.sensorSettingsLoading = false
        console.log('open sensor setting window failed!')
      }, 10000)
      ipcRenderer.invoke('enter-sensor-settings').then((result) => {
        if (result === 'sensor') {
          ipcRenderer.send('open-sensor-window')
        }
      }).catch((error) => {
        console.log('openSensorSettingFn failed:', error)
        let errorMsg = error.message
        if (errorMsg.includes('the menu context should be at home')) {
          let s = this.$t('text: menu context home')
          this.term.write(`\r\n${s}\r\n`)
        } else {
          this.term.write(`\r\n${errorMsg}\r\n`)
        }
      }).finally(() => {
        if (this.hTimeoutOpenWin) {
          clearTimeout(this.hTimeoutOpenWin)
          this.hTimeoutOpenWin = null
        }
        self.sensorSettingsLoading = false
      })
    },
    updateFwFn() {
      if (!this.serialOpened) return
      this.updateFwLoading = true
      ipcRenderer.invoke('start-update-fw').then((result) => {
        console.log('updateFwFn result:', result)
        this.term.write('\r\n[ done ✅ ]\r\n')
      }).catch((error) => {
        console.log('updateFwFn failed:', error)
        let errorMsg = error.message
        if (errorMsg.includes('the menu context should be at home')) {
          let s = this.$t('text: menu context home')
          this.term.write(`\r\n${s}\r\n`)
        }
      }).finally(() => {
        this.updateFwLoading = false
      })
    },
    versionClicked() {
      ipcRenderer.send('goto-new-version')
    },
    configModeChangedFn() {
      console.log(`connectAsConfigMode changed to: ${this.connectAsConfigMode}`)
      store.set('connectAsConfigMode', this.connectAsConfigMode)
      ipcRenderer.send('connect-as-config-change', this.connectAsConfigMode)
    },
    logoClicked() {
      let self = this
      this.logoClickCnt += 1
      if (this.logoClickCnt % 20 === 0) {
        ipcRenderer.send('broadcast-to-others', 'show-hidden-config')
      }
      if (this.timeoutHandler) return
      this.timeoutHandler = setTimeout(() => {
        self.logoClickCnt = 1
        self.timeoutHandler = null
        // console.log('click cnt reset to 1.')
      }, 4000)
    },

    //locale change
    onLocaleListClick() {
      if (this.selectedLocale === this.localeBackup) return
      console.log('going to change locale to:', this.selectedLocale)
      store.set('selectedLocale', this.selectedLocale)
      this.$root.$i18n.locale = this.selectedLocale
      ipcRenderer.send('locale-change', this.selectedLocale)
      this.localeBackup = this.selectedLocale
    }
  },
  created() {
    //locale
    console.log(`locale when created: ${this.$root.$i18n.locale}`)
    this.selectedLocale = this.localeBackup = this.$root.$i18n.locale

    //config mode
    this.connectAsConfigMode = store.get('connectAsConfigMode') || false
  },
  mounted() {
    //xterm
    let terminalContainer = document.getElementById('terminal')
    this.term = new Terminal({
      theme: {
        background: '#ffffff',
        foreground: '#78909C',
        cursor: '#15780F',
        selection: '#76FF0344'
      },
      fontSize: 12,
      cursorBlink: true,
      scrollback: 5000,
    })
    const fitAddon = new FitAddon()
    this.term.loadAddon(fitAddon)
    this.term.open(terminalContainer)
    fitAddon.fit()

    this.term.onData((data) => {
      // the bootloader does echo-back
      // if (data === '\r') data = '\r\n'
      this.term.write(data)
      ipcRenderer.send('xterm-input', data)
    })

    //serial
    ipcRenderer.on('init-serial-resp', (event, arg) => {
      console.log('init-serial-resp:', arg)
      let {ports, selectedPort, opened} = arg
      this.serialPorts = []
      for (let p of ports) {
        this.serialPorts.push(p.path)
      }
      this.selectedSerialPort = selectedPort
      this.serialOpened = opened
    })
    ipcRenderer.send('init-serial-req')

    ipcRenderer.on('serial-open-resp', (event, arg) => {
      console.log('serial-open-resp:', arg)
      let {opened, reason} = arg
      if (opened) {
        this.serialOpened = true
      } else {
        console.error('serial open failed:', reason)
      }
    })
    ipcRenderer.on('serial-close-resp', (event, arg) => {
      console.log('serial-close-resp:', arg)
      let {closed, reason} = arg
      if (closed) {
        this.serialOpened = false
        this.updateFwLoading = false
      } else {
        console.error('serial close failed:', reason)
      }
    })
    ipcRenderer.on('xterm-disp', (event, arg) => {
      // console.log('xterm-disp:', arg)
      this.term.write(arg)
      // this.stream.push(arg)
    })

    //menu context
    ipcRenderer.on('menu-context', (event, arg) => {
      this.menuContext = arg
    })

    //ota
    ipcRenderer.on('current-version-resp', (event, arg) => {
      console.log('current-version-resp:', arg)
      let {currentVersion} = arg
      this.currentVersion = currentVersion
    })
    ipcRenderer.send('current-version-req')

    ipcRenderer.on('update-available', (event, arg) => {
      console.log('update-available:', arg)
      this.newVersion = arg
      document.getElementById('versionText').style.cursor = 'pointer'
    })

    //update fw
    ipcRenderer.on('update-fw-begin', (event) => {
    })
    ipcRenderer.on('progress', (event, arg) => {
    })
    ipcRenderer.on('update-fw-abort', (event) => {
    })
    ipcRenderer.on('update-fw-end', (event) => {
    })

    //v1Firmware
    ipcRenderer.on('v1-firmware', (event) => {
      this.v1Firmware = true
    })
  },
  beforeDestroy() {
    ipcRenderer.removeAllListeners()
  }
}
</script>
