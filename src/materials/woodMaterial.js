export function createWoodMaterial(scene) {
  const mat = new BABYLON.StandardMaterial("wood", scene);

  mat.diffuseTexture = new BABYLON.Texture(
    "/src/materials/textures/wood.jpg",
    scene
  );

  mat.diffuseColor = new BABYLON.Color3(1, 1, 1);
  mat.specularColor = BABYLON.Color3.Black();

  return mat;
}
