<i18n>
{
  "en": {
    "text: connectAsConfigMode": "Enter configuration mode automatically on device's booted",
    "text: clear data confirm": "This will clear all the storaged measurements in the flash. Once confirmed, storaged measurements will be wiped out.",
    "Maximum 32 chars allowed": "Maximum 32 non-whitespace chars",
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
    "Export Data": "导出缓存数据",
    "Update Fw": "更新固件",
    "Clear Data": "清空缓存数据",
    "text: clear data confirm": "这个操作将会清空存储在Flash中的测量数据，点击\"清空\"后，执行清空操作。",
    "Do it": "清空",
    "Connect": "连接",
    "Disconnect": "断开",

    "Must between [5, 43200]": "必须在[5, 43200]范围内",
    "Must between [5, 720]": "必须在[5, 720]范围内",
    "Must between [1, 1440]": "必须在[1, 1440]范围内",
    "Must between [1, 43200]": "必须在[1, 43200]范围内",
    "Must between [1, 65535]": "必须在[1, 65535]范围内",
    "Invalid LoRaWAN EUI (16 chars)": "无效的LoRaWAN EUI (16字符)",
    "Invalid LoRaPP EUI (32 chars)": "无效的LoRaPP EUI (32字符)",
    "Invalid domain": "不正确的域名格式",
    "Maximum 32 chars allowed": "最多32个(非空白)字符",
    "Maximum 31 chars allowed": "最多31个(非空白)字符",

    "end": "结束"
  }
}
</i18n>
<template>
  <v-container fluid class="py-0">
    <v-row>
      <v-col cols="12">
        <v-form ref="form1">
          <v-row class="pt-3">
          <!-- Fields -->
          <!-- eui & key -->
          <v-col cols="6" class="pb-0">
            <v-text-field v-model="deviceEUI" :label="$t('Device EUI')"
              :rules="deviceEUIRules" outlined dense>
            </v-text-field>
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field v-model="appKey" v-if="showHiddenCfg" :label="$t('App Key')"
              :rules="appKeyRules" outlined dense>
            </v-text-field>
          </v-col>
          <!-- cellular -->
          <v-col cols="6" class="py-0">
            <v-text-field v-model="cardIccid" :label="$t('Card ICCID')"
              disabled outlined dense>
            </v-text-field>
          </v-col>
          <v-col cols="6" class="py-0 d-flex justify-start align-start">
            <v-text-field v-model="signalRssi" :label="$t('Signal RSSI')"
              suffix="dBm"
              disabled outlined dense>
            </v-text-field>
            <v-icon class="align-self-start mt-2 ml-2" color="black">mdi-signal-cellular-{{signalIndex}}</v-icon>
          </v-col>
          <!-- interval -->
          <v-col cols="6" class="py-0">
            <v-text-field v-model.number="dataInterval" type="number" :label="$t('Data Interval')"
              :rules="dataIntervalRules"
              :suffix="$t('minutes')" outlined dense>
            </v-text-field>
          </v-col>
          <!-- battery info -->
          <v-col cols="6"  class="py-0">
            <v-text-field v-model.number="battery" type="number" :label="$t('Battery')"
              suffix="%" disabled outlined dense>
            </v-text-field>
          </v-col>
          <!-- mqtt config -->
          <v-col cols="9" class="pb-0">
            <v-text-field v-model="serverAddr" :label="$t('Server Address')"
              @change="serverAddrChangedFn"
              :rules="serverAddrRules"
              outlined dense>
            </v-text-field>
          </v-col>
          <v-col cols="3" class="pb-0">
            <v-text-field v-model.number="serverPort" type="number" :label="$t('Server Port')"
              :rules="serverPortRules"
              outlined dense>
            </v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="username" :label="$t('Username')"
              :rules="[rules.char31AllowEmtpy]"
              outlined dense>
            </v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="password" :label="$t('Password')"
              :rules="[rules.char31AllowEmtpy]"
              outlined dense>
            </v-text-field>
          </v-col>
          <!-- gps & ota switch -->
          <v-col cols="6" class="py-0">
            <v-switch v-model="enableGps" :label="$t('Enable GPS')" class="mt-0"
              outlined dense>
            </v-switch>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-switch v-model="enableOtaPrepub" v-if="showHiddenCfg" :label="$t('OTA Prepub')" class="mt-0"
              outlined dense>
            </v-switch>
          </v-col>
          <!-- APN for 4G -->
          <v-col cols="6" class="py-0">
            <v-text-field v-model="apn" :label="$t('APN')"
              :rules="[rules.char31AllowEmtpy]" outlined dense>
            </v-text-field>
          </v-col>
          <v-col cols="6" class="py-0"></v-col>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="apnUsername" :label="$t('APN Username')"
              :rules="[rules.char31AllowEmtpy]"
              outlined dense>
            </v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="apnPassword" :label="$t('APN Password')"
              :rules="[rules.char31AllowEmtpy]"
              outlined dense>
            </v-text-field>
          </v-col>
          <!-- hw & sw info -->
          <v-col cols="6" class="py-0">
            <v-text-field v-model="hwVer" :label="$t('Hardware Version')" disabled outlined dense>
            </v-text-field>
          </v-col>
          <v-col cols="6" class="py-0">
            <v-text-field v-model="swVer" :label="$t('Software Version')" disabled outlined dense>
            </v-text-field>
          </v-col>
          <!-- Buttons -->
          <v-col cols="12" class="py-0 d-flex justify-start">
            <v-spacer></v-spacer>
            <v-btn rounded color="secondary" width="100" class="mr-5"
              @click.stop="readFn()"
              :disabled="btnDisabled">{{$t('Read')}}</v-btn>
            <v-btn rounded color="secondary" width="100" class="mr-5"
              @click.stop="writeFn()"
              :loading="writeLoading"
              :disabled="btnDisabled">{{$t('Write')}}</v-btn>
            <v-btn rounded color="secondary" width="150" class="mr-5"
              @click.stop="exportMeasuredFileFn()"
              :loading="exportMeasuredLoading"
              :disabled="btnDisabled">{{$t('Export Data')}}</v-btn>
            <v-btn rounded color="secondary" width="150" class="mr-1"
              @click.stop="ClearDataFn()"
              :loading="clearCacheLoading"
              :disabled="btnDisabled">{{$t('Clear Data')}}</v-btn>
          </v-col>
        </v-row>
        </v-form>
      </v-col>
    </v-row>
    <!-- dialog -->
    <v-dialog
      v-model="dialog"
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">{{$t('Please confirm')}}</v-card-title>
        <v-card-text>{{$t('text: clear data confirm')}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            {{$t('Cancel')}}
          </v-btn>

          <v-btn color="red darken-1" text @click="doClearDataFn()">
            {{$t('Do it')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
const { ipcRenderer } = require('electron')
const { Readable } = require('stream')
const {RegexParser} = require('@serialport/parser-regex')
const {ReadlineParser} = require('@serialport/parser-readline')
const Store = require('electron-store');
const store = new Store();

const delayMs = ms => new Promise(res => setTimeout(res, ms))

export default {
  name: 'General',
  data() {
    let rules = {
      required: value => !!value || this.$t("Required."),
      rangeWAN: value => (value >= 5 && value <=43200) || this.$t("Must between [5, 43200]"),
      rangePP: value => (value >= 5 && value <=720) || this.$t("Must between [5, 720]"),
      rangeSH: value => (value >= 1 && value <=1440) || this.$t("Must between [1, 1440]"),
      rangePort: value => (value >= 1 && value <=65535) || this.$t("Must between [1, 65535]"),
      int: value => (/\.+/.test(value)) ? this.$t("Must be integer.") : true,
      eui16: value => (/^\w{16}$/.test(value)) || this.$t("Invalid LoRaWAN EUI (16 chars)"),
      eui32: value => (/^\w{32}$/.test(value)) || this.$t("Invalid LoRaPP EUI (32 chars)"),
      char32AllowEmtpy: value => {
        if (value) return (/^\S{1,32}$/i.test(value)) || this.$t("Maximum 32 chars allowed")
        else return true
      },
      char31AllowEmtpy: value => {
        if (value) return (/^\S{1,31}$/i.test(value)) || this.$t("Maximum 31 chars allowed")
        else return true
      },
      domain: value => (/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/i.test(value)) || (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value)) || this.$t("Invalid domain"),
    }
    return {
      //rules
      rules: rules,
      deviceEUIRules: [rules.required, rules.eui16],
      appEUIRules: [rules.required, rules.eui16],
      appKeyRules: [rules.required, rules.eui32],
      dataIntervalRules: [rules.int, rules.rangeSH],
      serverAddrRules: [],
      serverPortRules: [],
      //loading
      writeLoading: false,
      updateFwLoading: false,
      clearCacheLoading: false,
      exportMeasuredLoading: false,
      //
      serialOpened: false,
      showHiddenCfg: false,
      menuContext: 'unknown',  //TODO: change back to unknow when finished
      //config fields
      labelAppEUI: 'App EUI',
      labelAppKey: 'App Key',
      deviceEUI: '',
      deviceEUI2: '',
      appEUI: '',
      appEUI2: '',
      appKey: '',
      appKey2: '',
      cardIccid: '',
      signalRssi: -120,
      signalIndex: 'outline', //1,2,3,outline
      dataInterval: 60,
      dataInterval2: 60,
      battery: 100,
      serverAddr: '',
      serverAddr2: '',
      serverPort: 1883,
      serverPort2: 1883,
      username: '',
      username2: '',
      password: '',
      password2: '',
      enableGps: true,
      enableGps2: true,
      enableOtaPrepub: false,
      enableOtaPrepub2: false,
      apn: '',
      apn2: '',
      apnUsername: '',
      apnUsername2: '',
      apnPassword: '',
      apnPassword2: '',
      hwVer: '',
      swVer: '',
      //stream parse
      stream: null,
      pauseParseLine: false,
      customParseCallback: null,
      //dialog
      dialog: null,
    }
  },
  watch: {
    signalRssi(newVal, oldVal) {
      console.log('signalRssi newVal:', newVal, ', oldVal:', oldVal)
      if (newVal === oldVal || !newVal) return
      let rssi = parseInt(newVal)
      if (rssi > -71) this.signalIndex = '3'
      else if (rssi > -91 && rssi <= -71) this.signalIndex = '2'
      else if (rssi > -113 && rssi <= -91) this.signalIndex = '1'
      else if (rssi <= -113) this.signalIndex = 'outline'
    }
  },
  computed: {
    btnDisabled: function () {
      return (this.menuContext !== 'general')
    }
  },
  methods: {
    readFn() {
      ipcRenderer.send('serial-rx', '\r\nh')
    },
    waitSomething(needle, timeout) {
      return new Promise((resolve, reject) => {
        let self = this
        let h = setTimeout(() => {
          reject(`wait "${needle}" timeout!`)
          self.customParseCallback = null
        }, timeout)
        self.customParseCallback = (line) => {
          if (line.search(new RegExp(needle, 'i'))) {
            clearTimeout(h)
            self.customParseCallback = null
            resolve()
          }
        }
      })
    },
    writeOne(cmd, value, needle, timeout) {
      return Promise.resolve().then(() => {
        ipcRenderer.send('serial-rx', cmd)
      }).then(() => {
        return delayMs(500)
      }).then(() => {
        ipcRenderer.send('serial-rx', value + '\r\n')
        return this.waitSomething(needle, timeout)
      }).then(() => {
        return delayMs(500)
      })
    },
    writeFn() {
      this.deviceEUI = this.deviceEUI.trim()
      this.appEUI = this.appEUI.trim()
      this.appKey = this.appKey.trim()

      if (!this.$refs.form1.validate()) return false

      this.writeLoading = true

      let needUpdateDeviceEUI = (this.deviceEUI !== this.deviceEUI2)
      let needUpdateAppEUI = (this.appEUI !== this.appEUI2)
      let needUpdateAppKey = (this.appKey !== this.appKey2)
      let needUpdateDataInterval = (this.dataInterval !== this.dataInterval2)
      let needUpdateServerAddr = (this.serverAddr !== this.serverAddr2)
      let needUpdateServerPort = (this.serverPort !== this.serverPort2)
      let needUpdateUsername = (this.username !== this.username2)
      let needUpdatePassword = (this.password !== this.password2)
      let needUpdateGPS = (this.enableGps !== this.enableGps2)
      let needUpdateOta = (this.enableOtaPrepub !== this.enableOtaPrepub2)
      let needUpdateApn = (this.apn !== this.apn2)
      let needUpdateApnUsername = (this.apnUsername !== this.apnUsername2)
      let needUpdateApnPassword = (this.apnPassword !== this.apnPassword2)
      console.log({
        needUpdateDeviceEUI: needUpdateDeviceEUI,
        needUpdateAppEUI: needUpdateAppEUI,
        needUpdateAppKey: needUpdateAppKey,
        needUpdateDataInterval: needUpdateDataInterval,
        needUpdateServerAddr: needUpdateServerAddr,
        needUpdateServerPort: needUpdateServerPort,
        needUpdateUsername: needUpdateUsername,
        needUpdatePassword: needUpdatePassword,
        needUpdateGPS: needUpdateGPS,
        needUpdateOta: needUpdateOta,
        needUpdateApn: needUpdateApn,
        needUpdateApnUsername: needUpdateApnUsername,
        needUpdateApnPassword: needUpdateApnPassword
      })

      if (!(needUpdateDeviceEUI || needUpdateAppEUI || needUpdateAppKey || needUpdateDataInterval ||
            needUpdateServerAddr || needUpdateServerPort || needUpdateUsername || needUpdatePassword ||
            needUpdateGPS || needUpdateOta || needUpdateApn || needUpdateApnUsername || needUpdateApnPassword)) {
        console.log('no need to write')
        this.writeLoading = false
        return
      }

      this.pauseParseLine = true
      ipcRenderer.send('serial-rx', '\r\n')
      delayMs(500).then(() => {
        ipcRenderer.send('serial-rx', 'h')
        return this.waitSomething('Please enter your command', 3000)
      })
      .then(() => {
        return delayMs(500)
      })
      .then(() => { //device EUI
        this.pauseParseLine = false
        if (needUpdateDeviceEUI) return this.writeOne('d', this.deviceEUI, 'The new Device EUI is', 2000)
      })
      .then(() => { //app EUI
        if (needUpdateAppEUI) return this.writeOne('a', this.appEUI, 'The new App EUI is', 2000)
      })
      .then(() => { //app Key
        if (needUpdateAppKey) return this.writeOne('k', this.appKey, 'The new App Key is', 2000)
      })
      .then(() => { //data Interval
        if (needUpdateDataInterval) return this.writeOne('i', this.dataInterval, 'Now the data interval is', 2000)
      })
      .then(() => { //server address
        if (needUpdateServerAddr) return this.writeOne('s', this.serverAddr, 'New remote host', 2000)
      })
      .then(() => { //server port
        if (needUpdateServerPort) return this.writeOne('p', this.serverPort, 'New remote port', 2000)
      })
      .then(() => { //username
        if (needUpdateUsername) return this.writeOne('n', this.username, 'New user name', 2000)
      })
      .then(() => { //password
        if (needUpdatePassword) return this.writeOne('m', this.password, 'New password', 2000)
      })
      .then(() => { //GPS
        if (needUpdateGPS) return this.writeOne('g', this.enableGps ? 'Y' : 'N', 'New GPS Switch State', 2000)
      })
      .then(() => { //Ota prepub
        if (needUpdateOta) return this.writeOne('o', this.enableOtaPrepub ? 'Y' : 'N', 'New OTA preview Switch State', 2000)
      })
      .then(() => { //APN
        if (needUpdateApn) return this.writeOne('w', this.apn, 'New APN', 2000)
      })
      .then(() => { //APN username
        if (needUpdateApnUsername) return this.writeOne('y', this.apnUsername, 'New APN username', 2000)
      })
      .then(() => { //APN password
        if (needUpdateApnPassword) return this.writeOne('z', this.apnPassword, 'New APN password', 2000)
      })
      .then(() => { //read back finally to refresh the old value
        this.readFn()
      })
      .catch((err) => {
        console.warn('writeFn error:', err)
      })
      .finally(() => {
        this.pauseParseLine = false
        this.writeLoading = false
      })
    },
    exportMeasuredFileFn() {

      if( this.exportMeasuredLoading ) {
        return
      }
      ipcRenderer.invoke('read-measured-data', "x").then((result) => {
        if (result === 'canceled') {
          return;
        }
      }).catch((error) => {
        console.log('save to file error:', error)
      }).finally(() => {
      })
    },
    ClearDataFn() {
      this.dialog = true
    },
    doClearDataFn() {
      this.dialog = false
      ipcRenderer.send('serial-rx', '\r\nf')
    },
    parseLine(line) {
      if (this.customParseCallback) {
        this.customParseCallback(line)
      }

      if (this.pauseParseLine) return

      let found
      found = line.match(/Device Type:\s+(\w+)/i)
      if (found) {
        console.log('found device type:', found[1])
        // this.deviceType = found[1]
        return
      }
      found = line.match(/(Device EUI|# EUI):\s?(\w+)/i)
      if (found) {
        console.log('found device EUI:', found[2])
        this.deviceEUI = found[2]
        this.deviceEUI2 = this.deviceEUI
        return
      }
      found = line.match(/new Device EUI is\s+(\w+)/i)
      if (found) {
        console.log('confirm device EUI written:', found[1])
        this.deviceEUI2 = found[1]
        return
      }
      found = line.match(/(App EUI|Key A):\s+(\w+)/i)
      if (found) {
        console.log('found App EUI:', found[2])
        this.appEUI = found[2]
        this.appEUI2 = this.appEUI
        return
      }
      found = line.match(/(App Key|Key B|APPKEY):\s+(\w+)/i)
      if (found) {
        console.log('found App Key:', found[2])
        this.appKey = found[2]
        this.appKey2 = this.appKey
        return
      }
      found = line.match(/new App Key is\s+(\w+)/i)
      if (found) {
        console.log('confirm App Key written:', found[1])
        this.appKey2 = found[1]
        return
      }
      found = line.match(/ICCID:\s+(\w+)/i)
      if (found) {
        console.log('found ICCID:', found[1])
        this.cardIccid = found[1]
        return
      }
      found = line.match(/net rssi:\s+([+-]?\w+)/i)
      if (found) {
        console.log('found RSSI:', found[1])
        this.signalRssi = found[1]
        return
      }
      found = line.match(/(Data interval|PERIOD):\s?(\d+)/i)
      if (found) {
        console.log('found Data interval:', found[2])
        this.dataInterval = parseInt(found[2])
        this.dataInterval2 = this.dataInterval
        return
      }
      found = line.match(/Battery:\s+(\w+)%/i)
      if (found) {
        console.log('found Battery:', found[1])
        this.battery = parseInt(found[1])
        return
      }
      found = line.match(/Battery status\[\d+mv,\s?(\w+)%/i)
      if (found) {
        console.log('found Battery:', found[1])
        this.battery = parseInt(found[1])
        return
      }
      found = line.match(/Remote server:\s+(\S*)/i)
      if (found) {
        console.log('found remote server:', found[1])
        this.serverAddr = found[1]
        this.serverAddr2 = this.serverAddr
        if (this.serverAddr.trim().length > 0) this.serverPortRules = [this.rules.rangePort]
        else this.serverPortRules = []
        return
      } else {
        this.serverPortRules = []
      }
      found = line.match(/Remote port:\s+(\d+)/i)
      if (found) {
        console.log('found remote port:', found[1])
        this.serverPort = parseInt(found[1])
        this.serverPort2 = this.serverPort
        return
      }
      found = line.match(/User:\s+(\S*)/i)
      if (found) {
        console.log('found username:', found[1])
        this.username = found[1]
        this.username2 = this.username
        return
      }
      found = line.match(/Passwd:\s+(\S*)/i)
      if (found) {
        console.log('found password:', found[1])
        this.password = found[1]
        this.password2 = this.password
        return
      }
      found = line.match(/GPS Switch:\s+(\w+)/i)
      if (found) {
        console.log('found GPS switch:', found[1])
        this.enableGps = found[1] === 'Y' ? true : false
        this.enableGps2 = this.enableGps
        return
      }
      found = line.match(/^# OTA preview:\s+(\w+)/i)
      if (found) {
        console.log('found OTA preview:', found[1])
        this.enableOtaPrepub = found[1] === 'Y' ? true : false
        this.enableOtaPrepub2 = this.enableOtaPrepub
        return
      }
      found = line.match(/SWITCH:\[GPS:(\d),\s?OTA:(\d)/i)
      if (found) {
        console.log(`found SWITCH, GPS: ${found[1]}, OTA Preview: ${found[2]}`)
        this.enableGps = found[1] === '1' ? true : false
        this.enableGps2 = this.enableGps
        this.enableOtaPrepub = found[2] === '1' ? true : false
        this.enableOtaPrepub2 = this.enableOtaPrepub
        return
      }
      found = line.match(/APN:\s+(\S*)/i)
      if (found) {
        console.log('found APN:', found[1])
        this.apn = found[1]
        this.apn2 = this.apn
        return
      }
      found = line.match(/APN username:\s+(\S*)/i)
      if (found) {
        console.log('found APN username:', found[1])
        this.apnUsername = found[1]
        this.apnUsername2 = this.apnUsername
        return
      }
      found = line.match(/APN password:\s+(\S*)/i)
      if (found) {
        console.log('found APN password:', found[1])
        this.apnPassword = found[1]
        this.apnPassword2 = this.apnPassword
        return
      }
      found = line.match(/(Hardware Version|HW VER):\s?([vV0-9.]+)/i)
      if (found) {
        console.log('found Hardware version:', found[2])
        this.hwVer = found[2]
        return
      }
      found = line.match(/(Software Version|APP VER):\s?([vV0-9.]+)/i)
      if (found) {
        console.log('found Software firmware:', found[2])
        this.swVer = found[2]
        return
      }

      found = line.match(/Please input 'c' to enter configuration mode/i)
      if (found) {
        console.log('found enter config mode prompt')
        if (this.connectAsConfigMode) {
          console.log('enter c automatically ...')
          ipcRenderer.send('serial-rx', 'c')
        }
        return
      }

    },
    serverAddrChangedFn() {
      if (this.serverAddr) {
        this.serverAddrRules = [this.rules.domain]
        let result = this.rules.domain(this.serverAddr)
        if (typeof result === "boolean" && result) {
          this.serverPortRules = [this.rules.rangePort]
        }
      } else {
        this.serverAddrRules = []
        this.serverPortRules = []
      }
    },

  },
  created() {
    //locale
    console.log(`locale when created: ${this.$root.$i18n.locale}`)
  },
  mounted() {
    //stream
    this.stream = new Readable({
      read: (size) => {}
    })

    //serial
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
        this.pauseParseLine = false
      } else {
        console.error('serial close failed:', reason)
      }
    })
    ipcRenderer.on('serial-tx', (event, arg) => {
      this.stream.push(arg)
    })
    //parser
    const parser = this.stream.pipe(new ReadlineParser())
    parser.on('data', (line) => {
      // console.log(line, 'len:', line.length)
      this.parseLine(line)
    })

    //locale
    ipcRenderer.on('locale-change', (event, arg) => {
      console.log(`locale changed to:`, arg)
      this.$root.$i18n.locale = arg
    })

    //show hidden config
    ipcRenderer.on('show-hidden-config', (event) => {
      this.showHiddenCfg = true
    })

    //menu context
    ipcRenderer.on('menu-context', (event, arg) => {
      this.menuContext = arg
    }),

    ipcRenderer.on('export-measured-data-end', (event, arg) => {
      this.exportMeasuredLoading = arg
    })
  },
  beforeDestroy() {
    ipcRenderer.removeAllListeners()
  }

}
</script>

