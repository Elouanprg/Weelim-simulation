// Products: SCPI, Assurance-vie, Private Equity, Crowdfunding
// Data sourced from Weelim's public site (indicative, not guaranteed)
const PRODUCTS = [
  {
    id: 'scpi',
    name: 'SCPI',
    title: 'Société Civile de Placement Immobilier',
    tagline: 'Immobilier sans gestion, revenus réguliers',
    rateDefault: 5.0,
    rateMin: 3.0,
    rateMax: 8.0,
    rateLabel: 'Taux de distribution (TD 2024 moyen)',
    minAmount: 200,
    horizonRec: '8 à 12 ans',
    fiscality: 'Revenus fonciers',
    Icon: 'IconSCPI',
    benefits: [
      'Revenus potentiellement versés tous les mois ou trimestres',
      'Mutualisation du risque sur des dizaines d\'immeubles',
      'Accessible dès 200 € la part'
    ],
    risk: 'Risque de perte en capital. Liquidité non garantie.'
  },
  {
    id: 'av',
    name: 'Assurance-vie',
    title: 'Enveloppe fiscale multi-supports',
    tagline: 'Souplesse, fiscalité avantageuse, transmission',
    rateDefault: 4.0,
    rateMin: 2.0,
    rateMax: 7.0,
    rateLabel: 'Rendement annuel moyen visé',
    minAmount: 50,
    horizonRec: '8 ans et plus',
    fiscality: 'Fiscalité AV (abattement après 8 ans)',
    Icon: 'IconAV',
    benefits: [
      'Fonds euros, SCPI, SCI, Private Equity dans une même enveloppe',
      'Fiscalité allégée après 8 ans de détention',
      'Transmission hors succession jusqu\'à 152 500 € par bénéficiaire'
    ],
    risk: 'Hors fonds euros, risque de perte en capital sur UC.'
  },
  {
    id: 'pe',
    name: 'Private Equity',
    title: 'Investissement dans l\'économie non cotée',
    tagline: 'Rendement cible élevé, horizon long',
    rateDefault: 8.0,
    rateMin: 5.0,
    rateMax: 15.0,
    rateLabel: 'TRI cible (Taux de Rendement Interne)',
    minAmount: 1000,
    horizonRec: '8 à 10 ans',
    fiscality: 'PFU 30 % ou régime PEA-PME',
    Icon: 'IconPE',
    benefits: [
      'Exposition à l\'économie réelle et aux PME/ETI',
      'Potentiel de performance supérieure aux marchés cotés',
      'Décorrélation partielle avec la bourse'
    ],
    risk: 'Capital bloqué. Risque de perte totale en capital.'
  },
  {
    id: 'cf',
    name: 'Crowdfunding',
    title: 'Financement participatif immobilier',
    tagline: 'Court terme, rendement élevé, projet par projet',
    rateDefault: 9.0,
    rateMin: 7.0,
    rateMax: 12.0,
    rateLabel: 'Rendement brut annuel cible',
    minAmount: 1000,
    horizonRec: '12 à 24 mois',
    fiscality: 'PFU 30 %',
    Icon: 'IconCrowd',
    benefits: [
      'Horizon court : généralement 12 à 24 mois',
      'Rendement cible potentiellement supérieur à 9 % brut',
      'Accessible dès 1 000 € par projet'
    ],
    risk: 'Risque de retard ou de défaut du promoteur.'
  }
];

window.PRODUCTS = PRODUCTS;