let runTotal = 0;
let buffer = "0";
let prevNum = 0;
let prevOp = null;

const screen = document.querySelector(".screen");

document.querySelector('.calc-buttons').addEventListener("click", function (event) {
    buttonClick(event.target.innerText);

});
function buttonClick(value){
    if(isNaN(parseInt(value))){
        console.log("Pressed a symbol");
        handleSymbol(value);
    }else{
        console.log("Pressed a number");
        handleNumber(value);
    }
}

function handleNumber(value){
    if(buffer === "0" ){
        buffer = value;
    }
    else if( isNaN(parseInt(buffer))){
        buffer = value;
    }
    else{
        buffer += value;
    }
    rerender();
}

function handleSymbol(value){
    if(prevOp != null && value != '='){
        handleSymbol('=');
    }
    console.log("The operator in use is: ", value);
    switch(value){
        case 'C':
            buffer = "0";
            runTotal = 0;
            prevOp = null;
            rerender();
            break;
        case '←':
            if (buffer != "0"){
                buffer = parseInt(buffer/10);
                rerender();
            }
            break;

        case '×':
            runTotal = buffer;
            buffer = '0';
            prevOp = '×';
            break;

        case '÷':
            runTotal = buffer;
            buffer = '0';
            prevOp = '÷';
            break;

        case '+':
            runTotal = buffer;
            buffer = '0';
            prevOp = '+';
            break;

        case '-':
            runTotal = buffer;
            buffer = '0';
            prevOp = '-';
            break;

        case '=':
            if(prevOp === null){
                return;
            }
            else{
                if (prevOp == '×'){
                    buffer = runTotal*buffer;
                    runTotal = buffer;
                    rerender();
                }
                else if (prevOp == '÷'){
                    if(buffer == '0'){
                        buffer = 'Infinite';
                        rerender();
                        break;
                    }
                    buffer = runTotal/buffer;
                    runTotal = buffer;
                    rerender();
                    break;
                }
                else if (prevOp === '+'){
                    buffer = parseInt(runTotal)+parseInt(buffer);
                    runTotal = buffer;
                    rerender();
                    break;
                }
                else if (prevOp == '-'){
                    buffer = runTotal-parseInt(buffer);
                    runTotal = buffer;
                    rerender();
                    break;
                }

            }
            prevOp = null;
            break;
    }
}

function rerender(){
    screen.innerText = buffer;
}
