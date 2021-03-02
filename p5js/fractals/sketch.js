// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var tree = [];
var leaves = [];
var starting_trees = [];
var num_starting_trees = 10;

function setup() {
  createCanvas(displayWidth, displayHeight);
  for (var i = 0; i < num_starting_trees; i++) {
    var temp = new Branch(createVector((width/num_starting_trees) * i, height), createVector(0, -1), 50);
    // print(temp);
    tree.push(temp);
  }
}

function draw() {
  background(255);
  for (var i = 0; i < tree.length; i++) {
    // Get the branch, update and draw it
    tree[i].update();
    tree[i].render();
    
    if (tree[i].timeToBranch()) {
      if (tree.length < 10000) {
        tree.push(tree[i].branch(random(25)+10)); // Add one going right
        tree.push(tree[i].branch(random(25) - 50)); // Add one going left
      } else {
        leaves.push(new Leaf(tree[i].end));
      }
    }
  }
  //println(leaves.length);

  for (var i = 0; i < leaves.length; i++) {
    leaves[i].display();
    leaves[i].update();
  }
}
