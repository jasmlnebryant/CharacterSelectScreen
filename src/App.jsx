import { useState, useEffect } from 'react'
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

  const handleSelectPress = () => {
    setSelectedCompanion(active)
    setCompanionHue(0)
    setGameScreen('customize')
  }

  const handleColorSelect = () => {
    setLockedHue(companionHue)
    setGameScreen('ready')
  }

  const handleBackToSelect = () => {
    setGameScreen('select')
    setCompanionHue(0)
    setLockedHue(0)
    setSelectedCompanion(null)
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
                  onChange={(e) => setCompanionHue(Number(e.target.value))}
                />
              </div>

              <button
                className="color-select-btn"
                onClick={handleColorSelect}
                style={{ background: `hsla(${companionHue}, 65%, 55%, 0.4)` }}
              >
                SELECT
              </button>

              <button className="back-btn" onClick={handleBackToSelect}>
                BACK
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
                className={`select-btn${colorVisible ? ` companion-${active.id}` : ''}`}
                onClick={handleSelectPress}
              >
                SELECT
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
