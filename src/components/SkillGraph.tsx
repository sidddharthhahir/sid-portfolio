import { useMemo, useState } from 'react';
import { PORTFOLIO } from '@/config/portfolio';

const COLOR_HEX: Record<string, string> = {
  red: '#f87171',
  emerald: '#34d399',
  amber: '#fbbf24',
  purple: '#c084fc',
  blue: '#60a5fa',
};

const W = 780;
const H = 460;
const CX = W / 2;
const CY = H / 2;
const CATEGORY_RADIUS = 150;
const SKILL_RADIUS = 92;

interface Props {
  onSkillClick: (linkedProject: string | null) => void;
}

/**
 * The hero's constellation motif, made literal and useful: skills as nodes
 * clustered by category around a central hub, connected like the actual
 * dependency graph a retrieval/agent system would have. Same click-to-jump
 * behaviour as the badge list below it — this is a visual summary layered
 * on top, not a replacement (the badge list stays the accessible source
 * of truth for keyboard/screen-reader users and small screens).
 */
export const SkillGraph = ({ onSkillClick }: Props) => {
  const { skills } = PORTFOLIO;
  const [hovered, setHovered] = useState<string | null>(null);

  const layout = useMemo(() => {
    const categories = skills.map((cat, i) => {
      const angle = -90 + i * (360 / skills.length);
      const rad = (angle * Math.PI) / 180;
      const cx = CX + CATEGORY_RADIUS * Math.cos(rad);
      const cy = CY + CATEGORY_RADIUS * Math.sin(rad);

      const spread = Math.min(120, cat.items.length * 22);
      const nodes = cat.items.map((skill, j) => {
        const t = cat.items.length === 1 ? 0.5 : j / (cat.items.length - 1);
        const nodeAngle = angle - spread / 2 + t * spread;
        const nodeRad = (nodeAngle * Math.PI) / 180;
        const x = cx + SKILL_RADIUS * Math.cos(nodeRad);
        const y = cy + SKILL_RADIUS * Math.sin(nodeRad);
        return { ...skill, x, y, color: COLOR_HEX[cat.color] ?? COLOR_HEX.blue };
      });

      return { ...cat, cx, cy, nodes, color: COLOR_HEX[cat.color] ?? COLOR_HEX.blue };
    });
    return categories;
  }, [skills]);

  return (
    <div className="hidden lg:block w-full mb-6">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-hidden="true">
        {/* hub -> category lines */}
        {layout.map((cat, i) => (
          <line
            key={`hub-${i}`}
            x1={CX} y1={CY} x2={cat.cx} y2={cat.cy}
            stroke={cat.color} strokeOpacity={0.18} strokeWidth={1}
          />
        ))}
        {/* category -> skill lines */}
        {layout.map(cat =>
          cat.nodes.map((n, j) => (
            <line
              key={`${cat.category}-line-${j}`}
              x1={cat.cx} y1={cat.cy} x2={n.x} y2={n.y}
              stroke={n.color}
              strokeOpacity={hovered === n.name ? 0.55 : 0.15}
              strokeWidth={1}
              style={{ transition: 'stroke-opacity 150ms' }}
            />
          ))
        )}

        {/* hub node */}
        <circle cx={CX} cy={CY} r={5} fill="#6fe0ff" />
        <circle cx={CX} cy={CY} r={11} fill="none" stroke="#6fe0ff" strokeOpacity={0.35} strokeWidth={1} />
        <text x={CX} y={CY - 18} textAnchor="middle" className="fill-cyan-300" style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', opacity: 0.7 }}>
          AI ENGINEER
        </text>

        {/* category anchors */}
        {layout.map((cat, i) => (
          <g key={`cat-${i}`}>
            <circle cx={cat.cx} cy={cat.cy} r={3.5} fill={cat.color} fillOpacity={0.8} />
          </g>
        ))}

        {/* skill nodes */}
        {layout.map(cat =>
          cat.nodes.map((n, j) => {
            const isHovered = hovered === n.name;
            const clickable = !!n.linkedProject;
            return (
              <g
                key={`${cat.category}-node-${j}`}
                onMouseEnter={() => setHovered(n.name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => clickable && onSkillClick(n.linkedProject)}
                style={{ cursor: clickable ? 'pointer' : 'default' }}
              >
                <title>{`${n.name} — ${n.description}`}</title>
                <circle
                  cx={n.x} cy={n.y}
                  r={isHovered ? 6 : 4}
                  fill={n.color}
                  fillOpacity={clickable ? 0.9 : 0.4}
                  style={{ transition: 'r 150ms' }}
                />
                <text
                  x={n.x}
                  y={n.y + (n.y > CY ? 16 : -10)}
                  textAnchor="middle"
                  style={{
                    fontSize: 10,
                    fontFamily: 'monospace',
                    fill: isHovered ? n.color : 'hsl(var(--muted-foreground))',
                    opacity: isHovered ? 1 : 0.55,
                    transition: 'opacity 150ms, fill 150ms',
                  }}
                >
                  {n.name}
                </text>
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
};
