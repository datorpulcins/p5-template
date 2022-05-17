import p5 from "p5";
import * as Tone from "tone";
import { AudioEnergy, Range } from "./lib/AudioEnergy";

export const Sketch = (p: p5) => {
  const mp3 = "/human-music.mp3";
  const player = new Tone.Player();
  const analyser = new AudioEnergy();

  const rings: { name: Range; color: string }[] = [
    { name: "treble", color: "tomato" },
    { name: "highMid", color: "cyan" },
    { name: "mid", color: "yellow" },
    { name: "lowMid", color: "orange" },
    { name: "bass", color: "pink" },
  ];

  let w = window.innerWidth;
  let h = window.innerHeight;
  let centerX = w / 2;
  let centerY = h / 2;

  p.windowResized = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    centerX = w / 2;
    centerY = h / 2;
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = async () => {
    await player.load(mp3);

    player.connect(analyser);
    player.connect(Tone.Destination);

    p.createCanvas(p.windowWidth, p.windowHeight);

    p.noFill();
    p.angleMode(p.DEGREES);
  };

  p.mousePressed = () => {
    player.start();
  };

  p.draw = () => {
    p.background(0);

    rings.forEach((ring, index) => {
      const energy = analyser.getEnergy(ring.name);
      const radius = energy * centerY;

      p.stroke(ring.color);
      p.circle(centerX, centerY, radius * 2);

      p.push();

      p.noStroke();
      p.fill(ring.color);
      p.translate(centerX, centerY);
      p.rotate(-10 * index + 1);
      p.textSize(14);
      p.text(ring.name, radius + 10, 0);

      p.pop();
    });
  };
};
