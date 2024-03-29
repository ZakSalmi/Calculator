let digitButtons = document.querySelectorAll(".calc");
let operatorButtons = document.querySelectorAll(".opp");
let equalButtons = document.querySelector(".equal");
let clearButtons = document.querySelector(".sign-AC");
let backButtons = document.querySelector(".backward");
let previousOperandTextElement = document.querySelector(".previous-number");
let currentOperandTextElement = document.querySelector(".current-number");
class Calculator {
	constructor(previousOperandTextElement,currentOperandTextElement) {
		this.currentOperandTextElement = currentOperandTextElement;
		this.previousOperandTextElement = previousOperandTextElement;
		this.clear();
		this.updateDisplay();
	}

	clear(){
		this.currentOperand = '';
		this.previousOperand = '';
		this.operator = '';
	}

	backspace(){
		this.currentOperand = this.currentOperand.slice(0,-1);
	}

	totalLength(currentOperand){
		switch(this.currentOperand.length){
			case 6:
			currentOperandTextElement.style.fontSize = "40px";
			break;
			case 9:
			currentOperandTextElement.style.fontSize = "28px";
			break;
		}
	}

	concatNumber(number){
		if(this.currentOperand.length === 17){return}
		if(number === '.' && this.currentOperand.includes(".")){return}
		this.currentOperand = this.currentOperand + number.toString();
		this.totalLength(this.currentOperand);
	}

	operatorSelected(operator){
 		this.operator = operator;
 		if(this.previousOperand !== ""){
 			this.compute()
 		}
 		if(this.currentOperand === ""){return}
 		this.previousOperand = this.currentOperand;
 		console.log(this.previousOperand)
 		this.currentOperand = "";
	}

	compute(){
		var computed = 0 ;
		var current = parseFloat(this.currentOperand); 
		var previous = parseFloat(this.previousOperand);
		if(isNaN(current) || isNaN(previous)){return}
		switch(this.operator){
			case "+":
				computed = current + previous;
				break;
			case "-":
				computed = previous - current;
				break;
			case "x":
				console.log("Previous Value = " + previous + "Current Value = " + current)
				computed = previous * current;
				break;
			case "÷":
				computed = previous / current;
				break;
			case "%":
				computed = previous % current;
				break;
		}
		this.currentOperand = Math.round(computed * 100) / 100;
		this.previousOperand = "";
		this.operator = "";
	}
	
	updateDisplay(){
		this.currentOperandTextElement.innerText = this.currentOperand;
		this.totalLength(this.currentOperand);
		if(this.operator != null){
			this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operator}`;		
		}
	}
}

var calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

digitButtons.forEach(digit => {
	digit.addEventListener("click" , function() {
		calculator.concatNumber(digit.innerText);
		calculator.updateDisplay()
	})
})       

operatorButtons.forEach(button => {
	button.addEventListener("click", function() {
		calculator.operatorSelected(button.innerText);
		calculator.updateDisplay()
	})
})

clearButtons.addEventListener("click", function() {
	calculator.clear();
	calculator.updateDisplay()
})

backButtons.addEventListener("click", function() {
	calculator.backspace();
	calculator.updateDisplay()
})

equalButtons.addEventListener("click", function() {
	calculator.compute();
	calculator.updateDisplay()
})

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
            calculator.concatNumber(event.key);
	    calculator.updateDisplay()
            break;
        case '+':
        case '-':
        case '*':
        case '/':
        	calculator.operatorSelected(event.key);
		calculator.updateDisplay()
            break;
        case 'Enter':
           	calculator.compute();
		calculator.updateDisplay()
            break;
        case 'clear':
       		calculator.clear();
		calculator.updateDisplay()
        	break
        case 'Backspace':
           	calculator.backspace();
		calculator.updateDisplay()
            break;
    }
});

function changeColor() {
	let head = document.getElementsByTagName("head")[0];
	let link = document.createElement("link");
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = "style2.css";
	head.appendChild(link);
	document.querySelector(".btn").style.visibility = "hidden";
	document.getElementById("Second").style.visibility = "visible";
}

function refresh() {
	window.location.reload();
}