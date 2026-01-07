import { useState, useEffect } from 'react'
import ParameterForm from './components/ParameterForm'
import CurveVisualization from './components/CurveVisualization'
import CurveHistory from './components/CurveHistory'
import { generateAmplificationCurve } from './lib/qpcrGenerator'
import { saveCurve, loadCurves } from './lib/supabaseClient'
import './styles/App.css'

export default function App() {
  const [curves, setCurves] = useState([])
  const [currentCurve, setCurrentCurve] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCurveId, setSelectedCurveId] = useState(null)

  useEffect(() => {
    loadInitialCurves()
  }, [])

  const loadInitialCurves = async () => {
    try {
      const data = await loadCurves()
      setCurves(data)
      if (data.length > 0) {
        setCurrentCurve(data[0].data)
        setSelectedCurveId(data[0].id)
      }
    } catch (error) {
      console.error('Failed to load curves:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateCurve = async (params) => {
    const data = generateAmplificationCurve(
      params.baseline,
      params.threshold,
      params.cycleThreshold,
      params.maxValue,
      params.noise
    )

    setCurrentCurve(data)

    try {
      const savedCurve = await saveCurve({
        name: params.name,
        parameters: params,
        data: data,
      })
      setCurves([savedCurve, ...curves])
      setSelectedCurveId(savedCurve.id)
    } catch (error) {
      console.error('Failed to save curve:', error)
    }
  }

  const handleSelectCurve = (id, data) => {
    setSelectedCurveId(id)
    setCurrentCurve(data)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>qPCR Curve Visualizer</h1>
        <p className="subtitle">Real-time PCR amplification analysis</p>
      </header>

      <div className="app-container">
        <div className="left-panel">
          <ParameterForm onGenerate={handleGenerateCurve} />
          {!loading && curves.length > 0 && (
            <CurveHistory
              curves={curves}
              selectedId={selectedCurveId}
              onSelect={handleSelectCurve}
            />
          )}
        </div>

        <div className="right-panel">
          {currentCurve && <CurveVisualization data={currentCurve} />}
        </div>
      </div>
    </div>
  )
}
