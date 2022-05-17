import { Analyser } from "tone";

export type Range = "bass" | "lowMid" | "mid" | "highMid" | "treble";

export class AudioEnergy extends Analyser {
  private frequencyRanges: Record<Range, number[]> = {
    bass: [20, 140],
    lowMid: [140, 400],
    mid: [400, 2600],
    highMid: [2600, 5200],
    treble: [5200, 14000],
  };

  constructor(sampleCount = 2048) {
    super("fft", sampleCount);
  }

  public log = (n: number, logBase = 10) => {
    return Math.log(n) / Math.log(logBase);
  };

  private getEnergyAtHz = (hz: number) => {
    const nyquist = this.context.sampleRate / 2;
    const frequencyBinCount = this.size;
    return Math.max(0, Math.min(frequencyBinCount - 1, Math.floor((hz / nyquist) * frequencyBinCount)));
  };

  private map = (n: number, start1: number, stop1: number, start2: number, stop2: number) => {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  };

  public getEnergy = (range: Range) => {
    this.getValue();

    const [low, high] = this.frequencyRanges[range];

    const lowIndex = this.getEnergyAtHz(low);
    const highIndex = this.getEnergyAtHz(high);

    const buffer = this.getValue() as Float32Array;

    let total = 0;
    let numFrequencies = 0;

    for (let i = lowIndex; i <= highIndex; i++) {
      total += buffer[i];
      numFrequencies++;
    }

    const toReturn = total / numFrequencies;
    console.log(toReturn);
    return this.map(toReturn, -120, -40, 0, 1);
  };
}
