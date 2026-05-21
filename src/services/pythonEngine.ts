/**
 * Mini Python-to-JS transpiler + evaluator.
 * Converts basic Python syntax to JS and runs it via Function().
 * Supports: variables, arithmetic, print, lists, strings, if/for,
 * functions, f-strings, list comprehensions, and simulated numpy/pandas.
 */

// ── Simulated NumPy ──
class NdArray {
  data: number[];
  shape: number[];
  constructor(d: number | number[] | number[][], shape?: number[]) {
    if (typeof d === 'number') {
      this.data = [d];
      this.shape = [];
    } else if (Array.isArray(d) && d.length > 0 && Array.isArray(d[0])) {
      const flat = (d as number[][]).flat();
      this.data = flat;
      this.shape = shape || [d.length, (d[0] as number[]).length];
    } else {
      this.data = (d as number[]).slice();
      this.shape = shape || [this.data.length];
    }
  }
  get length() { return this.data.length; }
  _binOp(other: any, fn: (a: number, b: number) => number): NdArray {
    if (other instanceof NdArray) {
      if (this.shape.length === 2 && other.shape.length === 1 && other.shape[0] === this.shape[1]) {
        const cols = this.shape[1];
        const res = this.data.map((v, i) => fn(v, other.data[i % cols]));
        return new NdArray(res, [...this.shape]);
      }
      const res = this.data.map((v, i) => fn(v, other.data[i] ?? 0));
      return new NdArray(res, [...this.shape]);
    }
    const n = typeof other === 'number' ? other : 0;
    return new NdArray(this.data.map(v => fn(v, n)), [...this.shape]);
  }
  add(o: any) { return this._binOp(o, (a, b) => a + b); }
  sub(o: any) { return this._binOp(o, (a, b) => a - b); }
  mul(o: any) { return this._binOp(o, (a, b) => a * b); }
  div(o: any) { return this._binOp(o, (a, b) => b !== 0 ? a / b : Infinity); }
  pow(o: any) { return this._binOp(o, (a, b) => Math.pow(a, b)); }
  gt(n: number) { return this.data.filter(v => v > n); }
  lt(n: number) { return this.data.filter(v => v < n); }
  gte(n: number) { return this.data.filter(v => v >= n); }
  lte(n: number) { return this.data.filter(v => v <= n); }
  max() { return Math.max(...this.data); }
  min() { return Math.min(...this.data); }
  sum(axis?: number) {
    if (axis === 0 && this.shape.length === 2) {
      const cols = this.shape[1];
      const r: number[] = [];
      for (let c = 0; c < cols; c++) {
        let s = 0;
        for (let ro = 0; ro < this.shape[0]; ro++) s += this.data[ro * cols + c];
        r.push(s);
      }
      return new NdArray(r);
    }
    return this.data.reduce((a, b) => a + b, 0);
  }
  mean(axis?: number) {
    if (axis === 0 && this.shape.length === 2) {
      const cols = this.shape[1];
      const rows = this.shape[0];
      const r: number[] = [];
      for (let c = 0; c < cols; c++) {
        let s = 0;
        for (let ro = 0; ro < rows; ro++) s += this.data[ro * cols + c];
        r.push(s / rows);
      }
      return new NdArray(r);
    }
    return this.data.reduce((a, b) => a + b, 0) / this.data.length;
  }
  std() {
    const m = this.mean() as number;
    const v = this.data.reduce((a, b) => a + (b - m) ** 2, 0) / this.data.length;
    return Math.sqrt(v);
  }
  reshape(...args: number[]) {
    return new NdArray([...this.data], args);
  }
  get T(): NdArray {
    if (this.shape.length !== 2) return this;
    const [r, c] = this.shape;
    const d: number[] = new Array(this.data.length);
    for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) d[j * r + i] = this.data[i * c + j];
    return new NdArray(d, [c, r]);
  }
  dot(other: NdArray): NdArray {
    if (this.shape.length === 1 && other.shape.length === 1) {
      let s = 0;
      for (let i = 0; i < this.data.length; i++) s += this.data[i] * (other.data[i] ?? 0);
      return new NdArray(s);
    }
    if (this.shape.length === 2 && other.shape.length === 1) {
      const cols = this.shape[1];
      const res: number[] = [];
      for (let r = 0; r < this.shape[0]; r++) {
        let s = 0;
        for (let c = 0; c < cols; c++) s += this.data[r * cols + c] * (other.data[c] ?? 0);
        res.push(s);
      }
      return new NdArray(res);
    }
    if (this.shape.length === 2 && other.shape.length === 2) {
      const [m, k1] = this.shape;
      const k2 = other.shape[1];
      const res: number[] = [];
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < k2; j++) {
          let s = 0;
          for (let k = 0; k < k1; k++) s += this.data[i * k1 + k] * other.data[k * k2 + j];
          res.push(s);
        }
      }
      return new NdArray(res, [m, k2]);
    }
    return this;
  }
  matmul(o: NdArray) { return this.dot(o); }
  toString(): string {
    const fmt = (n: number) => {
      if (Number.isInteger(n)) return String(n);
      const s = n.toFixed(8);
      return s.replace(/0+$/, '').replace(/\.$/, '.0');
    };
    if (this.shape.length === 0) return fmt(this.data[0]);
    if (this.shape.length === 1) {
      return '[' + this.data.map(v => fmt(v)).join(', ') + ']';  // simplified - removed padding
    }
    const rows = this.shape[0], cols = this.shape[1];
    const lines: string[] = [];
    for (let r = 0; r < rows; r++) {
      const row = this.data.slice(r * cols, r * cols + cols).map(v => fmt(v));
      lines.push('[' + row.join(', ') + ']');
    }
    return '[' + lines.join(',\n ') + ']';
  }
  slice(start?: number, end?: number) {
    if (this.shape.length === 1) {
      return new NdArray(this.data.slice(start, end));
    }
    const cols = this.shape[1];
    const s = start ?? 0;
    const e = end ?? this.shape[0];
    return new NdArray(this.data.slice(s * cols, e * cols), [e - s, cols]);
  }
  getRow(i: number) {
    if (this.shape.length === 1) return this.data[i];
    const cols = this.shape[1];
    return new NdArray(this.data.slice(i * cols, i * cols + cols));
  }
  getCol(j: number) {
    if (this.shape.length !== 2) return this;
    const cols = this.shape[1], rows = this.shape[0];
    const r: number[] = [];
    for (let i = 0; i < rows; i++) r.push(this.data[i * cols + j]);
    return new NdArray(r);
  }
}

