// Compute year-by-year projection
function computeProjection(initial, monthly, years, rate) {
  const r = rate / 100;
  const rows = [{ year: 0, capital: initial, total: initial, interests: 0 }];
  let capital = initial; // cumulative invested (apports)
  let total = initial;   // portfolio value
  for (let y = 1; y <= years; y++) {
    // Apply monthly contributions with monthly compounding approximation
    const monthlyRate = Math.pow(1 + r, 1 / 12) - 1;
    for (let m = 0; m < 12; m++) {
      total = total * (1 + monthlyRate) + monthly;
      capital += monthly;
    }
    rows.push({
      year: y,
      capital: Math.round(capital),
      total: Math.round(total),
      interests: Math.round(total - capital)
    });
  }
  return rows;
}

window.computeProjection = computeProjection;