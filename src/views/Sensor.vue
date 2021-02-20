<i18n>
{
  "en": {
    "error: proto version too new": "The protocol version of this device is outdated, please update its firmware.",
    "error: proto version too old": "The protocol version of this tool is outdated, please update this tool.",

    "helpInfo": {
      "modbusAddr": "For user defined sensors, the modbus address should be in range [128, 254].",
      "powerTime": "The periodic powered sensors will be turned off during the Hub's sleeping. We can have only one Always-On sensor with same modbus address.",
      "sensorTypeId": "For user defined sensors, the sensor type ID is a HEX number, in range [0x6000, 0x6150].",
      "measDelay": "The time that the Hub will wait for, before taking the measurement, after it has powered on the sensor. The unit is second.",
      "respTimeout": "The longest time that the Hub will wait for, for the response from the sensor, before it retries. The unit is 100 milliseconds.",
      "startupTime": "The time of the startup process, after which the Hub will be capable to respond the Modbus command. The unit is 100 milliseconds.",

      "measId": "For user defined sensors, the measurement ID is an integer, in range [5500, 5999] or [4097, 4999].",
      "registerAddr": "The starting address from which the measurement value is held. It's decimal number.",
      "dataType": "The data type determines how many registers will be read from the starting address, and in which format the Hub parses the data.",
      "precision": "The number of digits after the decimal point, it only controls the format of output, no scaling.",
      "factorA": "Transforms the output in fomula Ax + B, this is factor A, 32bit float number.",
      "factorB": "Transforms the output in fomula Ax + B, this is factor B, 32bit float number.",
      "writeStrategy": "Some sensors need extra write/control operation at desired timing, e.g. reset counter to zero after read.",
      "wrCmdInHex": "A modbus PDU, i.e. function code + data, in HEX format. e.g. \"06 00 00 00 00\". Max. 10bytes PDU supported.",

      "enableAllByDefault": "If checked, it will override the enable selection in the table below and enable all the builtin sensors existing and those OTAed in the future. If unchecked, the enable list will be fixed to your selection.",
      "end": "end"
    },
    "text: wait test": "Please wait while the Hub is detecting and testing the sensor,",
    "text: cancel test": "This will only close the test dialog, the Hub will continue the test in the background, not responding any command.",

    "end": "end"
  },
  "zh": {
    "User Defined": "用户自定义",
    "Sensors": "传感器",
    "empty": "空",
    "Modbus Address": "Modbus地址",
    "Sensor Type ID": "传感器类型ID",
    "Sensor Type": "传感器类型",
    "Meas. Count": "测量值数量",
    "Power": "供电",
    "Meas. Delay (s)": "预热时间(秒)",
    "Resp. Timeout (100ms)": "响应超时(100毫秒)",
    "Startup Time (100ms)": "启动时间(100毫秒)",
    "Enable": "使能",
    "Test": "测试",
    "Measurements": "测量值",
    "Measurement": "测量",
    "Meas. ID": "测量值ID",
    "Meas. Name": "测量值名称",
    "Func. Code (r)": "功能码(读)",
    "Reg. Address (r)": "寄存器地址(读)",
    "Reg. Count (r)": "寄存器个数(读)",
    "Data Type": "数据类型",
    "Precision": "精度",
    "FactorA": "系数A",
    "FactorB": "系数B",
    "Cmd Hex (w)": "写命令HEX",
    "Builtin": "内建支持",
    "Enable all by default": "默认使能所有",
    "Import From File": "从文件导入",
    "Export To File": "导出到文件",
    "Read": "读取",
    "Write": "写入",
    "Power Voltage": "供电电压",
    "Power Time": "供电时间",
    "Measurement Delay": "预热时间",
    "Response Timeout": "响应超时时间",
    "Startup Time": "启动时间",
    "Measurement ID": "测量值ID",
    "Read Function": "读功能",
    "Function Code": "功能码",
    "Register Address": "寄存器地址",
    "Write Function": "写功能",
    "Write Strategy": "写策略",
    "Command in Hex": "命令的HEX字符串",
    "Test Measurement": "测试测量值",
    "Test Again": "再次测试",
    "Result": "测试结果",
    "Are you sure to close the test dialog?": "您确定要关闭测试对话框吗？",
    "Must between [128, 254]": "必须在[128, 254]范围内",
    "Must between [0x6000, 0x6150]": "必须在[0x6000, 0x6150]范围内",
    "Invalid HEX string": "无效的HEX字符串",
    "Must be nonnegative integer.": "必须是正整数",
    "Must between [5500, 5999] or [4097, 4999]": "必须在[5500, 5999]或[4097, 4999]范围内",
    "Maximum 20 non-whitespace chars allowed": "最多20个非空白字符",
    "Periodic": "周期供电型",
    "Always-On": "常电型",
    "Read Holding Registers (3)": "读保持寄存器(3)",
    "Read Input Registers (4)": "读输入寄存器(4)",
    "Unsigned 16bit integer": "16bit无符号整型",
    "Signed 16bit integer": "16bit有符号整型",
    "Unsigned 32bit integer": "32bit无符号整型",
    "Signed 32bit integer": "32bit有符号整型",
    "32bit float": "32bit浮点数",
    "Unknown data type": "特殊数据类型",
    "None": "无",
    "After read": "读后",
    "On new date": "日期变化后",
    "Fetching sensor": "正在获取传感器",
    "Reading protocol version ...": "正在读取协议版本...",
    "Reading sensor configuration version ...": "正在读取传感器配置版本...",
    "Builtin sensor cfg version is": "内建支持传感器配置版本是",
    "User defined sensor cfg version is": "用户自定义传感器配置版本是",
    "Builtin sensor count is": "内建支持传感器数量是",
    "User defined sensor count is": "用户自定义传感器数量是",
    "Builtin sensor enabled:": "内建支持使能数量",
    "User defined sensor enabled:": "用户自定义传感器使能数量",
    "Read done, configuration versions: user defined=": "读取成功，配置版本分别是：用户自定义=",
    "builtin=": "内建支持=",
    "Writing sensor": "正在写入传感器",
    "No builtin sensors, seems a faulty configuration": "没有内建支持传感器，无效的配置。",
    "Initializing the writing of builtin sensor configuration ...": "正在初始化写入内建支持传感器配置...",
    "Finishing the writing of builtin sensor configuration ...": "正在结束写入内建支持传感器配置...",
    "Initializing the writing of user defined sensor configuration ...": "正在初始化写入用户自定义传感器配置...",
    "Finishing the writing of user defined sensor configuration ...": "正在结束写入用户自定义传感器配置...",
    "The sensor configurations are written successfully.": "传感器配置被成功写入。",
    "At least one measurement should be added, sensor modbus address: ": "至少需要配置1个测量值，传感器modbus地址：",
    "At least one measurement should be added": "至少需要配置1个测量值",
    "At most 16 measurements can be added, sensor modbus address: ": "一个传感器最多可以配置16个测量值，传感器modbus地址：",
    "Invalid measurement configurations.": "传感器的测量值配置有问题。",
    "This address has been used.": "此地址已被占用。",
    "This measurement ID has been used.": "此测量值ID已被占用。",
    "The last test job will still run for": "上一个测试任务正在进行，仍需",
    "modbus address not found": "未发现Modbus地址",
    "Imported from file successfully.": "从文件导入成功。",
    "Please read from device first": "请先从设备中读取。",
    "Exported to file successfully.": "导出到文件成功。",
    "Failed in exporting to file.": "导出到文件失败了。",

    "error: proto version too new": "设备的协议版本过时，请更新设备固件。",
    "error: proto version too old": "本工具的协议版本过时，请更新本工具。",

    "Error: openDialog get empty filePath.": "文件路径为空。",
    "Error: read file error": "读文件出错。",
    "Error: The configuration file is corrupted": "配置文件坏损。",
    "Error: no read permission": "没有读权限。",
    "Error: write file error": "写文件出错。",

    "helpInfo": {
      "modbusAddr": "用户自定义传感器的modbus地址应该在[128, 254]范围内。",
      "powerTime": "周期供电型传感器在Hub睡眠期间被切断电源，同一个modbus地址只能有一个常电型传感器。",
      "sensorTypeId": "用户自定义传感器的类型ID是一个Hex数字，有效范围[0x6000, 0x6150]。",
      "measDelay": "Hub从给传感器通电到读取传感器，等待的时长，单位秒。",
      "respTimeout": "Hub向传感器发起读请求后，等待响应的超时时间，超时后重试，单位100毫秒。",
      "startupTime": "传感器从被通电，到能响应Modbus指令，需要等待的时长，单位100毫秒。",

      "measId": "用户自定义传感器的测量值ID是一个整数，有效范围[5500, 5999]或[4097, 4999]。",
      "registerAddr": "测量值在传感器中的寄存器地址，整数。",
      "dataType": "数据类型决定了从传感器读取的寄存器个数，和以怎样的格式解析寄存器值。",
      "precision": "小数点后位数，仅影响格式，没有比例缩放作用。",
      "factorA": "以公式 Ax+B 转换输出值，系数A，单精度浮点数。",
      "factorB": "以公式 Ax+B 转换输出值，系数B，单精度浮点数。",
      "writeStrategy": "有些传感器需要在特定时间点执行写操作，例如读后清零。",
      "wrCmdInHex": "modbus PDU的HEX字符串，即功能码 + 数据，例如\"06 00 00 00 00\"，最长支持10字节PDU。",

      "enableAllByDefault": "如果选中，它将覆盖下面表格中的使能选择，从而使能所有内建支持传感器，包括未来OTA的新传感器；如果不选中，内建支持传感器的使能列表将固定在下面表格的选择，未来OTA的新传感器默认不使能。",
      "end": "结束"
    },
    "text: wait test": "Hub正在探测和测试传感器，请等待",
    "text: cancel test": "这个操作仅会关闭测试对话框，传感器测试将在后台继续进行，且在完成之前Hub不响应任何指令。",

    "end": "结束"
  }
}
</i18n>
<template>
  <v-container fluid class="py-0" fill-height>
    <v-row class="main-body-fill-height">
      <v-col cols="12" class="pb-0" style="height: 100%;">
        <el-tabs v-model="tab" type="border-card" class="tab-body-fill-height">
          <!--UserDefined Sensor-->
          <el-tab-pane :label="$t('User Defined')" name="user" class="tab-body-fill-height">
            <div class="pb-1 d-flex justify-start">
              <div class="text-subtitle-1">{{$t('Sensors')}}</div>
              <v-spacer></v-spacer>
              <el-button type="primary" size="mini" icon="el-icon-plus" round
                @click="openSensorDialog('Add')"
              ></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" round
                @click="deleteSensor()"
              ></el-button>
            </div>
            <div class="tab-body-half">
              <el-table :data="tableItemsUserDefined" ref="tbUserDefined"
                height="100%" size="mini" border
                header-row-class-name="my-table-header"
                row-class-name="my-table-row"
                cell-class-name="my-table-cell"
                highlight-current-row
                :empty-text="$t('empty')"
                @selection-change="userDefinedSelectionChange"
                @row-dblclick="userDefinedRowDbClick"
                @row-click="sensorsRowClick"
              >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="mbAddr" :label="$t('Modbus Address')" min-width="100"></el-table-column>
                <el-table-column prop="sensorTypeId" :label="$t('Sensor Type ID')" min-width="110" :formatter="formatSensorTypeId"></el-table-column>
                <!--<el-table-column prop="sensorType" :label="$t('Sensor Type')" min-width="200" show-overflow-tooltip="true"></el-table-column>-->
                <el-table-column prop="measCnt" :label="$t('Meas. Count')" min-width="100"></el-table-column>
                <el-table-column prop="powerSchema" :label="$t('Power')" min-width="100" :formatter="formatPowerSchema"></el-table-column>
                <el-table-column prop="measDelay" :label="$t('Meas. Delay (s)')" min-width="100"></el-table-column>
                <el-table-column prop="respTimeout" :label="$t('Resp. Timeout (100ms)')" min-width="120"></el-table-column>
                <el-table-column prop="startupTime" :label="$t('Startup Time (100ms)')" min-width="120"></el-table-column>
                <el-table-column prop="enabled" align="center" width="90">
                  <template slot="header" slot-scope="scope">
                    <el-checkbox :indeterminate="indeterminateUserDefined" v-model="enableAllUserDefined" size="mini"
                      @change="handleCheckAllUserDefinedChange"
                    >{{$t('Enable')}}</el-checkbox>
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.enabled" size="mini"
                      @change="handleCheckOneUserDefinedChange"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Test')" align="center" width="50">
                  <template slot-scope="scope">
                    <span style="cursor:pointer;" @click.stop="testMeasurement(scope.row)">
                      <v-icon>mdi-test-tube</v-icon>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pt-4 pb-1 d-flex justify-start">
              <div class="text-subtitle-1">{{$t('Measurements')}}</div>
              <v-spacer></v-spacer>
              <el-button type="primary" size="mini" icon="el-icon-plus" round
                :disabled="addMeasurementBtnDisabled"
                @click="openMeasurementDialog('Add')"
              ></el-button>
              <el-button type="danger" size="mini" icon="el-icon-delete" round
                @click="deleteMeasurement()"
              ></el-button>
            </div>
            <div class="tab-body-half">
              <el-table :data="measurements"
                height="100%" size="mini" border
                header-row-class-name="my-table-header"
                row-class-name="my-table-row"
                cell-class-name="my-table-cell"
                :empty-text="$t('empty')"
                @selection-change="userDefinedMeasSelectionChange"
                @row-dblclick="userDefinedMeasRowDbClick"
              >
                <el-table-column type="selection"></el-table-column>
                <el-table-column prop="measId" :label="$t('Meas. ID')" width="80"></el-table-column>
                <!--<el-table-column prop="measName" :label="$t('Meas. Name')" min-width="150" show-overflow-tooltip="true"></el-table-column>-->
                <el-table-column prop="readFuncCode" :label="$t('Func. Code (r)')" min-width="90"></el-table-column>
                <el-table-column prop="readRegAddr" :label="$t('Reg. Address (r)')" min-width="100"></el-table-column>
                <el-table-column prop="readRegCnt" :label="$t('Reg. Count (r)')" min-width="100"></el-table-column>
                <el-table-column prop="dataType" :label="$t('Data Type')" min-width="160" :formatter="formatDataType"></el-table-column>
                <el-table-column prop="dataPrecision" :label="$t('Precision')" min-width="80"></el-table-column>
                <el-table-column prop="dataFactorA" :label="$t('FactorA')" min-width="80" :formatter="formatFloat"></el-table-column>
                <el-table-column prop="dataFactorB" :label="$t('FactorB')" min-width="80" :formatter="formatFloat"></el-table-column>
                <el-table-column prop="writeCmd" :label="$t('Cmd Hex (w)')" min-width="160"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>

          <!--Builtin Sensor-->
          <el-tab-pane :label="$t('Builtin')" name="builtin" class="tab-body-fill-height">
            <div class="pb-1 d-flex justify-start">
              <div class="text-subtitle-1">{{$t('Sensors')}}</div>
              <v-spacer></v-spacer>
              <el-checkbox class="pt-1 mr-1" v-model="enableAllByDefault">{{$t('Enable all by default')}}</el-checkbox>
              <v-tooltip top max-width="400">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                </template>
                <span>{{$t('helpInfo.enableAllByDefault')}}</span>
              </v-tooltip>
            </div>
            <div class="tab-body-half">
              <el-table :data="tableItemsBuiltin" ref="tbBuiltin"
                height="100%" size="mini" border
                header-row-class-name="my-table-header"
                row-class-name="my-table-row"
                cell-class-name="my-table-cell"
                highlight-current-row
                :empty-text="$t('empty')"
                @row-click="sensorsRowClick"
              >
                <el-table-column prop="mbAddr" :label="$t('Modbus Address')" min-width="100"></el-table-column>
                <el-table-column prop="sensorTypeId" :label="$t('Sensor Type ID')" min-width="110" :formatter="formatSensorTypeId"></el-table-column>
                <!--<el-table-column prop="sensorType" :label="$t('Sensor Type')" min-width="200" show-overflow-tooltip="true"></el-table-column>-->
                <el-table-column prop="measCnt" :label="$t('Meas. Count')" min-width="100"></el-table-column>
                <el-table-column prop="powerSchema" :label="$t('Power')" min-width="100" :formatter="formatPowerSchema"></el-table-column>
                <el-table-column prop="measDelay" :label="$t('Meas. Delay (s)')" min-width="100"></el-table-column>
                <el-table-column prop="respTimeout" :label="$t('Resp. Timeout (100ms)')" min-width="120"></el-table-column>
                <el-table-column prop="startupTime" :label="$t('Startup Time (100ms)')" min-width="120"></el-table-column>
                <el-table-column prop="enabled" align="center" width="90">
                  <template slot="header" slot-scope="scope">
                    <el-checkbox :indeterminate="indeterminateBuiltin" v-model="enableAllBuiltin" size="mini"
                      @change="handleCheckAllBuiltinChange"
                    >{{$t('Enable')}}</el-checkbox>
                  </template>
                  <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.enabled" size="mini"
                      @change="handleCheckOneBuiltinChange"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('Test')" align="center" width="50">
                  <template slot-scope="scope">
                    <span style="cursor:pointer;" @click.stop="testMeasurement(scope.row)">
                      <v-icon>mdi-test-tube</v-icon>
                    </span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pt-4 pb-1 d-flex justify-start">
              <div class="text-subtitle-1">{{$t('Measurements')}}</div>
            </div>
            <div class="tab-body-half">
              <el-table :data="measurements"
                height="100%" size="mini" border
                header-row-class-name="my-table-header"
                row-class-name="my-table-row"
                cell-class-name="my-table-cell"
                :empty-text="$t('empty')"
              >
                <el-table-column prop="measId" :label="$t('Meas. ID')" width="80"></el-table-column>
                <!--<el-table-column prop="measName" :label="$t('Meas. Name')" min-width="150" show-overflow-tooltip="true"></el-table-column>-->
                <el-table-column prop="readFuncCode" :label="$t('Func. Code (r)')" min-width="90"></el-table-column>
                <el-table-column prop="readRegAddr" :label="$t('Reg. Address (r)')" min-width="100"></el-table-column>
                <el-table-column prop="readRegCnt" :label="$t('Reg. Count (r)')" min-width="100"></el-table-column>
                <el-table-column prop="dataType" :label="$t('Data Type')" min-width="160" :formatter="formatDataType"></el-table-column>
                <el-table-column prop="dataPrecision" :label="$t('Precision')" min-width="80"></el-table-column>
                <el-table-column prop="dataFactorA" :label="$t('FactorA')" min-width="80" :formatter="formatFloat"></el-table-column>
                <el-table-column prop="dataFactorB" :label="$t('FactorB')" min-width="80" :formatter="formatFloat"></el-table-column>
                <el-table-column prop="writeCmd" :label="$t('Cmd Hex (w)')" min-width="160"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </v-col>
    </v-row>
    <!-- footer -->
    <!--<v-row>-->
    <!--  <v-col cols="12" class="pa-0">-->
    <!--    <v-divider></v-divider>-->
    <!--  </v-col>-->
    <!--</v-row>-->
    <v-row>
      <v-col cols="12" class="pb-3 d-flex justify-start">
        <div class="text-caption mt-1">{{statusText}}</div>
        <v-spacer></v-spacer>
        <v-btn rounded color="secondary" width="200" class="mr-5"
          @click.stop="importFn()"
          :loading="ldImport"
          :disabled="btnDisabled">{{$t('Import From File')}}</v-btn>
        <v-btn rounded color="secondary" width="200" class="mr-5"
          @click.stop="exportFn()"
          :loading="ldExport"
          :disabled="btnDisabled">{{$t('Export To File')}}</v-btn>
        <v-btn rounded color="secondary" width="100" class="mr-5"
          @click.stop="readFn()"
          :loading="readLoading"
          :disabled="btnDisabled">{{$t('Read')}}</v-btn>
        <v-btn rounded color="secondary" width="100" class="mr-3"
          @click.stop="writeFn()"
          :loading="writeLoading"
          :disabled="btnDisabled">{{$t('Write')}}</v-btn>
      </v-col>
    </v-row>

    <v-overlay :value="overlay">
      {{overlayText}}
    </v-overlay>

    <!-- dialog -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="form1">
        <v-card>
          <v-card-title>
            <span class="text-h6">{{dialogActionStr}} {{$t('Sensor')}}</span>
          </v-card-title>
          <v-card-text class="py-0">
            <v-row>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">
                  {{$t('Modbus Address')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.modbusAddr')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgSensor['mbAddr']"
                  :rules="[rules.required, rules.rangeModbus, rules.int]"
                  :error-messages="mbAddrErrorMsg"
                  :disabled="dialogAction==='Modify'"
                  @change="mbAddrErrorMsg=null"
                  type="number"
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">
                  {{$t('Power Voltage')}}
                  <!--<v-tooltip top max-width="400">-->
                  <!--  <template v-slot:activator="{ on, attrs }">-->
                  <!--    <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>-->
                  <!--  </template>-->
                  <!--  <span>{{$t('helpInfo.powerVoltage')}}</span>-->
                  <!--</v-tooltip>-->
                </p>
                <v-select :items="powerVoltageOptions" v-model="dgSensor['powerVoltage']"
                  outlined dense
                ></v-select>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">
                  {{$t('Power Time')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.powerTime')}}</span>
                  </v-tooltip>
                </p>
                <v-select :items="powerTimeOptions" v-model="dgSensor['powerTime']"
                  outlined dense
                ></v-select>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">
                  {{$t('Sensor Type ID')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.sensorTypeId')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgSensor['sensorTypeId']"
                  :rules="[rules.required, rules.rangeSensorTypeId]"
                  prefix="0x"
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">
                  {{$t('Measurement Delay')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.measDelay')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgSensor['measDelay']"
                  :rules="[rules.rangeGEZero]"
                  :suffix="$t('seconds')"
                  type="number"
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">
                  {{$t('Response Timeout')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.respTimeout')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgSensor['respTimeout']"
                  :rules="[rules.rangeGEZero]"
                  :suffix="'x100 ' + $t('milliseconds')"
                  type="number"
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">
                  {{$t('Startup Time')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.startupTime')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgSensor['startupTime']"
                  :rules="[rules.rangeGEZero]"
                  :suffix="'x100 ' + $t('milliseconds')"
                  type="number"
                  outlined dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="primary" width="100" @click="addSensor()" :loading="ldAddSensor">{{$t('OK')}}</v-btn>
            <v-btn color="secondary" width="100" @click="dialog=false;">{{$t('Cancel')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <v-dialog v-model="dialog2" persistent max-width="600px">
      <v-form ref="form2">
        <v-card>
          <v-card-title>
            <span class="text-h6">{{dialogActionStr}} {{$t('Measurement')}}</span>
          </v-card-title>
          <v-card-text class="py-0">
            <v-row>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">
                  {{$t('Measurement ID')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.measId')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgMeas['measId']"
                  :rules="[rules.required, rules.rangeMeasId, rules.int]"
                  :error-messages="measIdErrorMsg"
                  :disabled="dialogAction==='Modify'"
                  type="number"
                  @change="measIdErrorMsg=null"
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col cols="6"></v-col>
              <!--Read-->
              <v-col cols="12" class="py-0">
                <div class="text-subtitle-2 primary--text">{{$t('Read Function')}}</div>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">{{$t('Function Code')}}</p>
                <v-select :items="readFuncCodeOptions" v-model="dgMeas['readFuncCode']"
                  outlined dense
                ></v-select>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">{{$t('Register Address')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.registerAddr')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgMeas['readRegAddr']"
                  :rules="[rules.requiredWithZero, rules.int]"
                  type="number"
                  outlined dense
                ></v-text-field>
              </v-col>
              <!--Data-->
              <v-col cols="12" class="py-0">
                <div class="text-subtitle-2 primary--text">{{$t('Value')}}</div>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">{{$t('Data Type')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.dataType')}}</span>
                  </v-tooltip>
                </p>
                <v-select :items="dataTypeOptions" v-model="dgMeas['dataType']"
                  outlined dense
                ></v-select>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">{{$t('Precision')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.precision')}}</span>
                  </v-tooltip>
                </p>
                <v-select :items="precisionOptions" v-model="dgMeas['dataPrecision']"
                  outlined dense
                ></v-select>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">{{$t('Factor A')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.factorA')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgMeas['dataFactorA']"
                  :rules="[rules.requiredWithZero]"
                  type="number"
                  outlined dense
                ></v-text-field>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">{{$t('Factor B')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.factorB')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgMeas['dataFactorB']"
                  :rules="[rules.requiredWithZero]"
                  type="number"
                  outlined dense
                ></v-text-field>
              </v-col>
              <!--Write-->
              <v-col cols="12" class="py-0">
                <div class="text-subtitle-2 primary--text">{{$t('Write Function')}}</div>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">{{$t('Write Strategy')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.writeStrategy')}}</span>
                  </v-tooltip>
                </p>
                <v-select :items="writeStrategyOptions" v-model="dgMeas['writeStrategy']"
                  outlined dense
                ></v-select>
              </v-col>
              <v-col cols="6" class="py-0">
                <p class="text-subtitle-2 font-weight-light ma-0">{{$t('Command in Hex')}}
                  <v-tooltip top max-width="400">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon class="text-caption" v-on="on" v-bind="attrs">mdi-help-circle-outline</v-icon>
                    </template>
                    <span>{{$t('helpInfo.wrCmdInHex')}}</span>
                  </v-tooltip>
                </p>
                <v-text-field v-model="dgMeas['writeCmd']"
                  :rules="[rules.char20AllowEmtpy]"
                  outlined dense>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn color="primary" width="100" @click="addMeasurement()" :loading="ldAddMeasurement">{{$t('OK')}}</v-btn>
            <v-btn color="secondary" width="100" @click="dialog2=false;">{{$t('Cancel')}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

    <!--Test Measurement-->
    <v-dialog v-model="dialog3" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{$t('Test Measurement')}}</span>
        </v-card-title>
        <v-card-text class="py-0">
          <div class="text-caption" v-if="testCountdown>0">{{$t('text: wait test')}} {{testCountdown}} {{$t('seconds')}} ...</div>
          <div class="text-body-2 black--text mb-2">{{$t('Result')}}</div>
          <div class="text-caption">
            <v-textarea
              v-model="testResult"
              class="text-caption"
              rows="20"
              solo dense hide-details readonly
            ></v-textarea>
          </div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn v-if="showTestAgain" color="secondary" width="150" @click="testMeasurement(null)">{{$t('Test Again')}}</v-btn>
          <v-btn color="secondary" width="100" @click="cancelTestMeasurement">{{ dialog3BtnText }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog4" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h6">{{$t('Pleae confirm')}}</span>
        </v-card-title>
        <v-card-text class="py-0">
          <div class="text-body-2 black--text mb-2">{{$t('text: cancel test')}}</div>
          <div class="text-body-2 black--text mb-2">{{$t('Are you sure to close the test dialog?')}}</div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn color="secondary" width="100" @click="dialog4=false;dialog3=false;">{{$t('Yes')}}</v-btn>
          <v-btn color="secondary" width="100" @click="dialog4=false;">{{$t('No')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- snackbar -->
    <v-snackbar v-model="snackbar" :top="true" :timeout="5000" :color="snackbarColor" dark>
      <v-icon color="white" class="mr-3">{{snackbarIcon}}</v-icon>
      <span>{{snackbarText}}</span>
      <v-spacer></v-spacer>
    </v-snackbar>

  </v-container>
</template>

<style scoped>
.main-body-fill-height {
  height: calc(100% - 60px);
}
.tab-body-fill-height {
  /*height: calc(100% - 40px);*/
  height: 100%;
}
.tab-body-plus-height {
  height: calc(100% + 40px);
  /*height: 100%;*/
}
.tab-body-half {
  height: calc(50% - 40px);
  /*height: 50%;*/
}

</style>
<style>
.el-tabs__content {
  height: calc(100% - 40px);
}
.el-checkbox__label {
  font-size: 12px !important;
  font-weight: bold !important;
}
.my-table-header th {
  background-color: #F4F8FF !important;
  color: rgba(0, 0, 0, 0.7) !important;
}
.my-table-row {

}
.my-table-cell {
  padding: 3px 0 !important;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'
const { ipcRenderer } = require('electron')
const { Readable } = require('stream')
const RegexParser = require('@serialport/parser-regex')
const ReadlineParser = require('@serialport/parser-readline')
const Store = require('electron-store');
const store = new Store();

const delayMs = ms => new Promise(res => setTimeout(res, ms))

export default {
  name: 'Sensor',
  data() {
    //should bump up this version if the schema of the `sinfo` frame has been changed.
    this.storageSchemaVersion = 1

    let rules = {
      required: value => !!value || this.$t("Required."),
      requiredWithZero: value => !!value || parseFloat(value) === 0 || this.$t("Required."),
      rangeModbus: value => (value >= 128 && value <=254) || this.$t("Must between [128, 254]"),
      rangeSensorTypeId: value => {
        if (/^[0-9a-f]+$/i.test(value)) {
          const v = parseInt('0x' + value)
          return (v >= 0x6000 && v <= 0x6150) || this.$t("Must between [0x6000, 0x6150]")
        } else {
          return this.$t("Invalid HEX string")
        }
      },
      rangeGEZero: value => {
        if (/^(0|[1-9][0-9]*)$/i.test(value)) {
          return true
        } else {
          return this.$t("Must be nonnegative integer.")
        }
      },
      rangeMeasId: value => (value >= 5500 && value <=5999) || (value >= 4097 && value <=4999) || this.$t("Must between [5500, 5999] or [4097, 4999]"),
      int: value => (/\.+/.test(value)) ? this.$t("Must be integer.") : true,
      char20AllowEmtpy: value => {
        if (value) {
          value = value.replace(/\s/g, '')
          if (/^[0-9a-f]{2,}$/i.test(value) && value.length % 2 === 0) {
            return (/^\S{2,20}$/i.test(value)) || this.$t("Maximum 20 non-whitespace chars allowed")
          } else return this.$t("Invalid HEX string")
        } else return true
      },
      domain: value => (/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/i.test(value)) || (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(value)) || this.$t("Invalid domain"),
    }
    return {
      //rules
      rules: rules,
      //global
      tab: 'user',  //tab index, from 0
      menuContext: 'unknown',  //TODO: change back to unknown when finished
      sinfoVerBuiltin: 0,
      sinfoVerUser: 0,
      statusText: '',
      overlay: false,
      overlayText: "",
      tableItems: [],
      measEditingMbAddr: null,
      testingAddr: null,

      //loading
      readLoading: false,
      writeLoading: false,
      ldAddSensor: false,
      ldAddMeasurement: false,
      ldImport: false,
      ldExport: false,

      //table - user defined
      tableItemsUserDefined: [],
      selectedUserDefinedSensors: [],
      enableAllUserDefined: false,
      indeterminateUserDefined: false,

      //table - builtin
      tableItemsBuiltin: [],
      selectedBuiltinSensors: [],
      enableAllBuiltin: false,
      indeterminateBuiltin: false,
      enableAllByDefault: true,

      //measurements
      measurements: [],
      selectedUserDefinedMeasurements: [],


      //dialog
      dialog: null,
      dgSensor: {
        "mbAddr": 128,
        "sensorTypeId": "6000",
        "powerSchema": 2,
        "powerVoltage": 2,
        "powerTime": 0, //0 - periodic, 1 - constant power
        "measDelay": 2,
        "respTimeout": 5,
        "startupTime": 10,
      },
      mbAddrErrorMsg: "",
      powerVoltageOptions: [{text: '5V', value: 1}, {text: '12V', value: 2}],
      powerTimeOptions: [{text: this.$t('Periodic'), value: 0}, {text: this.$t('Always-On'), value: 1}],
      dialog2: null,
      dgMeas: {
        "measId": 5500,
        "readFuncCode": 3,
        "readRegAddr": 0,
        "readRegCnt": 0,
        "dataType": 1,
        "dataPrecision": 3,
        "dataFactorA": 1.000,
        "dataFactorB": 0,
        "writeStrategy": 0,
        "writeCmd": "",
        "movingTimeSlice": 0,
        "movingSliceCnt": 0,
      },
      measIdErrorMsg: "",
      readFuncCodeOptions: [
        {text: this.$t('Read Holding Registers (3)'), value: 3},
        {text: this.$t('Read Input Registers (4)'), value: 4}
      ],
      dataTypeOptions: [
        {text: this.$t('Unsigned 16bit integer') + ', 0xAB', value: 1, regCnt: 1},
        {text: this.$t('Signed 16bit integer') + ', 0xAB', value: 2, regCnt: 1},
        {text: this.$t('Unsigned 32bit integer') + ', 0xABCD', value: 3, regCnt: 2},
        {text: this.$t('Unsigned 32bit integer') + ', 0xCDAB', value: 4, regCnt: 2},
        {text: this.$t('Unsigned 32bit integer') + ', 0xBADC', value: 5, regCnt: 2},
        {text: this.$t('Unsigned 32bit integer') + ', 0xDCBA', value: 6, regCnt: 2},
        {text: this.$t('Signed 32bit integer') + ', 0xABCD', value: 7, regCnt: 2},
        {text: this.$t('Signed 32bit integer') + ', 0xCDAB', value: 8, regCnt: 2},
        {text: this.$t('Signed 32bit integer') + ', 0xBADC', value: 9, regCnt: 2},
        {text: this.$t('Signed 32bit integer') + ', 0xDCBA', value: 10, regCnt: 2},
        {text: this.$t('32bit float') + ', 0xABCD', value: 11, regCnt: 2},
        {text: this.$t('32bit float') + ', 0xCDAB', value: 12, regCnt: 2},
        {text: this.$t('32bit float') + ', 0xBADC', value: 13, regCnt: 2},
        {text: this.$t('32bit float') + ', 0xDCBA', value: 14, regCnt: 2},
      ],
      precisionOptions: [
        {text: '0, #', value: 0},
        {text: '1, #.#', value: 1},
        {text: '2, #.##', value: 2},
        {text: '3, #.###', value: 3},
        {text: '4, #.####', value: 4},
        {text: '5, #.#####', value: 5},
        {text: '6, #.######', value: 6},
      ],
      writeStrategyOptions: [
        {text: this.$t('None'), value: 0},
        {text: this.$t('After read'), value: 1},
        {text: this.$t('On new date'), value: 2},
      ],
      dialogAction: "Add",
      dialogActionStr: "",
      dialogCategory: "user",
      dialog3: false,
      dialog3BtnText: this.$t('Cancel'),
      testCountdown: 0,
      hTestCountdownInterval: null,
      testResult: "",
      dialog4: false,
      snackbar: false,
      snackbarColor: "success",
      snackbarIcon: "mdi-check-circle",
      snackbarText: "",
    }
  },
  computed: {
    btnDisabled: function () {
      return (this.menuContext !== 'sensor') || this.ldExport || this.ldImport || this.readLoading
              || this.writeLoading
    },
    showTestAgain: function() {
      return this.dialog3BtnText === this.$t('Close')
    },
    addMeasurementBtnDisabled: function () {
      return Array.isArray(this.measurements) && this.measurements.length >= 16
    }
  },
  watch: {
    tab: function (newVal, oldVal) {
      console.log('tab changed, new:', newVal, ', old:', oldVal)
      if (newVal === 'user') {
        this.tableItems = this.tableItemsUserDefined
      } else {
        this.tableItems = this.tableItemsBuiltin
      }
      this.selectFirstRow()
    }
  },
  methods: {
    snackSucc(text) {
      this.snackbarText = text
      this.snackbarColor = "success"
      this.snackbarIcon = "mdi-check-circle"
      this.snackbar = true
    },
    snackFail(text) {
      this.snackbarText = text
      this.snackbarColor = "error"
      this.snackbarIcon = "mdi-alert-circle"
      this.snackbar = true
    },
    async readProtoVersion() {
      return await ipcRenderer.invoke('binary-cmd-get-proto-version')
    },
    async fetchSensorInfos(addrList) {
      let sensors = []
      let sinfo
      for (const addr of addrList) {
        this.statusText = this.$t('Fetching sensor') + ` ${addr} ...`
        sinfo = await ipcRenderer.invoke('binary-cmd-get-sensor-info', parseInt(addr))
        sinfo['enabled'] = false
        sensors.push(sinfo)
      }
      return sensors
    },
    readFn() {
      this.statusText = this.$t("Reading protocol version ...")
      this.readLoading = true
      this.readProtoVersion().then((protoVersion) => {
        console.log('got protoVersion:', protoVersion)
        if (this.storageSchemaVersion > parseInt(protoVersion)) {
          this.overlayText = this.$t('error: proto version too new')
          this.overlay = true
          throw new Error('')
        } else if (this.storageSchemaVersion < parseInt(protoVersion)) {
          this.overlayText = this.$t('error: proto version too old')
          this.overlay = true
          throw new Error('')
        } else {
          this.statusText = this.$t('Reading sensor configuration version ...')
          return ipcRenderer.invoke('binary-cmd-get-sinfo-version', 0)  //builtin sinfo version
        }
      }).then((result) => {
        this.sinfoVerBuiltin = parseInt(result)
        this.statusText = this.$t('Builtin sensor cfg version is') + ` ${this.sinfoVerBuiltin}`
        return ipcRenderer.invoke('binary-cmd-get-sinfo-version', 1)  //user
      }).then((result) => {
        this.sinfoVerUser = parseInt(result)
        this.statusText = this.$t('User defined sensor cfg version is') + ` ${this.sinfoVerUser}`
        return ipcRenderer.invoke('binary-cmd-get-sensor-addr-list', 0)  //builtin sensor list
      }).then((result) => {
        console.log('builtin sensor addr list:', result)
        this.statusText = this.$t('Builtin sensor count is') + ` ${result.length}`
        return this.fetchSensorInfos(result)
      }).then((result) => {
        console.log('builtin sensor infos:', result)
        this.tableItemsBuiltin = JSON.parse(JSON.stringify(result))
        return ipcRenderer.invoke('binary-cmd-get-sensor-addr-list', 1)  //user
      }).then((result) => {
        console.log('user defined sensor addr list:', result)
        this.statusText = this.$t('User defined sensor count is') + ` ${result.length}`
        return this.fetchSensorInfos(result)
      }).then((result) => {
        console.log('user defined sensor infos:', result)
        this.tableItemsUserDefined = JSON.parse(JSON.stringify(result))
        if (this.tab === 'user') {
          this.tableItems = this.tableItemsUserDefined
        } else {
          this.tableItems = this.tableItemsBuiltin
        }
        this.selectFirstRow()
        if (this.tableItemsBuiltin.length > 0) {
          return ipcRenderer.invoke('binary-cmd-get-sensor-enable-list', 0)  //builtin enable list
        } else return []
      }).then((result) => {
        console.log('builtin sensor enable list:', result)
        this.statusText = this.$t('Builtin sensor enabled:') + ` ${result.length}`
        for (const item of this.tableItemsBuiltin) {
          const mbAddr = parseInt(item['mbAddr'])
          if (result.includes(mbAddr)) {
            item['enabled'] = true
          }
        }
        if (result.length) this.handleCheckOneBuiltinChange(true)
        if (this.tableItemsUserDefined.length > 0) {
          return ipcRenderer.invoke('binary-cmd-get-sensor-enable-list', 1)  //user enable list
        } else return []
      }).then((result) => {
        console.log('user defined sensor enable list:', result)
        this.statusText = this.$t('User defined sensor enabled:') + ` ${result.length}`
        for (const item of this.tableItemsUserDefined) {
          const mbAddr = parseInt(item['mbAddr'])
          if (result.includes(mbAddr)) {
            item['enabled'] = true
          }
        }
        if (result.length) this.handleCheckOneUserDefinedChange(true)

        return ipcRenderer.invoke('binary-cmd-get-enable-all-builtin')  //builtin enableAll
      }).then((result) => {
        console.log('enableAllByDefault:', result)
        this.enableAllByDefault = parseInt(result) === 1
      }).then(() => {
        this.statusText = this.$t("Read done, configuration versions: user defined=") + `${this.sinfoVerUser}, `
                          + this.$t("builtin=") + `${this.sinfoVerBuiltin}`
      }).catch((error) => {
        console.log(error)
        let errorMsg = error.message
        if (errorMsg && typeof errorMsg === "string") {
          this.statusText = this.$t(errorMsg.replace(/Error invoking remote method.*?:\s/ig, ''))
        }
      }).finally(() => {
        this.readLoading = false
      })
    },
    checkSensorInfos(sinfos) {
      if (Array.isArray(sinfos)) {
        for (const sinfo of sinfos) {
          if (sinfo['measurements'].length === 0) {
            this.statusText = this.$t('At least one measurement should be added, sensor modbus address: ') + sinfo['mbAddr']
            return false
          } else if (sinfo['measurements'].length > 16) {
            this.statusText = this.$t('At most 16 measurements can be added, sensor modbus address: ') + sinfo['mbAddr']
            return false
          }
        }
        return true
      } else return false
    },
    async sendSensorInfos(sinfos) {
      let addrList = []
      for (const sinfo of sinfos) {
        this.statusText = this.$t('Writing sensor') + ` ${sinfo['mbAddr']} ...`
        if (sinfo['enabled']) {
          addrList.push(parseInt(sinfo['mbAddr']))
        }
        await ipcRenderer.invoke('binary-cmd-update-sensor-info', sinfo)
      }

      let who = 0
      if (sinfos === this.tableItemsUserDefined) who = 1
      await ipcRenderer.invoke('binary-cmd-update-sensor-enable-list', who, addrList)
    },
    writeFn() {
      if (!this.checkSensorInfos(this.tableItemsUserDefined)) {
        this.snackFail(this.$t('Invalid measurement configurations.'))
        return false
      }
      this.statusText = this.$t("Reading protocol version ...")
      this.writeLoading = true
      this.readProtoVersion().then((protoVersion) => {
        console.log('got protoVersion:', protoVersion)
        if (this.storageSchemaVersion > parseInt(protoVersion)) {
          this.overlayText = this.$t('error: proto version too new')
          this.overlay = true
          throw new Error('')
        } else if (this.storageSchemaVersion < parseInt(protoVersion)) {
          this.overlayText = this.$t('error: proto version too old')
          this.overlay = true
          throw new Error('')
        } else {
          //prepare the data
          if (this.tableItemsBuiltin.length === 0) {
            this.statusText = this.$t('No builtin sensors, seems a faulty configuration')
            throw new Error('')
          }
          this.sinfoVerUser = parseInt(this.sinfoVerUser) + 1
          if (this.sinfoVerUser > 10000) this.sinfoVerUser = 1

          this.statusText = this.$t('Initializing the writing of builtin sensor configuration ...')
          return ipcRenderer.invoke('binary-cmd-start-update', 0)  //builtin sinfo version
        }
      }).then(() => {
        return this.sendSensorInfos(this.tableItemsBuiltin)
      }).then(() => {
        this.statusText = this.$t('Finishing the writing of builtin sensor configuration ...')
        let enableAll = this.enableAllByDefault ? 1 : 0
        return ipcRenderer.invoke('binary-cmd-end-update', 0, parseInt(this.sinfoVerBuiltin), enableAll)
      }).then(() => {
        this.statusText = this.$t('Initializing the writing of user defined sensor configuration ...')
        return ipcRenderer.invoke('binary-cmd-start-update', 1)  //user defined sinfo version
      }).then(() => {
        return this.sendSensorInfos(this.tableItemsUserDefined)
      }).then(() => {
        this.statusText = this.$t('Finishing the writing of user defined sensor configuration ...')
        return ipcRenderer.invoke('binary-cmd-end-update', 1, parseInt(this.sinfoVerUser), 0)
      }).then(() => {
        this.statusText = this.$t('The sensor configurations are written successfully.')
      }).catch((error) => {
        console.log(error)
        let errorMsg = error.message
        if (errorMsg && typeof errorMsg === "string") {
          this.statusText = errorMsg.replace(/Error invoking remote method.*?:\s/ig, '')
        }
      }).finally(() => {
        this.writeLoading = false
      })
    },

    //user defined
    handleCheckAllUserDefinedChange(val) {
      // console.log('handleCheckAllUserDefinedChange:', val)
      this.indeterminateUserDefined = false
      for (const item of this.tableItemsUserDefined) {
        item.enabled = val
      }
    },
    handleCheckOneUserDefinedChange(val) {
      // console.log('handleCheckOneUserDefinedChange:', val)
      let totalCnt = this.tableItemsUserDefined.length
      let enabledCnt = 0
      for (const item of this.tableItemsUserDefined) {
        if (item.enabled === val) enabledCnt++
      }
      // console.log('totalCnt', totalCnt, 'enabledCnt', enabledCnt)
      this.enableAllUserDefined = totalCnt === enabledCnt ? val : !val
      this.indeterminateUserDefined = enabledCnt > 0 && enabledCnt < totalCnt
    },
    userDefinedSelectionChange(val) {
      console.log('user defined sensors selection changed:', val)
      this.selectedUserDefinedSensors = val
    },
    userDefinedRowDbClick(row, column, event) {
      this.dgSensor = JSON.parse(JSON.stringify(row))
      this.dgSensor['sensorTypeId'] = Number(this.dgSensor['sensorTypeId']).toString(16).toUpperCase()
      let powerVoltage = row['powerSchema'] & 0x3
      let powerTime = row['powerSchema'] & 0x4
      this.dgSensor['powerVoltage'] = powerVoltage
      this.dgSensor['powerTime'] = powerTime > 0 ? 1 : 0

      this.openSensorDialog('Modify')
    },
    userDefinedMeasSelectionChange(val) {
      console.log('user defined measurements selection changed:', val)
      this.selectedUserDefinedMeasurements = val
    },
    userDefinedMeasRowDbClick(row, column, event) {
      this.dgMeas = JSON.parse(JSON.stringify(row))
      this.openMeasurementDialog('Modify')
    },

    //builtin
    handleCheckAllBuiltinChange(val) {
      // console.log('handleCheckAllUserDefinedChange:', val)
      this.indeterminateBuiltin = false
      for (const item of this.tableItemsBuiltin) {
        item.enabled = val
      }
    },
    handleCheckOneBuiltinChange(val) {
      // console.log('handleCheckOneUserDefinedChange:', val)
      let totalCnt = this.tableItemsBuiltin.length
      let enabledCnt = 0
      for (const item of this.tableItemsBuiltin) {
        if (item.enabled === val) enabledCnt++
      }
      // console.log('totalCnt', totalCnt, 'enabledCnt', enabledCnt)
      this.enableAllBuiltin = totalCnt === enabledCnt ? val : !val
      this.indeterminateBuiltin = enabledCnt > 0 && enabledCnt < totalCnt
    },



    //common
    selectFirstRow() {
      if (this.tableItems.length > 0) {
        this.sensorsRowClick(this.tableItems[0], null, null)
      } else {
        this.measurements = []
      }
    },
    sensorsRowClick(row, column, event) {
      this.measEditingMbAddr = parseInt(row['mbAddr'])
      if (this.tab === 'user') {
        this.$refs['tbUserDefined'].setCurrentRow(row)
      } else {
        this.$refs['tbBuiltin'].setCurrentRow(row)
      }
      this.loadMeasurements()
    },
    openSensorDialog(action) {
      this.dialogAction = action
      this.dialogActionStr = this.$t(action)
      this.dialog = true
    },
    openMeasurementDialog(action) {
      if (this.measEditingMbAddr === null) return false
      this.dialogAction = action
      this.dialogActionStr = this.$t(action)
      this.dialog2 = true
    },
    formatSensorTypeId(row, column, cellValue, index) {
      return '0x' + Number(cellValue).toString(16).toUpperCase()
    },
    formatPowerSchema(row, column, cellValue, index) {
      let powerSchema = parseInt(cellValue)
      let powerSchemaStr
      if (powerSchema & 0x4) {
        powerSchemaStr = this.$t('Always-On')
      } else {
        powerSchemaStr = this.$t('Periodic')
      }
      if ((powerSchema & 0x3) === 1) {
        powerSchemaStr += ' 5V'
      } else {
        powerSchemaStr += ' 12V'
      }
      return powerSchemaStr
    },
    addSensor() {
      console.log(`${this.dialogAction} a ${this.dialogCategory} sensor`)
      if (!this.$refs.form1.validate()) return false
      let origItem
      let foundCnt = 0
      for (const tableItem of this.tableItems) {
        if (parseInt(this.dgSensor['mbAddr']) === tableItem['mbAddr']) {
          foundCnt += 1
          origItem = tableItem
        }
      }
      if (this.dialogAction === 'Add' && foundCnt >= 1) {
        this.mbAddrErrorMsg = this.$t('This address has been used.')
        return false
      }

      //build the item
      let measCnt = 0
      let measurements = []
      if (origItem) {
        measCnt = origItem['measCnt']
        measurements = origItem['measurements']
      }
      let powerSchema = parseInt(this.dgSensor['powerVoltage'])
      if (parseInt(this.dgSensor['powerTime']) === 1) {
        powerSchema += 4
      }
      let enabled = true
      if (origItem) enabled = origItem['enabled']
      let item = {
        mbAddr: parseInt(this.dgSensor['mbAddr']),
        storageSchemaVersion: this.storageSchemaVersion,
        measCnt: measCnt,
        powerSchema: powerSchema,
        sensorTypeId: parseInt(this.dgSensor['sensorTypeId'], 16),
        measDelay: parseInt(this.dgSensor['measDelay']),
        respTimeout: parseInt(this.dgSensor['respTimeout']),
        startupTime: parseInt(this.dgSensor['startupTime']),
        measurements: measurements,
        enabled: enabled
      }

      if (origItem) {
        let origItemIndex = this.tableItems.indexOf(origItem)
        this.tableItems.splice(origItemIndex, 1, item)
      } else {
        this.tableItems.push(item)
      }

      this.sensorsRowClick(item, null, null)

      if (this.tab === 'user') this.handleCheckOneUserDefinedChange(true)
      this.dialog = false
    },
    deleteSensor() {
      let selection
      if (this.tab === 'user') {
        selection = this.selectedUserDefinedSensors
      } else {
        selection = []
      }
      let shouldRefreshMeas = false
      for (const item of selection) {
        console.log('going to delete sensor: mbaddr ', item['mbAddr'])
        let index = this.tableItems.indexOf(item)
        if (index > -1) {
          this.tableItems.splice(index, 1)
        }
        //if measurements are shown, clear measurements
        if (parseInt(item['mbAddr']) === parseInt(this.measEditingMbAddr)) {
          shouldRefreshMeas = true
        }
      }
      if (shouldRefreshMeas) {
        this.selectFirstRow()
      }
    },
    loadMeasurements() {
      console.log('load measurements for mbAddr:', this.measEditingMbAddr)
      let origItem
      for (const tableItem of this.tableItems) {
        if (this.measEditingMbAddr === tableItem['mbAddr']) {
          origItem = tableItem
        }
      }
      let _measurements = []
      if (origItem) _measurements = origItem['measurements']

      this.measurements = _measurements
    },
    formatDataType(row, column, cellValue, index) {
      let dataType = parseInt(cellValue)
      for (const dataTypeOption of this.dataTypeOptions) {
        if (parseInt(dataTypeOption['value']) === dataType) {
          return dataTypeOption['text']
        }
      }
      return this.$t('Unknown data type')
    },
    formatFloat(row, column, cellValue, index) {
      //the max precision of a single-precision float
      let s = parseFloat(cellValue).toPrecision(7)
      //remove the trailing '0'
      if (s.includes('.')) {
        while (s.endsWith('0')) {
          s = s.slice(0, -1)
        }
        if (s.endsWith('.')) s += '0'
      }
      return s
    },
    addMeasurement() {
      console.log(`${this.dialogAction} a ${this.dialogCategory} measurement`)
      if (!this.$refs.form2.validate()) return false

      //check if measId duplicated
      let foundCnt = 0
      let origMeas
      for (const measurement of this.measurements) {
        if (parseInt(measurement['measId']) === parseInt(this.dgMeas['measId'])) {
          origMeas = measurement
          foundCnt += 1
          break
        }
      }
      if (this.dialogAction === 'Add' && foundCnt >= 1) {
        this.measIdErrorMsg = this.$t('This measurement ID has been used.')
        return false
      }

      let dataType = this.dgMeas['dataType']
      let regCnt = 0
      for (const dataTypeOption of this.dataTypeOptions) {
        if (dataTypeOption['value'] === dataType) {
          regCnt = parseInt(dataTypeOption['regCnt'])
          break
        }
      }
      this.dgMeas['readRegCnt'] = regCnt
      this.dgMeas['measId'] = parseInt(this.dgMeas['measId'])

      if (this.dialogAction === 'Add') {
        this.measurements.push(JSON.parse(JSON.stringify(this.dgMeas)))

        for (const tableItem of this.tableItems) {
          if (this.measEditingMbAddr === tableItem['mbAddr']) {
            // tableItem['measurements'] = this.measurements
            tableItem['measCnt'] = this.measurements.length
          }
        }
      } else {
        if (origMeas) {
          let index = this.measurements.indexOf(origMeas)
          this.measurements.splice(index, 1, JSON.parse(JSON.stringify(this.dgMeas)))
        }
      }

      this.dialog2 = false
    },
    deleteMeasurement() {
      let selection
      if (this.tab === 'user') {
        selection = this.selectedUserDefinedMeasurements
      } else {
        selection = []
      }
      for (const item of selection) {
        console.log('going to delete measurement: measId ', item['measId'])
        let index = this.measurements.indexOf(item)
        if (index > -1) {
          this.measurements.splice(index, 1)
        }
      }
      //update the measurements to sensor row
      for (const tableItem of this.tableItems) {
        if (this.measEditingMbAddr === tableItem['mbAddr']) {
          // tableItem['measurements'] = this.measurements
          tableItem['measCnt'] = this.measurements.length
        }
      }
    },
    async countdownTestTime(timeSec) {
      this.testCountdown = timeSec
      while(this.testCountdown > 0) {
        await delayMs(1000)
        this.testCountdown--
      }
    },
    async doTest(sinfo) {
      this.testResult = ""
      let measDelay = parseInt(sinfo['measDelay'])
      let startupTime = parseInt(sinfo['startupTime'])
      let respTime = parseInt(sinfo['respTimeout'])
      let measCnt = parseInt(sinfo['measCnt'])
      let maxTimeMs = 3 * startupTime * 100 + Math.max(measDelay * 1000, startupTime * 100)
        + measCnt * 3 * respTime * 100 + 1500
      let maxTimeSec = Math.ceil(maxTimeMs / 1000)

      this.countdownTestTime(maxTimeSec)

      await ipcRenderer.invoke('binary-cmd-test-sensor-info', sinfo)
      try {
        this.testResult = await ipcRenderer.invoke('binary-cmd-get-log-print', maxTimeMs)
      } catch (e) {
        console.warn(e)
        this.testResult = "Test failed with unknown reason..."
      } finally {
        this.testCountdown = 0
      }
      this.dialog3BtnText = this.$t('Close')
    },
    testMeasurement(row) {
      if (this.testCountdown > 0) {
        this.snackFail(this.$t('The last test job will still run for') + ` ${this.testCountdown} ` + this.$t('seconds'))
        return false
      }

      this.dialog3BtnText = this.$t('Cancel')

      if (row) {
        this.testingAddr = parseInt(row['mbAddr'])
      }
      let sinfo
      for (const tableItem of this.tableItems) {
        if (this.testingAddr === parseInt(tableItem['mbAddr'])) {
          sinfo = tableItem
          break
        }
      }

      if (sinfo) {
        if (sinfo['measurements'].length === 0) {
          this.snackFail(this.$t('At least one measurement should be added'))
          return false
        }
        this.doTest(sinfo)
      }
      else {
        this.testResult = this.$t('modbus address not found')
        this.dialog3BtnText = this.$t('Close')
      }

      this.dialog3 = true
    },
    cancelTestMeasurement() {
      if (this.dialog3BtnText === this.$t('Cancel')) {
        this.dialog4 = true
      } else {
        // do test again
        this.dialog3 = false
      }
    },
    importFn() {
      this.ldImport = true
      ipcRenderer.invoke('load-from-file').then((result) => {
        if (result === 'canceled') return
        let cfgJson = JSON.parse(result)
        if ('builtin' in cfgJson && 'userDefined' in cfgJson && 'sinfoVerBuiltin' in cfgJson
            && 'sinfoVerUser' in cfgJson) {
          this.enableAllByDefault = cfgJson['enableAllByDefault'] || true
          this.tableItemsBuiltin = cfgJson['builtin']
          this.tableItemsUserDefined = cfgJson['userDefined']
          this.sinfoVerBuiltin = cfgJson['sinfoVerBuiltin']
          this.sinfoVerUser = cfgJson['sinfoVerUser']

          this.statusText = this.$t('Imported from file successfully.')

          if (this.tableItemsBuiltin.length) this.handleCheckOneBuiltinChange(true)
          if (this.tableItemsUserDefined.length) this.handleCheckOneUserDefinedChange(true)

          if (this.tab === 'user') {
            this.tableItems = this.tableItemsUserDefined
          } else {
            this.tableItems = this.tableItemsBuiltin
          }
          this.selectFirstRow()
        }
      }).catch((error) => {
        console.log(error)
        let errorMsg = error.message
        if (errorMsg && typeof errorMsg === "string") {
          this.statusText = this.$t(errorMsg.replace(/Error invoking remote method.*?:\s/ig, ''))
        }
      }).finally(() => {
        this.ldImport = false
      })
    },
    exportFn() {
      if (this.tableItemsUserDefined.length === 0 && this.tableItemsBuiltin.length === 0) {
        this.statusText = this.$t('Please read from device first')
        return false
      }

      let builtinEnabled = []
      for (const item of this.tableItemsBuiltin) {
        if ('enabled' in item && item['enabled']) {
          builtinEnabled.push(parseInt(item['mbAddr']))
        }
      }

      //build the JSON content
      const d = new Date()
      const dateStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
      let configProfileJson = {
        enableAllByDefault: this.enableAllByDefault,
        builtin: this.tableItemsBuiltin,
        userDefined: this.tableItemsUserDefined,
        sinfoVerBuiltin: this.sinfoVerBuiltin,
        sinfoVerUser: this.sinfoVerUser,
        dateTime: dateStr
      }

      this.ldExport = true
      ipcRenderer.invoke('save-to-file', configProfileJson).then((result) => {
        if (result === 'canceled') return
        this.statusText = this.$t('Exported to file successfully.')
      }).catch((error) => {
        console.log('save to file error:', error)
        this.statusText = this.$t('Failed in exporting to file.')
      }).finally(() => {
        this.ldExport = false
      })
    }
  },
  created() {
    //locale
    console.log(`locale when created: ${this.$root.$i18n.locale}`)

    this.tableItems = this.tableItemsUserDefined
    this.measEditingMbAddr = null
  },
  mounted() {
    //locale
    ipcRenderer.on('locale-change', (event, arg) => {
      console.log(`locale changed to:`, arg)
      this.$root.$i18n.locale = arg
    })
    //menu context
    ipcRenderer.on('menu-context', (event, arg) => {
      this.menuContext = arg
    })

  },
  beforeDestroy() {
    ipcRenderer.removeAllListeners()
  }

}
</script>