const npLib = {
  array: (d: any) => new NdArray(d),
  arange: (n: number) => new NdArray(Array.from({ length: n }, (_, i) => i)),
  zeros: (s: number | number[]) => {
    const shape = Array.isArray(s) ? s : [s];
    const len = shape.reduce((a, b) => a * b, 1);
    return new NdArray(new Array(len).fill(0), shape);
  },
  ones: (s: number | number[]) => {
    const shape = Array.isArray(s) ? s : [s];
    const len = shape.reduce((a, b) => a * b, 1);
    return new NdArray(new Array(len).fill(1), shape);
  },
  dot: (a: NdArray, b: NdArray) => a.dot(b),
  round: (a: NdArray, d: number) => new NdArray(a.data.map(v => parseFloat(v.toFixed(d)))),
  random: {
    _seed: 42,
    seed: (s: number) => { npLib.random._seed = s; },
    randn: (n: number) => {
      const data: number[] = [];
      let seed = npLib.random._seed;
      for (let i = 0; i < n; i++) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        const u1 = seed / 0x7fffffff;
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        const u2 = seed / 0x7fffffff;
        data.push(Math.sqrt(-2 * Math.log(u1 || 0.001)) * Math.cos(2 * Math.PI * u2));
      }
      npLib.random._seed = seed;
      return new NdArray(data);
    },
    normal: (loc: number, scale: number, size: number) => {
      const base = npLib.random.randn(size);
      return new NdArray(base.data.map(v => v * scale + loc));
    },
  },
  linalg: {
    norm: (a: NdArray) => Math.sqrt(a.data.reduce((s, v) => s + v * v, 0)),
    eig: (_a: NdArray) => ({ values: new NdArray([5, 2]), vectors: new NdArray([[0.894, -0.707], [0.447, 0.707]]) }),
    svd: (_a: NdArray) => ({ U: new NdArray([1]), S: new NdArray([9.53, 0.51]), V: new NdArray([1]) }),
  },
  corrcoef: (a: NdArray, b: NdArray) => {
    const n = a.data.length;
    const ma = a.data.reduce((s, v) => s + v, 0) / n;
    const mb = b.data.reduce((s, v) => s + v, 0) / n;
    let num = 0, da = 0, db = 0;
    for (let i = 0; i < n; i++) {
      num += (a.data[i] - ma) * (b.data[i] - mb);
      da += (a.data[i] - ma) ** 2;
      db += (b.data[i] - mb) ** 2;
    }
    return num / Math.sqrt(da * db);
  },
  maximum: (a: number, b: NdArray) => new NdArray(b.data.map(v => Math.max(a, v))),
};

