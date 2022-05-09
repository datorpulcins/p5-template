import p5 from "p5";
import "p5/lib/addons/p5.sound";

export const Sketch = (p: p5) => {
  let w = window.innerWidth;
  let h = window.innerHeight;
  let mic: p5.AudioIn;

  p.windowResized = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    mic = new p5.AudioIn();
    mic.start();
  };

  p.mouseClicked = () => {
    p.getAudioContext().resume();
  };

  p.draw = () => {
    const micLevel = mic.getLevel();

    p.background(0);
    p.fill([255, 0, 0]);
    p.circle(w / 2, h / 2, micLevel * 1000 + 50);
  };
};
