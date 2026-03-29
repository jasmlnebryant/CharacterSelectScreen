import './GridOverlay.css'

const COLUMNS     = 4
const MARGIN      = 16
const GUTTER      = 8
const ROW_HEIGHT  = 10   // label every 10px
const FRAME_H     = 844
const COL_LETTERS = ['A', 'B', 'C', 'D']
const rowCount    = Math.floor(FRAME_H / ROW_HEIGHT)

function GridOverlay({ visible }) {
  if (!visible) return null

  return (
    <div className="grid-overlay">

      {/* ── Column bands ── */}
      <div className="grid-columns" style={{
        display: 'grid',
        gridTemplateColumns: `${MARGIN}px repeat(${COLUMNS}, 1fr) ${MARGIN}px`,
        gap: `0 ${GUTTER}px`,
        height: '100%',
      }}>
        <div className="grid-margin" />
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div key={i} className="grid-column">
            <span className="grid-col-label">{COL_LETTERS[i]}</span>
          </div>
        ))}
        <div className="grid-margin" />
      </div>

      {/* ── Baseline lines ── */}
      <div className="grid-baseline" />

      {/* ── Center lines ── */}
      <div className="grid-center-h" />
      <div className="grid-center-v" />

      {/* ── Row numbers ── */}
      <div className="grid-rows">
        {Array.from({ length: rowCount }).map((_, i) => {
          const px = (i + 1) * ROW_HEIGHT
          const isMajor = px % 40 === 0
          return (
            <div
              key={i}
              className={`grid-row-label ${isMajor ? 'major' : 'minor'}`}
              style={{ top: px }}
            >
              {px}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default GridOverlay
