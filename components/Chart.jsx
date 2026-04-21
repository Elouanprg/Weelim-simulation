// Chart component: area chart with capital vs intérêts
const ResultChart = ({ data, width = 560, height = 220, blurred = false }) => {
  if (!data || data.length === 0) return null;
  const pad = { top: 20, right: 16, bottom: 28, left: 52 };
  const W = width - pad.left - pad.right;
  const H = height - pad.top - pad.bottom;
  const maxVal = Math.max(...data.map(d => d.total)) * 1.05;
  const xStep = W / Math.max(1, data.length - 1);

  const xy = (i, v) => [pad.left + i * xStep, pad.top + H - (v / maxVal) * H];

  const capitalPath = data.map((d, i) => {
    const [x, y] = xy(i, d.capital);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  const totalPath = data.map((d, i) => {
    const [x, y] = xy(i, d.total);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  // Area fill between capital line and total line (intérêts zone)
  const interestArea = [
    ...data.map((d, i) => {
      const [x, y] = xy(i, d.total);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }),
    ...[...data].reverse().map((d, i) => {
      const idx = data.length - 1 - i;
      const [x, y] = xy(idx, d.capital);
      return `L${x.toFixed(1)},${y.toFixed(1)}`;
    }),
    'Z'
  ].join(' ');
  // Capital area
  const capitalArea = [
    ...data.map((d, i) => {
      const [x, y] = xy(i, d.capital);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    }),
    `L${(pad.left + (data.length - 1) * xStep).toFixed(1)},${(pad.top + H).toFixed(1)}`,
    `L${pad.left.toFixed(1)},${(pad.top + H).toFixed(1)}`,
    'Z'
  ].join(' ');

  const fmtK = v => {
    if (v >= 1_000_000) return (v / 1_000_000).toFixed(1).replace('.0','') + 'M€';
    if (v >= 1000) return Math.round(v / 1000) + 'k€';
    return Math.round(v) + '€';
  };

  // Y gridlines (4 bands)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => t * maxVal);
  const xLabels = data.length <= 8
    ? data.map((_, i) => i)
    : [0, Math.floor(data.length / 4), Math.floor(data.length / 2), Math.floor(3 * data.length / 4), data.length - 1];

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', filter: blurred ? 'blur(10px)' : 'none', opacity: blurred ? 0.6 : 1 }}>
      <defs>
        <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a2637" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0a2637" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="intGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e65f0e" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#e65f0e" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* grid */}
      {yTicks.map((t, i) => {
        const y = pad.top + H - (t / maxVal) * H;
        return (
          <g key={i}>
            <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="#eef1f5" strokeWidth="1" strokeDasharray={i === 0 ? '0' : '3 3'} />
            <text x={pad.left - 10} y={y + 4} fontSize="10.5" fontFamily="'IBM Plex Mono', ui-monospace, monospace" fill="#94a0ad" textAnchor="end">{fmtK(t)}</text>
          </g>
        );
      })}

      {/* Capital area (solid) */}
      <path d={capitalArea} fill="url(#capGrad)" />
      {/* Interest area (gold) on top */}
      <path d={interestArea} fill="url(#intGrad)" />

      {/* Capital top line */}
      <path d={capitalPath} fill="none" stroke="#0a2637" strokeWidth="1.5" />
      {/* Total top line */}
      <path d={totalPath} fill="none" stroke="#e65f0e" strokeWidth="2" />

      {/* x labels */}
      {xLabels.map((i, k) => {
        const [x] = xy(i, 0);
        return <text key={k} x={x} y={height - 8} fontSize="10.5" fontFamily="'IBM Plex Mono', ui-monospace, monospace" fill="#94a0ad" textAnchor="middle">An {i}</text>;
      })}

      {/* End marker */}
      {!blurred && (() => {
        const last = data[data.length - 1];
        const [x, y] = xy(data.length - 1, last.total);
        return (
          <g>
            <circle cx={x} cy={y} r="5" fill="#e65f0e" stroke="#fff" strokeWidth="2.5" />
          </g>
        );
      })()}
    </svg>
  );
};

Object.assign(window, { ResultChart });