const PIXI = require('pixi.js');
import '../src/index';

const renderer = new PIXI.WebGLRenderer(800, 600);
document.getElementById('app').appendChild(renderer.view);
const stage = new PIXI.Container();

const modelHaru = {
  "type":"Live2D Model Setting",
  "name":"haru",
  "model":"pixi-live2d/assets/haru/haru_01.moc",
  "textures":
  [
    "pixi-live2d/assets/haru/haru_01.1024/texture_00.png",
    "pixi-live2d/assets/haru/haru_01.1024/texture_01.png",
    "pixi-live2d/assets/haru/haru_01.1024/texture_02.png"
  ],
  "physics":"pixi-live2d/assets/haru/haru.physics.json",
  "pose":"pixi-live2d/assets/haru/haru.pose.json",
  "expressions":
  [
    {"name":"f01","file":"pixi-live2d/assets/haru/expressions/f01.exp.json"},
    {"name":"f02","file":"pixi-live2d/assets/haru/expressions/f02.exp.json"},
    {"name":"f03","file":"pixi-live2d/assets/haru/expressions/f03.exp.json"},
    {"name":"f04","file":"pixi-live2d/assets/haru/expressions/f04.exp.json"},
    {"name":"f05","file":"pixi-live2d/assets/haru/expressions/f05.exp.json"},
    {"name":"f06","file":"pixi-live2d/assets/haru/expressions/f06.exp.json"},
    {"name":"f07","file":"pixi-live2d/assets/haru/expressions/f07.exp.json"},
    {"name":"f08","file":"pixi-live2d/assets/haru/expressions/f08.exp.json"}
  ],
  "layout":
  {
    "center_x": 0,
    "y": 1.2,
    "width": 2.9
  },
  "hit_areas":
  [
    {"name":"head", "id":"D_REF.HEAD"},
    {"name":"body", "id":"D_REF.BODY"}
  ],
  "motions":
  {
    "idle":
    [
      {"file":"pixi-live2d/assets/haru/motions/idle_00.mtn" ,"fade_in":2000, "fade_out":2000},
      {"file":"pixi-live2d/assets/haru/motions/idle_01.mtn" ,"fade_in":2000, "fade_out":2000},
      {"file":"pixi-live2d/assets/haru/motions/idle_02.mtn" ,"fade_in":2000, "fade_out":2000}
    ],
    "tap_body":
    [
      { "file":"pixi-live2d/assets/haru/motions/tapBody_00.mtn" , "sound":"pixi-live2d/assets/haru/sounds/tapBody_00.mp3"},
      { "file":"pixi-live2d/assets/haru/motions/tapBody_01.mtn" , "sound":"pixi-live2d/assets/haru/sounds/tapBody_01.mp3"},
      { "file":"pixi-live2d/assets/haru/motions/tapBody_02.mtn" , "sound":"pixi-live2d/assets/haru/sounds/tapBody_02.mp3"}
    ],
    "pinch_in":
    [
      { "file":"pixi-live2d/assets/haru/motions/pinchIn_00.mtn", "sound":"pixi-live2d/assets/haru/sounds/pinchIn_00.mp3" }
    ],
    "pinch_out":
    [
      { "file":"pixi-live2d/assets/haru/motions/pinchOut_00.mtn", "sound":"pixi-live2d/assets/haru/sounds/pinchOut_00.mp3" }
    ],
    "shake":
    [
      { "file":"pixi-live2d/assets/haru/motions/shake_00.mtn", "sound":"pixi-live2d/assets/haru/sounds/shake_00.mp3","fade_in":500 }
    ],
    "flick_head":
    [
      { "file":"pixi-live2d/assets/haru/motions/flickHead_00.mtn", "sound":"pixi-live2d/assets/haru/sounds/flickHead_00.mp3" }
    ]
  }
};



const sprite = new PIXI.Sprite.fromImage('./7_room2_a.jpg');
stage.addChild(sprite);

// setTimeout(() => {
//   const sprite2 = new PIXI.Sprite.fromImage('./pixiv4.jpg');
//   sprite2.y = 350;
//   stage.addChildAt(sprite2, 1);
// }, 1000)

const live2dSprite = new PIXI.Live2DSprite(modelHaru, {
  debugLog: false,
  randomMotion: false,
  eyeBlink: false,
  // audioPlayer: (...args) => console.log(...args)
});
stage.addChild(live2dSprite);

live2dSprite.x = -105;
// live2dSprite.y = -150;
live2dSprite.adjustScale(0,0,0.7);
live2dSprite.adjustTranslate(0.4, 0);
live2dSprite.startRandomMotion('idle');

live2dSprite.on('click', (evt) => {
  const point = evt.data.global;
  if (live2dSprite.hitTest('body', point.x, point.y)) {
    live2dSprite.startRandomMotionOnce('tap_body');
  }
  if (live2dSprite.hitTest('head', point.x, point.y)) {
    live2dSprite.playSound('星のカケラ.mp3', 'sound/');
  }
});
live2dSprite.on('mousemove', (evt) => {
  const point = evt.data.global;
  live2dSprite.setViewPoint(point.x, point.y);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
