/**
 * Every object has the following structure:
 * object {
 *   mass: Double,
 *   radius, Double
 *   velocity: [x, y],
 *   force: [x, y],
 *   coord: [x, y],
 *   lastTimeUpdated: Int (Date.now())
 * }
 *
 * The reason we use lists is because we might expand it to more dimensions
 */

const MAX_COORD = [960, 600];
const OPACITY = 0.7;
const MAX = 0.01;
const OBJECTS = 100;
const MAX_DIST = getDistance([MAX_COORD[0]/4, MAX_COORD[1]/4]);

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

let objects = generateObjects(OBJECTS);
let forces = [[]];

draw(objects);

function draw(objects) {
  context.clearRect(0, 0, MAX_COORD[0], MAX_COORD[1]);
  forces = updateObjects(objects);
  drawCircles(objects);
  drawLines(objects, forces);
  requestAnimationFrame(() => draw(objects));
}

function drawCircles(objects) {
  objects.forEach((object) => {
    context.beginPath();
    context.arc(object.coord[0], object.coord[1], object.radius, 0, 2 * Math.PI, false);
    context.fillStyle = "rgba(255, 255, 255," + OPACITY + ")";
    context.fill();
    context.lineWidth = 0;
  });
}

// TODO: Need to figure out how to draw this
function drawLines(objects, forces) {
  getMagnitudeForce(forces);
  for(let i = 0; i < objects.length; i++) {
    for(let j = 0; j < objects.length; j++) {
      if(i >= j || distanceTooGreat(objects[i], objects[j])) { continue; }
      if(forces[i][j] >= MAX) context.strokeStyle = "rgba(255, 255, 255," + OPACITY + ")";
      else {
        let opacity = (forces[i][j]/MAX)*OPACITY;
        context.strokeStyle = "rgba(255, 255, 255," + opacity + ")";
      }
      context.beginPath();
      context.lineWidth = 1;
      context.moveTo(objects[i].coord[0], objects[i].coord[1]);
      context.lineTo(objects[j].coord[0], objects[j].coord[1]);
      context.stroke();
    }
  }
}

function distanceTooGreat(obj1, obj2) {
  let subVec = vectorOperation(obj1.coord, obj2.coord, sub);
  let distance = getDistance(subVec);
  return distance > MAX_DIST;
}

function getMagnitudeForce(forces) {
  for(let i = 0; i < objects.length; i++) {
    for(let j = 0; j < objects.length; j++) {
      if(i > j) { continue; }
      forces[i][j] = getDistance(forces[i][j]);
      forces[j][i] = forces[i][j];
    }
  }
}

function generateObjects(amount) {
  let objects = [];
  for(let i = 0; i < amount; i++) {
    let mass = getRandomInt(1, 10) * 1.0;
    objects.push({
      mass: mass,
      radius: calculateRadius(mass),
      velocity: [getRandomInt(0, 1)*1.0, getRandomInt(0, 1)*1.0],
      force: [0, 0],
      coord: [getRandomInt(0, MAX_COORD[0]), getRandomInt(0, MAX_COORD[1])],
      lastTimeUpdated: Date.now()
    });
  }
  return objects;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
