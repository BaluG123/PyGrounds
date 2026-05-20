function cleanLatex(exp) {
  let cleaned = exp;
  // Common symbols
  cleaned = cleaned.replace(/\\vec\{([a-zA-Z])\}/g, '$1⃗');
  cleaned = cleaned.replace(/\\cdot/g, '·');
  cleaned = cleaned.replace(/\\longrightarrow/g, '⟶');
  cleaned = cleaned.replace(/\\dots/g, '…');
  cleaned = cleaned.replace(/\\text\{([^}]+)\}/g, '$1');
  cleaned = cleaned.replace(/\\sum_\{([^}]+)\}\^([a-zA-Z0-9])/g, '∑(from $1 to $2) ');
  cleaned = cleaned.replace(/\\sum/g, '∑');
  cleaned = cleaned.replace(/\\prod/g, '∏');
  cleaned = cleaned.replace(/\\times/g, '×');
  cleaned = cleaned.replace(/\\eta/g, 'η');
  cleaned = cleaned.replace(/\\nabla/g, '∇');
  cleaned = cleaned.replace(/\\sigma/g, 'σ');
  cleaned = cleaned.replace(/\\Sigma/g, 'Σ');
  cleaned = cleaned.replace(/\\mu/g, 'μ');
  cleaned = cleaned.replace(/\\lambda/g, 'λ');
  cleaned = cleaned.replace(/\\theta/g, 'θ');
  cleaned = cleaned.replace(/\\pi/g, 'π');
  cleaned = cleaned.replace(/\\alpha/g, 'α');
  cleaned = cleaned.replace(/\\beta/g, 'β');
  cleaned = cleaned.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  cleaned = cleaned.replace(/\\bar\{([^}]+)\}/g, '$1̄');
  cleaned = cleaned.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');
  
  // Superscripts
  const supers = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', 'n': 'ⁿ', 'i': 'ⁱ', '-': '⁻', 'x': 'ˣ' };
  cleaned = cleaned.replace(/\^([0-9ni\-x])/g, (m, c) => supers[c] || c);
  cleaned = cleaned.replace(/\^\{([^}]+)\}/g, (m, c) => c.split('').map(char => supers[char] || char).join(''));

  // Subscripts
  const subs = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉', 'n': 'ₙ', 'i': 'ᵢ', 'j': 'ⱼ' };
  cleaned = cleaned.replace(/_([0-9nij])/g, (m, c) => subs[c] || c);
  cleaned = cleaned.replace(/_\{([^}]+)\}/g, (m, c) => c.split('').map(char => subs[char] || char).join(''));
  
  return cleaned;
}

const exp1 = '\\text{Variance } (\\sigma^2) = \\frac{1}{n} \\sum_{i=1}^n (x_i - \\mu)^2';
const exp2 = '\\text{Std Dev } (\\sigma) = \\sqrt{\\sigma^2}';
const exp3 = 'r = \\frac{\\sum(x_i - \\bar{x})(y_i - \\bar{y})}{\\sqrt{\\sum(x_i - \\bar{x})^2 \\cdot \\sum(y_i - \\bar{y})^2}}';
console.log(cleanLatex(exp1));
console.log(cleanLatex(exp2));
console.log(cleanLatex(exp3));
