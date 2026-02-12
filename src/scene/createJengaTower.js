export function createJengaTower(scene, shadowGenerator, options = {}) {
  const {
    layers = 18,
    blockSize = { height: 0.015, width: 0.075, length: 0.025 },
    spacing = 0.0015,
    position = new BABYLON.Vector3(0, 0, 0),
    material = null
  } = options;

  const root = new BABYLON.TransformNode("jengaTower", scene);
  root.position.copyFrom(position);

  const blocks = [];

  const baseBlock = BABYLON.MeshBuilder.CreateBox(
    "jengaBlockTemplate",
    {
      width: blockSize.width,
      height: blockSize.height,
      depth: blockSize.length
    },
    scene
  );
  baseBlock.isVisible = false;

  if (material) baseBlock.material = material;

  const layerHeight = blockSize.height + 0.0003;

  for (let layer = 0; layer < layers; layer++) {
    const isRotated = layer % 2 === 1;

    for (let i = 0; i < 3; i++) {
      const block = baseBlock.clone(`block_${layer-1}_${i+1}`);
      // Shadows
        

      block.parent = root;
      block.isVisible = true;
      block.setEnabled(true);

      // unique material per block
      if (baseBlock.material) {
        block.material = baseBlock.material.clone(`${block.name}_mat`);
        block.material.emissiveColor = new BABYLON.Color3(0.15, 0.12, 0.08);
        block.material.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);

      }

      block.receiveShadows = true;
        shadowGenerator.addShadowCaster(block);

      const offset = (i - 1) * (blockSize.length + Math.random()*spacing);

      if (isRotated) {
        block.rotation.y = 0;
        block.position.x = 0;
        block.position.z = offset;
        
      } else {
        block.rotation.y = Math.PI / 2;
        block.position.x = offset;
        block.position.z = 0;
        
      }

      block.position.y = layer * layerHeight + blockSize.height / 2;
      blocks.push(block);
    }
  }

  return { root, blocks };
}
