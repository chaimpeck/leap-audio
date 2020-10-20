import * as Tone from 'tone'

const fatOsc = new Tone.FatOscillator('Ab3', 'sawtooth', 40)
  .toDestination()
  .start()

window.addEventListener('keypress', () => {
  fatOsc.start()
})

const playTones = frame => {
  if (frame.hands[0]) {
    const {
      sphereCenter,
      sphereRadius,
      grabStrength,
      pinchStrength,
    } = frame.hands[0]
    const [x, y, z] = frame.interactionBox.normalizePoint(sphereCenter, true)

    fatOsc.mute = false
    fatOsc.frequency.value = x * 1000
    fatOsc.spread = y * 90
    fatOsc.volume.value = -12 * (1 - z)

    if (grabStrength > 0.5) {
      fatOsc.count = 5
    } else {
      fatOsc.count = 2
    }

    // console.log(fatOsc.spread)
  } else {
    fatOsc.mute = true
  }
}

export default playTones
