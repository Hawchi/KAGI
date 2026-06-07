import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

const U = 1
const GAP = 0.085
const CAP_H = 0.52
const SW_H = 0.42
const PLATE_H = 0.10
const PCB_H = 0.14
const FOAM_H = 0.16
const CASE_H = 0.95

const ACC = 'accent'
const ROWS = [
  [[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[2]],
  [[1.5],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1.5]],
  [[1.75,ACC],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[2.25]],
  [[2.25],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[2.75]],
  [[1.25],[1.25],[1.25],[6.25,ACC],[1.25],[1.25],[1.25],[1.25]],
]

const COL = {
  cap:    0xe9e1d1,
  capDk:  0x2a2520,
  amber:  0xe9aec6,
  amberD: 0xcf8aa8,
  plate:  0xc4c4c9,
  pcb:    0x191510,
  foam:   0x3a332a,
  caseT:  0x231e19,
  swBody: 0x201d16,
}

let renderer, scene, camera, root
let layers = {}
let keycaps = []
let raycaster, pointer = new THREE.Vector2(-2, -2)
let hovered = null
let activePresses = new Map()
let explode = 0, explodeTarget = 0
let parallax = { x: 0, y: 0, tx: 0, ty: 0 }
let canvas, dims = { w: 1, h: 1 }
let running = true, rendering = true
let onKeyHit = null
let hoverCb = null
let clock = new THREE.Clock()
let boardWidth = 15

function mat(opts) {
  return new THREE.MeshStandardMaterial(opts)
}

function buildKeyboard() {
  const totalDepth = ROWS.length * U
  boardWidth = 15 * U

  const capMat    = mat({ color: COL.cap,    roughness: 0.55, metalness: 0.02 })
  const amberMat  = mat({ color: COL.amber,  roughness: 0.45, metalness: 0.08, emissive: 0x1a0a12, emissiveIntensity: 0.3 })
  const plateMat  = mat({ color: COL.plate,  roughness: 0.32, metalness: 1.0 })
  const pcbMat    = mat({ color: COL.pcb,    roughness: 0.7,  metalness: 0.2 })
  const foamMat   = mat({ color: COL.foam,   roughness: 0.95, metalness: 0.0 })
  const caseMat   = mat({ color: COL.caseT,  roughness: 0.34, metalness: 0.85 })
  const swBodyMat = mat({ color: COL.swBody, roughness: 0.6,  metalness: 0.2 })

  const names = ['keycaps', 'switches', 'plate', 'pcb', 'foam', 'case']
  names.forEach(n => {
    const g = new THREE.Group()
    layers[n] = { group: g, baseY: 0 }
    root.add(g)
  })

  const yCase  = 0
  const yFoam  = yCase  + CASE_H  * 0.5 - FOAM_H  * 0.5 - 0.02
  const yPcb   = yFoam  + FOAM_H  * 0.5 + PCB_H   * 0.5
  const yPlate = yPcb   + PCB_H   * 0.5 + 0.34    + PLATE_H * 0.5
  const ySw    = yPcb   + PCB_H   * 0.5 + SW_H    * 0.5 + 0.05
  const yCap   = yPlate + PLATE_H * 0.5 + CAP_H   * 0.5 + 0.04

  layers.case.baseY     = yCase
  layers.foam.baseY     = yFoam
  layers.pcb.baseY      = yPcb
  layers.plate.baseY    = yPlate
  layers.switches.baseY = ySw
  layers.keycaps.baseY  = yCap

 
  const margin = 0.55
  const caseGeo = new RoundedBoxGeometry(boardWidth + margin * 2, CASE_H, totalDepth + margin * 2, 5, 0.28)
  layers.case.group.add(new THREE.Mesh(caseGeo, caseMat))
  const badge = new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.06, 0.4, 3, 0.03), amberMat)
  badge.position.set(boardWidth / 2 - 1.6, CASE_H / 2 + 0.02, totalDepth / 2 + margin - 0.35)
  layers.case.group.add(badge)

  layers.foam.group.add(new THREE.Mesh(new RoundedBoxGeometry(boardWidth, FOAM_H, totalDepth, 3, 0.06), foamMat))

  layers.pcb.group.add(new THREE.Mesh(new RoundedBoxGeometry(boardWidth - 0.1, PCB_H, totalDepth - 0.1, 3, 0.05), pcbMat))

  layers.plate.group.add(new THREE.Mesh(new RoundedBoxGeometry(boardWidth - 0.05, PLATE_H, totalDepth - 0.05, 3, 0.05), plateMat))

  const capGeoCache = {}
  const capGeo = (w) => {
    const k = w.toFixed(2)
    if (!capGeoCache[k]) capGeoCache[k] = new RoundedBoxGeometry(w * U - GAP, CAP_H, U - GAP, 4, 0.10)
    return capGeoCache[k]
  }
  const swGeo   = new RoundedBoxGeometry(0.62, SW_H, 0.62, 3, 0.06)
  const stemGeo = new THREE.BoxGeometry(0.18, 0.16, 0.18)

  for (let r = 0; r < ROWS.length; r++) {
    let cursor = 0
    const z = (r * U) - totalDepth / 2 + U / 2
    for (let c = 0; c < ROWS[r].length; c++) {
      const [w, accent] = ROWS[r][c]
      const cx = cursor + (w * U) / 2 - boardWidth / 2
      cursor += w * U

      const isAcc = accent === ACC
      const cap = new THREE.Mesh(capGeo(w), isAcc ? amberMat : capMat)
      cap.position.set(cx, 0, z)
      cap.userData = { baseY: layers.keycaps.baseY, accent: isAcc }
      layers.keycaps.group.add(cap)
      keycaps.push({ mesh: cap, x: cx, z, w })

      const sw = new THREE.Mesh(swGeo, swBodyMat)
      sw.position.set(cx, 0, z)
      layers.switches.group.add(sw)

      const stem = new THREE.Mesh(stemGeo, amberMat)
      stem.position.set(cx, SW_H / 2, z)
      layers.switches.group.add(stem)
    }
  }

  applyLayers()
  root.position.y = -0.5
}

