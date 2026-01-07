export async function loadTable(scene, shadowGenerator) {
  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "assets/",
    "table.glb",
    scene
  );

  function createWoodTableMaterial(scene) {
  const mat = new BABYLON.PBRMaterial("woodTable", scene);

  // Base wood color
  mat.albedoColor = new BABYLON.Color3(0.62, 0.47, 0.32);

  // Wood is not metallic
  mat.metallic = 0.0;

  // Slight sheen, but mostly matte
  mat.roughness = 0.75;

  // Subtle environment reflection
  mat.environmentIntensity = 0.6;

  return mat;
}

const woodMat = createWoodTableMaterial(scene);

  const tableMeshes = result.meshes.filter(
    m => m instanceof BABYLON.Mesh
  );

  tableMeshes.forEach(mesh => {
    mesh.receiveShadows = true;
    mesh.position.y = -0.176;
    mesh.material = woodMat;
    // 🔑 THIS is what was missing
    shadowGenerator.addShadowCaster(mesh);
  });

  return tableMeshes;
}
