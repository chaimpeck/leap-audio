import { BehaviorSubject } from 'rxjs'

import * as Leap from 'leapjs'

const subject = new BehaviorSubject([])

// Setup Leap loop with frame callback function
const controllerOptions = {}

Leap.loop(controllerOptions, function (frame) {
  subject.next(frame)
})

export default subject
