import { useState, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import './App.css'
import { companions } from './data/companions'
import CompanionCard from './components/CompanionCard'
import GridOverlay from './components/GridOverlay'
import bgImage from './assets/background.png'


function getPosition(index, activeIndex, total) {
  if (index === activeIndex) return 'center'
  if (index === (activeIndex + 1) % total) return 'right'
  return 'left'
}

function App() {
  const [activeIndex, setActiveIndex]         = useState(0)
  const [gridVisible, setGridVisible]         = useState(false)
  const [colorVisible, setColorVisible]       = useState(true)
  const [visibilityMode, setVisibilityMode]   = useState(true)
  const [cardsVisible, setCardsVisible]       = useState(false)
  const [dragStartX, setDragStartX]           = useState(null)
  const [gameScreen, setGameScreen]           = useState('select')
  const [selectedCompanion, setSelectedCompanion] = useState(null)
  const [companionHue, setCompanionHue]       = useState(0)
  const [lockedHue, setLockedHue]             = useState(0)
  const [isHolding, setIsHolding]             = useState(false)
  const [particles, setParticles]             = useState([])
  const holdTimerRef                          = useRef(null)
  const particleTimerRef                      = useRef(null)
  const holdStartTimeRef                      = useRef(null)
  const hintRafRef                            = useRef(null)
  const hintRepeatTimerRef                    = useRef(null)
  const userHasSlidRef                        = useRef(false)
  const [readyParticles, setReadyParticles]   = useState([])
  const readyParticleTimerRef                 = useRef(null)

  const SWIPE_THRESHOLD = 40
  const total  = companions.length
  const active = companions[activeIndex]

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'g' || e.key === 'G') setGridVisible((v) => !v)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Hue hint animation — sweeps to green and back, repeats every 20s until user slides
  useEffect(() => {
    if (gameScreen !== 'customize') return

    userHasSlidRef.current = false

    const PEAK_HUE = 120
    const DURATION = 2000
    const REPEAT_DELAY = 20000

    const runHint = () => {
      if (userHasSlidRef.current) return

      const startTime = performance.now()

      const animate = (now) => {
        if (userHasSlidRef.current) return
        const progress = Math.min((now - startTime) / DURATION, 1)
        setCompanionHue(Math.round(PEAK_HUE * Math.sin(progress * Math.PI)))
        if (progress < 1) {
          hintRafRef.current = requestAnimationFrame(animate)
        } else {
          setCompanionHue(0)
          if (!userHasSlidRef.current) {
            hintRepeatTimerRef.current = setTimeout(runHint, REPEAT_DELAY)
          }
        }
      }

      hintRafRef.current = requestAnimationFrame(animate)
    }

    runHint()

    return () => {
      cancelAnimationFrame(hintRafRef.current)
      clearTimeout(hintRepeatTimerRef.current)
    }
  }, [gameScreen])

  // Ambient particles behind companion on the ready screen
  useEffect(() => {
    if (gameScreen !== 'ready') return

    const spawnParticle = () => {
      setReadyParticles(prev => [...prev, {
        id:   Date.now() + Math.random(),
        x:    Math.random() * 300,
        top:  120 + Math.random() * 180,
        tx:   (Math.random() - 0.5) * 50,
        size: 2 + Math.random() * 4,
      }])
      readyParticleTimerRef.current = setTimeout(spawnParticle, 80 + Math.random() * 100)
    }

    spawnParticle()

    return () => {
      clearTimeout(readyParticleTimerRef.current)
      setReadyParticles([])
    }
  }, [gameScreen])

  const advance = (dir) => {
    setActiveIndex((i) => (i + dir + total) % total)
  }

  const handleDragStart = (x) => setDragStartX(x)

  const handleDragEnd = (x) => {
    if (dragStartX === null) return
    const delta = x - dragStartX
    if (delta < -SWIPE_THRESHOLD) advance(1)
    else if (delta > SWIPE_THRESHOLD) advance(-1)
    setDragStartX(null)
  }

  const navigate = (action) => {
    if (!document.startViewTransition) { action(); return }
    document.startViewTransition(() => flushSync(action))
  }

  const handleSelectPress = () => {
    navigate(() => {
      setSelectedCompanion(active)
      setCompanionHue(0)
      setGameScreen('customize')
    })
  }

  const handleHoldStart = () => {
    setIsHolding(true)
    setParticles([])
    holdStartTimeRef.current = Date.now()

    const spawnParticle = () => {
      const elapsed  = Date.now() - holdStartTimeRef.current
      const progress = Math.min(elapsed / 1500, 1)

      setParticles(prev => [...prev, {
        id:   Date.now() + Math.random(),
        x:    63 + Math.random() * 264,
        top:  730 + Math.random() * 30,
        tx:   (Math.random() - 0.5) * 60,
        size: 2 + Math.random() * 2 + progress * 4,
      }])

      // interval shrinks from 220ms → 55ms as hold progresses
      const next = Math.max(55, 220 - progress * 165)
      particleTimerRef.current = setTimeout(spawnParticle, next)
    }

    spawnParticle()

    holdTimerRef.current = setTimeout(() => {
      clearTimeout(particleTimerRef.current)
      setIsHolding(false)
      setParticles([])
      handleSelectPress()
    }, 1500)
  }

  const handleHoldEnd = () => {
    clearTimeout(holdTimerRef.current)
    clearTimeout(particleTimerRef.current)
    holdTimerRef.current    = null
    particleTimerRef.current = null
    setIsHolding(false)
    setParticles([])
  }

  const handleColorSelect = () => {
    navigate(() => {
      setLockedHue(companionHue)
      setGameScreen('ready')
    })
  }

  const handleBackToSelect = () => {
    navigate(() => {
      setGameScreen('select')
      setCompanionHue(0)
      setLockedHue(0)
      setSelectedCompanion(null)
    })
  }

  return (
    <div className="viewport">
      <button
        className={`grid-toggle ${gridVisible ? 'active' : ''}`}
        onClick={() => setGridVisible((v) => !v)}
        title="Toggle grid (G)"
      >
        GRID
      </button>
      <button
        className={`color-toggle ${colorVisible ? 'active' : ''}`}
        onClick={() => setColorVisible((v) => !v)}
        title="Toggle color tints"
      >
        COLOR
      </button>
      <button
        className={`visibility-toggle ${visibilityMode ? 'active' : ''}`}
        onClick={() => setVisibilityMode((v) => !v)}
        title="Toggle visibility"
      >
        VISIBILITY
      </button>
      <button
        className={`cards-toggle ${cardsVisible ? 'active' : ''}`}
        onClick={() => setCardsVisible((v) => !v)}
        title="Toggle cards"
      >
        CARDS
      </button>

      <div className="phone-frame">
        <div className="screen">
          <div className="screen-bg" style={{ backgroundImage: `url(${bgImage})` }} />
          <GridOverlay visible={gridVisible} />

          {/* ── iPhone 16 status bar ── */}
          <div className="status-bar">
            <div className="dynamic-island" />
          </div>

          {/* ── Hold particles ── */}
          {particles.map(p => (
            <div
              key={p.id}
              className="hold-particle"
              style={{
                left:    `${p.x}px`,
                top:     `${p.top}px`,
                width:   `${p.size}px`,
                height:  `${p.size}px`,
                '--tx':  `${p.tx}px`,
              }}
              onAnimationEnd={() =>
                setParticles(prev => prev.filter(x => x.id !== p.id))
              }
            />
          ))}

          {/* ── Customize screen ── */}
          {gameScreen === 'customize' && (
            <div className="customize-screen">
              <h1 className="customize-title">CUSTOMIZE</h1>

              <div className="customize-companion-wrap">
                <div className="companion-backdrop" />
                <img
                  className="customize-companion-img"
                  src={selectedCompanion.image}
                  alt={selectedCompanion.name}
                  style={{ filter: `hue-rotate(${(companionHue - selectedCompanion.baseHue + 360) % 360}deg)` }}
                />
              </div>

              <h2 className="customize-name">{selectedCompanion.name}</h2>

              <div className="hue-slider-wrap">
                <input
                  type="range"
                  className="hue-slider"
                  min="0"
                  max="360"
                  value={companionHue}
                  onChange={(e) => {
                    userHasSlidRef.current = true
                    cancelAnimationFrame(hintRafRef.current)
                    clearTimeout(hintRepeatTimerRef.current)
                    setCompanionHue(Number(e.target.value))
                  }}
                />
              </div>

              <button
                className="color-select-btn"
                onClick={handleColorSelect}
                style={{ background: `hsla(${companionHue}, 65%, 55%, 0.4)` }}
              >
                SELECT
              </button>

            </div>
          )}

          {/* ── Ready screen ── */}
          {gameScreen === 'ready' && (
            <div className="ready-screen">
              <h1 className="ready-title">
                TIME TO START<br />LEARNING!
              </h1>

              <div className="ready-companion-wrap">
                <div className="companion-backdrop" />
                {readyParticles.map(p => (
                  <div
                    key={p.id}
                    className="ready-particle"
                    style={{
                      left:   `${p.x}px`,
                      top:    `${p.top}px`,
                      width:  `${p.size}px`,
                      height: `${p.size}px`,
                      '--tx': `${p.tx}px`,
                    }}
                    onAnimationEnd={() =>
                      setReadyParticles(prev => prev.filter(x => x.id !== p.id))
                    }
                  />
                ))}
                <img
                  className="ready-companion-img"
                  src={selectedCompanion.readyImage}
                  alt={selectedCompanion.name}
                  style={{ filter: `hue-rotate(${(lockedHue - selectedCompanion.baseHue + 360) % 360}deg)` }}
                />
              </div>

              <button
                className="ready-start-btn"
                onClick={handleBackToSelect}
                style={{ background: `hsla(${lockedHue}, 65%, 55%, 0.4)` }}
              >
                START
              </button>
            </div>
          )}

          {/* ── Select screen ── */}
          {gameScreen === 'select' && (
            <div className="screen-content">
              <header className="screen-header">
                <h1 className="screen-title">
                  Choose who you<br />will learn with
                </h1>
              </header>

              {/* ── Carousel ── */}
              <div
                className="carousel-stage"
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseUp={(e) => handleDragEnd(e.clientX)}
                onMouseLeave={() => setDragStartX(null)}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
                style={{ cursor: dragStartX !== null ? 'grabbing' : 'grab' }}
              >
                <div className="companion-backdrop carousel-backdrop" />
                {companions.map((companion, index) => {
                  const position = getPosition(index, activeIndex, total)
                  return (
                    <CompanionCard
                      key={companion.id}
                      companion={companion}
                      position={position}
                      colorVisible={colorVisible}
                      visibilityMode={visibilityMode}
                      cardsVisible={cardsVisible}
                      onClick={() => {
                        if (position === 'left')  advance(-1)
                        if (position === 'right') advance(1)
                      }}
                    />
                  )
                })}
              </div>

              {/* ── Select button ── */}
              <button
                className={`select-btn${colorVisible ? ` companion-${active.id}` : ''}${isHolding ? ' holding' : ''}`}
                onPointerDown={handleHoldStart}
                onPointerUp={handleHoldEnd}
                onPointerLeave={handleHoldEnd}
                onPointerCancel={handleHoldEnd}
              >
                <span className="select-btn-fill" />
                <span className="select-btn-label">SELECT</span>
              </button>

              {/* ── Info panel ── */}
              <div className={`info-panel${colorVisible ? ` companion-${active.id}` : ''}`}>
                <h2 className="info-name">{active.name}</h2>
                <div className="info-subject-group">
                  <p className="info-subject">{active.subject}</p>
                  <div className="info-sub-subjects">
                    {active.subSubjects.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
                <p className="info-flavor">"{active.flavorLine}"</p>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
