import '../styles/CurveHistory.css'

export default function CurveHistory({ curves, selectedId, onSelect }) {
  if (curves.length === 0) {
    return (
      <div className="history-container">
        <h2>History</h2>
        <p className="empty">No saved curves yet</p>
      </div>
    )
  }

  return (
    <div className="history-container">
      <h2>History</h2>
      <div className="curves-list">
        {curves.map((curve) => (
          <button
            key={curve.id}
            className={`curve-item ${selectedId === curve.id ? 'active' : ''}`}
            onClick={() => onSelect(curve.id, curve.data)}
          >
            <div className="curve-info">
              <p className="curve-name">{curve.name}</p>
              <p className="curve-meta">
                Ct: {curve.parameters?.cycleThreshold?.toFixed(1)}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
