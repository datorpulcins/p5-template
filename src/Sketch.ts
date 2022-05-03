import p5 from "p5";

export const Sketch = (p: p5) => {
  let w = window.innerWidth;
  let h = window.innerHeight;

  p.windowResized = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.background(0);
    p.fill([255, 0, 0]);
    p.circle(w / 2, h / 2, 50);
  };
};
