var dots = [];
var num_dots = 500;
var the_stroke = true;
var background_color = 30;
var _mag = 0.065;

function setup() {
  createCanvas(displayWidth, displayHeight);
  background(background_color);
  for (var i = 1; i < num_dots; i++) {
    dots.push(new Walker());
  }
  for (var i = 0; i < dots.length; i++) {
    dots[i].pos.y = (height / num_dots) * i;
  }
  planet = new Planet();
}

function draw() {
  planet.update();
  //planet.display();
  for (var i = 0; i < dots.length; i++) {
    dots[i].update();
    dots[i].display();
  }
}

function Planet() {
  this.pos = createVector(mouseX, mouseY);
  this.update = function() {
    this.pos = createVector(mouseX, mouseY);
  }

  this.display = function() {
    fill(0);
    ellipse(this.pos.x, this.pos.y, 50, 50);
  }

}

function Walker(the_stroke) {
  this.pos = createVector(width / 2, height / 2);
  this.vel = createVector(0.1, 0);
  this.acc = createVector(0, 0);
  this.stroke = the_stroke;


  this.update = function() {
    var mouse = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(mouse, this.pos);
    this.acc.setMag(_mag);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }

  this.display = function() {
    if (this.stroke) {
      noStroke();
    } else {
      stroke(0);
    }
    fill(255);
    ellipse(this.pos.x, this.pos.y, 15, 15);
  }
}

function mousePressed() {
  if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
    background(background_color);
    dots = [];
    the_stroke = !the_stroke;
    if (!the_stroke) {
      for (var i = 1; i < num_dots; i++) {
        dots.push(new Walker(the_stroke));
      }
      for (var i = 0; i < dots.length; i++) {
        dots[i].pos.y = (height / num_dots) * i;
      }
    } else {
      for (var i = 1; i < 30; i++) {
        dots.push(new Walker(the_stroke));
      }
      for (var i = 0; i < dots.length; i++) {
        dots[i].pos.y = (height / num_dots) * i;
      }
    }
  }
  _mag = random(0.005, 0.125);
}
