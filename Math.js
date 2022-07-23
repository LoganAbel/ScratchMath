const vec = v => v.split(' ').map(v=>+v)
const str = v => v.join(' ')

const arg = type => defaultValue => ({
  type,
  defaultValue
})
const str_arg = arg("string")
const num_arg = arg("number")

const block = blockType => (opcode, text, arguments) => ({
  blockType,
  opcode,
  text,
  arguments
})
const reporter = block("reporter")

class Math {
  constructor() {
  }

  getInfo() {
    return {
      id: "math",
      name: "Math",
      blocks: [
        reporter("Add", "[a] + [b]", {
          a: str_arg("1 2"),
          b: str_arg("3 4")
        }),
        reporter("Vec2", "vector [x] [y]", {
          x: num_arg("1"),
          y: num_arg("2")
        }),
        reporter("Vec3", "vector [x] [y] [z]", {
          x: num_arg("1"),
          y: num_arg("2"),
          z: num_arg("3")
        }),
        reporter("GetX", "[v]. x", {
          v: str_arg("1 2 3")
        }),
        reporter("GetY", "[v]. y", {
          v: str_arg("1 2 3")
        }),
        reporter("GetZ", "[v]. z", {
          v: str_arg("1 2 3")
        }),
      ]
    }
  }

  Add({a, b}) {
    [a, b] = [vec(a), vec(b)]
    return str(a.map((_,i) => a[i] + b[i]))
  }
  
  Vec2({x, y}) {
     return str([x, y])
  }
  
  Vec3({x, y, z}) {
     return str([x, y, z])
  }
  
  GetX({v}) {
    return vec(v)[0]
  }
  
  GetY({v}) {
    return vec(v)[1]
  }
  
  GetY({v}) {
    return vec(v)[2]
  }
}

Scratch.extensions.register(new Math());
