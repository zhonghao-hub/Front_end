// All three variables
var numSquares = 6;
var colors = [];
var pickedColor;
// All selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("ColorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeBtn = document.querySelectorAll(".mode");


init();

resetButton.addEventListener("click", function(){
	reset();
})

function init(){
	setUpModeBtns();
	setUpSquares();
	reset();

}

// modeBtn event listeners
function setUpModeBtns(){
	for(var i =0; i < modeBtn.length; i++){
		modeBtn[i].addEventListener("click", function(){
			modeBtn[0].classList.remove("selected");
			modeBtn[1].classList.remove("selected");
			this.classList.add("selected");
			// figure out how many squares to show
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

// Add click listeners to sqaures
function setUpSquares(){
	for(var i=0; i < squares.length; i++){
		squares[i].addEventListener("click", function(){
			// Grab color of clicked sqaure and compare it to pickedColor:
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			}
			else{
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		});
	};
}

// reset all stuff
function reset(){
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();
	// change colorDisplay to match pickedColor
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "new colors";
	messageDisplay.textContent = "";
	// change colors of sqaures
	for(var i=0; i < squares.length; i++){
	// Add initial colors to sqaures
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else{
			squares[i].style.display = "none";
		}
		
	};
	h1.style.backgroundColor = "steelblue";
}

// Change all six sqaures to the picked Color
function changeColors(color){
	// loop through all squares 
	for(var i = 0; i < colors.length; i++){
		// change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

// Pick a index of the pickedColor out of all 6 colors
function pickColor() {
	var random = Math.floor(Math.random() * colors.length);//pick 0~1
	return colors[random];
}

// Generate a array of random Color 
function generateRandomColors(num){
	// make array
	var arr = [];
	// add num random colors to array
	for(var i = 0; i < num; i++){
		//get random color, push into array
		arr.push(randomColor());
	}
	// return array 
	return arr;
}


// Generate one randomColor
function randomColor(){
	//pick a red from 0~255
	var red = Math.floor(Math.random()*256);
	//pick a green from 0~255
	var green = Math.floor(Math.random()*256);
	//pick a blue from 0~255
	var blue = Math.floor(Math.random()*256);
	return "rgb(" + red + ", " + green + ", " + blue +")";
}
