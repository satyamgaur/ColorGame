var numColors = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

resetButton.addEventListener("click", reset);

startGame();

function startGame() {
	colors = generateRandomColors(numColors);
	pickedColor = colors[pickColor(colors.length)];
	colorDisplay.textContent = pickedColor;
	changeSquareColors();
}

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

function changeSquareColors() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];

		squares[i].addEventListener("click", function() {
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function changeColors(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(n) {
	var random = Math.floor(Math.random() * n);
	return random;
}

function generateRandomColors(num) {
	var arr = [];
	for(var i = 0; i < num; i++) {
		var red = pickColor(256);
		var green = pickColor(256);
		var blue = pickColor(256);
		var color = "rgb(" + red + ", " + green + ", " + blue + ")";
		arr.push(color);
	}
	return arr;
}

function reset() {
	colors = generateRandomColors(numColors);
	pickedColor = colors[pickColor(colors.length)];
	colorDisplay.textContent = pickedColor;
	messageDisplay.textContent = "";
	changeSquareColors();
	h1.style.backgroundColor = "steelblue";
}