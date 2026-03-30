import './CompanionCard.css'

function CompanionCard({ companion, position, colorVisible, visibilityMode, cardsVisible, onClick }) {
  const isSilhouette = visibilityMode && position !== 'center'
  return (
    <div
      className={`companion-card position-${position}${colorVisible && position === 'center' ? ` companion-${companion.id}` : ''}${isSilhouette ? ' is-silhouette' : ''}${!cardsVisible ? ' no-card' : ''}`}
      data-companion={companion.id}
      onClick={onClick}
    >
      <div className="card-image-wrap">
        <img
          className="card-image"
          src={companion.image}
          alt={companion.name}
        />
      </div>

      <div className="card-info">
        <h2 className="card-name">{companion.name}</h2>
        <p className="card-subject">{companion.subject}</p>
      </div>
    </div>
  )
}

export default CompanionCard
