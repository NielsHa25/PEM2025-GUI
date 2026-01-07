// scene/cameraHelper.js

const DEFAULT_ANIM_TIME = 200;

export function createCameraHelper(scene, camera) {

  // ---------------------------
  // Camera poses
  // ---------------------------
  const POSES = {
  DEMO: {
    alpha: Math.PI / 1.5,
    beta:  Math.PI / 2.5,
    radius: 1.3,
    targetOffset: new BABYLON.Vector3(0, 0.1, 0)
  },

  READY: {
    alpha: Math.PI / 1.5,
    beta:  Math.PI / 2.5,
    radius: 1.1,
    targetOffset: new BABYLON.Vector3(0,0.1,0,)
  },

  INSPECT: {
    alpha: Math.PI / 1.5,
    beta:  Math.PI / 2,
    radius: 0.5,
    targetOffset: new BABYLON.Vector3(0.0, 0.15, 0) // 🔑 higher view
  },

  TOOL: {
    alpha: Math.PI / 1 ,
    beta: 1.2,
    radius: 0.2,
    targetOffset: new BABYLON.Vector3(-0.1, 0.2, 0)
  }
};


const DEMO_SHOTS = [
  { pose: "DEMO", hold: 6000, autoRotate: true },
  { pose: "TOOL", hold: 6000, autoRotate: true },
  { pose: "INSPECT", hold: 6000, autoRotate: true }
];



let demoActive = false;
let demoTimeout = null;
let demoIndex = 0;


function runDemoShot(targetNode) {
  if (!demoActive) return;

  const shot = DEMO_SHOTS[demoIndex];

  goTo(shot.pose, targetNode, () => {
    if (!demoActive) return;

    if (shot.autoRotate) {
      startAutoRotate();
    } else {
      stopAutoRotate();
    }

    demoTimeout = setTimeout(() => {
      stopAutoRotate();

      demoIndex = (demoIndex + 1) % DEMO_SHOTS.length;
      runDemoShot(targetNode);
    }, shot.hold);
  });
}

function startDemo(targetNode) {
  if (demoActive) return;

  demoActive = true;
  demoIndex = 0;

  runDemoShot(targetNode);
}

function stopDemo() {
  demoActive = false;
  demoIndex = 0;

  clearTimeout(demoTimeout);
  demoTimeout = null;

  stopAutoRotate();
}


  // ---------------------------
  // Auto-rotation (EXPLICIT)
  // ---------------------------
  let autoRotateBehavior = null;

  function startAutoRotate() {
    if (autoRotateBehavior) return;

    autoRotateBehavior = new BABYLON.AutoRotationBehavior();
    autoRotateBehavior.idleRotationSpeed = -0.1;
    autoRotateBehavior.idleRotationWaitTime = 0;
    autoRotateBehavior.idleRotationSpinupTime = 2000;
    autoRotateBehavior.zoomStopsAnimation = false;

    camera.addBehavior(autoRotateBehavior);
  }

  function stopAutoRotate() {
    if (!autoRotateBehavior) return;

    camera.removeBehavior(autoRotateBehavior);
    autoRotateBehavior = null;

    // HARD stop any remaining motion
    camera.inertia = 0;
    scene.stopAnimation(camera);
  }

  // ---------------------------
  // Animation helper
  // ---------------------------

function makeEase() {
  const ease = new BABYLON.CubicEase();
  ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
  return ease;
}



  function animateProperty(target, property, to, duration, onDone) {
  const animation = new BABYLON.Animation(
    `anim_${property}`,
    property,
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  animation.setKeys([
    { frame: 0, value: target[property] },
    { frame: duration, value: to }
  ]);

  animation.setEasingFunction(makeEase()); // 🔑 ADD THIS

  const animatable = scene.beginDirectAnimation(
    target,
    [animation],
    0,
    duration,
    false
  );

  if (onDone) animatable.onAnimationEnd = onDone;
}


function animateVector3(target, property, to, duration, onDone) {
  const animation = new BABYLON.Animation(
    `anim_${property}`,
    property,
    60,
    BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  animation.setKeys([
    { frame: 0, value: target[property].clone() },
    { frame: duration, value: to.clone() }
  ]);

  animation.setEasingFunction(makeEase()); // 🔑 ADD THIS

  const animatable = scene.beginDirectAnimation(
    target,
    [animation],
    0,
    duration,
    false
  );

  if (onDone) animatable.onAnimationEnd = onDone;
}


  // ---------------------------
  // Public API
  // ---------------------------
 function goTo(poseName, targetNode = null, onDone = null) {
  const pose = POSES[poseName];
  if (!pose) return;

  const baseTarget = targetNode
    ? targetNode.getAbsolutePosition()
    : camera.target.clone();

  const finalTarget = baseTarget.add(pose.targetOffset || BABYLON.Vector3.Zero());

  let finished = 0;
  const done = () => {
    finished++;
    if (finished === 4 && onDone) onDone();
  };

  animateProperty(camera, "alpha", pose.alpha, DEFAULT_ANIM_TIME, done);
  animateProperty(camera, "beta", pose.beta, DEFAULT_ANIM_TIME, done);
  animateProperty(camera, "radius", pose.radius, DEFAULT_ANIM_TIME, done);
  animateVector3(camera, "target", finalTarget, DEFAULT_ANIM_TIME, done);
}

return {
  goTo,
  startAutoRotate,
  stopAutoRotate,
  startDemo,
  stopDemo,
  POSES
};
}
