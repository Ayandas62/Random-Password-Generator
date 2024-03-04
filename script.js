//copy the password

const displayPassword = document.querySelector("[displayPassword]");
const copiedMsg = document.querySelector("[copiedMsg]");
const copyBtn = document.querySelector("[copyBtn]");
let checkCount = 0;


async function copyContent(){
    await navigator.clipboard.writeText(displayPassword.value);
    copiedMsg.innerText = "Copied";
    copiedMsg.classList.add("active");
    setTimeout(()=>{ 
        copiedMsg.classList.remove("active");
    },2000);
}

copyBtn.addEventListener("click",()=>{
    if(displayPassword.value)
    copyContent()
});


//handle the slider

const lengthSlider = document.querySelector("[legthSlider]");
let passwordLength = 15;
const passwordLengthDisplay = document.querySelector("[passwordLength]");
handleSlider();


function handleSlider(){
    lengthSlider.value = passwordLength;
    passwordLengthDisplay.innerText = passwordLength;
}

lengthSlider.addEventListener("input",(e)=>{
    passwordLength= e.target.value;
    handleSlider();
})

//generate random number and characters

const symbols = '`~!@#$%^&*()_+{}:"<>?/.,;][|=-';


function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function getRndUppercase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function getRndLowercase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function getRndNumber(){
    return getRndInteger(0,9);
}

function getRndSymbols(){
    rndSy = getRndInteger(0,symbols.length);
    return symbols.charAt(rndSy);
}


//checkbox handle

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


//calculate strength

const indicator = document.querySelector("[indicator]");
setIndicator("silver");

function setIndicator(color){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow = `0px 0px 5px 5px ${color}`;
}


function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
    if(uppercase.checked)hasUpper = true;
    if(lowercase.checked)hasLower = true;
    if(numbers.checked)hasNumber = true;
    if(symbolsAdd.checked)hasSymbol = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >=8 ){
        setIndicator("green");
    }else if((hasLower||hasUpper) && (hasNumber||hasSymbol) && passwordLength>=6){
        setIndicator("lightgreen");
    }else if(hasUpper && hasLower && passwordLength>=10){
        setIndicator("yellow");
    }else if(hasNumber && hasSymbol && passwordLength>=10){
        setIndicator("yellow");
    }else{
        setIndicator("red");
    }
}


//make password

const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#number");
const symbolsAdd = document.querySelector("#symbols");
const generateBtn = document.querySelector("[generateBtn]");
let password = "";

generateBtn.addEventListener("click",()=>{
    password = "";
    let funcArr = [];
    if(uppercase.checked)
    funcArr.push(getRndUppercase);

    if(lowercase.checked)
    funcArr.push(getRndLowercase);

    if(numbers.checked)
    funcArr.push(getRndNumber);

    if(symbolsAdd.checked)
    funcArr.push(getRndSymbols);

    for(let i = 0; i<funcArr.length; i++){
            password +=funcArr[i]();
    }

    for(let i = 0; i<passwordLength-funcArr.length; i++){
        rndIndex = getRndInteger(0,funcArr.length);
        password += funcArr[rndIndex]();
    }
    displayPassword.value = password;
    calcStrength();
})



