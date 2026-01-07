import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import '../styles/CurveVisualization.css'

export default function CurveVisualization({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="visualization-container">
        <div className="empty-state">
          <p>Generate a curve to visualize amplification</p>
        </div>
      </div>
    )
  }

  const threshold = data[0]?.threshold || 0
  const ctValue = data.find(point => point.value >= threshold)?.cycle || null

  return (
    <div className="visualization-container">
      <div className="chart-header">
        <h2>Amplification Curve</h2>
        {ctValue && (
          <div className="ct-info">
            <span className="label">Ct Value:</span>
            <span className="value">{ctValue.toFixed(1)}</span>
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="cycle"
            label={{ value: 'PCR Cycle', position: 'insideBottomRight', offset: -5 }}
            stroke="#6b7280"
          />
          <YAxis
            label={{ value: 'Fluorescence', angle: -90, position: 'insideLeft' }}
            stroke="#6b7280"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            formatter={(value) => value.toFixed(2)}
          />
          <Legend />
          <ReferenceLine
            y={threshold}
            stroke="#ef4444"
            strokeDasharray="5 5"
            label={{ value: `Threshold (${threshold})`, position: 'right' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            dot={false}
            isAnimationActive={true}
            name="Fluorescence"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="chart-stats">
        <div className="stat">
          <span className="label">Max Fluorescence:</span>
          <span className="value">{Math.max(...data.map(d => d.value)).toFixed(2)}</span>
        </div>
        <div className="stat">
          <span className="label">Baseline:</span>
          <span className="value">{data[0]?.value.toFixed(2)}</span>
        </div>
        <div className="stat">
          <span className="label">Total Cycles:</span>
          <span className="value">{data.length}</span>
        </div>
      </div>
    </div>
  )
}
