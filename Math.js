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
    return str(vec(a) + vec(b))
  }
  
  vec(v) {
   return v.split(" ") 
  }
  
  str(v) {
   return v.join(" ") 
  }
}

Scratch.extensions.register(new DeviceInfo());
