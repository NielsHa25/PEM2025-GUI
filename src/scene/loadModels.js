



export async function loadRobot(scene, materials, shadowGenerator) {
  const result = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "./assets/",
    "Model.glb",
    scene
  );

  const meshes = {};

  result.meshes.forEach(mesh => {
    if (!mesh.name || mesh === scene.meshes[0]) return;

    console.log("Loaded mesh:", mesh.name);

    mesh.receiveShadows = true;
    shadowGenerator.addShadowCaster(mesh);

    const name = mesh.name.toLowerCase();

    // --- Material rules ---
    if (name.includes("linearwelle")) {
      mesh.material = materials.metalShaft;

    } else if (name.includes("nema")) {
      mesh.material = materials.nemaGrey;

    } else if (name.includes("bodenplatte")) {
      mesh.material = materials.wood;
       mesh.receiveShadows = true; 

    } else if (name.includes("vmax_1")) {
      mesh.material = materials.orange;

    }else if (name.includes("vmax_2")) {
      mesh.material = materials.orange;

    }else if(name.includes("servo_1")){
      mesh.material = materials.moveMat;

    }else if(name.includes("servo_2")){
      mesh.material = materials.moveMat;
      
    }else if (name.includes("base")){
      mesh.material = materials.baseMat;
    
    } else {
      mesh.material = materials.metalDark;
    }

  

    meshes[mesh.name] = mesh;
  });

  return meshes;
}
