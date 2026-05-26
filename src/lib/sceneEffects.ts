import type { ProductMode, SceneState } from "@/lib/sceneStore";

export type SceneEffectWeights = {
  layerReveal: number;
  wireframe: number;
  technicalLines: number;
  scanPass: number;
  tracePass: number;
  emissivePulse: number;
  foamCompress: number;
  speedLines: number;
  pointerBoost: number;
  xray: number;
  solidOpacity: number;
};

function modeFromState(state: SceneState): ProductMode {
  if (state.progress < 0.12) return "hero";
  if (state.sectionIndex === 0) return "comfort";
  if (state.sectionIndex === 1) return "materials";
  if (state.sectionIndex === 2) return "performance";
  return state.productMode;
}

/**
 * Motion restraint: only one effect dominates per chapter third.
 * Identity: biomechanical engineering / athletic precision.
 */
export function getSceneEffectWeights(state: SceneState): SceneEffectWeights {
  const { sectionIndex, sectionProgress, endingProgress } = state;
  const mode = modeFromState(state);
  const peak = Math.sin(sectionProgress * Math.PI);
  const calm = Math.min(1, endingProgress);

  let layerReveal = 0;
  let wireframe = 0;
  let technicalLines = 0;
  let scanPass = 0;
  let tracePass = 0;
  let emissivePulse = 0.05;
  let foamCompress = 0;
  let speedLines = 0;
  let pointerBoost = 1;
  let xray = 0;
  let solidOpacity = 1;

  if (mode === "hero") {
    emissivePulse = 0.04;
    pointerBoost = 0.9;
  } else if (mode === "comfort") {
    const t = sectionProgress;
    if (t < 0.45) foamCompress = (t / 0.45) * peak;
    else foamCompress = peak * (1 - (t - 0.45) / 0.55);
    emissivePulse = 0.05 + peak * 0.06;
    pointerBoost = 1;
  } else if (mode === "materials") {
    const t = sectionProgress;
    if (t < 0.33) {
      wireframe = t / 0.33;
      tracePass = wireframe * 0.4;
    } else if (t < 0.66) {
      wireframe = 0.35;
      scanPass = (t - 0.33) / 0.33;
      tracePass = 0;
    } else {
      technicalLines = (t - 0.66) / 0.34;
      layerReveal = technicalLines * 0.08;
      wireframe = 0.25;
      tracePass = technicalLines;
      xray = technicalLines * 0.35;
      solidOpacity = 1 - xray * 0.4;
    }
    emissivePulse = 0.06 + peak * 0.08;
  } else if (mode === "performance") {
    const t = sectionProgress;
    if (t < 0.5) speedLines = (t / 0.5) * peak;
    else {
      speedLines = peak * 0.3;
      technicalLines = ((t - 0.5) / 0.5) * 0.4;
    }
    pointerBoost = 1.25;
    emissivePulse = 0.06 + peak * 0.08;
  }

  if (state.highlightSegment) {
    emissivePulse = Math.max(emissivePulse, 0.12);
    pointerBoost = 0.4;
  }

  const damp = 1 - calm;
  return {
    layerReveal: Math.min(1, layerReveal * damp),
    wireframe: Math.min(1, wireframe * damp),
    technicalLines: Math.min(1, technicalLines * damp),
    scanPass: Math.min(1, scanPass * damp),
    tracePass: Math.min(1, tracePass * damp),
    emissivePulse: Math.min(1, emissivePulse * (0.55 + damp * 0.45)),
    foamCompress: Math.min(1, foamCompress * damp),
    speedLines: Math.min(1, speedLines * damp),
    pointerBoost: pointerBoost * (0.65 + damp * 0.35),
    xray: Math.min(1, xray * damp),
    solidOpacity: Math.max(0.5, solidOpacity),
  };
}
