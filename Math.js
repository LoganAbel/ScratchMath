class DeviceInfo {
  constructor() {
  }

  getInfo() {
    return {
      "id": "deviceInfo",
      "name": "Device Info",
      "blocks": [
        {
          "opcode": "deviceBattery",
          "blockType": "reporter",
          "text": "device battery",
          "arguments": {}
        },
        {
          "opcode": "screenWidth",
          "blockType": "reporter",
          "text": "screen width",
          "arguments": {}
        },
        {
          "opcode": "screenHeight",
          "blockType": "reporter",
          "text": "screen height",
          "arguments": {}
        },
        {
          "opcode": "screenOrientation",
          "blockType": "reporter",
          "text": "screen orientation",
          "arguments": {}
        },
        {
          "opcode": "platform",
          "blockType": "reporter",
          "text": "platform",
          "arguments": {}
        }
      ]
    }
  }

  deviceBattery() {
    try {
      return navigator.getBattery().then((battery) => {
        return battery.level * 100;
      });
    } catch {
      return "undefined";
    }
  }

  screenWidth() {
    return screen.width;
  }

  screenHeight() {
    return screen.height;
  }

  screenOrientation() {
    try {
      return screen.orientation.type;
    } catch {
      return "undefined";
    }
  }

  platform() {
    try {
      return navigator.platform;
    } catch {
      return "undefined";
    }
  }
}

Scratch.extensions.register(new DeviceInfo());