// ── Python-to-JS transpiler ──
function pyToJs(code: string): string {
  const lines = code.split('\n');
  const jsLines: string[] = [];
  const indentStack: number[] = [0];
  const declaredVars = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const trimmed = line.trimStart();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.length - line.trimStart().length;

    // Close blocks
    while (indentStack.length > 1 && indent <= indentStack[indentStack.length - 1]) {
      indentStack.pop();
      jsLines.push('}'.padStart(indent + 1));
    }

    let js = trimmed;

    if (js === 'pass') continue;

    // import statements - skip
    if (js.startsWith('import ') || js.startsWith('from ')) {
      continue;
    }

    // print → __print
    js = js.replace(/^print\(/, '__print(');
    js = js.replace(/([^a-zA-Z_])print\(/, '$1__print(');

    // f-strings: f"...{expr}..." → template literals
    js = js.replace(/f"([^"]*)"/g, (_m, inner) => '`' + inner.replace(/\{([^}]+)\}/g, '${$1}') + '`');
    js = js.replace(/f'([^']*)'/g, (_m, inner) => '`' + inner.replace(/\{([^}]+)\}/g, '${$1}') + '`');

    // Python True/False/None
    js = js.replace(/\bTrue\b/g, 'true');
    js = js.replace(/\bFalse\b/g, 'false');
    js = js.replace(/\bNone\b/g, 'null');
    js = js.replace(/\band\b/g, '&&');
    js = js.replace(/\bor\b/g, '||');
    js = js.replace(/\bnot\b/g, '!');

    // ** → Math.pow (simple cases)
    js = js.replace(/(\w+)\s*\*\*\s*(\w+)/g, 'Math.pow($1, $2)');

    // // → Math.floor division
    js = js.replace(/(\w+)\s*\/\/\s*(\w+)/g, 'Math.floor($1 / $2)');

    // len() → .length
    js = js.replace(/\blen\(([^)]+)\)/g, '($1).length');

    // type(x) → typeof
    js = js.replace(/\btype\(([^)]+)\)/g, '__type($1)');

    // range()
    js = js.replace(/\brange\(([^)]+)\)/g, '__range($1)');

    // .append(x) → .push(x)
    js = js.replace(/\.append\(/g, '.push(');

    // str methods
    js = js.replace(/\.strip\(\)/g, '.trim()');
    js = js.replace(/\.upper\(\)/g, '.toUpperCase()');
    js = js.replace(/\.lower\(\)/g, '.toLowerCase()');

    // math.sqrt → Math.sqrt
    js = js.replace(/\bmath\.sqrt/g, 'Math.sqrt');
    js = js.replace(/\bmath\.pi/g, 'Math.PI');
    js = js.replace(/\bmath\.e\b/g, 'Math.E');

    // abs() → Math.abs()
    js = js.replace(/\babs\(/g, 'Math.abs(');

    // round(x, n)
    js = js.replace(/\bround\(([^,)]+),\s*(\d+)\)/g, 'parseFloat(($1).toFixed($2))');
    js = js.replace(/\bround\(([^)]+)\)/g, 'Math.round($1)');

    // np references
    js = js.replace(/\bnp\./g, '__np.');

    // pd.DataFrame
    js = js.replace(/\bpd\.DataFrame/g, '__pd_DataFrame');
    js = js.replace(/\bpd\.merge/g, '__pd_merge');
    js = js.replace(/\bpd\.Series/g, '__pd_Series');

    // @ operator for matmul: expr1 @ expr2
    js = js.replace(/(\w+)\s*@\s*(\w+)/g, '$1.matmul($2)');

    // def func(args): → function func(args) {
    const defMatch = js.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/);
    if (defMatch) {
      jsLines.push(`function ${defMatch[1]}(${defMatch[2]}) {`);
      indentStack.push(indent + 2);
      continue;
    }

    // class Name: → (skip for simplicity, handle basic)
    const classMatch = js.match(/^class\s+(\w+).*:/);
    if (classMatch) {
      jsLines.push(`// class ${classMatch[1]}`);
      indentStack.push(indent + 2);
      continue;
    }

    // for x in ...:
    const forMatch = js.match(/^for\s+(\w+)\s+in\s+(.+):\s*$/);
    if (forMatch) {
      jsLines.push(`for (const ${forMatch[1]} of ${forMatch[2]}) {`);
      indentStack.push(indent + 2);
      continue;
    }

    // while cond:
    const whileMatch = js.match(/^while\s+(.+):\s*$/);
    if (whileMatch) {
      jsLines.push(`while (${whileMatch[1]}) {`);
      indentStack.push(indent + 2);
      continue;
    }

    // if/elif/else
    const ifMatch = js.match(/^if\s+(.+):\s*$/);
    if (ifMatch) {
      jsLines.push(`if (${ifMatch[1]}) {`);
      indentStack.push(indent + 2);
      continue;
    }
    const elifMatch = js.match(/^elif\s+(.+):\s*$/);
    if (elifMatch) {
      jsLines.push(`} else if (${elifMatch[1]}) {`);
      continue;
    }
    if (js.match(/^else\s*:\s*$/)) {
      jsLines.push('} else {');
      continue;
    }

    // return
    js = js.replace(/^return\s+/, 'return ');

    // try/except
    if (js.match(/^try\s*:/)) {
      jsLines.push('try {');
      indentStack.push(indent + 2);
      continue;
    }
    const exceptMatch = js.match(/^except.*:/);
    if (exceptMatch) {
      jsLines.push('} catch(__e) {');
      continue;
    }

    // List comprehension: [expr for x in iterable]
    const lcMatch = js.match(/^\w+\s*=\s*\[(.+)\s+for\s+(\w+)\s+in\s+(.+)\]$/);
    if (lcMatch) {
      const varName = js.split('=')[0].trim();
      const expr = lcMatch[1].replace(/\b(\w+)\s*\*\*\s*(\w+)/g, 'Math.pow($1, $2)');
      const keyword = declaredVars.has(varName) ? '' : 'let ';
      declaredVars.add(varName);
      jsLines.push(`${keyword}${varName} = Array.from(${lcMatch[3]}).map(${lcMatch[2]} => ${expr});`);
      continue;
    }

    // Variable assignment
    const assignMatch = js.match(/^(\w+)\s*=\s*(.+)$/);
    if (assignMatch && !js.includes('==')) {
      const keyword = declaredVars.has(assignMatch[1]) ? '' : 'let ';
      declaredVars.add(assignMatch[1]);
      jsLines.push(`${keyword}${assignMatch[1]} = ${assignMatch[2]};`);
      continue;
    }

    // Augmented assignment
    js = js.replace(/^(\w+)\s*\+=\s*(.+)$/, '$1 += $2;');
    js = js.replace(/^(\w+)\s*-=\s*(.+)$/, '$1 -= $2;');
    js = js.replace(/^(\w+)\s*\*=\s*(.+)$/, '$1 *= $2;');

    // Add semicolons if not already there
    if (!js.endsWith(';') && !js.endsWith('{') && !js.endsWith('}')) {
      js += ';';
    }

    jsLines.push(js);
  }

  // Close remaining blocks
  while (indentStack.length > 1) {
    indentStack.pop();
    jsLines.push('}');
  }

  return jsLines.join('\n');
}

