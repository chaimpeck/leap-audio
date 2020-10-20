import { animationFrameScheduler } from 'rxjs'
import { filter, observeOn, throttleTime } from 'rxjs/operators'

import leapObservable from './leapObservable'

import render from './visualizer'
import playTones from './audio'

const isValidFrame = frame =>
  typeof frame === 'object' && frame.hasOwnProperty('valid') && frame.valid

leapObservable
  .pipe(filter(isValidFrame))
  .pipe(observeOn(animationFrameScheduler))
  .subscribe(render)

leapObservable
  .pipe(filter(isValidFrame))
  .pipe(throttleTime(10))
  .subscribe(playTones)

// // Setup Leap loop with frame callback function
// var controllerOptions = {};

// Leap.loop(controllerOptions, function(frame) {
//   if (frame.pointables.length > 0) {
//     var pointable = frame.pointables[0];  // Only care about first pointable at the moment
//     var interactionBox = frame.interactionBox;
//     var normalizedPosition = interactionBox.normalizePoint(pointable.tipPosition, true);
//     var canvasX = canvas.width * normalizedPosition[0];
//     var canvasY = canvas.height * (1 - normalizedPosition[1]);
//     var radius = 100 * normalizedPosition[2];

//     clearCanvas();

//     ctx.beginPath();
//     ctx.arc(canvasX, canvasY, radius, 0, 2 * Math.PI, false);
//     ctx.fillStyle = 'red';
//     ctx.fill();

//     const now = Tone.now()
//     // trigger the attack immediately
//     synth.triggerAttack(1000 * normalizedPosition[2], now)
//     // wait one second before triggering the release
//     synth.triggerRelease(now + 1)

//     // var pointableString = "";
//     // pointableString += "Pointable ID: " + pointable.id + "<br />";
//     // pointableString += "Belongs to hand with ID: " + pointable.handId + "<br />";
//     // pointableString += "Length: " + pointable.length.toFixed(1) + " mm<br />";
//     // pointableString += "Width: "  + pointable.width.toFixed(1) + " mm<br />";
//     // pointableString += "Direction: " + vectorToString(pointable.direction, 2) + "<br />";
//     // pointableString += "Tip position: " + vectorToString(pointable.tipPosition) + " mm<br />";
//     // pointableString += "Tip velocity: " + vectorToString(pointable.tipVelocity) + " mm/s<br />";
//     // console.log(pointableString);
//   }
// });
