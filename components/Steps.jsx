// Step 1: Product selection
const StepProduct = ({ productId, onSelect }) => {
  return (
    <div className="step-wrap">
      <div className="step-head">
        <div className="step-kicker">Étape 1 sur 3</div>
        <h2 className="step-title">Quel type de placement souhaitez-vous simuler ?</h2>
        <p className="step-sub">Choisissez la solution qui correspond à votre projet. Les taux sont pré-renseignés à partir des moyennes de marché, vous pourrez les ajuster.</p>
      </div>
      <div className="product-grid">
        {PRODUCTS.map(p => {
          const Icon = window[p.Icon];
          const active = productId === p.id;
          return (
            <button key={p.id} data-product={p.id} className={`product-card ${active ? 'is-active' : ''}`} onClick={() => onSelect(p.id)}>
              <div className="product-icon-badge"><Icon size={22} /></div>
              <div className="product-kicker">investir en</div>
              <div className="product-name">{p.name}</div>
              <div className="product-tagline">{p.tagline}</div>
              <div className="product-rate">
                <span className="rate-num">{p.rateDefault.toFixed(1).replace('.', ',')}%</span>
                <span className="rate-label">/ an cible</span>
              </div>
              <div className="product-meta">
                <div><span>Dès</span><strong>{p.minAmount} €</strong></div>
                <div><span>Horizon</span><strong>{p.horizonRec}</strong></div>
              </div>
              {active && <div className="product-check"><IconCheck size={14} /></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Step 2: Inputs (amount, duration, rate, monthly)
const pct = (v, min, max) => `${((v - min) / (max - min)) * 100}%`;
const StepInputs = ({ product, inputs, setInputs, onBack, onNext }) => {
  const p = PRODUCTS.find(x => x.id === product);
  const fmt = v => new Intl.NumberFormat('fr-FR').format(v);
  return (
    <div className="step-wrap">
      <div className="step-head">
        <div className="step-kicker">Étape 2 sur 3 · {p.name}</div>
        <h2 className="step-title">Paramétrez votre simulation</h2>
        <p className="step-sub">Ajustez les curseurs ou saisissez vos montants. La projection se met à jour en temps réel.</p>
      </div>

      <div className="inputs-grid">
        <div className="field-card">
          <div className="field-top">
            <label>Montant initial</label>
            <div className="field-value">{fmt(inputs.initial)} €</div>
          </div>
          <input type="range" min="1000" max="500000" step="500" value={inputs.initial}
            style={{ '--fill': pct(inputs.initial, 1000, 500000) }}
            onChange={e => setInputs({ ...inputs, initial: +e.target.value })} />
          <div className="field-bounds"><span>1 000 €</span><span>500 000 €</span></div>
        </div>

        <div className="field-card">
          <div className="field-top">
            <label>Versement mensuel <em>(optionnel)</em></label>
            <div className="field-value">{fmt(inputs.monthly)} €</div>
          </div>
          <input type="range" min="0" max="5000" step="50" value={inputs.monthly}
            style={{ '--fill': pct(inputs.monthly, 0, 5000) }}
            onChange={e => setInputs({ ...inputs, monthly: +e.target.value })} />
          <div className="field-bounds"><span>0 €</span><span>5 000 €</span></div>
        </div>

        <div className="field-card">
          <div className="field-top">
            <label>Durée d'investissement</label>
            <div className="field-value">{inputs.years} an{inputs.years > 1 ? 's' : ''}</div>
          </div>
          <input type="range" min="1" max="30" step="1" value={inputs.years}
            style={{ '--fill': pct(inputs.years, 1, 30) }}
            onChange={e => setInputs({ ...inputs, years: +e.target.value })} />
          <div className="field-bounds"><span>1 an</span><span>30 ans</span></div>
        </div>

        <div className="field-card">
          <div className="field-top">
            <label>Taux de rendement annuel</label>
            <div className="field-value">{inputs.rate.toFixed(1).replace('.', ',')} %</div>
          </div>
          <input type="range" min={p.rateMin} max={p.rateMax} step="0.1" value={inputs.rate}
            style={{ '--fill': pct(inputs.rate, p.rateMin, p.rateMax) }}
            onChange={e => setInputs({ ...inputs, rate: +e.target.value })} />
          <div className="field-bounds">
            <span>{p.rateMin} %</span>
            <span className="rate-pill">Moyenne marché {p.rateDefault}%</span>
            <span>{p.rateMax} %</span>
          </div>
          <p className="field-hint">{p.rateLabel}. Ces objectifs ne constituent pas une garantie.</p>
        </div>
      </div>

      <div className="step-cta-row">
        <button className="btn-ghost" onClick={onBack}>← Changer de solution</button>
        <button className="btn-primary" onClick={onNext}>
          Voir ma projection <IconArrow size={16} />
        </button>
      </div>
    </div>
  );
};

Object.assign(window, { StepProduct, StepInputs });