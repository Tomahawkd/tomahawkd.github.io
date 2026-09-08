import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { MeshoptSimplifier } from 'meshoptimizer/simplifier';

// Keep the glass and shadow-casting panels intact. Only decimate the dense
// border and fittings, preserving source positions and normals for shading.
export const simplifiedSurfaces = ['Ivory_Edges', 'Champagne_Index', 'Titanium_Fasteners'];
export const maxBackgroundError = 0.003;

export async function readArchiveMeshes() {
  const buffer = await readFile(new URL('../public/assets/archive-cassette.glb', import.meta.url));
  const jsonLength = buffer.readUInt32LE(12);
  const gltf = JSON.parse(buffer.subarray(20, 20 + jsonLength).toString());
  const binaryOffset = 28 + jsonLength;
  const accessor = id => {
    const attribute = gltf.accessors[id];
    const view = gltf.bufferViews[attribute.bufferView];
    const Type = { 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array }[attribute.componentType];
    const width = { SCALAR: 1, VEC3: 3 }[attribute.type];
    if (!Type || !width || attribute.sparse || attribute.normalized || view.buffer !== 0 ||
        (view.byteStride && view.byteStride !== Type.BYTES_PER_ELEMENT * width)) {
      throw new Error('Unsupported archive geometry accessor; update the background generator for this model format.');
    }
    return new Type(buffer.buffer, buffer.byteOffset + binaryOffset + (view.byteOffset || 0) +
      (attribute.byteOffset || 0), attribute.count * width).slice();
  };
  return gltf.meshes.flatMap(mesh => mesh.primitives.map(primitive => {
    if (primitive.mode !== undefined && primitive.mode !== 4) throw new Error('Expected triangle geometry.');
    return {
      name: gltf.materials[primitive.material].name.replace(/\.\d+$/, ''),
      positions: accessor(primitive.attributes.POSITION),
      normals: accessor(primitive.attributes.NORMAL),
      indices: new Uint32Array(accessor(primitive.indices)),
    };
  }));
}

export async function simplifyBackground(meshes) {
  meshes ??= await readArchiveMeshes();
  await MeshoptSimplifier.ready;
  const result = {};
  for (const name of simplifiedSurfaces) {
    const matches = meshes.filter(mesh => mesh.name === name);
    if (matches.length !== 1) throw new Error(`Expected one archive surface: ${name}`);
    const mesh = matches[0];
    // Attribute-aware error protects the highlights on beveled edges. Allow
    // redundant seams to collapse, but retain small parts (no pruning).
    const [indices, error] = MeshoptSimplifier.simplifyWithAttributes(
      mesh.indices, mesh.positions, 3, mesh.normals, 3, [1, 1, 1], null,
      Math.floor(mesh.indices.length * 0.15 / 3) * 3, maxBackgroundError, ['Permissive'],
    );
    result[name] = { vertexCount: mesh.positions.length / 3, indices: Array.from(indices), error };
  }
  return result;
}

export async function buildBackgroundGeometry() {
  const result = await simplifyBackground();
  await mkdir('.generated', { recursive: true });
  await writeFile('.generated/archive-background.json', JSON.stringify(result));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await buildBackgroundGeometry();
}
