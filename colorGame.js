let numColors = 6;
let colors = [];
let pickedColor;
let p1Score = 0;
let p2Score = 0;
let currentPlayer = "p1";
let maxScore = 10;
let p1Name = "Player1";
let p2Name = "Player2";
let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let easyBtn = document.querySelector("#easyBtn");
let hardBtn = document.querySelector("#hardBtn");
let p1ScoreDisplay = document.querySelector("#p1ScoreDisplay");
let p2ScoreDisplay = document.querySelector("#p2ScoreDisplay");
let inputMaxScore = document.querySelector("#inputMaxScore");
let maxClicks = document.querySelector("#numClicks");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let winner;

p1.addEventListener("change", function() {
	p1Name = p1.value;
});

p2.addEventListener("change", function() {
	p2Name = p2.value;
});

inputMaxScore.addEventListener("change", function() {
	maxScore = Number(inputMaxScore.value);
	maxClicks.textContent = maxScore;
});

function endGame() {
	alert("WoooHooo! " + winner + " won the game!");
	reset();
}

function createRandomNumber(n) {
	return Math.floor(Math.random() * n);
}

function createRandomColors() {
	let r = createRandomNumber(256);
	let g = createRandomNumber(256);
	let b = createRandomNumber(256);
	return ("rgb(" + r + ", " + g + ", " + b + ")");
}

function assignColorToBoxes() {
	for(let i = 0; i < numColors; i++) {
		let randomColor = createRandomColors();
		colors.push(randomColor);
		squares[i].style.backgroundColor = randomColor;
	}
}

function startGame() {
	colors = [];
	assignColorToBoxes();
	pickedColor = colors[createRandomNumber(numColors)];
	colorDisplay.textContent = pickedColor;
	p1ScoreDisplay.textContent = p1Score;
	p2ScoreDisplay.textContent = p2Score;
}

startGame();

function nextGame() {
	currentPlayer = (currentPlayer === "p1") ? "p2": "p1";
	startGame();
}

function changeAllColors() {
	for(let i = 0; i < numColors; i++) {
		squares[i].style.backgroundColor = pickedColor;
	}
}

function equalColors() {
	if(currentPlayer === "p1") {
		p1Score++;
		p1ScoreDisplay.textContent = p1Score;
		if(p1Score === maxScore) {
			winner = p2Name;
			endGame();
		}
	} else {
		p2Score++;
		p2ScoreDisplay.textContent = p2Score;
		if(p2Score === maxScore) {
			winner = p1Name;
			endGame();
		}
	}
	nextGame();
}

function unequalColors() {
	if(currentPlayer === "p1") {
		p1Score++;
		p1ScoreDisplay.textContent = p1Score;
		if(p1Score === maxScore) {
			winner = p2Name;
			endGame();
		}
	} else {
		p2Score++;
		p2ScoreDisplay.textContent = p2Score;
		if(p2Score === maxScore) {
			winner = p1Name;
			endGame();
		}
	}
}

function clicks() {
	for(let i = 0; i < numColors; i++) {
		squares[i].addEventListener("click", function() {
			let clickedColor = squares[i].style.backgroundColor;
			if(clickedColor === pickedColor) {
				changeAllColors();
				equalColors();
			} else {
				squares[i].style.backgroundColor = "#232323";
				unequalColors();
			}
		});
	}
}

clicks();

function reset() {
	p1Score = 0;
	p2Score = 0;
	p1ScoreDisplay.textContent = p1Score;
	p2ScoreDisplay.textContent = p2Score;
	currentPlayer = "p1";
	colors = [];
	startGame();
}

resetButton.addEventListener("click", reset);

easyBtn.addEventListener("click", function(){
	easyBtn.classList.add("selected");
 	hardBtn.classList.remove("selected");
	numColors = 3;
	reset();
	for(var i = 3; i < 6; i++) {
		squares[i].style.display = "none";
	}
});

hardBtn.addEventListener("click", function(){
	easyBtn.classList.remove("selected");
 	hardBtn.classList.add("selected");
	for(var i = 3; i < 6; i++) {
		squares[i].style.display = "block";
	}
	numColors = 6;
	reset();
});
