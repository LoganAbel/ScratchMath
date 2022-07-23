const vec = v => v.split(' ')
const str = v => v.join(' ')

class DeviceInfo {
  constructor() {
  }

  getInfo() {
    return {
      "id": "deviceInfo",
      "name": "Device Info",
      "blocks": [
        {
          opcode: "Add",
          blockType: "reporter",
          text: "[a] + [b]",
          arguments: {
            a: {
              type: "string",
              defaultValue: "1 2"
            },
            b: {
              type: "string",
              defaultValue: "2 3"
            }
          }
        },
      ]
    }
  }

  Add({a, b}) {
    return a
    //[a, b] = [vec(a), vec(b)]
    //return str([a[0]+b[0], a[1]+b[1]])
  }
}

Scratch.extensions.register(new DeviceInfo());
