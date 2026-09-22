
const boardElement = document.getElementById("textbox");

function WriteNumber(button)
{
    if (boardElement.value == "0") 
        boardElement.value = button.textContent;
    else
        boardElement.value += button.textContent;
}

function WriteOperation(button)
{
    var lastcharacter = boardElement.value.at(-1);

    if (
        lastcharacter === "*" ||
        lastcharacter === "+" ||
        lastcharacter === "-" ||
        lastcharacter === "÷"
    )
    {
        // Reemplazar último carácter
        boardElement.value =
            boardElement.value.slice(0, -1) + button.textContent;
    }
    else
    {
        boardElement.value += button.textContent;
    }
}

function delete_()
{
     boardElement.value =
            boardElement.value.slice(0, -1) + "";
}

function clear_()
{
    boardElement.value = "0";
    console.log(0);
}

function resolve()
{
    let expression = boardElement.value;

    let operator;

    if (expression.includes("+"))
        operator = "+";
    else if (expression.includes("-"))
        operator = "-";
    else if (expression.includes("*"))
        operator = "*";
    else if (expression.includes("÷"))
        operator = "÷";
    else
        return;

    let numbers = expression.split(operator);

    let A = Number(numbers[0]);
    let B = Number(numbers[1]);

    let result;

    if (operator === "+")
        result = Add(A, B);

    else if (operator === "-")
        result = Minus(A, B);

    else if (operator === "*")
        result = multiply(A, B);

    else if (operator === "÷")
        result = split(A, B);

    boardElement.value = result;
}

function Add(A , B) {
    return A + B;
}

function Minus(A , B) {
     return A - B;
}

function multiply(A , B) {
     return A * B;
}

function split(A , B) {
     return A / B;
}


document.addEventListener("keydown", event => {

    // Números
    if (event.key >= "0" && event.key <= "9") {

        if (boardElement.value === "0") {
            boardElement.value = event.key;
        }
        else {
            boardElement.value += event.key;
        }

    }

    // Operadores
    else if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/"
    ) {

        boardElement.value += event.key;

    }

});