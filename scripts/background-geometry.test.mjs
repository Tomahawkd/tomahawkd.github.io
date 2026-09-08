import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';
import * as THREE from 'three';
import { readArchiveMeshes, simplifyBackground, simplifiedSurfaces, maxBackgroundError } from './background-geometry.mjs';

test('background simplification preserves original models and stays within its geometry budget', async () => {
  const meshes = await readArchiveMeshes();
  const original = meshes.map(mesh => ({ indices: mesh.indices.slice(), positions: mesh.positions.slice(), normals: mesh.normals.slice() }));
  const simplified = await simplifyBackground(meshes);
  assert.deepEqual(Object.keys(simplified), simplifiedSurfaces);
  const backgroundSurfaces = [...simplifiedSurfaces, 'Frosted_Polymer', 'Optical_Diffuser'];
  let triangles = 0;
  for (const [i, mesh] of meshes.entries()) {
    assert.deepEqual(mesh.indices, original[i].indices);
    assert.deepEqual(mesh.positions, original[i].positions);
    assert.deepEqual(mesh.normals, original[i].normals);
    if (!backgroundSurfaces.includes(mesh.name)) continue;
    const low = simplified[mesh.name];
    if (!low) { triangles += mesh.indices.length / 3; continue; }
    assert.equal(low.vertexCount, mesh.positions.length / 3);
    assert.ok(low.error <= maxBackgroundError);
    assert.ok(low.indices.length > 0 && low.indices.length < mesh.indices.length);
    assert.equal(low.indices.length % 3, 0);
    assert.ok(low.indices.every(index => Number.isInteger(index) && index >= 0 && index < low.vertexCount));
    for (let offset = 0; offset < low.indices.length; offset += 3) {
      const vertices = low.indices.slice(offset, offset + 3).map(index => new THREE.Vector3().fromArray(mesh.positions, index * 3));
      assert.ok(new THREE.Triangle(...vertices).getArea() > 0, 'No degenerate faces');
    }
    triangles += low.indices.length / 3;
  }
  assert.ok(triangles < 2200, `Background geometry budget: ${triangles}`);

  const source = await readFile('src/background-geometry.ts', 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {};
  runInNewContext(code, { exports, require: name => name === 'three' ? THREE : { default: simplified } });
  for (const mesh of meshes.filter(mesh => backgroundSurfaces.includes(mesh.name))) {
    const full = new THREE.BufferGeometry();
    full.setAttribute('position', new THREE.BufferAttribute(mesh.positions, 3));
    full.setAttribute('normal', new THREE.BufferAttribute(mesh.normals, 3));
    full.setIndex(new THREE.BufferAttribute(mesh.indices, 1));
    const low = exports.backgroundGeometry(mesh.name, full);
    assert.equal(full.index.count, mesh.indices.length, 'Full-detail selected mesh is unchanged');
    assert.equal(low.getAttribute('position'), full.getAttribute('position'));
    assert.equal(low.getAttribute('normal'), full.getAttribute('normal'));
    if (simplified[mesh.name]) {
      assert.notEqual(low, full);
      assert.equal(low.index.count, simplified[mesh.name].indices.length);
    } else assert.equal(low, full, 'Glass and diffuser remain untouched');
  }
  assert.throws(() => exports.backgroundGeometry('Ivory_Edges', new THREE.BoxGeometry()), /out of date/);
});
