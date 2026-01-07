export function createScene(engine, canvas) {
  const scene = new BABYLON.Scene(engine);

  // --- Background ---
  scene.clearColor = new BABYLON.Color4(0.82, 0.82, 0.825, 1.0);

  // --- Camera ---
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    BABYLON.Tools.ToRadians(45),
    BABYLON.Tools.ToRadians(65),
    1.1,
    new BABYLON.Vector3(0, 0.2, 0),
    scene
  );

  camera.attachControl(canvas, true);
  camera.wheelPrecision = 120;
  camera.minZ = 0.01;

// --- Key Light (shadows) ---
const keyLight = new BABYLON.DirectionalLight(
  "keyLight",
  new BABYLON.Vector3(-0.3, -1, -0.25),
  scene
);
keyLight.position = new BABYLON.Vector3(2, 3, 2);
keyLight.intensity = 1.6;
keyLight.shadowMinZ = 0.1;
keyLight.shadowMaxZ = 12;

// --- Fill Light ---
const fillLight = new BABYLON.HemisphericLight(
  "fill",
  new BABYLON.Vector3(0, 1, 0),
  scene
);
fillLight.intensity = 0.35;
fillLight.groundColor = new BABYLON.Color3(0.4, 0.4, 0.4);

// --- Rim Light (no shadows) ---
const rimLight = new BABYLON.DirectionalLight(
  "rimLight",
  new BABYLON.Vector3(0.4, -0.8, 0.6),
  scene
);
rimLight.position = new BABYLON.Vector3(-3, 3, -3);
rimLight.intensity = 0.4;


const floor = BABYLON.MeshBuilder.CreateDisc(
  "floor",
  {
    radius: 3,
    tessellation: 64
  },
  scene
);

// Rotate disc to be horizontal
floor.rotation.x = Math.PI / 2;
floor.position.y = -0.34;
floor.receiveShadows = true;


const floorMat = new BABYLON.PBRMaterial("floorMat", scene);

// Base neutral tone (slightly warm gray)
floorMat.albedoColor = new BABYLON.Color3(
  0.76 + Math.random() * 0.01,
  0.77 + Math.random() * 0.01,
  0.75 + Math.random() * 0.01
);


// Very matte
floorMat.roughness = 0.9;
floorMat.metallic = 0.0;

// Soft environment response
floorMat.environmentIntensity = 0.25;
floorMat.ambientColor = new BABYLON.Color3(0.85, 0.85, 0.85);


// Reduce specular sparkle
floorMat.specularIntensity = 0.05;

// Shadow-friendly
floorMat.useRadianceOverAlpha = false;

floor.material = floorMat;


  // --- Shadows ---
 const shadowGenerator = new BABYLON.ShadowGenerator(2048, keyLight);
shadowGenerator.usePercentageCloserFiltering = true;
shadowGenerator.filteringQuality =
  BABYLON.ShadowGenerator.QUALITY_HIGH;

// Acne control
shadowGenerator.bias = 0.001;
shadowGenerator.normalBias = 0.05;


// 🔑 Contact shadow illusion
shadowGenerator.contactHardeningShadow = false;



  // --- Environment ---
  scene.environmentTexture =
    BABYLON.CubeTexture.CreateFromPrefilteredData(
      "./assets/studio1.env",
      scene
    );
  scene.environmentIntensity = 0.4;

  return { scene, camera, shadowGenerator };
}
