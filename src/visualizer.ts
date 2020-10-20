import * as createREGL from 'regl'

const regl = createREGL()

// Next we create our command
const draw = regl({
  frag: `
    precision mediump float;
    uniform vec4 color;
    void main() {
      gl_FragColor = color;
    }`,

  vert: `
    precision mediump float;
    attribute vec2 position;
    uniform float angle;
    uniform vec2 offset;
    uniform float z_pos;
    void main() {
      gl_Position = vec4(
        cos(angle) * position.x + sin(angle) * position.y + offset.x - .5,
        -sin(angle) * position.x + cos(angle) * position.y + offset.y - .5, 0, 1.0 - z_pos);
    }`,

  attributes: {
    position: regl.buffer([
      [0, 0.2], // no need to flatten nested arrays, regl automatically
      [0.2, 0], // unrolls them into a typedarray (default Float32)
      [-0.2, 0],
    ]),
  },

  uniforms: {
    // the batchId parameter gives the index of the command
    color: ({ tick }, props, batchId) => [
      Math.sin(0.02 * ((0.1 + Math.sin(batchId)) * tick + 3.0 * batchId)),
      Math.cos(0.02 * (0.02 * tick + 0.1 * batchId)),
      Math.sin(0.02 * ((0.3 + Math.cos(2.0 * batchId)) * tick + 0.8 * batchId)),
      1,
    ],
    angle: ({ tick }) => 0.01 * tick,
    // @ts-ignore
    offset: regl.prop('offset'),
    // @ts-ignore
    z_pos: regl.prop('z_pos'),
  },

  depth: {
    enable: false,
  },

  count: 3,
})

const render = frame => {
  regl.clear({
    color: [0, 0, 0, 1],
  })

  regl.poll()

  const points = frame.pointables.map(pointable =>
    frame.interactionBox.normalizePoint(pointable.tipPosition, true)
  )

  // This tells regl to execute the command once for each object
  draw(points.map(p => ({ offset: [p[0], p[1]], z_pos: p[2] })))
}

export default render
