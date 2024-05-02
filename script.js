//Selector
const startContainer = document.getElementById("startContainer")
const tryy = document.getElementById("try")
const startBtn = document.getElementById("startBtn");
let result = document.getElementById("result");
const startForm = document.getElementById("startForm");
const value1 = document.getElementById("1Value")
const value2 = document.getElementById("toValue")
startForm.addEventListener("submit", setRandomTo);


let gameContainer = `<p id="rahnama"></p></p><form action="#" method="get" id="gameForm">
<div>
<input type="number"id="userValue">
</div>

<button id="check">Check</button>

</form>
<p id="result"></p>`
let rand 
let counter = 5
function setRandomTo(){
    let random = makeRandomNumber(value2.value)
    if(value1.value && value2.value && tryy.value){
        counter = tryy.value

        for (let i = 0; i < value2.value; i++) {
            if (random >= value1.value && random <= value2.value){
                rand = random 
                startGame()
                break
            }
            else{
                random = makeRandomNumber(value2.value)
            }
        }
    }
    else if(value1.value == "" || value2.value == "" ||tryy.value == ""){
        result.innerText = "please enter any number"
    }
}

function startGame(){
    startForm.remove()
    startContainer.innerHTML = gameContainer
    gameForm.addEventListener("submit",checker)
    let rahnama = document.getElementById("rahnama")
    rahnama.innerHTML = `gusses numbers between ${value1.value} and ${value2.value} <br> try : ${counter}`
}

function checker(){
    result = document.getElementById("result")
    const input = document.getElementById("userValue");
   
    if (input.value){
        if(counter == 0){
            result.innerText = `wrong, computer number is ${rand}:(`
            setTimeout(() => {
                document.body.remove()
                 },4500)
        }
        else{
            if (input.value == rand){
                
                result.innerText = "succses"
                setTimeout(() => {
                    document.body.remove()
                     },4500)
            }
            else if (input.value > rand){
                counter--
                result.innerText = `your number is large than computer, you have ${counter} try `
                
            }
            else if (input.value < rand){
                counter--
                result.innerText = `your number is small than computer, you have ${counter} try `
            }
        }
    }
    else {
        result.innerText = "please enter any number"
    }
    rahnama.innerHTML = `gusses numbers between ${value1.value} and ${value2.value} <br> try : ${counter}`
}
function makeRandomNumber(e) {
  return Math.round(Math.random() * e);
}
