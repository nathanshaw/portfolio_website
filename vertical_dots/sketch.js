var dots = [];
var num_dots = 500;
var frame_rate = 25;

function setup() {
  createCanvas(displayWidth, displayHeight);
  makeDots();
}

function draw() {
  background(0);
  for (var i = 0; i < dots.length; i++) {
    dots[i].update();
    dots[i].display();
    dots[i].updateVelocity(
      dots[i].vel.x, 
      dots[i].vel.y + random(-1.15, 1.15)
    );
  }
  frameRate(frame_rate);
}

function Line(ellipse_height, stroke_size) {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0.1, 0);
  this.acc = createVector(0, 0);
  this.fill_color = color(255);
  this.ellipse_height = ellipse_height;
  this.stroke_size = stroke_size;
  
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  
  this.update_fill_color = function(color) {
    this.fill_color = color;
    if (this.fill_color < 0) {
        this.fill_color = 255;
    }
    else if (this.fill_color > 255) {
        this.fill_color = 0;
    }
  }
  
  this.updateVelocity = function(x, y) {
    this.vel.x = x;
    this.vel.y = y;
    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x = -1 * this.vel.x;
      this.update_fill_color(this.fill_color - 10)
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y = -1 * this.vel.y;
      this.update_fill_color(this.fill_color - 10)
    }
  }
  
  this.display = function() {
    noStroke();
    fill(this.fill_color);
    ellipse(this.pos.x, this.pos.y, width, this.ellipse_height);
  }
}

function makeDots() {
  for (var i = 1; i < num_dots; i++) {
    dots.push(new Line(random(4)+4, random(3)));
  }
  for (var i = 0; i < dots.length; i++) {
    dots[i].pos.x = (width/num_dots) * i;
    dots[i].update_fill_color(255);
  }  
}

function mousePressed(){
  if (frame_rate == 25){
    frame_rate = 0.02
  }
  else {
    frame_rate = 25
  }
  numDots = random(250,510);
  makeDots();
  frameRate(60);
}
