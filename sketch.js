var mode = 0;
let playerChips = 1000;
playerTurn = 0;
let input, button, username;
var img, img1, img2;


function preload(){
  img = loadImage("Poker_Hand_Rankings_Chart.jpg")
  img1 = loadImage("Capture.JPG")
  img2 = loadImage("Capture2.JPG")
}

function setup() {
  createCanvas(1920, 1080); //setting the canvas size to the size of the window
  noLoop();
}

function draw() {
  background(220);
  if (mode == 0) { //when a mode is set, see below, a screen function is called
    screen1();
  }
}

function screen1() {
  removeElements();
  fontSize = min(50, 50);  //setting font sizes and colour variables
  let Orange = color(251, 127, 3);
  let Red = color(255, 204, 0);
  let Blue = color(175, 100, 220)

  //play button
  play = createButton("Play");//creating buttons for the home screen 
  play.position(850, 200); //correcting the size and position 
  play.size(200, 75)
  play.style('font-size', fontSize + 'px'); //setting font style
  play.style('background-color', Orange); //changing the colour of the button

  //account button
  account = createButton("Account");
  account.position(850, 300); //correcting the size and position 
  account.size(200, 75)
  account.style('font-size', fontSize + 'px'); //setting font style
  account.style('background-color', Red); //changing the colour of the button

  //leaderbaord button
  leaderboard = createButton("Leaderboard");
  leaderboard.position(750, 400) //correcting the size and position 
  leaderboard.size(400, 75)
  leaderboard.style('font-size', fontSize + 'px'); //setting font style
  leaderboard.style('background-color', "#aafa70"); //changing the colour of the button

  //home screen help button
  help1 = createButton("Help")
  help1.position(850, 500) //correcting the size and position 
  help1.size(200, 75)
  help1.style('font-size', fontSize + 'px'); //setting font style
  help1.style('background-color', "#e2abff"); //changing the colour of the button
}

//The play screen
function screen2() {
  setup2();
  draw2();
  StartScreen();
  checkingHandsStrength();
  mousePressed();
}
//The Account Screen
function screen3() {
  removeElements();
  background("#555657")
  textSize(70);
  fill(25, 25, 25);
  text("Account", 850, 150);
  c = color("orange");
  fill(c);
  rect(30, 20, 100, 55, 20);
  c = color("black");
  fill(c);
  textSize(32);
  text('Home', 37, 55);
}
//The Lederbaord Screen
function screen4() {
  removeElements();
  background("#555657")
  textSize(30);
  fill(25, 25, 25);
  text("Username:", 713, 218);
  c = color("orange");
  fill(c);
  rect(30, 20, 100, 55, 20);
  c = color("black");
  fill(c);
  textSize(32);
  text('Home', 37, 55);
  setUpLeaderboard();
  input = createInput();
  input.position(860, 200);
  button = createButton('submit');
  button.position(input.x + input.width, 200);
  button.mousePressed(submitPressed)
};

function screen5(){
  removeElements();
  background("white")
  textSize(40);
  text("")
  image(img, 100, 0)
  image(img1, 900, 100)
  image(img2, 900, 500)
  c = color("orange");
  fill(c);
  rect(30, 20, 100, 55, 20);
  c = color("black");
  fill(c);
  textSize(32);
  text('Back', 37, 55);
}
function screen6(){
  removeElements();
  background("white")
  textSize(40);
  text("")
  image(img, 100, 0)
  image(img1, 900, 100)
  image(img2, 900, 500)
  c = color("orange");
  fill(c);
  rect(30, 20, 100, 55, 20);
  c = color("black");
  fill(c);
  textSize(32);
  text('Home', 37, 55);
}
//storing the player's name
function submitPressed() {
  var username = input.value();
  console.log(username);
  input.value('');
  //leaderboard code
  writeToLeaderboard(username);
  
}
function setUpLeaderboard(){
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard"));//using local storage for the leaderbaord
  if (leaderboard !== undefined && leaderboard !== null) { //if there is a leaderboard 

    let html = "<ol>";
    for (let player of leaderboard) {
      html += "<li>" + player.name + ": " + player.score + "</li>";//how the leaderboard will be set up
    }
    html + "<ol>";
    select("#leaderboard").html(html); //calling the leaderbaord line in html file
  }
}
function writeToLeaderboard(username){

  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")); //using local storage

  if (leaderboard === undefined || leaderboard === null) leaderboard = []; //create a leaderboard if there it doesn't already exist

  leaderboard.push({name: username, score: playerChips}); //creating a 2D array to store names and scores

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); //writing the user's values into the local stoage and leaderbaord

}

//Changing the modes (this then changes the screens, seen above)
function mousePressed() {
  if ((mouseX > 850) && (mouseX < 1050) &&    //when mouse is pressed in area on the screen (play button)
    (mouseY > 200) && (mouseY < 275) && (mode == 0)) {
    mode = 1;
    screen2();
  }
  else if ((mouseX > 850) && (mouseX < 1050) &&
    (mouseY > 300) && (mouseY < 375) && (mode == 0)) {
    mode = 2;
    screen3();
  } else if ((mouseX > 750) && (mouseX < 1150) &&
    (mouseY > 400) && (mouseY < 475) && (mode == 0)) {
    mode = 3;
    screen4();
  } else if ((mode == 1) && (mouseX > 30) && (mouseX < 130) && (mouseY > 20) && (mouseY < 75)) {
    mode = 0;
    player1Hand = []; //resetting the arrays for the next game
    player2Hand = [];
    player3Hand = [];
    player4Hand = [];
    tableHand = [];
    pot = 0;
    redraw();
  } else if ((playerTurn == 1) && (mouseX > 1250) && (mouseX < 1350) && (mouseY > 750) && (mouseY < 850)) {
    console.log("Raise")
    bet += 50;
    pot += bet;
    playerChips = playerChips - bet;
  } else if ((playerTurn == 1) && (mouseX > 1450) && (mouseX < 1550) && (mouseY > 750) && (mouseY < 850)) {
    console.log("Call")
    pot += bet;
    playerChips = playerChips - bet;
    console.log("playerChips: " + playerChips)
  } else if ((playerTurn = 1) && (mouseX > 1650) && (mouseX < 1750) && (mouseY > 750) && (mouseY < 850)) {
    console.log("Fold")
  } else if ((mode == 2) && (mouseX > 30) && (mouseX < 130) && (mouseY > 20) && (mouseY < 75)) {
    mode = 0;
    redraw();
  } else if ((mode == 3) && (mouseX > 30) && (mouseX < 130) && (mouseY > 20) && (mouseY < 75)) {
    mode = 0;
    redraw();
  } else if ((mode == 1) && (mouseX > 1783) && (mouseX < 1883) && (mouseY > 20) && (mouseY < 75)){
    mode=8;
    screen5();
  }else if ((mode == 8) && (mouseX > 30) && (mouseX < 130) && (mouseY > 20) && (mouseY < 75)) {
    mode = 1;
    screen2();
  }else if ((mouseX > 850) && (mouseX < 1050) && (mouseY > 500) && (mouseY < 575)){
    mode = 9;
    screen6();
  }else if ((mode == 9) && (mouseX > 30) && (mouseX < 130) && (mouseY > 20) && (mouseY < 75)){
    mode = 0;
    redraw();
  }
}