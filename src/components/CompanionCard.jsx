import './CompanionCard.css'

function CompanionCard({ companion, position, onClick }) {
  return (
    <div
      className={`companion-card position-${position}`}
      onClick={onClick}
    >
      <div className="card-image-wrap">
        <div
          className="card-image-placeholder"
          style={{ background: companion.placeholderValue }}
        >
          <span className="card-initial">{companion.name[0]}</span>
        </div>
      </div>

      <div className="card-info">
        <h2 className="card-name">{companion.name}</h2>
        <p className="card-subject">{companion.subject}</p>
      </div>
    </div>
  )
}

export default CompanionCard
