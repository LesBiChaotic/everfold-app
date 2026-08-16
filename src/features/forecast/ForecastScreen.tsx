import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import {
  TrendingUp,
  Sliders,
  AlertCircle,
  Calendar,
  Sparkles,
  Lock,
  Unlock,
  CheckCircle,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { SEEDED_FORECASTS, applyForecastScenario } from '../../data/forecasts';
import { useARGStore } from '../../store/argStore';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

export const ForecastScreen: React.FC = () => {
  const { relationshipId } = useParams<{ relationshipId?: string }>();
  const navigate = useNavigate();
  const [selectedRelId, setSelectedRelId] = useState<string>(relationshipId || 'rel_9918_naomi');
  const [timeHorizon, setTimeHorizon] = useState<'30days' | '6months' | '1year'>('30days');
  const [rawCodeInput, setRawCodeInput] = useState('');
  const [rawUnlocked, setRawUnlocked] = useState(false);
  const [rawError, setRawError] = useState('');

  const [activeScenarios, setActiveScenarios] = useState<Record<string, boolean>>({
    'New Job': false,
    'Relocation': false,
    'Long Distance': false,
    'Schedule Change': false,
    'Family Pressure': false,
    'Financial Stress': false,
    'Cohabitation': false,
  });

  const { stage, solvePuzzle, solvedPuzzleIds, recordVisit } = useARGStore();

  useEffect(() => {
    recordVisit('forecast');
  }, [recordVisit]);

  const baseForecast =
    SEEDED_FORECASTS[
      selectedRelId === 'rel_4417_meredith'
        ? 'fc_4417_raw'
        : selectedRelId === 'rel_2347_previouslymatched'
        ? 'fc_2347_final_raw'
        : selectedRelId === 'rel_7734_hana'
        ? 'fc_7734_hana'
        : selectedRelId === 'rel_8821_mina'
        ? 'fc_8821_mina'
        : 'fc_9918_naomi'
    ];

  const currentForecast = useMemo(() => {
    if (!baseForecast) return SEEDED_FORECASTS['fc_9918_naomi'];
    return applyForecastScenario(baseForecast, activeScenarios);
  }, [baseForecast, activeScenarios]);

  const toggleScenario = (scenarioName: string) => {
    soundEngine.playCue('ui.save');
    setActiveScenarios((prev) => ({ ...prev, [scenarioName]: !prev[scenarioName] }));
  };

  const handleRawCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rawCodeInput.trim() === '97.2') {
      soundEngine.playCue('ui.success');
      setRawUnlocked(true);
      setRawError('');
      solvePuzzle('gate_97_2_forecast');
    } else {
      soundEngine.playCue('ui.failure');
      setRawError('Calibration Error: Invalid diagnostic code. Expected: 97.2');
    }
  };

  return (
    <div
      className="forecast-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header & Relationship Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Relationship Forecast Engine
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
            Longitudinal trajectory modeling, stress-point calibrations, and relational milestones.
          </p>
        </div>

        {/* Relationship Selector */}
        <select
          className="select"
          value={selectedRelId}
          onChange={(e) => {
            soundEngine.playCue('ui.navigation');
            setSelectedRelId(e.target.value);
          }}
          style={{ maxWidth: '290px', minHeight: '38px', fontWeight: 600 }}
        >
          <option value="rel_9918_naomi">Naomi Serrano (Rel-9918)</option>
          <option value="rel_8821_mina">Mina Okafor (Rel-8821)</option>
          <option value="rel_7734_hana">Hana Prasetyo (Rel-7734)</option>
          {(stage >= 4 || solvedPuzzleIds.includes('gate_4417_meredith')) && (
            <option value="rel_4417_meredith">Meredith Cole [Posthumous / Rel-4417]</option>
          )}
          {(stage >= 6 || solvedPuzzleIds.includes('gate_10_previouslymatched')) && (
            <option value="rel_2347_previouslymatched">@previouslymatched [Rel-2347 Invariant]</option>
          )}
        </select>
      </div>

      {/* Trajectory Score Hero Banner */}
      <div
        className={currentForecast.isRaw ? 'ef-card-featured' : 'ef-card'}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          borderLeft: currentForecast.isRaw ? '4px solid var(--accent-plum)' : '4px solid var(--accent-plum)',
          backgroundColor: currentForecast.isRaw ? 'var(--arg-anomaly-surface)' : 'var(--bg-card)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            OVERALL CONTINUITY CONFIDENCE
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', marginTop: '2px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: 'var(--accent-plum)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              {currentForecast.overallScore}%
            </h2>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {currentForecast.title}
            </span>
          </div>
        </div>

        {/* Time Horizon Toggles */}
        <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface-subtle)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          {(['30days', '6months', '1year'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setTimeHorizon(h)}
              className="btn-ghost"
              style={{
                padding: '0 var(--space-3)',
                height: '32px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: timeHorizon === h ? 700 : 500,
                backgroundColor: timeHorizon === h ? 'var(--bg-surface)' : 'transparent',
                color: timeHorizon === h ? 'var(--accent-plum)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
                boxShadow: timeHorizon === h ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {h === '30days' ? '30 Days' : h === '6months' ? '6 Months' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Metrics Tiles */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Communication Pressure</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            {currentForecast.communicationPressure}%
          </div>
        </div>
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Schedule Fit</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            {currentForecast.scheduleFit}%
          </div>
        </div>
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Relocation Pressure</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            {currentForecast.relocationPressure}%
          </div>
        </div>
        <div className="ef-card-subtle">
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Goal Convergence</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            {currentForecast.goalConvergence}%
          </div>
        </div>
      </div>

      {/* Scenario Stress Testing Section */}
      <div className="ef-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
          <Sliders size={18} color="var(--accent-plum)" />
          <span style={{ fontWeight: 800, fontSize: 'var(--font-size-md)', color: 'var(--text-primary)' }}>
            Scenario Stress Testing
          </span>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
          Toggle hypothetical life event stressors to evaluate relational resiliency and trajectory stability.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {Object.keys(activeScenarios).map((sc) => (
            <button
              key={sc}
              onClick={() => toggleScenario(sc)}
              className="badge"
              style={{
                backgroundColor: activeScenarios[sc] ? 'var(--accent-plum)' : 'var(--bg-surface-subtle)',
                color: activeScenarios[sc] ? 'var(--text-inverse)' : 'var(--text-primary)',
                padding: '0.4rem 0.85rem',
                fontSize: 'var(--font-size-xs)',
                fontWeight: activeScenarios[sc] ? 700 : 500,
                cursor: 'pointer',
                border: '1px solid',
                borderColor: activeScenarios[sc] ? 'var(--accent-plum)' : 'var(--border-subtle)',
              }}
            >
              {sc} {activeScenarios[sc] ? '✓' : '+'}
            </button>
          ))}
        </div>
      </div>

      {/* Trajectory Milestones & Friction Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
        <div className="ef-card">
          <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
            Projected Key Strengths & Milestones
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {currentForecast.strengths.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: 'var(--radius-full)', backgroundColor: 'var(--accent-surface)', color: 'var(--accent-plum)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {m}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ef-card">
          <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
            Friction Points & Stress Risk Calibration
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {currentForecast.stressPoints.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                <AlertCircle size={16} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {f}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Raw Diagnostic Calibration Gate */}
      {(stage >= 4 || rawUnlocked) && (
        <div className="ef-card-featured" style={{ borderColor: 'var(--border-strong)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <Unlock size={18} color="var(--accent-plum)" />
            <h3 style={{ fontWeight: 800, fontSize: 'var(--font-size-md)', color: 'var(--text-primary)' }}>
              Diagnostic Model Override (Code: 97.2)
            </h3>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
            Internal laboratory calibration override. Input diagnostic confidence parameter to expose raw telemetry.
          </p>

          <form onSubmit={handleRawCodeSubmit} style={{ display: 'flex', gap: 'var(--space-2)', maxWidth: '400px' }}>
            <input
              type="text"
              className="input font-mono"
              placeholder="Enter parameter..."
              value={rawCodeInput}
              onChange={(e) => setRawCodeInput(e.target.value)}
              style={{ flex: 1, minHeight: '36px', fontSize: 'var(--font-size-xs)' }}
            />
            <button type="submit" className="btn btn-secondary btn-sm">
              Calibrate
            </button>
          </form>
          {rawError && <div style={{ color: 'var(--color-error)', fontSize: '0.75rem', marginTop: '6px' }}>{rawError}</div>}
          {rawUnlocked && <div style={{ color: 'var(--color-success)', fontSize: '0.75rem', marginTop: '6px', fontWeight: 600 }}>Override calibrated successfully. Telemetry unlocked.</div>}
        </div>
      )}
    </div>
  );
};
