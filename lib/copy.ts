/**
 * All Dhivehi UI copy lives here so it can be proofread in one place.
 * Written by Claude, needs a native review before launch.
 */
export const copy = {
  siteName: 'ޤައުމީ މަޖިލިސް',
  year: '2026',
  party: 'މޯލްޑިވިއަން ޑިމޮކްރެޓިކް ޕާޓީ',
  metaDescription: 'ޤައުމީ މަޖިލިސް އިންތިޚާބު 2026 - މޯލްޑިވިއަން ޑިމޮކްރެޓިކް ޕާޓީ',
  nav: {
    atolls: 'ދާއިރާތައް',
    candidates: 'ކެންޑިޑޭޓުން',
    timeline: 'ތާރީޚުތައް',
    lookup: 'ވޯޓަރުގެ މަޢުލޫމާތު ބަލާ',
  },
  hero: {
    kicker: 'މޯލްޑިވިއަން ޑިމޮކްރެޓިކް ޕާޓީގެ ތެރޭގެ ޤައުމީ އިންތިޚާބު',
    title: 'ޤައުމީ މަޖިލިސް އިންތިޚާބު',
    votingDay: 'ވޯޓު ދޭ ދުވަސް',
    datePlaceholder: '[ތާރީޚު]',
    days: 'ދުވަސް',
    hours: 'ގަޑި',
    minutes: 'މިނިޓް',
    seconds: 'ސިކުންތު',
  },
  lookup: {
    title: 'ވޯޓަރުގެ މަޢުލޫމާތު ބެލުން',
    idLabel: 'އައިޑީ ކާޑު ނަންބަރު',
    submit: 'ބަލާ',
    loading: 'ބަލަމުންދަނީ...',
    result: 'ނަތީޖާ',
    name: 'ނަން',
    dhaairaa: 'ދާއިރާ',
    station: 'ވޯޓު ދޭ ތަން',
    errors: {
      invalid: 'އައިޑީ ކާޑު ނަންބަރު ރަނގަޅަށް ޖައްސަވާ',
      notFound: 'މި ނަންބަރަށް ވޯޓަރެއް ނުފެނުނު',
      unavailable: 'މި ސާވިސް މިހާރު ނުލިބެއެވެ',
      rateLimited: 'ވަރަށް ގިނަ ފަހަރު ބެލީ. ކުޑަ ވަގުތަކަށްފަހު އަލުން ބަލާ',
      generic: 'މައްސަލައެއް ދިމާވި. އަލުން ބަލާ',
    },
  },
  footprint: {
    kicker: 'ދާއިރާތައް',
    title: 'ކޮންމެ އަތޮޅެއްގެ ގޮނޑިތައް',
    lead: 'އުތުރުގެ ހއ. އަތޮޅުން ފެށިގެން ދެކުނުގެ އައްޑޫ ސިޓީއާ ހަމައަށް.',
    total: 'ޖުމްލަ ގޮނޑިތައް',
    seat: 'ގޮނޑި',
    islandsIn: 'ރަށްތައް',
    viewCandidates: 'ކެންޑިޑޭޓުން ބައްލަވާ',
    noIslands: 'ރަށްތަކުގެ މަޢުލޫމާތު އަދި ނުލިބެއެވެ',
  },
  candidates: {
    title: 'ކެންޑިޑޭޓުން',
    allAtolls: 'ހުރިހާ ދާއިރާތައް',
    photo: 'ފޮޓޯ',
    namePlaceholder: '[ކެންޑިޑޭޓްގެ ނަން]',
    atollPlaceholder: '[ދާއިރާ]',
    empty: 'މި ދާއިރާއަށް ކެންޑިޑޭޓުން އަދި ނެތް',
  },
  timeline: {
    title: 'ތާރީޚުތައް',
    datePlaceholder: '[ތާރީޚު]',
    steps: [
      'ކެންޑިޑޭޓުން އިޢުލާނުކުރުން',
      'ކެމްޕެއިން މުއްދަތު',
      'ވޯޓު ދޭ ދުވަސް',
      'ނަތީޖާ އިޢުލާނުކުރުން',
    ],
  },
} as const;
