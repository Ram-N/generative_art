// Steering Behavior
// Code adapted from Daniel Schiffman's The coding train

let vehicle;
let path;
let fullPath = [];

function setup() {
  createCanvas(800, 800);
  vehicle = new Vehicle(0, 100);
  vehicle.vel.x = 2;
  path = new Path(0, height / 2, width, random(height));
  background(0);
  palette = red_brown_orange; //colors.js
  palette = replicate(palette, 10)

}

function draw() {

  let force = vehicle.follow(path);
  vehicle.applyForce(force);



  vehicle.edges();
  vehicle.update(fullPath);
  //  vehicle.show();
  //path.show();


}