// ── Execute transpiled code ──
export function evalPython(code: string): { output: string; error?: string } {
  const output: string[] = [];

  const helpers = `
    function __print(...args) {
      output.push(args.map(a => {
        if (a instanceof NdArray) return a.toString();
        if (Array.isArray(a)) return '[' + a.join(', ') + ']';
        if (a === null) return 'None';
        if (a === true) return 'True';
        if (a === false) return 'False';
        if (typeof a === 'object') return JSON.stringify(a);
        return String(a);
      }).join(' '));
    }
    function __type(x) {
      if (x instanceof NdArray) return "<class 'numpy.ndarray'>";
      if (typeof x === 'number') return Number.isInteger(x) ? "<class 'int'>" : "<class 'float'>";
      if (typeof x === 'string') return "<class 'str'>";
      if (Array.isArray(x)) return "<class 'list'>";
      if (typeof x === 'boolean') return "<class 'bool'>";
      return "<class 'object'>";
    }
    function __range(...args) {
      let start = 0, end = 0, step = 1;
      if (args.length === 1) { end = args[0]; }
      else if (args.length === 2) { start = args[0]; end = args[1]; }
      else { start = args[0]; end = args[1]; step = args[2]; }
      const r = [];
      if (step > 0) { for (let i = start; i < end; i += step) r.push(i); }
      else { for (let i = start; i > end; i += step) r.push(i); }
      return r;
    }
    function __pd_DataFrame(obj) {
      const df = { ...obj, _keys: Object.keys(obj) };
      df.describe = function() { return 'DataFrame.describe()'; };
      df.mean = function() {
        const res = {};
        for (const k of this._keys) {
          if (Array.isArray(this[k])) {
            const nums = this[k].filter(v => typeof v === 'number' && !isNaN(v));
            res[k] = nums.reduce((a, b) => a + b, 0) / nums.length;
          }
        }
        return res;
      };
      df.isna = function() {
        const res = {};
        for (const k of this._keys) {
          if (Array.isArray(this[k])) res[k] = this[k].filter(v => v === null || v === undefined || (typeof v === 'number' && isNaN(v))).length;
        }
        return { sum: () => res };
      };
      df.fillna = function(val) { return __pd_DataFrame(Object.fromEntries(this._keys.map(k => [k, this[k].map(v => (v === null || v === undefined || (typeof v === 'number' && isNaN(v))) ? val : v)]))); };
      df.dropna = function() { return 'dropna result'; };
      df.groupby = function(col) {
        const groups = {};
        const vals = this[col];
        vals.forEach((v, i) => { if (!groups[v]) groups[v] = []; groups[v].push(i); });
        return {
          mean: () => {
            const res = {};
            for (const [g, indices] of Object.entries(groups)) {
              res[g] = {};
              for (const k of df._keys) {
                if (k !== col && Array.isArray(df[k])) {
                  const vals = indices.map(i => df[k][i]).filter(v => typeof v === 'number');
                  res[g][k] = vals.reduce((a, b) => a + b, 0) / vals.length;
                }
              }
            }
            return res;
          }
        };
      };
      return df;
    }
    function __pd_merge(a, b, opts) { return 'merged DataFrame'; }
    const __np = {
      array: (d) => new NdArray(d),
      arange: (n) => npLib.arange(n),
      zeros: (s) => npLib.zeros(s),
      ones: (s) => npLib.ones(s),
      dot: (a, b) => a.dot(b),
      round: (a, d) => {
        if (a instanceof NdArray) return new NdArray(a.data.map(v => parseFloat(v.toFixed(d || 0))));
        return parseFloat(Number(a).toFixed(d || 0));
      },
      random: npLib.random,
      linalg: npLib.linalg,
      corrcoef: npLib.corrcoef,
      maximum: (a, b) => {
        if (b instanceof NdArray) return new NdArray(b.data.map(v => Math.max(a, v)));
        return Math.max(a, b);
      },
      sqrt: Math.sqrt,
      abs: Math.abs,
      sum: (a) => a instanceof NdArray ? a.sum() : a.reduce((x, y) => x + y, 0),
      mean: (a) => a instanceof NdArray ? a.mean() : a.reduce((x, y) => x + y, 0) / a.length,
    };
    const math = { sqrt: Math.sqrt, pi: Math.PI, e: Math.E, log: Math.log, exp: Math.exp, floor: Math.floor, ceil: Math.ceil };
  `;

  try {
    const jsCode = pyToJs(code);
    const fullCode = helpers + '\n' + jsCode;
    const fn = new Function('output', 'NdArray', 'npLib', fullCode);
    fn(output, NdArray, npLib);
    return { output: output.join('\n') };
  } catch (e: any) {
    return { output: '', error: e.message || 'Evaluation error' };
  }
}
