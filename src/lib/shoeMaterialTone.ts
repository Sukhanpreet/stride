import * as THREE from "three";

type ToneUniforms = {
  uToneMid: { value: number };
  uSoleMul: { value: number };
  uUpperMul: { value: number };
  uUpperContrast: { value: number };
};

const patched = new WeakSet<THREE.MeshStandardMaterial>();
const uniformMap = new WeakMap<
  THREE.MeshStandardMaterial,
  ToneUniforms
>();

export function getShoeToneUniforms(
  material: THREE.MeshStandardMaterial
): ToneUniforms | undefined {
  return uniformMap.get(material);
}

/** Darken sole band, lift upper — keeps attention on knit/mesh */
export function attachShoeToneSplit(
  material: THREE.MeshStandardMaterial,
  bounds: { minY: number; maxY: number }
) {
  if (patched.has(material)) return;

  const height = bounds.maxY - bounds.minY;
  const toneMid = bounds.minY + height * 0.38;

  const uniforms: ToneUniforms = {
    uToneMid: { value: toneMid },
    uSoleMul: { value: 0.74 },
    uUpperMul: { value: 1.06 },
    uUpperContrast: { value: 1.12 },
  };
  uniformMap.set(material, uniforms);

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uToneMid = uniforms.uToneMid;
    shader.uniforms.uSoleMul = uniforms.uSoleMul;
    shader.uniforms.uUpperMul = uniforms.uUpperMul;
    shader.uniforms.uUpperContrast = uniforms.uUpperContrast;

    shader.vertexShader =
      `varying float vShoeWorldY;\n${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <worldpos_vertex>",
      `#include <worldpos_vertex>
      vShoeWorldY = worldPosition.y;`
    );

    shader.fragmentShader =
      `varying float vShoeWorldY;
      uniform float uToneMid;
      uniform float uSoleMul;
      uniform float uUpperMul;
      uniform float uUpperContrast;
      ${shader.fragmentShader}`;

    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <dithering_fragment>",
      `#include <dithering_fragment>
      float upperMask = smoothstep(uToneMid - 0.04, uToneMid + 0.1, vShoeWorldY);
      float toneMul = mix(uSoleMul, uUpperMul, upperMask);
      gl_FragColor.rgb *= toneMul;
      gl_FragColor.rgb = mix(gl_FragColor.rgb, (gl_FragColor.rgb - 0.5) * uUpperContrast + 0.5, upperMask * 0.35);`
    );
  };

  material.customProgramCacheKey = () => "shoe-tone-split-v1";
  material.needsUpdate = true;
  patched.add(material);
}

export function enhanceShoeMaterial(material: THREE.MeshStandardMaterial) {
  material.roughness = 0.64;
  material.metalness = 0.06;
  material.envMapIntensity = 0.58;
  material.emissive.set("#000000");
  material.emissiveIntensity = 0;

  if ("clearcoat" in material) {
    const physical = material as THREE.MeshPhysicalMaterial;
    physical.clearcoat = 0.22;
    physical.clearcoatRoughness = 0.42;
    physical.sheen = 0.14;
    physical.sheenRoughness = 0.38;
    physical.sheenColor = new THREE.Color("#94a3b8");
  }
}
