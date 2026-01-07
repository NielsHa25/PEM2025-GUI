export function createRobotMotion(scene) {
  // -------------------------
  // Resolve nodes
  // -------------------------
  const vmax1 = scene.getNodeByName("vmax_1");
  const vmax2 = scene.getNodeByName("vmax_2");
  
    const servo1 = scene.getMeshByName("servo_1");
    const servo2 = scene.getMeshByName("servo_2");
      servo1.rotation.z = -Math.PI / 2;
      servo2.rotation.z = Math.PI / 2;

      //  Demo Helpers
let demoRunning = false;
let demoTimeouts = [];

function demoTimeout(fn, delay) {
  const id = setTimeout(() => {
    demoTimeouts = demoTimeouts.filter(t => t !== id);
    fn();
  }, delay);
  demoTimeouts.push(id);
}



if (!servo1 || !servo2) {
  console.error("Servo mesh not found");
}

// 🔑 CRITICAL LINE
servo1.rotationQuaternion = null;
servo2.rotationQuaternion = null;

// Optional sanity log
console.log(
  "servo1 quat after null:",
  servo1.rotationQuaternion
);
  if (!vmax1 || !vmax2 || !servo1 || !servo2) {
    console.warn("RobotMotion: One or more nodes not found");
  }




  function makeEase() {
  const ease = new BABYLON.CubicEase();
  ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
  return ease;
}


  // -------------------------
  // Internal helpers
  // -------------------------
function animateZAxis(node, distance = 0.12, duration = 60, loop = false) {
  if (!node) return;

  const startY = node.position.y;

  const anim = new BABYLON.Animation(
    `${node.name}_zAnim`,
    "position.y",
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  anim.setKeys([
    { frame: 0, value: startY },
    { frame: duration, value: distance }
  ]);

  anim.setEasingFunction(makeEase());

  node.animations = [anim];

  scene.beginAnimation(node, 0, duration, loop);
}



function animateServo(node, axis = "y", angleDeg = 60, duration = 60, loop = false) {
  if (!node) return;

  const start = node.rotation[axis];
  const angleRad = BABYLON.Tools.ToRadians(angleDeg);

  const anim = new BABYLON.Animation(
    `${node.name}_rotAnim`,
    `rotation.${axis}`,
    60,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  anim.setKeys([
    { frame: 0, value: start },
    { frame: duration, value: angleRad }
  ]);

  anim.setEasingFunction(makeEase());

  node.animations = [anim];

  scene.beginAnimation(node, 0, duration, loop);
}



 
// Animation Functions 

function moveToStartPosition() {
  animateZAxis(vmax1, 0.02, 120, false);
  animateZAxis(vmax2, 0.02, 120, false);

  animateServo(servo1, "y", 0, 120, false);
  animateServo(servo2, "y", -180, 120, false);
}

function startDemo() {
  if (demoRunning) return;   // 🔑 prevent stacking
  demoRunning = true;

  for (let i = 0; i < 9; i++) {

    demoTimeout(() => {
      if (!demoRunning) return;

      animateZAxis(vmax1, 0.015 * 2 * i, 50, true);
      animateZAxis(vmax2, 0.015 * 2 * i + 0.03, 50, true);
      animateServo(servo1, "y", 0, 40, true);
      animateServo(servo2, "y", 180, 40, true);
    }, 600 + i * 2800);

    demoTimeout(() => {
      if (!demoRunning) return;

      animateServo(servo1, "y", 30, 40, true);
      animateServo(servo2, "y", 210, 40, true);
    }, 1200 + i * 2800);

    demoTimeout(() => {
      if (!demoRunning) return;

      animateServo(servo1, "y", -30, 40, true);
      animateServo(servo2, "y", 150, 40, true);
    }, 2800 + i * 2800);

    demoTimeout(() => {
      if (!demoRunning) return;

      animateServo(servo1, "y", 0, 40, true);
      animateServo(servo2, "y", 180, 40, true);
    }, 2400 + i * 2800);
  }

  // 🔁 restart demo ONLY if still running
  demoTimeout(() => {
    if (!demoRunning) return;
    demoRunning = false;
    startDemo();
  }, 29000);
}



  // -------------------------
  // Public API
  // -------------------------
  return {
    startDemo,

    stopAll() {
  // 🛑 stop demo logic
  demoRunning = false;

  // 🛑 cancel all scheduled demo steps
  demoTimeouts.forEach(clearTimeout);
  demoTimeouts = [];
},

    rotateServoTo(servo, angle, durationFrames = 30) {
      rotateServoTo(servo, angle, durationFrames);
    },
    
    moveZTo(zNode, targetY, durationFrames) {
        moveZTo(zNode, targetY, durationFrames);
        },

    moveToStartPosition(){
      moveToStartPosition();
    },
  };
}
