function setup2() {
  createCanvas(1920, 1080); //setting the canvas size to the size of the window
  ellipse(56, 46, 55, 55);
}

function draw2() {
  removeElements();
  background("#555657")
  //creating the table
  c = color("green");
  fill(c);
  ellipse(930, 500, 1000, 600);
  //creating the home button
  c = color("orange");
  fill(c);
  rect(30, 20, 100, 55, 20);
  c = color("black");
  fill(c);
  textSize(32);
  text('Home', 37, 55);
  c = color("#ff4636");
  fill(c);
  rect(1783, 20, 100, 55, 20);
  c = color("black");
  fill(c);
  textSize(32);
  //creating the help button
  text('Help', 1800, 55);
  //setting the colour for the raise, call and fold buttons and creating them
  c = color("#6da1cf");
  fill(c);
  circle(1300, 800, 100);
  c = color("#6da1cf");
  fill(c);
  circle(1500, 800, 100);
  c = color("#6da1cf");
  fill(c);
  circle(1700, 800, 100);
  c = color("black");
  fill(c);
  textSize(25);
  //putting the text into the buttons
  text('Raise', 1268, 810);
  text('Call', 1478, 810);
  text('Fold', 1675, 810);
  //creating the location on the screen for the player's cards
  c = color("#ebf0f2")
  fill(c);
  rect(90, 620, 140, 220, 20);
  rect(260, 620, 140, 220, 20);
}

tableHand = [];
let cards = ["AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH"]
function shufflingTheDeck() {
  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  };
  console.log(cards);
}
//declaring variables for the functions below
player1Hand = [];
player2Hand = [];
player3Hand = [];
player4Hand = [];
tableHand = [];
pot = 0;



function dealingTheCards() {


  for (f = 0; f < 8; f += 7) { //adding a card to each players hand twice
    player1Hand.push(cards[f]);
    player2Hand.push(cards[f + 1]);
    player3Hand.push(cards[f + 2]);
    player4Hand.push(cards[f + 3]);
    tableHand.push(cards[f + 4, f + 5, f + 6, f + 7, f + 8]);

  }
  //showing the player their cards on the screen
  c = color("black");
  textSize(70);
  fill(c);
  text(player3Hand[0], 100, 740);
  text(player3Hand[1], 270, 740);
  return { player1Hand, player2Hand, player3Hand, player4Hand, tableHand }
}
let start;
function StartScreen() {
  start = createButton('Start');
  start.position(0, 0);
  start.mousePressed(startingGame);
}


//
//
//Starting the Game
//
//
x = 0;
function startingGame() {
  start.hide()
  for (cycle = 0; cycle < 3; cycle++) {
    let button;
    button = createButton('Next round');
    button.position(0, 0);
    button.mousePressed(playingTheGame);

  }

}
function playingTheGame() { //creating the main playing fucntion and calling other functions from it

  bet = 50;
  c = color("#555657")
  noStroke();
  fill(c);
  rect(500, 150, 200, 50, 20);
  c = color("green")
  fill(c);
  rect(950, 550, 200, 50, 20);
  c = color("#75aaff")
  fill(c);
  textSize(50);
  text('Pot: ', 850, 600);
  text(pot, 1000, 600);
  text(playerChips, 500, 200)
  showText = false;
  c = color("#ebf0f2")
  fill(c);
  rect(90, 620, 140, 220, 20);
  rect(260, 620, 140, 220, 20);
  shufflingTheDeck(cards); //shuffling the deck at the start of the round
  dealingTheCards(cards); //dealing the cards to each player at the start of the round
  c = color("red");
  fill(c);
  rect(1350, 500, 50, 30, 4);//player1Cards
  rect(1350, 450, 50, 30, 4);
  rect(450, 500, 50, 30, 4);//Player2Cards
  rect(450, 450, 50, 30, 4);
  rect(940, 210, 30, 50, 4);//Player3Cards
  rect(890, 210, 30, 50, 4);
  c = color("White")
  fill(c);
  rect(890, 400, 80, 100, 4);//TableCards
  rect(800, 400, 80, 100, 4);
  rect(710, 400, 80, 100, 4);
  rect(980, 400, 80, 100, 4);
  rect(1070, 400, 80, 100, 4);
  c = color("black");
  fill(c);
  textSize(45);
  //putting the card text onto the card
  text(tableHand[0], 1070, 470);
  text(tableHand[1], 980, 470);
  text(tableHand[2], 890, 470);
  text(tableHand[3], 800, 470);
  text(tableHand[4], 710, 470);

  player1Turn(bet);  //calling each player's turn
  player2Turn(bet);
  userTurn(bet);
  player4Turn(bet);
  checkingHandsStrength1();
  checkingHandsStrength2();
  checkingHandsStrength4();
  checkingHandsStrengthUser();
}

