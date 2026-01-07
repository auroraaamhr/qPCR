import { useState } from 'react'
import '../styles/ParameterForm.css'

export default function ParameterForm({ onGenerate }) {
  const [params, setParams] = useState({
    name: 'Sample 1',
    baseline: 50,
    threshold: 100,
    cycleThreshold: 25,
    maxValue: 500,
    noise: 0.02,
  })

  const [generating, setGenerating] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setParams(prev => ({
      ...prev,
      [name]: name === 'name' ? value : parseFloat(value),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setGenerating(true)
    setTimeout(() => {
      onGenerate(params)
      setGenerating(false)
    }, 100)
  }

  return (
    <form className="parameter-form" onSubmit={handleSubmit}>
      <h2>Parameters</h2>

      <div className="form-group">
        <label htmlFor="name">Sample Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={params.name}
          onChange={handleChange}
          placeholder="e.g., Sample A"
        />
      </div>

      <div className="form-group">
        <label htmlFor="baseline">
          Baseline Value
          <span className="value">{params.baseline.toFixed(1)}</span>
        </label>
        <input
          id="baseline"
          type="range"
          name="baseline"
          min="10"
          max="100"
          step="1"
          value={params.baseline}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="threshold">
          Threshold
          <span className="value">{params.threshold.toFixed(1)}</span>
        </label>
        <input
          id="threshold"
          type="range"
          name="threshold"
          min="50"
          max="300"
          step="5"
          value={params.threshold}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cycleThreshold">
          Ct Value (Cycle Threshold)
          <span className="value">{params.cycleThreshold.toFixed(1)}</span>
        </label>
        <input
          id="cycleThreshold"
          type="range"
          name="cycleThreshold"
          min="10"
          max="40"
          step="0.5"
          value={params.cycleThreshold}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="maxValue">
          Max Fluorescence
          <span className="value">{params.maxValue.toFixed(0)}</span>
        </label>
        <input
          id="maxValue"
          type="range"
          name="maxValue"
          min="200"
          max="1000"
          step="10"
          value={params.maxValue}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="noise">
          Noise Level
          <span className="value">{(params.noise * 100).toFixed(1)}%</span>
        </label>
        <input
          id="noise"
          type="range"
          name="noise"
          min="0.01"
          max="0.1"
          step="0.01"
          value={params.noise}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="btn-generate"
        disabled={generating}
      >
        {generating ? 'Generating...' : 'Generate Curve'}
      </button>
    </form>
  )
}
