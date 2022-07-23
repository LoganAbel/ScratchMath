const vec = v => v.split(' ').map(v=>+v)
const str = v => v.join(' ')
const vec_args = n => Object.fromEntries(
  new Array(n).fill().map((_,i) => [
    String.fromCharCode(97 + i), 
    { 
      type: "string", 
      defaultValue: str([i*2+1, i*2+2]) 
    }
  ])
)

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
          text: "[a] + [b]",
          blockType: "reporter",
          arguments: vec_args(2)
        },
      ]
    }
  }

  Add({a, b}) {
    [a, b] = [vec(a), vec(b)]
    return str([a[0]+b[0], a[1]+b[1]])
  }
}

Scratch.extensions.register(new DeviceInfo());
