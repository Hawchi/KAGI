export const PARTS = [
  { n: 'Keycaps', jp: 'キーキャップ', img: '/images/keycaps.jpg', d: 'The part you touch. Profile and material, PBT vs ABS, change how every press feels and the pitch it makes.', k: 'MATERIAL', v: 'PBT · ABS' },
  { n: 'Switches', jp: 'スイッチ', img: '/images/switches.jpg', d: 'The mechanism under each key. Linear, tactile or clicky: the single biggest decision for feel and sound.', k: 'TYPE', v: 'LINEAR / TACTILE / CLICKY' },
  { n: 'Stabilizers', jp: 'スタビ', img: '/images/stabilizers.jpg', d: 'Keep big keys like space and enter from wobbling. Lubed stabs are the line between rattle and a clean thock.', k: 'FITS', v: 'KEYS 2u +' },
  { n: 'PCB', jp: '基板', img: '/images/pcb.jpg', d: 'The brain. It registers every keypress. Hot-swap boards let you change switches with zero soldering.', k: 'MOUNT', v: 'HOT-SWAP' },
  { n: 'Plate', jp: 'プレート', img: '/images/plate.jpg', d: 'Holds switches and tunes stiffness. Aluminium is crisp and sharp; FR4 or POM is softer and deeper.', k: 'TUNES', v: 'STIFFNESS' },
  { n: 'Case', jp: 'ケース', img: '/images/case.jpg', d: 'Houses everything and shapes the sound. Weight, material and mount style define the whole character.', k: 'SHAPES', v: 'ACOUSTICS' },
]

export const SWITCHES = [
  { id: 'linear',  n: 'Linear',  jp: 'リニア',    sound: 'THOCK', dot: '#d24b3e', force: '45 g', feel: 'Smooth all the way down — no bump, no click.', best: 'Gaming, fast typing' },
  { id: 'tactile', n: 'Tactile', jp: 'タクタイル', sound: 'CLACK', dot: '#9a6a3c', force: '55 g', feel: 'A clear bump tells your finger it actuated.', best: 'All-round daily typing' },
  { id: 'clicky',  n: 'Clicky',  jp: 'クリッキー', sound: 'CLICK', dot: '#3f72c4', force: '50 g', feel: 'A tactile bump plus a sharp, audible click.', best: 'Typewriter lovers' },
]

export const STEPS = [
  { t: 'Pick your parts', d: 'Choose a hot-swap 60% kit, find your switches and grab some keycaps. No soldering needed.' },
  { t: 'Lube your stabilizers', d: 'Before anything else, lube your stabs. This is the difference between rattle and a clean thock.' },
  { t: 'Snap in your switches', d: 'Push each switch into the hot-swap sockets until you hear a click. Take your time.' },
  { t: 'Place your keycaps', d: 'Press each keycap onto its switch. Then plug it in and start typing.' },
]

export const LAYERS = [
  { key: 'keycaps',  idx: '01', n: 'Keycaps',  jp: 'キーキャップ', d: 'What your fingers meet',   side: 'right', t: 0.10 },
  { key: 'switches', idx: '02', n: 'Switches', jp: 'スイッチ',    d: 'Feel & actuation',         side: 'left',  t: 0.24 },
  { key: 'plate',    idx: '03', n: 'Plate',    jp: 'プレート',    d: 'Stiffness & alignment',    side: 'right', t: 0.38 },
  { key: 'pcb',      idx: '04', n: 'PCB',      jp: '基板',        d: 'Registers every press',    side: 'left',  t: 0.52 },
  { key: 'foam',     idx: '05', n: 'Foam',     jp: 'フォーム',    d: 'Dampens the hollow',       side: 'right', t: 0.64 },
  { key: 'case',     idx: '06', n: 'Case',     jp: 'ケース',      d: 'Shapes the sound',         side: 'left',  t: 0.76 },
]