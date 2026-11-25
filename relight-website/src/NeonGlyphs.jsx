import React, { useEffect, useRef } from 'react';

const DEFAULT_COLORS = ['#a6f3fa', '#3b82f6', '#6fd6f7', '#ffffff', '#5aaef0'];
const GLYPHS = '01アイウエオカキクケコサシスセソ光极律动<>/{}+=✧';

// Local Canvas implementation of the supplied NeonGlyphs component interface.
export default function NeonGlyphs({ colors = DEFAULT_COLORS, cellSize = 16, depth = 12, tilt = 25, turn = 0, perspective = 60, sway = 0.5, density = 0.1, speed = 0.15, trails = 0.25, glow = 0.75, scramble = 0.5, fade = 0.75, aberration = 0.5, mouseInteraction = true, burstOnClick = true, paused = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const host = canvas.closest('.hero') || canvas.parentElement;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const palette = colors.length ? colors : DEFAULT_COLORS;
    const cell = Math.max(8, cellSize), layers = Math.max(1, depth);
    let width = 0, height = 0, particles = [], frame = 0, last = 0, time = 0;
    let visible = true, reduced = media.matches, burst = null;
    const pointer = { x: 0, y: 0, active: false };
    // Cache glow in sprites rather than calculating shadows for every glyph each frame.
    const tile = 48, atlas = document.createElement('canvas');
    atlas.width = GLYPHS.length * tile; atlas.height = palette.length * tile;
    const paint = atlas.getContext('2d');
    paint.font = '20px monospace'; paint.textAlign = 'center'; paint.textBaseline = 'middle';
    palette.forEach((color, row) => {
      paint.fillStyle = color; paint.shadowColor = color; paint.shadowBlur = glow * 12;
      [...GLYPHS].forEach((char, col) => paint.fillText(char, col * tile + 24, row * tile + 24));
    });
    function draw(dt = 0) {
      if (!width || !height) return;
      time += dt;
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(5, 9, 18, ${dt ? Math.max(0.12, 1 - trails) : 1})`;
      ctx.fillRect(0, 0, width, height);
      const rotation = turn * Math.PI / 180, slope = Math.sin(tilt * Math.PI / 180);
      for (const p of particles) {
        p.y += dt * speed * (14 + p.z * 27);
        if (p.y > height * 1.4) p.y = -height * .4;
        if (dt && Math.random() < scramble * dt * 1.4) p.char = Math.floor(Math.random() * GLYPHS.length);
        const scale = .35 + p.z * (perspective / 60) * .8;
        let x = p.x + Math.sin(time * .2 + p.phase) * sway * 25 + (p.y - height / 2) * slope * .18;
        let y = p.y;
        if (mouseInteraction && pointer.active) { x += pointer.x * 35 * p.z; y += pointer.y * 22 * p.z; }
        const dx = x - width / 2, dy = y - height / 2;
        x = width / 2 + dx * Math.cos(rotation) - dy * Math.sin(rotation);
        y = height / 2 + dx * Math.sin(rotation) + dy * Math.cos(rotation);
        let pulse = 0;
        if (burst) {
          const age = time - burst.time, bx = x - burst.x, by = y - burst.y, distance = Math.hypot(bx, by);
          pulse = Math.max(0, 1 - Math.abs(distance - age * 420) / 110) * Math.max(0, 1 - age / 2);
          x += bx / (distance || 1) * pulse * 35; y += by / (distance || 1) * pulse * 35;
        }
        const size = cell * scale * 2.4;
        const edge = Math.max(0, Math.min(1, y / 85, (height - y) / 85));
        ctx.globalAlpha = Math.min(1, (.2 + p.z * .7 + pulse) * edge * (1 - fade * (1 - p.z) * .7));
        if (aberration > 0 && p.z > .8) {
          ctx.globalAlpha *= .25;
          ctx.drawImage(atlas, p.char * tile, ((p.color + 1) % palette.length) * tile, tile, tile, x - size / 2 + aberration * 4, y - size / 2, size, size);
          ctx.globalAlpha *= 4;
        }
        ctx.drawImage(atlas, p.char * tile, p.color * tile, tile, tile, x - size / 2, y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      if (burst && time - burst.time > 2) burst = null;
    }
    function tick(now) { frame = 0; const dt = Math.min((now - (last || now)) / 1000, .05); last = now; draw(dt); schedule(); }
    function schedule() { if (!frame && visible && !document.hidden && !paused && !reduced) frame = requestAnimationFrame(tick); }
    function sync() { cancelAnimationFrame(frame); frame = 0; last = 0; reduced = media.matches; draw(); schedule(); }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height;
      const dpr = Math.min(devicePixelRatio, 1.5); canvas.width = width * dpr; canvas.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(1800, Math.floor(width * height / (cell * cell) * density * (layers / 12)));
      particles = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height * 1.4 - height * .2, z: (1 + Math.floor(Math.random() * layers)) / layers, phase: Math.random() * Math.PI * 2, char: Math.floor(Math.random() * GLYPHS.length), color: Math.floor(Math.random() * palette.length) }));
      draw(); schedule();
    });
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    function move(e) { const bounds = host.getBoundingClientRect(); pointer.x = (e.clientX - bounds.left) / bounds.width - .5; pointer.y = (e.clientY - bounds.top) / bounds.height - .5; pointer.active = true; }
    function leave() { pointer.active = false; }
    function click(e) { if (!burstOnClick || paused || reduced || e.target.closest('a, button, input, textarea')) return; const rect = canvas.getBoundingClientRect(); burst = { x: e.clientX - rect.left, y: e.clientY - rect.top, time }; }
    resize.observe(canvas); observer.observe(canvas);
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave); host.addEventListener('click', click);
    media.addEventListener('change', sync); document.addEventListener('visibilitychange', sync);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave); host.removeEventListener('click', click); media.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, [colors, cellSize, depth, tilt, turn, perspective, sway, density, speed, trails, glow, scramble, fade, aberration, mouseInteraction, burstOnClick, paused]);
  return <canvas ref={ref} className="neon-glyphs" aria-hidden="true" style={{ width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}/>;
}
