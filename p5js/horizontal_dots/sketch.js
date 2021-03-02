var dots = [];
var num_dots = 250;
var _hue = 0;
var _sat = 0;
var _bright = 0;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(0);
  colorMode(HSB, width, width, width);
  _hue = random(0, width);
  _sat = width/2;
  _bright = width/2;
  for (var i = 1; i < num_dots; i++) {
    dots.push(new Walker(_hue - random(0, width * 0.07), _sat, _bright));
  }
  for (var i = 0; i < dots.length; i++) {
    dots[i].pos.y = ((height/num_dots) * i) - (height/20);  
  }
}

function cursor() {
	// fill(0);
  	ellipse(mouseX, mouseY, width/4, width/4);
}

function draw() {
  	cursor()
    for (var i = 0; i < dots.length; i++) {
    dots[i].update();
    dots[i].display();
    dots[i].updateVelocity(
      dots[i].vel.x + random(-0.3, 0.3), 
      dots[i].vel.y
    );
  }
}

function Walker(_hue, _sat, _bright) {
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0.1, 0);
  this.acc = createVector(0, 0);
  this.hue = _hue;
  this.sat = _sat;
  this.bright = _bright;
  this.fill_color = color(this.hue, this.sat, this.bright);
  
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  
  this.update_hsb = function(h, s, b) {
    this.hue = h;
    this.sat = s;
    this.bright = b;
    this.fill_color = color(h,s,b);
  }
  
  this.updateVelocity = function(x, y) {
    this.vel.x = x;
    this.vel.y = y;
    this.color_change_percent = 0.07;
    if (this.pos.x > width || this.pos.x < 0) {
      this.pos.x = width/2;
      this.vel.x = 0;
      this.hue = max(min(this.hue + (this.hue * random(-this.color_change_percent, this.color_change_percent)), width), 0)
      this.sat = max(min(this.sat + (this.sat * random(-this.color_change_percent, this.color_change_percent)), width), 0)
      this.bright = max(min(this.bright + (this.bright * random(-this.color_change_percent, this.color_change_percent)), width), 0)
      this.update_hsb(this.hue, this.sat, this.bright);
    }
  }
  
  this.display = function() {
    noStroke()
    fill(this.fill_color);
    rect(this.pos.x, this.pos.y, 10, height);
  }
}

function mousePressed() {
  _hue = random(0, width);
  _sat = width/2;
  _bright = width/2;
  for (var i = 1; i < dots.length; i++) {
    dots[i].update_hsb(_hue + random(-10,10), _sat, _bright);
  }
}