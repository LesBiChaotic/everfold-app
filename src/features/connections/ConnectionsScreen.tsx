import React, { useState, useEffect, useMemo } from 'react';
import {
  Network,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  Filter,
  List,
  Layers,
  Sparkles,
  Info,
  CheckCircle,
  Move,
  X,
} from 'lucide-react';
import { SEEDED_USERS } from '../../data/users';
import { SEEDED_RELATIONSHIPS } from '../../data/relationships';
import { useARGStore } from '../../store/argStore';
import { Foldmark } from '../../components/brand/Foldmark';
import { soundEngine } from '../../audio/soundEngine';

interface GraphNode {
  id: string;
  label: string;
  type: 'person' | 'archived' | 'relationship' | 'place' | 'case';
  x: number;
  y: number;
  platform?: string;
  active?: boolean;
}

interface GraphEdge {
  source: string;
  target: string;
  type: 'matched' | 'role_similarity' | 'recurrence' | 'forecast_dependency';
  label?: string;
}

export const ConnectionsScreen: React.FC = () => {
  const [viewMode, setViewMode] = useState<'graph' | 'list'>('graph');
  const [activeCategory, setActiveCategory] = useState<'people' | 'interests' | 'recurrence'>('people');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Graph Alignment Puzzle State
  const [puzzleOverlayOffset, setPuzzleOverlayOffset] = useState({ x: 45, y: 35, rot: 15 });
  const [puzzleAligned, setPuzzleAligned] = useState(false);

  const { stage, solvePuzzle, solvedPuzzleIds, recordVisit } = useARGStore();

  useEffect(() => {
    recordVisit('connections');
  }, [recordVisit]);

  const nodes: GraphNode[] = useMemo(() => {
    const list: GraphNode[] = [
      { id: 'usr_visitor', label: 'You (Alex Rivers)', type: 'person', x: 380, y: 240, active: true },
      { id: 'usr_naomi_serrano', label: 'Naomi Serrano', type: 'person', x: 230, y: 140 },
      { id: 'usr_hana_prasetyo', label: 'Hana Prasetyo', type: 'person', x: 530, y: 140 },
      { id: 'usr_mina_okafor', label: 'Mina Okafor', type: 'person', x: 230, y: 340 },
      { id: 'usr_dev_malik', label: 'Dev Malik', type: 'person', x: 530, y: 340 },
      { id: 'usr_camille_renaud', label: 'Camille Renaud', type: 'person', x: 120, y: 240 },
      { id: 'usr_morgan_bell', label: 'Morgan Bell', type: 'person', x: 640, y: 240 },
    ];

    if (stage >= 3 || activeCategory === 'recurrence') {
      list.push(
        { id: 'usr_meredith_cole', label: 'Meredith Cole [1999/2015]', type: 'archived', x: 230, y: 50, platform: 'Fold/Pairwise' },
        { id: 'usr_leah_morgan', label: 'Leah Morgan [2003]', type: 'archived', x: 530, y: 50, platform: 'Affinity Room' },
        { id: 'usr_previouslymatched', label: '@previouslymatched [1999–2026]', type: 'archived', x: 380, y: 70, platform: 'Slot 01 Invariant' },
        { id: 'rel_2347_previouslymatched', label: 'REL-2347 Container', type: 'relationship', x: 380, y: 155 }
      );
    }

    return list;
  }, [stage, activeCategory]);

  const edges: GraphEdge[] = useMemo(() => {
    const list: GraphEdge[] = [
      { source: 'usr_visitor', target: 'usr_naomi_serrano', type: 'matched', label: '94%' },
      { source: 'usr_visitor', target: 'usr_hana_prasetyo', type: 'matched', label: '97%' },
      { source: 'usr_visitor', target: 'usr_mina_okafor', type: 'matched', label: '91%' },
      { source: 'usr_visitor', target: 'usr_dev_malik', type: 'matched', label: '89%' },
      { source: 'usr_visitor', target: 'usr_camille_renaud', type: 'matched', label: '88%' },
      { source: 'usr_visitor', target: 'usr_morgan_bell', type: 'matched', label: '93%' },
    ];

    if (stage >= 3 || activeCategory === 'recurrence') {
      list.push(
        { source: 'usr_meredith_cole', target: 'usr_naomi_serrano', type: 'role_similarity', label: 'Role Vector' },
        { source: 'usr_previouslymatched', target: 'usr_visitor', type: 'recurrence', label: 'Continuity 99.8%' },
        { source: 'rel_2347_previouslymatched', target: 'usr_previouslymatched', type: 'forecast_dependency', label: 'Invariant' },
        { source: 'rel_2347_previouslymatched', target: 'usr_visitor', type: 'forecast_dependency', label: 'Current Slot' }
      );
    }

    return list;
  }, [stage, activeCategory]);

  const handleNodeClick = (node: GraphNode) => {
    soundEngine.playCue('ui.navigation');
    setSelectedNode(node);
  };

  const handleAlignPuzzle = () => {
    soundEngine.playCue('ui.success');
    setPuzzleOverlayOffset({ x: 0, y: 0, rot: 0 });
    setPuzzleAligned(true);
    solvePuzzle('gate_graph_alignment');
  };

  return (
    <div
      className="connections-screen"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {/* Header & Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Relational Cartography & Network Topology
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', margin: '2px 0 0 0' }}>
            Multi-layered topological graph of affinity vectors, shared contexts, and historical continuity.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <div style={{ display: 'flex', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '2px' }}>
            <button
              onClick={() => setActiveCategory('people')}
              className="btn-ghost"
              style={{
                padding: '0 var(--space-3)',
                height: '32px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: activeCategory === 'people' ? 700 : 500,
                backgroundColor: activeCategory === 'people' ? 'var(--bg-surface-subtle)' : 'transparent',
                color: activeCategory === 'people' ? 'var(--accent-plum)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Active Network
            </button>
            <button
              onClick={() => setActiveCategory('interests')}
              className="btn-ghost"
              style={{
                padding: '0 var(--space-3)',
                height: '32px',
                fontSize: 'var(--font-size-xs)',
                fontWeight: activeCategory === 'interests' ? 700 : 500,
                backgroundColor: activeCategory === 'interests' ? 'var(--bg-surface-subtle)' : 'transparent',
                color: activeCategory === 'interests' ? 'var(--accent-plum)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Affinity Vectors
            </button>
            {stage >= 3 && (
              <button
                onClick={() => setActiveCategory('recurrence')}
                className="btn-ghost"
                style={{
                  padding: '0 var(--space-3)',
                  height: '32px',
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: activeCategory === 'recurrence' ? 700 : 500,
                  backgroundColor: activeCategory === 'recurrence' ? 'var(--bg-surface-subtle)' : 'transparent',
                  color: 'var(--accent-plum)',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                Historical Recurrence
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left Graph Canvas, Right Docked Node Inspector */}
      <div className="ef-split-panel" style={{ height: '620px' }}>
        {/* Left Interactive SVG Graph Canvas */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'var(--bg-surface)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Canvas Floating Toolbar */}
          <div
            style={{
              position: 'absolute',
              top: 'var(--space-3)',
              left: 'var(--space-3)',
              display: 'flex',
              gap: 'var(--space-1)',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '2px',
              boxShadow: 'var(--shadow-sm)',
              zIndex: 10,
            }}
          >
            <button
              className="btn-ghost"
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.0))}
              title="Zoom In"
              style={{ width: 32, height: 32, padding: 0 }}
            >
              <ZoomIn size={15} />
            </button>
            <button
              className="btn-ghost"
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
              title="Zoom Out"
              style={{ width: 32, height: 32, padding: 0 }}
            >
              <ZoomOut size={15} />
            </button>
            <button
              className="btn-ghost"
              onClick={() => {
                setZoomLevel(1);
                setPanOffset({ x: 0, y: 0 });
              }}
              title="Reset View"
              style={{ width: 32, height: 32, padding: 0 }}
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* SVG Canvas */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 760 480"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="15" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
              </marker>
            </defs>

            {/* Edges / Relationship Lines */}
            {edges.map((edge, i) => {
              const src = nodes.find((n) => n.id === edge.source);
              const tgt = nodes.find((n) => n.id === edge.target);
              if (!src || !tgt) return null;

              const isAnom = edge.type === 'recurrence' || edge.type === 'role_similarity';

              return (
                <g key={i}>
                  <line
                    x1={src.x}
                    y1={src.y}
                    x2={tgt.x}
                    y2={tgt.y}
                    stroke={isAnom ? 'var(--accent-plum)' : 'var(--border-strong)'}
                    strokeWidth={isAnom ? 2 : 1.5}
                    strokeDasharray={isAnom ? '4 3' : 'none'}
                    opacity={0.85}
                  />
                  {edge.label && (
                    <text
                      x={(src.x + tgt.x) / 2}
                      y={(src.y + tgt.y) / 2 - 6}
                      fill="var(--text-muted)"
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                      style={{ userSelect: 'none' }}
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isVisitor = node.id === 'usr_visitor';
              const isArchived = node.type === 'archived';

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => handleNodeClick(node)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle
                    r={isVisitor ? 22 : isArchived ? 18 : 16}
                    fill={isVisitor ? 'var(--accent-plum)' : isArchived ? 'var(--bg-surface-subtle)' : 'var(--bg-surface)'}
                    stroke={isSelected ? 'var(--accent-plum)' : isArchived ? 'var(--border-strong)' : 'var(--border-strong)'}
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  <text
                    y={isVisitor ? 34 : 30}
                    textAnchor="middle"
                    fill="var(--text-primary)"
                    fontSize="11"
                    fontWeight={isVisitor || isSelected ? '700' : '500'}
                    style={{ userSelect: 'none' }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right Docked Node Inspector (Section 19) */}
        <div
          style={{
            padding: 'var(--space-4)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          {selectedNode ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-plum" style={{ fontSize: '0.68rem', marginBottom: '4px' }}>
                    {selectedNode.type.toUpperCase()}
                  </span>
                  <h3 style={{ fontSize: 'var(--font-size-md)', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {selectedNode.label}
                  </h3>
                </div>
                <button className="btn-ghost" onClick={() => setSelectedNode(null)} style={{ width: 28, height: 28, padding: 0 }}>
                  <X size={16} />
                </button>
              </div>

              <div className="ef-card-subtle">
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Topological Vector ID
                </div>
                <div className="font-mono" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-primary)', marginTop: '2px' }}>
                  {selectedNode.id}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Connected Affinities
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {edges
                    .filter((e) => e.source === selectedNode.id || e.target === selectedNode.id)
                    .map((e, idx) => (
                      <div key={idx} style={{ fontSize: 'var(--font-size-xs)', padding: 'var(--space-2)', backgroundColor: 'var(--bg-surface-subtle)', borderRadius: 'var(--radius-sm)' }}>
                        Connected to: <strong>{e.source === selectedNode.id ? e.target : e.source}</strong> ({e.label || e.type})
                      </div>
                    ))}
                </div>
              </div>

              {selectedNode.type === 'archived' && (
                <div className="ef-card-featured">
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-plum)' }}>
                    Archival Continuity Invariant
                  </div>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    This participant node has maintained identical behavioral vectors across successive platform iterations.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', margin: 'auto 0', padding: 'var(--space-4)' }}>
              <Network size={36} color="var(--text-muted)" style={{ margin: '0 auto var(--space-2)' }} />
              <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--text-primary)' }}>Select a Network Node</div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                Click any participant or connection in the cartography canvas to inspect relational vectors.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
