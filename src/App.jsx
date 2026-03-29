import { useState } from 'react'

const celebrations = [
  "nice.", "okay!", "again?", "you're on a roll 🎲", "unstoppable.",
  "click machine.", "legend.", "okay okay okay.", "wow.", "incredible.",
]

function App() {
  const [count, setCount] = useState(0)

  const message = count === 0
    ? 'press the button.'
    : celebrations[(count - 1) % celebrations.length]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '24px',
      fontFamily: 'monospace',
      background: '#0f0f0f',
      color: '#f0f0f0',
    }}>
      <p style={{ fontSize: '14px', letterSpacing: '0.1em', opacity: 0.5 }}>
        {message}
      </p>
      <button
        onClick={() => setCount(c => c + 1)}
        style={{
          padding: '16px 40px',
          fontSize: '18px',
          background: 'transparent',
          color: '#f0f0f0',
          border: '1px solid #f0f0f0',
          cursor: 'pointer',
          letterSpacing: '0.15em',
        }}
      >
        click me
      </button>
      {count > 0 && (
        <p style={{ fontSize: '48px', fontWeight: 'bold' }}>
          {count}
        </p>
      )}
    </div>
  )
}

export default App
