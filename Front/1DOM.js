
// ======================addEventListener("click"/"change"/"Mouseover"/"Mouseout")==============================
// ===================Body.sytle.background/color/border/fontsize/marginTop====================
// ===================tag.classList.toggle/add/remove====================

alert("connected OK!");
var button = document.querySelector("button");
var body = document.querySelector("body");


button.addEventListener("click", function(){
	// document.body.style.background = document.body.style.background === "blue" ? "purple" : "blue";
	body.style.background = body.style.background === "blue" ? "purple" : "blue";

});


// -----------------------------------------------------------------------------------------------
var l1 = document.querySelectorAll("li");
for(var i = 0; i < l1.length; i++){
	l1[i].addEventListener("mouseover", function(){
		this.classList.add("selected");
	});

	l1[i].addEventListener("mouseout", function(){
		this.classList.remove("selected");//"selected"定义在css文件中
	});
	l1[i].addEventListener("click", function(){
		this.classList.toggle("done");
	});
}



// ---------------------------------------------------------------------------------------------
// ################Combat##################
var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var ResetButton = document.querySelector("#reset");
var h1 = document.querySelector("#p1Display");
var h2 = document.querySelector("#p2Display");
var numInput = document.querySelector("input[type = 'number']");
var winningScoreDisplay = document.querySelector("p span");//select <span> inside <p>
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function(){
	if(!gameOver){
		p1Score++;
		if(p1Score===winningScore){
			p1Display.classList.add("winner");
			gameOver = true;
		}
		// console.log(p1Score);
		h1.textContent = p1Score;
	}
	else{

	}


});
p2Button.addEventListener("click", function(){
	if(!gameOver){
		p2Score++;
		if(p2Score===winningScore){
			p2Display.classList.add("winner");
			gameOver = true;
		}
		// console.log(p1Score);
		h2.textContent = p2Score;
	}
});

ResetButton.addEventListener("click", function() {
	reset();
});

numInput.addEventListener("change", function(){
	winningScore = Number(this.value);
	winningScoreDisplay.textContent = this.value;
	reset();

});



 function reset(){
 	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = p1Score;
	p2Display.textContent = p2Score;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");
	gameOver = false;
 }














