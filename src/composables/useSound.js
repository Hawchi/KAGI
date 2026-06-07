let ctx = null
let analyser = null
let viz = []
let drawing = false
let currentSource = null

const buffers = {}

async function ensure() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return }
  const AC = window.AudioContext || window.webkitAudioContext
  ctx = new AC()
  analyser = ctx.createAnalyser()
  analyser.fftSize = 1024
  analyser.smoothingTimeConstant = 0.55
  analyser.connect(ctx.destination)

  await Promise.all(
    ['linear', 'tactile', 'clicky'].map(async type => {
      const res = await fetch(`/sounds/${type}.mp3`)
      const arrayBuffer = await res.arrayBuffer()
      buffers[type] = await ctx.decodeAudioData(arrayBuffer)
    })
  )
}

function drawLoop() {
  requestAnimationFrame(drawLoop)
  if (!analyser || viz.length === 0) return
  const N = analyser.fftSize
  const buf = new Uint8Array(N)
  analyser.getByteTimeDomainData(buf)

  viz.forEach(canvas => {
    if (!canvas.isConnected) return
    const dpr = Math.min(devicePixelRatio, 2)
    const w = canvas.clientWidth, h = canvas.clientHeight
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr; canvas.height = h * dpr
    }
    const g = canvas.getContext('2d')
    g.setTransform(dpr, 0, 0, dpr, 0, 0)
    g.clearRect(0, 0, w, h)
    const mid = h / 2
    g.strokeStyle = 'rgba(255,240,220,0.10)'
    g.lineWidth = 1
    g.beginPath(); g.moveTo(0, mid); g.lineTo(w, mid); g.stroke()
    g.lineWidth = 2
    g.strokeStyle = '#e9aec6'
    g.shadowColor = 'rgba(233,174,198,0.6)'
    g.shadowBlur = 8
    g.beginPath()
    const step = N / w
    for (let x = 0; x < w; x++) {
      const idx = Math.floor(x * step)
      const v = (buf[idx] - 128) / 128
      const amp = v * mid * 0.9
      const y = mid - amp
      if (x === 0) g.moveTo(x, y); else g.lineTo(x, y)
    }
    g.stroke()
    g.shadowBlur = 0
  })
}

export function useSound() {
  function play(type) {
    if (!ctx || !buffers[type]) return
    if (currentSource) {
      try { currentSource.stop() } catch(e) {}
      currentSource = null
    }
    const source = ctx.createBufferSource()
    source.buffer = buffers[type]
    source.playbackRate.value = 0.95 + Math.random() * 0.1
    source.connect(analyser)
    source.start()
    currentSource = source
  }

  function stop() {
    if (currentSource && ctx) {
      const gain = ctx.createGain()
      currentSource.disconnect()
      currentSource.connect(gain)
      gain.connect(analyser)
      gain.gain.setValueAtTime(1, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
      setTimeout(() => {
        try { currentSource.stop() } catch(e) {}
        currentSource = null
      }, 80)
    }
  }

  function attachVisualizer(canvas) {
    viz.push(canvas)
    if (!drawing) { drawing = true; requestAnimationFrame(drawLoop) }
  }

  return { ensure, play, stop, attachVisualizer }
}