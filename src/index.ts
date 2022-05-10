import p5 from "p5";
import { Sketch } from "./Sketch";

const container = document.getElementById("p5");

if (container) {
  new p5(Sketch, container);
}
