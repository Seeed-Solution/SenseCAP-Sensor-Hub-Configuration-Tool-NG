

const { Transform } = require('stream')
const { crc16ccitt, crc16kermit } = require('crc')

/**
 * listen to event 'data', arg is
 * +-----------------------------------------------+
 * | cmd (1byte) | len (2bytes) | data (len bytes) |
 * +-----------------------------------------------+
 */

class BinaryParser extends Transform {
  constructor (bufLen = 1024, logFunc = console.log) {
    super()
    this.bufferLen = bufLen
    this.logFunc = logFunc
    this.header = Buffer.from([0xAA, 0x55])
    this.buffer = Buffer.alloc(0)
    this.crcErrorCnt = 0
    this.doFilter = true
  }

  _transform(chunk, encoding, cb) {
    if (!this.doFilter) {
      cb()
      return
    }

    this.logFunc(`chunk:`, chunk.toString('hex'))

    //concat the incoming chunk first
    this.buffer = Buffer.concat([this.buffer, chunk])

    //search a frame then
    let start = this.buffer.indexOf(this.header)
    if (start < 0 && this.buffer.length > 2) {
      //no header found, drop all the buffer
      this.buffer = Buffer.alloc(0)
      cb()
      return
    }
    //header found, cut off the invalid bytes before header
    this.buffer = this.buffer.slice(start)  //now the beginning is header

    do {
      //wait at least a shortest frame
      if (this.buffer.length < 7) break

      let len = this.buffer.readUInt16LE(3)
      if (this.buffer.length < (7 + len)) break

      const crcInFrame = this.buffer.readUInt16LE(7 + len - 2)
      const crc = crc16kermit(this.buffer.slice(0, 7 + len - 2))

      if (crc === crcInFrame) {
        this.push(this.buffer.slice(2, 7 + len - 2))
      } else {
        this.emit('crc-error')
        this.logFunc(`crc not match, crc: ${crc}, crcInFrame: ${crcInFrame}`)
        this.incCrcError()
      }

      //cut the processed frame off anyway
      this.buffer = this.buffer.slice(7 + len)

    } while (this.buffer.length > 0)

    cb()
  }

  incCrcError() {
    this.crcErrorCnt++
    if (this.crcErrorCnt % 10 == 0) {
      this.logFunc('crc error count:', this.crcErrorCnt)
    }
  }

  turnOn() {
    this.doFilter = true
  }

  turnOff() {
    this.doFilter = false
  }
}

exports.BinaryParser = BinaryParser