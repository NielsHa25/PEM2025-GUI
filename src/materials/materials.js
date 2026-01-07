export function createMaterials(scene) {

  // --- Dunkles Maschinenmetall ---
  const metalDark = new BABYLON.PBRMaterial("metalDark", scene);
  metalDark.albedoColor = new BABYLON.Color3(0.15, 0.15, 0.16);
  metalDark.metallic = 0.9;
  metalDark.roughness = 0.4;

  // --- Glänzende Linearwellen ---
  const metalShaft = new BABYLON.PBRMaterial("metalShaft", scene);
  metalShaft.albedoColor = new BABYLON.Color3(0.9, 0.9, 0.9);
  metalShaft.metallic = 0.9;
  metalShaft.roughness = 0.15;

  // --- NEMA Motor (hellgrau, matt) ---
  const nemaGrey = new BABYLON.PBRMaterial("nemaGrey", scene);
  nemaGrey.albedoColor = new BABYLON.Color3(0.65, 0.65, 0.68);
  nemaGrey.metallic = 0.1;
  nemaGrey.roughness = 0.55;

  // --- Holz Bodenplatte ---
  const wood = new BABYLON.PBRMaterial("wood", scene);
  wood.albedoColor = new BABYLON.Color3(0.32, 0.24, 0.18);
  wood.metallic = 0.0;
  wood.roughness = 0.85;


// --- Orange highlight / safety color ---
const orange = new BABYLON.PBRMaterial("orange", scene);
orange.albedoColor = new BABYLON.Color3(0.04, 0.04, 0.05);
orange.metallic = 0.3;
orange.roughness = 0.5;


var moveMat = new BABYLON.StandardMaterial("moveMat", scene);
moveMat.diffuseColor = new BABYLON.Color3(1, 1, 0);
moveMat.metallic = 0.2;
moveMat.roughness = 0.9;

var baseMat = new BABYLON.PBRMaterial("baseMat", scene);
baseMat.albedoColor = new BABYLON.Color3(0.03, 0.03, 0.03);
baseMat.metallic = 0.4;
baseMat.roughness = 0.4;

  return {
    metalDark,
    metalShaft,
    nemaGrey,
    wood,
    orange,
    moveMat,
    baseMat,
  };
}
