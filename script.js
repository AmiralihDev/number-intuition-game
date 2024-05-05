//Selector
const startContainer = document.getElementById("startContainer")
const tryy = document.getElementById("try")
const startBtn = document.getElementById("startBtn");
let result = document.getElementById("result");
const startForm = document.getElementById("startForm");
const value1 = document.getElementById("1Value")
const value2 = document.getElementById("toValue")
let deadline = document.getElementById("deadline")
startForm.addEventListener("submit", setRandomTo);


let gameContainer = `<p id="rahnama"></p><form action="#" method="get" id="gameForm">
<div>
<input type="number"id="userValue">
</div>

<button id="check">Check</button>

</form>
<p id="deadline"></p>
<progress id="timeProgress" value="120" max="120"></progress>

<p id="result"></p>`
let time = 0
let rand 
let counter = 5
function setRandomTo(){
    let random = makeRandomNumber(value2.value)
    if(value1.value && value2.value && tryy.value && deadline.value){
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
    else if(value1.value == "" || value2.value == "" ||tryy.value == ""|| deadline.value == ""){
        massage(result,"please enter any number","red")
    }
}

function startGame(){
    startForm.remove()
    startContainer.innerHTML = gameContainer
    gameForm.addEventListener("submit",checker)
    let rahnama = document.getElementById("rahnama")
    massage(rahnama,`gusses numbers between ${value1.value} and ${value2.value} <br> try : ${counter}`,)
    startTimer()
}
let timeOut = false
function startTimer(){
    time = deadline.value * 1000
    let progress = document.getElementById("timeProgress")
    progress.max = time
    deadline = document.getElementById("deadline")
    result = document.getElementById("result")
    let deadlineTime = setInterval(() => {
        time -= 1000
        progress.value = time
        massage(deadline, `time out in ${getTime()}`,"blue")
        if (time == 0){
            clearInterval(deadlineTime)
            timeOut = true
            if (timeOut){
                progress.style.display = "none"
                massage(deadline,"time Out :(","red")
                massage(result, "dead :( Your time is up ","red")
                dead()
                setTimeout(() => {
                    document.body.remove()
                },4500) 
            }
        }
    },1000)
    
}
function getTime(){
    let minute = Math.floor(time / 60_000).toString()
    let second = Math.floor((time % 60_000) / 1000).toString()
    return ` ${minute.padStart(2, "0")} : ${second.padStart(2, "0")}`
}
function dead(){
    if(timeOut){
        massage(result,`computer number is ${rand}:(`,"red")
    }
    massage(result,`wrong, computer number is ${rand}:(`,"red")
}
function checker(){
    
    const input = document.getElementById("userValue");
    if (input.value){
        
        
        if (counter > 0){
            if (input.value == rand){
                massage(result,"succses","green")
                setTimeout(() => {
                    document.body.remove()
                     },4500)
            }
            else if (input.value > rand){
                counter--
                massage(result,`your number is large than computer <br> you have ${counter} try `,"red")
            }
            else if (input.value < rand){
                counter--
                massage(result,`your number is small than computer <br> you have ${counter} try `,"red")
            }
        }
        else if(counter == 0 ){
            dead()
            setTimeout(() => {
                document.body.remove()
                 },4500)
    }
    else {
        massage(result,"please enter any number","red")
    }
    massage(rahnama,`gusses numbers between ${value1.value} and ${value2.value} <br> try : ${counter}`)
}}
function massage(varable,massage, color){
    varable.innerHTML = massage
    varable.style.color = color || "black"
}
function makeRandomNumber(e) {
  return Math.round(Math.random() * e);
}
