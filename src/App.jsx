import { useState, useEffect } from 'react'
import './App.css'
import { companions } from './data/companions'
import CompanionCard from './components/CompanionCard'
import GridOverlay from './components/GridOverlay'

function getPosition(index, activeIndex, total) {
  if (index === activeIndex) return 'center'
  if (index === (activeIndex + 1) % total) return 'right'
  return 'left'
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [gridVisible, setGridVisible]  = useState(false)
  const [dragStartX, setDragStartX]    = useState(null)

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

  return (
    <div className="viewport">
      <button
        className={`grid-toggle ${gridVisible ? 'active' : ''}`}
        onClick={() => setGridVisible((v) => !v)}
        title="Toggle grid (G)"
      >
        GRID
      </button>

      <div className="phone-frame">
        <div className="screen">
          <div className="screen-bg" />
          <GridOverlay visible={gridVisible} />

          <div className="screen-content">
            <header className="screen-header">
              <h1 className="screen-title">
                Choose who will<br />you learn with
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
              {companions.map((companion, index) => {
                const position = getPosition(index, activeIndex, total)
                return (
                  <CompanionCard
                    key={companion.id}
                    companion={companion}
                    position={position}
                    onClick={() => {
                      if (position === 'left')  advance(-1)
                      if (position === 'right') advance(1)
                    }}
                  />
                )
              })}
            </div>

            {/* ── Info panel ── */}
            <div className="info-panel">
              <h2 className="info-name">{active.name}</h2>
              <p className="info-subject">{active.subject}</p>
              <div className="info-sub-subjects">
                {active.subSubjects.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <p className="info-flavor">"{active.flavorLine}"</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App
