import * as THREE from "three";
import generated from "../.generated/archive-background.json";

const surfaces: Record<string, { vertexCount: number; indices: number[] }> = generated;

export function backgroundGeometry(name: string, full: THREE.BufferGeometry) {
  const simplified = surfaces[name];
  if (!simplified) return full;
  if (simplified.vertexCount !== full.getAttribute("position").count) {
    throw new Error(`Background geometry is out of date for ${name}`);
  }
  // Separate index buffers, shared immutable vertex attributes. The selected
  // document and returning copies always retain their original full geometry.
  const background = new THREE.BufferGeometry();
  for (const [key, attribute] of Object.entries(full.attributes)) {
    background.setAttribute(key, attribute);
  }
  background.setIndex(simplified.indices);
  return background;
}
