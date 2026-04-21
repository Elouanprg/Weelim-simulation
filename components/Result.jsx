// Step 3: Result screen (blurred until form filled) + Lead form

const fmtEur = v => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(v)) + ' €';

const ResultHeadline = ({ data, unlocked }) => {
  const last = data[data.length - 1];
  const first = data[0];
  const roiPct = first.capital > 0 ? ((last.total - last.capital) / last.capital) * 100 : 0;
  return (
    <div className={`result-headline ${unlocked ? '' : 'is-locked'}`}>
      <div className="headline-label">Valeur projetée au terme</div>
      <div className="headline-value">
        {fmtEur(last.total)}
      </div>
      <div className="headline-split">
        <div>
          <span className="dot dot-capital" />
          <span className="split-label">Apports cumulés</span>
          <strong>{fmtEur(last.capital)}</strong>
        </div>
        <div>
          <span className="dot dot-interest" />
          <span className="split-label">Intérêts générés</span>
          <strong className="interest">{fmtEur(last.interests)}</strong>
        </div>
        <div>
          <span className="split-label">Performance globale</span>
          <strong>{`+${roiPct.toFixed(1).replace('.', ',')} %`}</strong>
        </div>
      </div>
    </div>
  );
};

const LeadForm = ({ onSubmit, productName }) => {
  const [form, setForm] = React.useState({
    firstName: '', lastName: '', email: '', phone: '', consent: false
  });
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'Requis';
    if (!form.lastName.trim()) e.lastName = 'Requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!/^[0-9\s+().-]{8,}$/.test(form.phone)) e.phone = 'Téléphone invalide';
    if (!form.consent) e.consent = 'Consentement requis';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handle = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => onSubmit(form), 700);
  };

  return (
    <form className="lead-form" onSubmit={handle}>
      <div className="lead-head">
        <div className="lead-kicker">
          <IconLock size={14} /> Dernière étape
        </div>
        <h3>Débloquez votre projection détaillée {productName}</h3>
        <p>Recevez votre rapport complet par email et échangez avec un conseiller en gestion de patrimoine dédié.</p>
      </div>
      <div className="lead-grid">
        <div className={`lead-field ${errors.firstName ? 'has-err' : ''}`}>
          <label>Prénom</label>
          <input type="text" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} placeholder="Marie" />
        </div>
        <div className={`lead-field ${errors.lastName ? 'has-err' : ''}`}>
          <label>Nom</label>
          <input type="text" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} placeholder="Dupont" />
        </div>
        <div className={`lead-field span-2 ${errors.email ? 'has-err' : ''}`}>
          <label>Email</label>
          <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="marie.dupont@email.fr" />
        </div>
        <div className={`lead-field span-2 ${errors.phone ? 'has-err' : ''}`}>
          <label>Téléphone</label>
          <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="06 12 34 56 78" />
        </div>
      </div>
      <label className={`consent ${errors.consent ? 'has-err' : ''}`}>
        <input type="checkbox" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} />
        <span>J'accepte d'être recontacté(e) par un conseiller Weelim et j'ai pris connaissance de la politique de confidentialité. Aucun engagement, gratuit et sans spam.</span>
      </label>
      <button className="btn-primary btn-block" type="submit" disabled={submitting}>
        {submitting ? 'Préparation…' : <>Débloquer ma projection <IconArrow size={16} /></>}
      </button>
      <div className="lead-trust">
        <span><IconShield size={14} /> Données chiffrées</span>
        <span><IconCheck size={14} /> Agréé Orias 19004224</span>
        <span><IconCheck size={14} /> Aucun spam</span>
      </div>
    </form>
  );
};

const StepResult = ({ product, inputs, data, unlocked, onUnlock, onRestart }) => {
  const p = PRODUCTS.find(x => x.id === product);
  const last = data[data.length - 1];

  return (
    <div className="step-wrap result-wrap">
      <div className="step-head">
        <div className="step-kicker">Étape 3 sur 3 · Projection {p.name}</div>
        <h2 className="step-title">{unlocked ? 'Voici votre projection détaillée' : 'Votre projection est prête'}</h2>
        <p className="step-sub">
          Simulation sur {inputs.years} ans avec {fmtEur(inputs.initial)} initial
          {inputs.monthly > 0 ? ` + ${fmtEur(inputs.monthly)} / mois` : ''} à {inputs.rate.toFixed(1).replace('.', ',')} %.
        </p>
      </div>

      <div className="result-layout">
        <div className="result-left">
          <ResultHeadline data={data} unlocked={unlocked} />

          <div className="chart-card">
            <div className="chart-legend">
              <span><i className="dot dot-capital" /> Apports</span>
              <span><i className="dot dot-interest" /> Intérêts composés</span>
            </div>
            <div className="chart-wrap">
              <ResultChart data={data} blurred={!unlocked} />
              {!unlocked && (
                <div className="chart-mask">
                  <div className="mask-pill"><IconLock size={14} /> Graphique disponible après inscription</div>
                </div>
              )}
            </div>
          </div>

          <div className="decomp-card">
            <div className="decomp-head">
              <h4>Décomposition année par année</h4>
              <span className="decomp-tag">{data.length - 1} exercices</span>
            </div>
            <div className={`decomp-table ${unlocked ? '' : 'is-blurred'}`}>
              <div className="decomp-row decomp-head-row">
                <span>Année</span><span>Apports</span><span>Intérêts</span><span>Capital</span>
              </div>
              {data.filter((_, i) => i === 0 || i === data.length - 1 || i % Math.max(1, Math.floor(data.length / 6)) === 0).map(r => (
                <div key={r.year} className="decomp-row">
                  <span>An {r.year}</span>
                  <span>{fmtEur(r.capital)}</span>
                  <span className="interest">{r.interests > 0 ? '+' + fmtEur(r.interests) : '—'}</span>
                  <span><strong>{fmtEur(r.total)}</strong></span>
                </div>
              ))}
            </div>
            {!unlocked && <div className="decomp-mask-note"><IconLock size={13} /> Tableau complet après inscription</div>}
          </div>
        </div>

        <div className="result-right">
          {!unlocked ? (
            <LeadForm productName={p.name} onSubmit={onUnlock} />
          ) : (
            <div className="unlock-card">
              <div className="unlock-badge"><IconCheck size={14} /> Accès débloqué</div>
              <h3>Votre rapport est prêt</h3>
              <p>Un conseiller Weelim vous contactera dans les <strong>24 h ouvrées</strong> pour approfondir votre projet {p.name}.</p>
              <div className="unlock-actions">
                <button className="btn-primary btn-block"><IconPhone size={14} /> Prendre RDV avec un expert</button>
                <button className="btn-outline btn-block">📄 Télécharger le PDF</button>
                <button className="btn-ghost btn-block" onClick={onRestart}>Nouvelle simulation</button>
              </div>
              <div className="unlock-meta">
                <div>Contact : conseiller dédié · 09 78 31 58 59</div>
                <div>Référence : WL-{Date.now().toString().slice(-6)}</div>
              </div>
            </div>
          )}

          <div className="side-card">
            <h5>À savoir sur {p.name}</h5>
            <ul>
              {p.benefits.map((b, i) => <li key={i}><IconCheck size={13} /> {b}</li>)}
            </ul>
            <div className="risk-note">⚠︎ {p.risk}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { StepResult, LeadForm, ResultHeadline });