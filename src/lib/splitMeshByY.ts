import * as THREE from "three";

export type MeshSegment = {
  id: string;
  geometry: THREE.BufferGeometry;
  explode: THREE.Vector3;
};

/**
 * Split a single mesh into horizontal segments for scroll explode.
 * Works with indexed and non-indexed BufferGeometry.
 */
export function splitMeshByY(
  mesh: THREE.Mesh,
  segmentDefs: { id: string; explode: THREE.Vector3 }[]
): MeshSegment[] {
  const source = mesh.geometry.index
    ? mesh.geometry.clone()
    : mesh.geometry.toNonIndexed();

  source.computeBoundingBox();
  const minY = source.boundingBox!.min.y;
  const maxY = source.boundingBox!.max.y;
  const segmentCount = segmentDefs.length;
  const thresholds = Array.from(
    { length: segmentCount - 1 },
    (_, i) => minY + ((maxY - minY) * (i + 1)) / segmentCount
  );

  const position = source.attributes.position as THREE.BufferAttribute;
  const index = source.index!;
  const triangleCount = index.count / 3;
  const buckets: number[][] = segmentDefs.map(() => []);

  const centroid = new THREE.Vector3();

  for (let t = 0; t < triangleCount; t++) {
    centroid.set(0, 0, 0);
    for (let v = 0; v < 3; v++) {
      const vi = index.getX(t * 3 + v);
      centroid.x += position.getX(vi);
      centroid.y += position.getY(vi);
      centroid.z += position.getZ(vi);
    }
    centroid.multiplyScalar(1 / 3);

    let bucket = segmentCount - 1;
    for (let i = 0; i < thresholds.length; i++) {
      if (centroid.y < thresholds[i]) {
        bucket = i;
        break;
      }
    }
    buckets[bucket].push(t);
  }

  return segmentDefs.map((def, bucketIndex) => ({
    id: def.id,
    geometry: buildGeometryFromTriangles(source, buckets[bucketIndex]),
    explode: def.explode.clone(),
  }));
}

function buildGeometryFromTriangles(
  source: THREE.BufferGeometry,
  triangleIndices: number[]
): THREE.BufferGeometry {
  const position = source.attributes.position as THREE.BufferAttribute;
  const normal = source.attributes.normal as THREE.BufferAttribute | undefined;
  const uv = source.attributes.uv as THREE.BufferAttribute | undefined;
  const index = source.index!;

  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];

  for (const tri of triangleIndices) {
    for (let v = 0; v < 3; v++) {
      const vi = index.getX(tri * 3 + v);
      positions.push(
        position.getX(vi),
        position.getY(vi),
        position.getZ(vi)
      );
      if (normal) {
        normals.push(normal.getX(vi), normal.getY(vi), normal.getZ(vi));
      }
      if (uv) {
        uvs.push(uv.getX(vi), uv.getY(vi));
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  if (normals.length) {
    geometry.setAttribute(
      "normal",
      new THREE.Float32BufferAttribute(normals, 3)
    );
  } else {
    geometry.computeVertexNormals();
  }
  if (uvs.length) {
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  }

  return geometry;
}
