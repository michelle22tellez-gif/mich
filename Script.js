/* ─────────────────────────────────────────────────────────────
   Boda Amalia & Ramón · script.js
   ───────────────────────────────────────────────────────────── */

/* ── 1. PEARL RAIN ────────────────────────────────────────── */
(function initPearls() {
  const container = document.getElementById('petals')
  if (!container) return

  const COUNT = 28

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div')
    p.className = 'pearl'

    // vary size: mix of small (3-7px) and occasional larger (8-13px) pearls
    const size = Math.random() < 0.75
      ? 3 + Math.random() * 5     // small majority
      : 8 + Math.random() * 6     // occasional larger

    // random horizontal sway (used in CSS custom property)
    const sway = (Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 30)

    p.style.cssText = `
      left:               ${Math.random() * 100}%;
      width:              ${size}px;
      height:             ${size}px;
      --sway:             ${sway}px;
      animation-duration: ${7 + Math.random() * 10}s;
      animation-delay:    ${Math.random() * 12}s;
      opacity:            0;
    `
    container.appendChild(p)
  }
})()

/* ── 2. COUNTDOWN ─────────────────────────────────────────── */
;(function initCountdown() {
  const TARGET = new Date('2026-12-19T20:00:00')

  const elDays  = document.getElementById('cd-days')
  const elHours = document.getElementById('cd-hours')
  const elMins  = document.getElementById('cd-mins')
  const elSecs  = document.getElementById('cd-secs')

  if (!elDays) return

  function pad(n) { return String(n).padStart(2, '0') }

  function tick() {
    const now  = new Date()
    const diff = TARGET - now

    if (diff <= 0) {
      elDays.textContent  = '0'
      elHours.textContent = '00'
      elMins.textContent  = '00'
      elSecs.textContent  = '00'
      return
    }

    const days  = Math.floor(diff / 86400000)
    const hours = Math.floor((diff % 86400000) / 3600000)
    const mins  = Math.floor((diff % 3600000)  / 60000)
    const secs  = Math.floor((diff % 60000)    / 1000)

    elDays.textContent  = days
    elHours.textContent = pad(hours)
    elMins.textContent  = pad(mins)

    // flash animation on seconds
    const newSec = pad(secs)
    if (elSecs.textContent !== newSec) {
      elSecs.style.opacity = '0.3'
      setTimeout(() => { elSecs.style.opacity = '1' }, 180)
      elSecs.textContent = newSec
    }
  }

  tick()
  setInterval(tick, 1000)
})()

/* ── 3. SCROLL REVEAL ─────────────────────────────────────── */
;(function initReveal() {
  const targets = document.querySelectorAll('.reveal')
  if (!targets.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.14 }
  )

  targets.forEach(t => observer.observe(t))
})()

/* ── 4. SMOOTH NAV (if nav links exist) ───────────────────── */
;(function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1)
      const target = document.getElementById(id)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  })
})()