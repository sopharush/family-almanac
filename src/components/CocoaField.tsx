import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MOTION_OFF } from '../lib/motion';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`;

// fbm "silk field" tuned to the Almanac palette: deep cocoa ground, chocolate folds,
// caramel ribbons and a faint cream sheen, drifting slowly and leaning toward the pointer.
const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) { v += a * noise(p); p = m * p; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x / uRes.y, 1.0) * 2.0;
    float t = uTime * 0.04;

    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.6 * t),
                  fbm(p + 3.0 * q + vec2(8.3, 2.8) - 0.5 * t));
    float f = fbm(p + 2.6 * r + (uMouse - 0.5) * 0.5);

    float silk = sin(f * 7.0 + r.x * 4.5 + t * 2.2) * 0.5 + 0.5;
    float ribbon = pow(silk, 7.0);

    vec3 deep    = vec3(0.106, 0.067, 0.043); // #1b110b
    vec3 cocoa   = vec3(0.247, 0.165, 0.110); // #3f2a1c
    vec3 caramel = vec3(0.659, 0.510, 0.365); // #a8825d
    vec3 cream   = vec3(0.965, 0.941, 0.894); // #f6f0e4

    vec3 col = mix(deep, cocoa, smoothstep(0.18, 0.88, f));
    col = mix(col, caramel, smoothstep(0.52, 1.0, f * r.y * 1.55) * 0.5);
    col += caramel * ribbon * 0.38 + cream * pow(ribbon, 3.0) * 0.1;

    // keep the text side (left) calmer and darker for legibility
    col *= mix(0.62, 1.0, smoothstep(0.05, 0.75, uv.x));
    float vig = smoothstep(1.3, 0.25, length(uv - vec2(0.55, 0.45)));
    col *= mix(0.5, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function CocoaField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
    } catch {
      canvas.dataset.fallback = 'true'; // CSS gradient takes over
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 18 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w, h);
      if (MOTION_OFF) renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    if (MOTION_OFF) {
      renderer.render(scene, camera); // one static frame
      return () => { ro.disconnect(); geometry.dispose(); material.dispose(); renderer.dispose(); };
    }

    const target = new THREE.Vector2(0.5, 0.5);
    const onMove = (e: PointerEvent) => target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    window.addEventListener('pointermove', onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      uniforms.uTime.value += dt;
      uniforms.uMouse.value.lerp(target, 0.035);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      io.disconnect();
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="cocoa-field" aria-hidden="true" />;
}
