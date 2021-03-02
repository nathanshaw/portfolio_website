function setup() {
  createCanvas(100, 100); 
  noLoop(); 
  
} 

function draw() { 
  // Get a random element from an array using the random(Array) syntax 
  var words = [ "apple", "bear", "cat", "dog" ]; 
  var word = random(words); 
  // select random word 
  text(word,10,50); // draw the word 
  }