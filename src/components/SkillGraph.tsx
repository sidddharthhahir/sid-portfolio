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
const CATEGORY_RADIUS = 175;
const SKILL_RADIUS = 135;
const FONT_SIZE = 9.5;
const CHAR_WIDTH = FONT_SIZE * 0.82; // deliberately generous — better to over-space than let two labels touch
const TIER_HEIGHT = 13;
const LABEL_GAP = 12; // minimum breathing room required between two labels' estimated edges

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

  const { layout: categories, viewBox } = useMemo(() => {
    const categories = skills.map((cat, i) => {
      const angle = -90 + i * (360 / skills.length);
      const rad = (angle * Math.PI) / 180;
      const cx = CX + CATEGORY_RADIUS * Math.cos(rad);
      const cy = CY + CATEGORY_RADIUS * Math.sin(rad);

      const spread = Math.min(150, cat.items.length * 24);
      const nodes = cat.items.map((skill, j) => {
        const t = cat.items.length === 1 ? 0.5 : j / (cat.items.length - 1);
        const nodeAngle = angle - spread / 2 + t * spread;
        const nodeRad = (nodeAngle * Math.PI) / 180;
        const x = cx + SKILL_RADIUS * Math.cos(nodeRad);
        const y = cy + SKILL_RADIUS * Math.sin(nodeRad);
        const labelWidth = skill.name.length * CHAR_WIDTH;
        return { ...skill, x, y, labelWidth, color: COLOR_HEX[cat.color] ?? COLOR_HEX.blue };
      });

      // Greedy interval-scheduling pass: sort left-to-right, and only bump
      // a label to the next vertical tier when its estimated span would
      // actually collide with the label immediately before it at that
      // tier — guarantees no overlap regardless of category size or how
      // tightly a fan of nodes ends up packed.
      const byX = [...nodes].sort((a, b) => a.x - b.x);
      const tierEnds: number[] = []; // right edge of the last label placed on each tier
      byX.forEach(n => {
        const half = n.labelWidth / 2;
        let tier = tierEnds.findIndex(end => n.x - half > end + LABEL_GAP);
        if (tier === -1) tier = tierEnds.length;
        tierEnds[tier] = n.x + half;
        (n as typeof n & { tier: number }).tier = tier;
      });

      return { ...cat, cx, cy, nodes: nodes as (typeof nodes[number] & { tier: number })[], color: COLOR_HEX[cat.color] ?? COLOR_HEX.blue };
    });

    // Fixed W/H×constants above were a guess — some fan angles (a 6-item
    // category pointed straight up, for instance) pushed nodes past that
    // fixed box and off-canvas entirely. Compute the real bounding box from
    // every label's actual extent (position + tier offset + text width)
    // instead, so nothing can ever clip regardless of category size, fan
    // direction, or how many tiers a crowded category needed.
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    const bound = (x: number, y: number) => {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    };
    bound(CX, CY - 18); // "AI ENGINEER" hub label
    categories.forEach(cat => {
      bound(cat.cx, cat.cy);
      cat.nodes.forEach(n => {
        const half = n.labelWidth / 2;
        const labelY = n.y > CY ? n.y + 16 + n.tier * TIER_HEIGHT : n.y - 10 - n.tier * TIER_HEIGHT;
        bound(n.x - half, labelY);
        bound(n.x + half, labelY);
      });
    });
    const PAD = 14;
    const viewBox = `${minX - PAD} ${minY - PAD} ${maxX - minX + PAD * 2} ${maxY - minY + PAD * 2}`;

    return { layout: categories, viewBox };
  }, [skills]);

  return (
    <div className="hidden lg:block w-full mb-6">
      <svg viewBox={viewBox} className="w-full h-auto" role="img" aria-hidden="true">
        {/* hub -> category lines */}
        {categories.map((cat, i) => (
          <line
            key={`hub-${i}`}
            x1={CX} y1={CY} x2={cat.cx} y2={cat.cy}
            stroke={cat.color} strokeOpacity={0.18} strokeWidth={1}
          />
        ))}
        {/* category -> skill lines */}
        {categories.map(cat =>
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

        {/* live data packets travelling outward along every branch — the
            "requests actually flowing through a system" visual, not just
            a static diagram. Native SVG SMIL animation: no JS per-frame
            cost, keeps running even while the tab is otherwise idle. */}
        {categories.map((cat, i) => (
          <circle key={`pulse-cat-${i}`} r={2.6} fill={cat.color}>
            <animateMotion
              dur="2.4s"
              begin={`${i * 0.45}s`}
              repeatCount="indefinite"
              path={`M${CX},${CY} L${cat.cx},${cat.cy}`}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur="2.4s"
              begin={`${i * 0.45}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        {categories.map(cat =>
          cat.nodes.map((n, j) => (
            <circle key={`pulse-skill-${cat.category}-${j}`} r={1.6} fill={n.color} opacity={0.8}>
              <animateMotion
                dur="3.6s"
                begin={`${1 + (j % 5) * 0.5}s`}
                repeatCount="indefinite"
                path={`M${cat.cx},${cat.cy} L${n.x},${n.y}`}
              />
              <animate
                attributeName="opacity"
                values="0;0.8;0.8;0"
                keyTimes="0;0.1;0.85;1"
                dur="3.6s"
                begin={`${1 + (j % 5) * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))
        )}

        {/* hub node — a heartbeat, not a static dot: two expanding rings
            plus a subtle breathing core, framing this as a live system
            rather than a diagram of one. */}
        <circle cx={CX} cy={CY} r={5} fill="none" stroke="#6fe0ff" strokeWidth={1.5} opacity={0.7}>
          <animate attributeName="r" values="5;42" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r={5} fill="none" stroke="#6fe0ff" strokeWidth={1.5} opacity={0.7}>
          <animate attributeName="r" values="5;42" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r={5} fill="#6fe0ff">
          <animate attributeName="r" values="5;6.5;5" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx={CX} cy={CY} r={11} fill="none" stroke="#6fe0ff" strokeOpacity={0.35} strokeWidth={1} />
        <text x={CX} y={CY - 18} textAnchor="middle" className="fill-cyan-300" style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', opacity: 0.7 }}>
          AI ENGINEER
        </text>

        {/* category anchors */}
        {categories.map((cat, i) => (
          <g key={`cat-${i}`}>
            <circle cx={cat.cx} cy={cat.cy} r={3.5} fill={cat.color} fillOpacity={0.8} />
          </g>
        ))}

        {/* skill nodes */}
        {categories.map(cat =>
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
                {(() => {
                  const labelY = n.y > CY ? n.y + 16 + n.tier * TIER_HEIGHT : -10 - n.tier * TIER_HEIGHT + n.y;
                  // A backing chip, not just spacing math: the tier pass keeps most
                  // labels from touching, but text width is only ever an estimate —
                  // this is the safety net that keeps any label legible even where
                  // two chips end up close, instead of raw text bleeding together.
                  return (
                    <>
                      <rect
                        x={n.x - n.labelWidth / 2 - 4}
                        y={labelY - FONT_SIZE}
                        width={n.labelWidth + 8}
                        height={FONT_SIZE + 4}
                        rx={4}
                        fill="#070b14"
                        fillOpacity={isHovered ? 0.9 : 0.72}
                        style={{ transition: 'fill-opacity 150ms' }}
                      />
                      <text
                        x={n.x}
                        y={labelY}
                        textAnchor="middle"
                        style={{
                          fontSize: FONT_SIZE,
                          fontFamily: 'monospace',
                          fill: isHovered ? n.color : 'hsl(var(--muted-foreground))',
                          opacity: isHovered ? 1 : 0.85,
                          transition: 'opacity 150ms, fill 150ms',
                        }}
                      >
                        {n.name}
                      </text>
                    </>
                  );
                })()}
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
};