function applyLayers() {
  const spread = explode
  const offsets = {
    keycaps:  4.2 * spread,
    switches: 2.7 * spread,
    plate:    1.3 * spread,
    pcb:      0.0 * spread,
    foam:    -1.4 * spread,
    case:    -3.0 * spread,
  }
  for (const n in layers) {
    layers[n].group.position.y = layers[n].baseY + (offsets[n] || 0)
  }
}

function resize() {
  const r = canvas.getBoundingClientRect()
  dims.w = r.width || window.innerWidth
  dims.h = r.height || window.innerHeight
  renderer.setSize(dims.w, dims.h, false)
  camera.aspect = dims.w / dims.h
  camera.updateProjectionMatrix()
}

function onPointerMove(e) {
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
  parallax.tx = pointer.x
  parallax.ty = pointer.y
}

function onPointerDown() {
  if (hovered) pressKey(hovered, true)
}

function pressKey(item, withSound) {
  if (!item) return
  activePresses.set(item.mesh, performance.now())
  if (withSound && onKeyHit) onKeyHit(item)
}

function setHover(item) {
  if (item === hovered) return
  hovered = item
  if (hoverCb) hoverCb(!!item)
}

function updateHover() {
  if (explode > 0.05 || !rendering) { setHover(null); return }
  raycaster.setFromCamera(pointer, camera)
  const hits = raycaster.intersectObjects(layers.keycaps.group.children, false)
  if (hits.length) {
    const mesh = hits[0].object
    setHover(keycaps.find(k => k.mesh === mesh))
  } else {
    setHover(null)
  }
}

