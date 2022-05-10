import p5 from "p5";
import * as Tone from "tone";
import { eq } from "./eq";

export const Sketch = (p: p5) => {
  let w = window.innerWidth;
  let h = window.innerHeight;

  const fft = new Tone.FFT();
  const mic = new Tone.UserMedia().connect(fft);

  p.windowResized = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.noStroke();
  };

  p.mousePressed = () => {
    mic.open();
    Tone.context.resume();
  };

  p.draw = () => {
    p.background(0);

    let levels = fft.getValue();

    const low = eq(levels, 0, 0.3);
    const mid = eq(levels, 0.3, 0.6);
    const high = eq(levels, 0.6, 1);

    p.circle(w / 2, h / 2, low * 3);
    p.circle(w / 2 + 40, h / 2, mid * 3);
    p.circle(w / 2 + 80, h / 2, high * 3);
  };
};