function player1Turn(bet) {
  console.log("player1turn")
  var randomnumber = Math.floor(Math.random() * (10 - 0 + 1)); //random number generator to decide AI move
  if (randomnumber == 9) {
    console.log("Raise");
    bet+=50;
    pot += bet;
  }
  else if (randomnumber == 10) {
    console.log("Fold");
  }
  else {
    console.log("check")
    pot += bet;
  }
}
function player2Turn(bet) {
  console.log("player2Turn")
  var randomnumber = Math.floor(Math.random() * (10 - 0 + 1)); //random number generator to decide AI move
  if (randomnumber == 9) {
    console.log("Raise");
    bet+=50;
    pot += bet;;
  }
  else if (randomnumber == 10) {
    console.log("Fold");
  }
  else {
    console.log("check")
    pot += bet;
  }
}
function userTurn() {
  console.log("User turn")
  playerTurn = 1;
}
function player4Turn(bet) {
  console.log("PLayer4Turn")
  var randomnumber = Math.floor(Math.random() * (10 - 0 + 1)); //random number generator to decide AI move
  if (randomnumber == 9) {
    console.log("Raise");
    bet+=50;
    pot += bet;
  }
  else if (randomnumber == 10) {
    console.log("Fold");
  }
  else {
    console.log("check")
    pot += bet;
  }
}
//
//
//USER
//
//
//
userScore = 0;
function checkingHandsStrengthUser() {
  let list = [player3Hand[0], player3Hand[1], tableHand[0], tableHand[1], tableHand[2], tableHand[3], tableHand[4]];//creating a list of the player's hand and the table hand
  console.log(list);
  let suitCount = { "H": 0, "D": 0, "S": 0, "C": 0 }; //counting how many suits are in the list
  flush = false;
  for (let item of list) {
    let suit = item.charAt(item.length - 1); //setting suit to the suit of the card
    suitCount[suit]++;
    if (suitCount[suit] == 5) {   //if any of the suits have a suit count of 5 then return
      flush = true                //there is at least a flush present
    }
  }
  if (flush = true) {  //finding if it is a straight or royal flush
    let cardCount = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 } //creating the new count for all cards
    for (let item of list) {
      let card = item.charAt(0)   //finding the card value not suit
      cardCount[card]++
      if (cardCount[card] = 1) {   //if that card exists in the hand it will be added to the list
        checkingList = []
        checkingList.push(cardCount[card])  //adding all of the cards into a deck in order 
        straight1 = ["2", "3", "4", "5", "6"]   //these are the 5 possibilities of getting a straight
        straight2 = ["3", "4", "5", "6", "7"]
        straight3 = ["4", "5", "6", "7", "8"]
        straight4 = ["5", "6", "7", "8", "9"]
        straight5 = ["6", "7", "8", "9", "1"]
        royalFlush = ["A", "1", "J", "Q", "K"]  //this is the royal flush
        if ((checkingList == straight1) || (checkingList == straight2) || (checkingList == straight3) || (checkingList == straight4) || (checkingList == straight5)) {
          console.log("Straight flush") //checking and stating for the straight flush
          userScore += 9;
        }
        else if (checkingList == royalFlush) { //checking for the royal flush
          console.log("RoyalFLush")
          userScore += 10;
        }
        else { //it is not a straight or royal flush so it is just a flush
          console.log("Flush")
          userScore += 8;
        }
      }
    }
  }
  //checking if there is a straight
  let cardCount1 = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 }  //creating the count for all values again
  for (let item of list) {
    let card1 = item.charAt(0)
    cardCount1[card1]++
    if (cardCount1[card1] = 1) {
      checkingList = []
      checkingList.push(cardCount1[card1])  //this is the same code as before however, flush is no longer true so it is just checking for a straight
      straight1 = ["2", "3", "4", "5", "6"]
      straight2 = ["3", "4", "5", "6", "7"]
      straight3 = ["4", "5", "6", "7", "8"]
      straight4 = ["5", "6", "7", "8", "9"]
      straight5 = ["6", "7", "8", "9", "1"]
      royalFlush = ["A", "1", "J", "Q", "K"]
      if ((checkingList == straight1) || (checkingList == straight2) || (checkingList == straight3) || (checkingList == straight4) || (checkingList == straight5)) {
        console.log("straight")
        userScore += 7;
      }
    }
  }
  //checking for pair, or triple or 4 of a kind
  let cardCount2 = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 }; //counting how many cards are in the list
  for (let item of list) {
    let card2 = item.charAt(0);
    cardCount2[card2]++;
    if (cardCount2[card2] == 4) {   //checking if there are 4 of a kind of cards
      console.log("four of a kind")
      userScore += 6;
    }
    else if (cardCount2[card2] == 3) {   //checking for a triple
      console.log("triple")
      userScore += 5;
    }
    else if (cardCount2[card2] == 2) {   //checking for a double
      console.log("pair")
      userScore += 4;
    }
  }

  player3Hand = [];//checking is now done so the arrays can be emptied and restarted
  tableHand = [];

}
//
//
//
//PLAYER1
//
//
//
player1Score = 0;
function checkingHandsStrength1() {
  console.log("----------------------------------9")
  let list = [player1Hand[0], player1Hand[1], tableHand[0], tableHand[1], tableHand[2], tableHand[3], tableHand[4]];//creating a list of the player's hand and the table hand
  console.log(list);
  let suitCount = { "H": 0, "D": 0, "S": 0, "C": 0 }; //counting how many suits are in the list
  flush = false;
  for (let item of list) {
    let suit = item.charAt(item.length - 1); //setting suit to the suit of the card
    suitCount[suit]++;
    if (suitCount[suit] == 5) {   //if any of the suits have a suit count of 5 then return
      flush = true                //there is at least a flush present
    }
  }
  if (flush = true) {  //finding if it is a straight or royal flush
    let cardCount = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 } //creating the new count for all cards
    for (let item of list) {
      let card = item.charAt(0)   //finding the card value not suit
      cardCount[card]++
      if (cardCount[card] = 1) {   //if that card exists in the hand it will be added to the list
        checkingList = []
        checkingList.push(cardCount[card])  //adding all of the cards into a deck in order 
        straight1 = ["2", "3", "4", "5", "6"]   //these are the 5 possibilities of getting a straight
        straight2 = ["3", "4", "5", "6", "7"]
        straight3 = ["4", "5", "6", "7", "8"]
        straight4 = ["5", "6", "7", "8", "9"]
        straight5 = ["6", "7", "8", "9", "1"]
        royalFlush = ["A", "1", "J", "Q", "K"]  //this is the royal flush
        if ((checkingList == straight1) || (checkingList == straight2) || (checkingList == straight3) || (checkingList == straight4) || (checkingList == straight5)) {
          console.log("Straight flush") //checking and stating for the straight flush
          player1Score += 9;
        }
        else if (checkingList == royalFlush) { //checking for the royal flush
          console.log("RoyalFLush")
          player1Score += 10;
        }
        else { //it is not a straight or royal flush so it is just a flush
          console.log("Flush")
          player1Score == 8;
        }
      }
    }
  }
  //checking if there is a straight
  let cardCount1 = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 }  //creating the count for all values again
  for (let item of list) {
    let card1 = item.charAt(0)
    cardCount1[card1]++
    if (cardCount1[card1] = 1) {
      checkingList = []
      checkingList.push(cardCount1[card1])  //this is the same code as before however, flush is no longer true so it is just checking for a straight
      straight1 = ["2", "3", "4", "5", "6"]
      straight2 = ["3", "4", "5", "6", "7"]
      straight3 = ["4", "5", "6", "7", "8"]
      straight4 = ["5", "6", "7", "8", "9"]
      straight5 = ["6", "7", "8", "9", "1"]
      royalFlush = ["A", "1", "J", "Q", "K"]
      if ((checkingList == straight1) || (checkingList == straight2) || (checkingList == straight3) || (checkingList == straight4) || (checkingList == straight5)) {
        console.log("straight")
        player1Score += 7;
      }
    }
  }
  //checking for pair, or triple or 4 of a kind
  let cardCount2 = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 }; //counting how many cards are in the list
  for (let item of list) {
    let card2 = item.charAt(0);
    cardCount2[card2]++;
    if (cardCount2[card2] == 4) {   //checking if there are 4 of a kind of cards
      console.log("four of a kind")
      player1Score += 6;
    }
    else if (cardCount2[card2] == 3) {   //checking for a triple
      console.log("triple")
      player1Score += 5;
    }
    else if (cardCount2[card2] == 2) {   //checking for a double
      console.log("pair")
      player1Score += 4;
    }
  }

  player1Hand = [];//checking is now done so the arrays can be emptied and restarted

}
//
//
//
//PLAYER2
//
//
//
player2Score = 0;
function checkingHandsStrength2() {
  let list = [player2Hand[0], player2Hand[1], tableHand[0], tableHand[1], tableHand[2], tableHand[3], tableHand[4]];//creating a list of the player's hand and the table hand
  console.log(list);
  let suitCount = { "H": 0, "D": 0, "S": 0, "C": 0 }; //counting how many suits are in the list
  flush = false;
  for (let item of list) {
    let suit = item.charAt(item.length - 1); //setting suit to the suit of the card
    suitCount[suit]++;
    if (suitCount[suit] == 5) {   //if any of the suits have a suit count of 5 then return
      flush = true                //there is at least a flush present
    }
  }
  if (flush = true) {  //finding if it is a straight or royal flush
    let cardCount = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 } //creating the new count for all cards
    for (let item of list) {
      let card = item.charAt(0)   //finding the card value not suit
      cardCount[card]++
      if (cardCount[card] = 1) {   //if that card exists in the hand it will be added to the list
        checkingList = []
        checkingList.push(cardCount[card])  //adding all of the cards into a deck in order 
        straight1 = ["2", "3", "4", "5", "6"]   //these are the 5 possibilities of getting a straight
        straight2 = ["3", "4", "5", "6", "7"]
        straight3 = ["4", "5", "6", "7", "8"]
        straight4 = ["5", "6", "7", "8", "9"]
        straight5 = ["6", "7", "8", "9", "1"]
        royalFlush = ["A", "1", "J", "Q", "K"]  //this is the royal flush
        if ((checkingList == straight1) || (checkingList == straight2) || (checkingList == straight3) || (checkingList == straight4) || (checkingList == straight5)) {
          console.log("Straight flush") //checking and stating for the straight flush
          player2Score += 9;
        }
        else if (checkingList == royalFlush) { //checking for the royal flush
          console.log("RoyalFLush")
          player2Score += 10;
        }
        else { //it is not a straight or royal flush so it is just a flush
          console.log("Flush")
          player2Score += 8;
        }
      }
    }
  }
  //checking if there is a straight
  let cardCount1 = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 }  //creating the count for all values again
  for (let item of list) {
    let card1 = item.charAt(0)
    cardCount1[card1]++
    if (cardCount1[card1] = 1) {
      checkingList = []
      checkingList.push(cardCount1[card1])  //this is the same code as before however, flush is no longer true so it is just checking for a straight
      straight1 = ["2", "3", "4", "5", "6"]
      straight2 = ["3", "4", "5", "6", "7"]
      straight3 = ["4", "5", "6", "7", "8"]
      straight4 = ["5", "6", "7", "8", "9"]
      straight5 = ["6", "7", "8", "9", "1"]
      royalFlush = ["A", "1", "J", "Q", "K"]
      if ((checkingList == straight1) || (checkingList == straight2) || (checkingList == straight3) || (checkingList == straight4) || (checkingList == straight5)) {
        console.log("straight")
        player2Score += 7;
      }
    }
  }
  //checking for pair, or triple or 4 of a kind
  let cardCount2 = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 }; //counting how many cards are in the list
  for (let item of list) {
    let card2 = item.charAt(0);
    cardCount2[card2]++;
    if (cardCount2[card2] == 4) {   //checking if there are 4 of a kind of cards
      console.log("four of a kind")
      player2Score += 6;
    }
    else if (cardCount2[card2] == 3) {   //checking for a triple
      console.log("triple")
      player2Score += 5;
    }
    else if (cardCount2[card2] == 2) {   //checking for a double
      console.log("pair")
      player2Score += 4;
    }
  }

  player2Hand = [];//checking is now done so the arrays can be emptied and restarted
}
//
//
//
//PLAYER4
//
//
//
player4Score = 0;
function checkingHandsStrength4() {
  let list = [player4Hand[0], player4Hand[1], tableHand[0], tableHand[1], tableHand[2], tableHand[3], tableHand[4]];//creating a list of the player's hand and the table hand
  console.log(list);
  let suitCount = { "H": 0, "D": 0, "S": 0, "C": 0 }; //counting how many suits are in the list
  flush = false;
  for (let item of list) {
    let suit = item.charAt(item.length - 1); //setting suit to the suit of the card
    suitCount[suit]++;
    if (suitCount[suit] == 5) {   //if any of the suits have a suit count of 5 then return
      flush = true                //there is at least a flush present
    }
  }
  if (flush = true) {  //finding if it is a straight or royal flush
    let cardCount = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 } //creating the new count for all cards
    for (let item of list) {
      let card = item.charAt(0)   //finding the card value not suit
      cardCount[card]++
      if (cardCount[card] = 1) {   //if that card exists in the hand it will be added to the list
        checkingList = []
        checkingList.push(cardCount[card])  //adding all of the cards into a deck in order 
        straight1 = ["2", "3", "4", "5", "6"]   //these are the 5 possibilities of getting a straight
        straight2 = ["3", "4", "5", "6", "7"]
        straight3 = ["4", "5", "6", "7", "8"]
        straight4 = ["5", "6", "7", "8", "9"]
        straight5 = ["6", "7", "8", "9", "1"]
        royalFlush = ["A", "1", "J", "Q", "K"]  //this is the royal flush
        if ((checkingList == straight1) || (checkingList == straight2) || (checkingList == straight3) || (checkingList == straight4) || (checkingList == straight5)) {
          console.log("Straight flush") //checking and stating for the straight flush
          player4Score += 9;
        }
        else if (checkingList == royalFlush) { //checking for the royal flush
          console.log("RoyalFLush")
          player4Score += 10;
        }
        else { //it is not a straight or royal flush so it is just a flush
          console.log("Flush")
          player4Score += 8;
        }
      }
    }
  }
  //checking if there is a straight
  let cardCount1 = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 }  //creating the count for all values again
  for (let item of list) {
    let card1 = item.charAt(0)
    cardCount1[card1]++
    if (cardCount1[card1] = 1) {
      checkingList = []
      checkingList.push(cardCount1[card1])  //this is the same code as before however, flush is no longer true so it is just checking for a straight
      straight1 = ["2", "3", "4", "5", "6"]
      straight2 = ["3", "4", "5", "6", "7"]
      straight3 = ["4", "5", "6", "7", "8"]
      straight4 = ["5", "6", "7", "8", "9"]
      straight5 = ["6", "7", "8", "9", "1"]
      royalFlush = ["A", "1", "J", "Q", "K"]
      if ((checkingList == straight1) || (checkingList == straight2) || (checkingList == straight3) || (checkingList == straight4) || (checkingList == straight5)) {
        console.log("straight")
        player4Score += 7;
      }
    }
  }
  //checking for pair, or triple or 4 of a kind
  let cardCount2 = { "A": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "1": 0, "J": 0, "Q": 0, "K": 0 }; //counting how many cards are in the list
  for (let item of list) {
    let card2 = item.charAt(0);
    cardCount2[card2]++;
    if (cardCount2[card2] == 4) {   //checking if there are 4 of a kind of cards
      console.log("four of a kind")
      player4Score += 6;
    }
    else if (cardCount2[card2] == 3) {   //checking for a triple
      console.log("triple")
      player4Score += 5;
    }
    else if (cardCount2[card2] == 2) {   //checking for a double
      console.log("pair")
      player4Score += 4;
    }
  }

  player4Hand = [];//checking is now done so the arrays can be emptied and restarted
  checkingTheWinner();
}