function updatePresses(now) {
  const DUR = 150, DEPTH = 0.42
  for (const [mesh, start] of activePresses) {
    const t = (now - start) / DUR
    if (t >= 1) { mesh.position.y = 0; activePresses.delete(mesh); continue }
    mesh.position.y = -Math.sin(Math.PI * t) * DEPTH
  }
  keycaps.forEach(k => {
    if (hovered && k.mesh === hovered.mesh && !activePresses.has(k.mesh)) {
      k.mesh.position.y += (-0.16 - k.mesh.position.y) * 0.25
    } else if (!activePresses.has(k.mesh)) {
      k.mesh.position.y += (0 - k.mesh.position.y) * 0.2
    }
  })
}

function frame() {
  const now = performance.now()
  const t = clock.getElapsedTime()

  explode += (explodeTarget - explode) * 0.09
  applyLayers()

  parallax.x += (parallax.tx - parallax.x) * 0.06
  parallax.y += (parallax.ty - parallax.y) * 0.06

  const heroRotX = 0.62, expRotX = 0.34
  const baseRotX = heroRotX + (expRotX - heroRotX) * explode
  const pStrength = 0.18 * (1 - explode * 0.7)
  root.rotation.x = baseRotX + parallax.y * -pStrength + Math.sin(t * 0.6) * 0.012
  root.rotation.y = parallax.x * pStrength + Math.sin(t * 0.45) * 0.02
  root.rotation.z = parallax.x * 0.03 * (1 - explode)

  root.position.y = -0.5 + Math.sin(t * 0.8) * 0.08 + explode * 0.3

  camera.position.z = 18.0 - explode * 1.5
  camera.position.y = 9.5 - explode * 5.6
  camera.lookAt(0, -3.2 + explode * 5.3, 0)

  updateHover()
  updatePresses(now)
  renderer.render(scene, camera)
}

function scheduleRipple() {
  const delay = 1800 + Math.random() * 2600
  setTimeout(() => {
    if (running && rendering) ripple()
    scheduleRipple()
  }, delay)
}

export function useScene() {
  function init(cv) {
    canvas = cv
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.outputColorSpace = THREE.SRGBColorSpace

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    camera.position.set(0, 9.5, 13.5)
    camera.lookAt(0, 0, 0)

    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const key = new THREE.DirectionalLight(0xfff1dd, 2.1)
    key.position.set(-6, 12, 7)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xf0bcd2, 1.35)
    rim.position.set(8, 4, -6)
    scene.add(rim)
    const fill = new THREE.DirectionalLight(0xbfd0ff, 0.5)
    fill.position.set(5, 6, 9)
    scene.add(fill)
    scene.add(new THREE.AmbientLight(0xffffff, 0.18))

    root = new THREE.Group()
    scene.add(root)

    buildKeyboard()
    raycaster = new THREE.Raycaster()

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('resize', resize)

    resize()
    clock.start()

    ;(function loop() {
      requestAnimationFrame(loop)
      if (!running || !rendering) return
      frame()
    })()

    scheduleRipple()
  }

  function ripple() {
    if (explode > 0.2) return
    const n = 1 + Math.floor(Math.random() * 2)
    for (let i = 0; i < n; i++) {
      const k = keycaps[Math.floor(Math.random() * keycaps.length)]
      setTimeout(() => pressKey(k, false), i * 70)
    }
  }

  function setExplode(p) { explodeTarget = Math.max(0, Math.min(1, p)) }
  function setRendering(v) { rendering = v }
  function setKeyHitCallback(fn) { onKeyHit = fn }
  function setHoverCallback(fn) { hoverCb = fn }

  function layerScreen(name) {
    const l = layers[name]
    if (!l) return null
    const v = new THREE.Vector3()
    l.group.getWorldPosition(v)
    v.project(camera)
    return {
      x: (v.x * 0.5 + 0.5) * dims.w,
      y: (-v.y * 0.5 + 0.5) * dims.h,
      visible: v.z < 1
    }
  }

  return { init, setExplode, setRendering, setKeyHitCallback, setHoverCallback, layerScreen, ripple }
}