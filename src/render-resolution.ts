import type { WebGLRenderer } from "three";

export const RENDER_PIXEL_BUDGET = {
  standard: 1280 * 720,
  high: 1920 * 1080,
} as const;

export function renderPixelRatio(
  width: number,
  height: number,
  deviceRatio: number,
  highQuality: boolean,
) {
  const budget = highQuality ? RENDER_PIXEL_BUDGET.high : RENDER_PIXEL_BUDGET.standard;
  const dpr = Number.isFinite(deviceRatio) && deviceRatio > 0 ? deviceRatio : 1;
  return Math.min(dpr, highQuality ? 1.5 : 1, Math.sqrt(budget / (Math.max(1, width) * Math.max(1, height))));
}

export function resizeRenderer(
  renderer: WebGLRenderer,
  container: HTMLElement,
  deviceRatio: number,
  highQuality: boolean,
) {
  const w = Math.max(1, container.clientWidth), h = Math.max(1, container.clientHeight);
  const bounds = container.getBoundingClientRect();
  // The UI lives in a CSS-scaled 1920x1080 stage. Retain downsampling for
  // small windows, but never supersample because that stage grows fullscreen.
  const displayScale = Math.min(1, bounds.width / w, bounds.height / h);
  // Change size and density atomically, avoiding a temporarily oversized
  // buffer when restoring a large fullscreen window to a small one.
  renderer.setDrawingBufferSize(w, h, renderPixelRatio(w, h, deviceRatio * displayScale, highQuality));
  renderer.domElement.style.width = `${w}px`;
  renderer.domElement.style.height = `${h}px`;
  return { width: renderer.domElement.width, height: renderer.domElement.height };
}
