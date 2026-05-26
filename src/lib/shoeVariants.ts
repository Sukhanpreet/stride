import * as THREE from "three";
import {
  attachShoeToneSplit,
  enhanceShoeMaterial,
} from "@/lib/shoeMaterialTone";

export const SHOE_COLOR_VARIANTS = ["Beach", "Midnight", "Street"] as const;

export type ShoeColorVariant = (typeof SHOE_COLOR_VARIANTS)[number];

export function variantNameAt(index: number): ShoeColorVariant {
  return SHOE_COLOR_VARIANTS[
    Math.max(0, Math.min(index, SHOE_COLOR_VARIANTS.length - 1))
  ];
}

export type CatalogShoeNodes = {
  Shoe: THREE.Mesh & {
    geometry: THREE.BufferGeometry;
    userData: { variantMaterials?: Record<string, THREE.MeshStandardMaterial> };
  };
};

export function applyShoeVariant(
  nodes: CatalogShoeNodes,
  fallbackMaterial: THREE.MeshStandardMaterial,
  variantIndex: number,
  bounds: { minY: number; maxY: number }
): THREE.MeshStandardMaterial {
  const name = variantNameAt(variantIndex);
  const variantMaterials = nodes.Shoe.userData.variantMaterials;
  const mat = variantMaterials?.[name] ?? fallbackMaterial;

  if (variantMaterials?.[name]) {
    nodes.Shoe.material = mat;
  }

  enhanceShoeMaterial(mat);
  attachShoeToneSplit(mat, bounds);
  mat.needsUpdate = true;
  return mat;
}
