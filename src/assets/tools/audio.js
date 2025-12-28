// SFX2GL Tool by TheTrueFax (https://github.com/thetruefax/)

import group from '@/assets/tools/group.js';
import encoding from './encoding';


/**
 * @param {File} file - An image file
 * @param {Number} samples - samples
 * @param {Number} sampleRateMs
 * @returns {Promise<Object>} - A group level node
 */

async function audio(file, samples, sampleRateMs) {
    try {
        const level_nodes = await generate(file, samples, sampleRateMs);
        return group.groupNodes(level_nodes);
    } catch (e) {
        
        // group.groupNodes was passed an empty array
        if (e.includes("Cannot read properties of undefined (reading 'map')")) {
          window.toast("SFX2GL Failed to create required level nodes.","error");
          return null;
        }

        window.toast(e,"error");
        return null;
    }
}

//#region FFT Helpers

/**
 * 
 * @param {Object[]} x - Complex number array
 * @param {number} x[].re - Real part
 * @param {number} x[].im - Imaginary part (left at 0 for inputs)
 * @returns {Array<Object>}
 */
// Side note, the complex array input HAS to have a length of a power of 2
function recursiveCooleyTukeyFFT(x) {
  let N = x.length;

  if (N===1) {
    return x;
  } else {

    // split into even and odd
    let xeven = [];
    let xodd = [];
    for (let i =0;i<N;i++) {
      if (i%2==0) {
        xeven.push(x[i]);
      } else {
        xodd.push(x[i]);
      }
    }

    // calculate ffts
    let X_even = recursiveCooleyTukeyFFT(xeven);
    let X_odd = recursiveCooleyTukeyFFT(xodd);

    const result = new Array(N);

    // combine like a beutiful butterfly
    for (let k=0;k<N/2;k++) {
      const t = {
        re: Math.cos(-2 * Math.PI * k / N),
        im: Math.sin(-2 * Math.PI * k / N)
      };

      const terms = {
        re: X_odd[k].re * t.re - X_odd[k].im * t.im,
        im: X_odd[k].re * t.im + X_odd[k].im * t.re,
      };

      result[k] = {
        re: X_even[k].re + terms.re,
        im: X_even[k].im + terms.im
      };

      result[k + N/2] = {
        re: X_even[k].re - terms.re,
        im: X_even[k].im - terms.im
      };
    }

    return result;
  }
}

function extendSampleForFFT(sample) {
  // Find next power of 2 for the sample, and copy the sample into an array of that length
  const nextPowerOf2 = Math.pow(2,Math.ceil(Math.log2(sample.length))); // Source: me

  const output = new Float32Array(nextPowerOf2);

  output.set(sample,0);

  return output;
}

async function splitSampleByRate(data, samples, originalSampleRate, sampleRateMs) {

}

//#endregion

//#region Level Construction

/**
 * 
 * @param {File} file
 * @returns {Float32Array} - Samples for the audio... only captured the first channel tho...
 */
async function readFileSamples(file) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const arrayBuffer = await file.arrayBuffer();

  const decodedData = await audioContext.decodeAudioData(arrayBuffer);

  const channelOne = decodedData.getChannelData(0);

  return {
    data: channelOne,
    sampleRate: decodedData.sampleRate
  };
}

async function generate(file, pitchSamples, sampleRateMs) {

  var levelNodes = [];

  // Read file samples & Catch frequency info
  const samples = await readFileSamples(file);


  console.log(samples);
}

//#endregion

export default {
  audio,
}