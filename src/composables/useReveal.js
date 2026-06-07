export function useReveal() {
  function init() {
    const reveals = [...document.querySelectorAll('.reveal')]

    function check() {
      const vh = window.innerHeight
      for (let i = reveals.length - 1; i >= 0; i--) {
        const r = reveals[i].getBoundingClientRect()
        if (r.top < vh * 0.9 && r.bottom > -40) {
          reveals[i].classList.add('in')
          reveals.splice(i, 1)
        }
      }
    }

    check()
    window.addEventListener('load', check)
    window.addEventListener('resize', check)
    window.addEventListener('scroll', check, { passive: true })
  }

  return { init }
}