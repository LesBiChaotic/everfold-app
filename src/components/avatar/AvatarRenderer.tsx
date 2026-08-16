import React, { useState, useEffect } from 'react';
import { AvatarConfig } from '../../types';
import { useSettingsStore } from '../../store/settingsStore';

interface AvatarRendererProps {
  config: Partial<AvatarConfig>;
  size?: number;
  className?: string;
  renderMode?: 'normal' | '1999_dither' | '2003_pixel' | '2008_web2' | '2015_flat';
  reaction?: 'celebrate' | 'soft_smile' | 'curious' | 'neutral';
  enableIdle?: boolean;
}

export const defaultAvatarConfig: AvatarConfig = {
  faceShape: 'oval',
  skinTone: '#e0b59b',
  eyeShape: 'almond',
  eyeColor: '#4a3728',
  brows: 'soft',
  nose: 'straight',
  mouth: 'smile',
  lipTone: '#c97870',
  freckles: false,
  beautyMarks: false,
  facialHair: 'none',
  hairTexture: 'wavy',
  hairStyle: 'shoulder_waves',
  hairColor: '#2b1d14',
  glasses: 'none',
  piercings: 'none',
  hearingAids: false,
  headCoverings: 'none',
  jewelry: 'none',
  top: 'crew_sweater',
  outerwear: 'none',
  background: 'soft_gradient',
  backgroundColor: '#e8ecef',
  smallIcon: 'sparkle',
  moodExpression: 'warm',
  frame: 'circle',
  accentPack: 'none',
  renderMode: 'normal',
};

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  config: userConfig,
  size = 120,
  className = '',
  renderMode: overrideRenderMode,
  reaction,
  enableIdle = true,
}) => {
  const config = { ...defaultAvatarConfig, ...userConfig };
  const mode = overrideRenderMode || config.renderMode || 'normal';
  const { avatarIdleAnimation, reducedMotion } = useSettingsStore();

  const [isBlinking, setIsBlinking] = useState(false);

  // Subtle natural eye blink idle life when enabled and size >= 70
  useEffect(() => {
    if (!enableIdle || !avatarIdleAnimation || reducedMotion || size < 70) return;

    let timeoutId: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const delay = 3500 + Math.random() * 4000; // Blink every 3.5 - 7.5s
      timeoutId = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 160);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(timeoutId);
  }, [enableIdle, avatarIdleAnimation, reducedMotion, size]);

  // Skin tone palette
  const skin = config.skinTone || '#e0b59b';
  const shadowSkin = '#c29278';

  // Unique filter IDs to prevent SVG DOM collisions
  const filterId = `avatar-dither-${Math.random().toString(36).substring(2, 7)}`;

  // Determine effective mouth & eye styling based on mood/reaction
  const effectiveMood = reaction === 'celebrate' ? 'joyful' : reaction === 'soft_smile' ? 'warm' : reaction === 'curious' ? 'curious' : config.moodExpression || 'warm';

  const borderRadius =
    config.frame === 'circle'
      ? '50%'
      : config.frame === 'rounded_rect'
      ? '20%'
      : config.frame === 'arch'
      ? '50% 50% 12% 12%'
      : '8px';

  return (
    <div
      className={`avatar-container ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius,
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: config.backgroundColor || '#e8ecef',
        position: 'relative',
        boxShadow:
          mode === '2008_web2'
            ? '0 4px 10px rgba(0,0,0,0.15)'
            : config.accentPack !== 'none'
            ? '0 0 0 2px var(--accent-plum), var(--shadow-sm)'
            : 'none',
        imageRendering: mode === '1999_dither' || mode === '2003_pixel' ? 'pixelated' : 'auto',
        transition: reducedMotion ? 'none' : 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      role="img"
      aria-label="Modular illustrated user avatar"
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        style={{
          filter:
            mode === '1999_dither'
              ? 'contrast(160%) brightness(95%) grayscale(20%)'
              : mode === '2003_pixel'
              ? 'contrast(120%) saturate(110%)'
              : 'none',
        }}
      >
        <defs>
          <linearGradient id={`grad-${filterId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.backgroundColor || '#e2e8f0'} />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id={`hair-${filterId}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={config.hairColor || '#2b1d14'} />
            <stop offset="100%" stopColor="#1a110a" />
          </linearGradient>
        </defs>

        {/* Background Patterns */}
        <rect width="200" height="200" fill={`url(#grad-${filterId})`} />
        {config.background === 'abstract_waves' && (
          <path d="M-20,120 Q50,70 120,130 T220,90 L220,200 L-20,200 Z" fill="rgba(255,255,255,0.25)" />
        )}
        {config.background === 'botanical_shapes' && (
          <g fill="rgba(255,255,255,0.28)">
            <circle cx="30" cy="40" r="24" />
            <circle cx="170" cy="50" r="18" />
            <path d="M10,140 C40,110 50,150 20,180 Z" />
          </g>
        )}

        {/* Hair - Back Layer for Long Hair */}
        {(config.hairStyle === 'shoulder_waves' || config.hairStyle === 'long_curls') && (
          <path
            d="M50,70 C30,100 25,160 45,190 C65,190 70,160 70,140 C130,140 135,190 155,190 C175,160 170,100 150,70 Z"
            fill={config.hairColor || '#2b1d14'}
          />
        )}
        {config.hairStyle === 'afro' && (
          <circle cx="100" cy="90" r="68" fill={config.hairColor || '#1c1511'} />
        )}

        {/* Clothing / Torso */}
        <g id="clothing">
          {/* Base Torso */}
          <path
            d="M35,200 C35,150 70,140 100,140 C130,140 165,150 165,200 Z"
            fill={config.top === 'hoodie' ? '#475569' : config.top === 'turtleneck' ? '#1e293b' : config.top === 'collared_shirt' ? '#0f766e' : '#6b2848'}
          />
          {/* Neck */}
          <path d="M85,115 L115,115 L118,145 L82,145 Z" fill={shadowSkin} />
          <path d="M86,115 L114,115 L115,142 L85,142 Z" fill={skin} />

          {/* Neckline / Collar */}
          {config.top === 'collared_shirt' && (
            <path d="M80,140 L100,165 L120,140 L108,138 L100,148 L92,138 Z" fill="#ffffff" />
          )}
          {config.top === 'turtleneck' && (
            <rect x="80" y="130" width="40" height="20" rx="4" fill="#1e293b" />
          )}
          {config.top === 'v_neck' && (
            <polygon points="100,162 82,140 118,140" fill={shadowSkin} />
          )}
        </g>

        {/* Outerwear */}
        {config.outerwear === 'denim_jacket' && (
          <path d="M35,170 L65,145 L80,200 L35,200 Z M165,170 L135,145 L120,200 L165,200 Z" fill="#1e40af" />
        )}

        {/* Head / Jaw Layer */}
        <g id="head">
          {config.faceShape === 'square' ? (
            <path
              d="M62,60 C62,40 138,40 138,60 L138,98 C138,124 125,135 100,135 C75,135 62,124 62,98 Z"
              fill={skin}
            />
          ) : config.faceShape === 'heart' ? (
            <path
              d="M60,60 C60,35 140,35 140,60 L138,95 C138,125 118,137 100,137 C82,137 62,125 62,95 Z"
              fill={skin}
            />
          ) : (
            // Oval / Round standard
            <ellipse cx="100" cy="88" rx="38" ry="46" fill={skin} />
          )}

          {/* Blush */}
          <ellipse cx="73" cy="94" rx="7" ry="4" fill="rgba(219, 112, 147, 0.22)" />
          <ellipse cx="127" cy="94" rx="7" ry="4" fill="rgba(219, 112, 147, 0.22)" />

          {/* Freckles */}
          {config.freckles && (
            <g fill="#9a5a3a" opacity="0.65">
              <circle cx="76" cy="92" r="1" />
              <circle cx="82" cy="94" r="1.2" />
              <circle cx="88" cy="93" r="0.9" />
              <circle cx="112" cy="93" r="0.9" />
              <circle cx="118" cy="94" r="1.2" />
              <circle cx="124" cy="92" r="1" />
            </g>
          )}

          {/* Beauty Marks */}
          {config.beautyMarks && (
            <circle cx="75" cy="105" r="1.5" fill="#5c3822" />
          )}

          {/* Eyebrows */}
          <g id="brows" stroke={config.hairColor || '#2b1d14'} strokeWidth="2.8" strokeLinecap="round" fill="none">
            {effectiveMood === 'curious' ? (
              <>
                <path d="M68,71 Q78,65 88,72" />
                <path d="M112,74 Q122,70 132,74" />
              </>
            ) : config.brows === 'arched' ? (
              <>
                <path d="M68,75 Q78,67 88,74" />
                <path d="M112,74 Q122,67 132,75" />
              </>
            ) : config.brows === 'straight' ? (
              <>
                <path d="M68,74 L88,74" />
                <path d="M112,74 L132,74" />
              </>
            ) : (
              // Soft curved
              <>
                <path d="M70,75 Q80,71 90,74" />
                <path d="M110,74 Q120,71 130,75" />
              </>
            )}
          </g>

          {/* Eyes & Blinking Animation */}
          <g id="eyes">
            {isBlinking ? (
              // Closed blinking line
              <g stroke={config.hairColor || '#2b1d14'} strokeWidth="2.5" strokeLinecap="round" fill="none">
                <path d="M72,85 Q79,88 86,85" />
                <path d="M114,85 Q121,88 128,85" />
              </g>
            ) : (
              <>
                {/* Left Eye */}
                <ellipse cx="79" cy="84" rx="7" ry={config.eyeShape === 'round' ? '6' : '4.5'} fill="#ffffff" />
                <circle cx="80" cy="84" r="3.2" fill={config.eyeColor || '#4a3728'} />
                <circle cx="81.2" cy="82.8" r="1" fill="#ffffff" />

                {/* Right Eye */}
                <ellipse cx="121" cy="84" rx="7" ry={config.eyeShape === 'round' ? '6' : '4.5'} fill="#ffffff" />
                <circle cx="120" cy="84" r="3.2" fill={config.eyeColor || '#4a3728'} />
                <circle cx="121.2" cy="82.8" r="1" fill="#ffffff" />
              </>
            )}
          </g>

          {/* Nose */}
          <g id="nose" stroke={shadowSkin} strokeWidth="2.2" strokeLinecap="round" fill="none">
            {config.nose === 'button' ? (
              <path d="M98,96 Q100,99 102,96" />
            ) : config.nose === 'aquiline' ? (
              <path d="M99,84 L103,96 L97,98" />
            ) : (
              // Straight
              <path d="M99,85 L99,96 Q101,98 104,96" />
            )}
          </g>

          {/* Mouth */}
          <g id="mouth">
            {effectiveMood === 'joyful' || config.mouth === 'open_smile' ? (
              <path d="M88,108 Q100,123 112,108 Z" fill={config.lipTone || '#c97870'} />
            ) : config.mouth === 'neutral' ? (
              <path d="M90,111 L110,111" stroke={config.lipTone || '#c97870'} strokeWidth="3" strokeLinecap="round" />
            ) : (
              // Smile
              <path d="M88,110 Q100,118 112,110" stroke={config.lipTone || '#c97870'} strokeWidth="3" strokeLinecap="round" fill="none" />
            )}
          </g>

          {/* Facial Hair */}
          {config.facialHair === 'stubble' && (
            <path d="M84,106 Q100,128 116,106 Q100,120 84,106 Z" fill="rgba(0,0,0,0.12)" />
          )}
          {config.facialHair === 'full_beard' && (
            <path d="M68,96 C68,135 78,142 100,142 C122,142 132,135 132,96 C124,106 112,112 100,112 C88,112 76,106 68,96 Z" fill={config.hairColor || '#2b1d14'} />
          )}
          {config.facialHair === 'mustache' && (
            <path d="M88,105 Q100,102 112,105 Q100,109 88,105 Z" fill={config.hairColor || '#2b1d14'} />
          )}
        </g>

        {/* Glasses */}
        {config.glasses === 'wire_round' && (
          <g stroke="#334155" strokeWidth="2.5" fill="none">
            <circle cx="79" cy="84" r="12" />
            <circle cx="121" cy="84" r="12" />
            <path d="M91,84 L109,84" />
          </g>
        )}
        {config.glasses === 'thick_square' && (
          <g stroke="#0f172a" strokeWidth="3.5" fill="none">
            <rect x="66" y="73" width="26" height="22" rx="4" />
            <rect x="108" y="73" width="26" height="22" rx="4" />
            <path d="M92,82 L108,82" />
          </g>
        )}
        {config.glasses === 'aviator' && (
          <g stroke="#b45309" strokeWidth="2.2" fill="none">
            <path d="M66,74 L92,74 L90,94 L68,94 Z" />
            <path d="M108,74 L134,74 L132,94 L110,94 Z" />
            <path d="M92,76 L108,76" />
          </g>
        )}

        {/* Hair - Front Layer */}
        <g id="hair-front">
          {config.hairStyle === 'pixie' && (
            <path d="M56,70 C56,40 144,40 144,70 C130,55 70,55 56,70 Z" fill={config.hairColor || '#2b1d14'} />
          )}
          {config.hairStyle === 'crew' && (
            <path d="M58,68 C62,45 138,45 142,68 C135,54 65,54 58,68 Z" fill={config.hairColor || '#2b1d14'} />
          )}
          {config.hairStyle === 'curtain_bangs' && (
            <path
              d="M56,70 C60,40 140,40 144,70 C130,55 110,65 100,80 C90,65 70,55 56,70 Z"
              fill={config.hairColor || '#2b1d14'}
            />
          )}
          {config.hairStyle === 'side_part' && (
            <path
              d="M54,75 C54,42 144,38 146,75 C136,50 82,48 54,75 Z"
              fill={config.hairColor || '#2b1d14'}
            />
          )}
          {config.hairStyle === 'high_bun' && (
            <g fill={config.hairColor || '#2b1d14'}>
              <circle cx="100" cy="34" r="22" />
              <path d="M58,72 C60,48 140,48 142,72 C132,54 68,54 58,72 Z" />
            </g>
          )}
          {config.hairStyle === 'bob' && (
            <path
              d="M52,70 C52,40 148,40 148,70 L148,110 C140,110 134,70 100,70 C66,70 60,110 52,110 Z"
              fill={config.hairColor || '#2b1d14'}
            />
          )}
        </g>

        {/* Head Coverings */}
        {config.headCoverings === 'hijab' && (
          <path
            d="M50,85 C48,40 152,40 150,85 C150,140 142,165 100,165 C58,165 50,140 50,85 Z M70,95 C70,130 130,130 130,95 C130,70 70,70 70,95 Z"
            fill="#334155"
          />
        )}
        {config.headCoverings === 'beanie' && (
          <path d="M52,68 C52,30 148,30 148,68 C135,62 65,62 52,68 Z" fill="#991b1b" />
        )}

        {/* Jewelry / Piercings / Hearing aids */}
        {config.jewelry === 'gold_hoops' && (
          <g fill="none" stroke="#eab308" strokeWidth="2.5">
            <circle cx="56" cy="94" r="5" />
            <circle cx="144" cy="94" r="5" />
          </g>
        )}
        {config.hearingAids && (
          <path d="M53,88 C51,84 51,98 53,94 Z" fill="#94a3b8" />
        )}
        {config.piercings === 'septum' && (
          <circle cx="100" cy="101" r="2.5" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
        )}

        {/* Small Icon Badge */}
        {config.smallIcon === 'sparkle' && (
          <path d="M165,30 L168,38 L176,41 L168,44 L165,52 L162,44 L154,41 L162,38 Z" fill="#f59e0b" opacity="0.85" />
        )}
        {config.smallIcon === 'heart' && (
          <path d="M165,35 C165,30 173,30 173,36 C173,42 165,46 165,46 C165,46 157,42 157,36 C157,30 165,30 165,35 Z" fill="#ef4444" opacity="0.85" />
        )}
      </svg>
    </div>
  );
};
