// I dont have access to javascript's math library, because that is stored in window

const sqrt = n => {
  let x = 1
  for(let i = 1; i < 100; i++) {
    x -= (x * x - n) / (2 * x)
  }
  return x
}

const pi = 3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148
const sin = a => {
  a = (a % 360) * pi / 180;
  let x = 0;
  let p = a;
  for(let i = 0; i < 20; i++) {
  	x += p;
    p *= - a * a / (2 * i + 2) / (2 * i + 3);
  }
  return x;
}

// ============== linear algebra ============== 

const from_s = s => (''+s).split(' ').map(s=> s.split(',').map(v=> isNaN(+v) ? 0 : +v))
const to_s = m => m.map(v=> v.join(',')).join(' ')

const safe_index = (m,i) => m[m.length == 1 ? 0 : i]

const component_wise = f => (a,b) => {
	let [m,n] = a.length > b.length ? [a,b] : [b,a]
	return m.map((v,i)=>  safe_index(n,i) == undefined ? v : f(safe_index(a,i), safe_index(b,i)))
}
const component_wise2D = f => (a,b) => component_wise(component_wise(f))(a,b)
const add = component_wise((a,b)=>a+b)
const mul = component_wise((a,b)=>a*b)
const add2D = component_wise2D((a,b)=>a+b)
const sub2D = component_wise2D((a,b)=>a-b)
const mul2D = component_wise2D((a,b)=>a*b)
const div2D = component_wise2D((a,b)=>a/b)

const set = (i,m,v) => {
	if(m.length == 1) {
		if(m[0][i-1] != undefined)
			m[0][i-1] = v[0][0]
	}
	else {
		m[i-1] = v[0]
	}
	return m
}
const get = (i,m) => [ m.length == 1 ? ( [m[0][i-1]] ?? [] ) : ( m[i-1] ?? [] ) ]

const dot = (a,b) => {
	if(a.length == 1 && a[0].length == 3)
		a = a[0].map(v=>[v])
	return b.map(bv=> a.reduce((acc,av,i)=> add(acc,mul(av,[safe_index(bv,i)])), 0))
}

const det = (m,i1,i2) => m[0][i1%3]*m[1][i2%3]-m[0][i2%3]*m[1][i1%3]
const cross = component_wise((a,b)=> a.map((_,i)=>det([a,b], i+1, i+2)))

const length = m => m.map(v=> dot([v],[v]).map(v=> sqrt(v)))
const normalize = m => div2D(m,length(m))

const rotate = (a,v) => {
	a = a[0][0]
	const s = sin(a)
	const c = sin(90 + a)
	v = normalize(v)[0]

	const f1 = i => c + v[i] * v[i] * (1-c)
	const f2 = (i, n) => v[(i+1)%3] * v[(i+2)%3] * (1-c) + n * v[i] * s

	return [
		[f1(0), f2(1,-1), f2(2,1)],
		[f2(0,1), f1(1), f2(2,-1)],
		[f2(0,-1), f2(1,1), f1(2)]
	]
}

// =================== Scratch extension =================== 

// auto arguments is a little over complicated to deduce argument count

const letter = i => String.fromCharCode(97+i)

const auto_reporter = (opcode, text, args) => ({
	blockType: 'reporter',
	opcode,
	text,
	arguments: Object.fromEntries(
		new Array(text.split('[').length-1).fill().map((_,i)=> [
			letter(i), {
				type: (args && args[i]) || "number", 
				defaultValue: " "
			}
		])
	)
})
const mat_reporter_f = f => o => to_s(f(...new Array(Object.entries(o).length).fill().map((_,i)=> from_s(o[letter(i)]))))

class Math {

	getInfo() {
    return {
    	id: "math",
    	name: "Math",
    	blocks: [
        auto_reporter("Vec", "vector [a] [b] [c]"),
        auto_reporter("Arr", "list [a] [b]"),
        auto_reporter("Get", "item [a] of [b]"),
        auto_reporter("Set", "with item [a] of [b] = [c]"),
        auto_reporter("Rot", "rotate [a] around [b]", ["angle"]),

        '---',

        auto_reporter("Add", '[a] + [b]'),
        auto_reporter("Sub", '[a] - [b]'),
        auto_reporter("Mul", '[a] * [b]'),
        auto_reporter("Div", '[a] / [b]'),
        auto_reporter("Dot", '[a] dot [b]'),
      	auto_reporter("Cross", '[a] cross [b]'),
      	auto_reporter("Len", 'length of [a]'),
      	auto_reporter("Norm",'normalize [a]'),
    	]
    }
	}

	Vec({a,b,c}) {
		return to_s([[a,b,c]])
	}

	Get   = mat_reporter_f(get)
	Set   = mat_reporter_f(set)
	Arr   = mat_reporter_f((a,b) => [...a, ...b])
	Rot   = mat_reporter_f(rotate)
	Add   = mat_reporter_f(add2D)
	Sub   = mat_reporter_f(sub2D)
	Mul   = mat_reporter_f(mul2D)
	Div   = mat_reporter_f(div2D)
	Dot   = mat_reporter_f(dot)
	Cross = mat_reporter_f(cross)
	Len   = mat_reporter_f(length)
	Norm  = mat_reporter_f(normalize)
}


Scratch.extensions.register(new Math());
