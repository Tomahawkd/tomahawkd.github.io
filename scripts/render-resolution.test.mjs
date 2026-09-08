import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(await readFile('src/render-resolution.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const exports = {};
runInNewContext(code, { exports });
const { renderPixelRatio, resizeRenderer, RENDER_PIXEL_BUDGET } = exports;

test('window size and high DPI never exceed the rendering pixel budget', () => {
  for (const [width, height] of [[1100, 700], [1440, 900], [1920, 1080], [2560, 1440], [3840, 2160], [7680, 4320], [5120, 1440], [1200, 2000]]) {
    for (const dpr of [0.5, 1, 1.25, 1.5, 2, 3]) {
      for (const high of [false, true]) {
        const ratio = renderPixelRatio(width, height, dpr, high);
        const budget = high ? RENDER_PIXEL_BUDGET.high : RENDER_PIXEL_BUDGET.standard;
        assert.ok(ratio > 0 && ratio <= dpr && ratio <= (high ? 1.5 : 1));
        assert.ok(Math.floor(width * ratio) * Math.floor(height * ratio) <= budget);
        assert.ok(renderPixelRatio(width * 2, height * 2, dpr, high) <= ratio, 'Larger windows must not increase density');
      }
    }
  }
  assert.equal(renderPixelRatio(3840, 2160, 1, true), 0.5);
  assert.equal(renderPixelRatio(3840, 2160, 2, false), 1 / 3);
  assert.equal(renderPixelRatio(1000, 650, 1, false), 1);
});

test('resize uses one bounded allocation and preserves CSS layout', () => {
  let calls = 0;
  const renderer = {
    domElement: { width: 0, height: 0, style: {} },
    setDrawingBufferSize(w, h, ratio) {
      calls++;
      this.domElement.width = Math.floor(w * ratio);
      this.domElement.height = Math.floor(h * ratio);
    },
  };
  for (const [w, h] of [[3840, 2160], [1100, 700], [7680, 4320], [1920, 1080]]) {
    const previous = calls;
    const container = { clientWidth: w, clientHeight: h, getBoundingClientRect: () => ({ width: w, height: h }) };
    const size = resizeRenderer(renderer, container, 2, true);
    assert.equal(calls, previous + 1);
    assert.equal(renderer.domElement.style.width, `${w}px`);
    assert.equal(renderer.domElement.style.height, `${h}px`);
    assert.ok(size.width * size.height <= RENDER_PIXEL_BUDGET.high);
  }
  const stage = scale => ({ clientWidth: 1920, clientHeight: 1080, getBoundingClientRect: () => ({ width: 1920 * scale, height: 1080 * scale }) });
  const small = resizeRenderer(renderer, stage(0.5), 1, true);
  assert.equal(small.width, 960);
  assert.equal(small.height, 540);
  const fullscreen = resizeRenderer(renderer, stage(2), 1, true);
  assert.equal(fullscreen.width, 1920);
  assert.equal(fullscreen.height, 1080);
});