function checkingTheWinner() {
  listOfScores = [userScore, player1Score, player2Score, player4Score];//creating the list to sort
  let n = listOfScores.length; //using a simple insertion sort to sort the list with who has the greatest score
  for (let i = 1; i < n; i++) {
    let x = listOfScores[i];
    let j = i - 1;
    while ((j > -1) && (x < listOfScores[j])) {
      listOfScores[j + 1] = listOfScores[j];
      j--;
    }
    listOfScores[j + 1] = x;
  }
  c = color("#555657")
  noStroke();
  fill(c);
  rect(850, 0, 200, 100, 20);
  c = color("#fcba03 ")
  fill(c);
  winner = listOfScores[3]; //the player with the highest score
  console.log("Winner: " + winner);//displaying the winner
  if (userScore == winner){ //seeing if the winner is the user
    playerChips += pot; //giving the user their winnings
    console.log("USER")
    text('YOU', 850, 55);
  }
  else if (player1Score == winner){
    console.log("player1")
    text('Player1', 850, 55);
  }
  else if (player2Score == winner){
    console.log("player2")
    text('Player2', 850, 55);
  }
  else if (player4Score == winner){
    console.log("player4")
    text('Player4', 850, 55);
  }
  else{
    console.log("error or draw")
  }
  c = color("black");
  fill(c);
  textSize(32);
  text('Previous winner: ', 600, 55);
  pot = 0;  //emptying the pot for the next round
  userScore = 0;
  player1Score = 0;
  player2Score = 0;
  player4Score = 0;
}