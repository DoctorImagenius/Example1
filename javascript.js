var screen = document.querySelector("#screen");
var btn = document.querySelectorAll(".btn");
let names = [];
let values = [];
let showHistory = 0;
let ShowVar = 0;
for (item of btn) {
    item.addEventListener("click", (e) => {
        text = e.target.innerText;
        if (text == "x") {
            text = "*";
        }
        if (text == "÷") {
            text = "/";
        }
        screen.value += text;
    });
}

function ShowResult() {
    let exp = null;
    let res = null;
    exp = screen.value;
    try {
        for (let i = 0; i < names.length; i++) {
            const regex = new RegExp(`${names[i]}`, "g");
            screen.value = screen.value.replace(regex, `${values[i]}`);
        }

        screen.value = screen.value.replace(/sin/g, "Math.sin");
        screen.value = screen.value.replace(/cos/g, "Math.cos");
        screen.value = screen.value.replace(/tan/g, "Math.tan");
        screen.value = screen.value.replace(/√/g, "Math.sqrt");
        function pow(x = 1, y = 1) {
            return x ** y;
        }

        screen.value = screen.value.replace(/p/g, "pow");
        for (var i = 0; i < screen.value.length; i++) {
            var piIndex = screen.value.indexOf("π");
            if (piIndex == 0) {
                screen.value = screen.value.replace("π", "3.1415");
            }

            if (piIndex !== -1 && piIndex > 0) {
                var characterBeforePi = screen.value[piIndex - 1];
                if (
                    characterBeforePi == "+" ||
                    characterBeforePi == "-" ||
                    characterBeforePi == "*" ||
                    characterBeforePi == "(" ||
                    characterBeforePi == "/"
                ) {
                    screen.value = screen.value.replace("π", "3.1415");
                } else {
                    screen.value = screen.value.replace("π", "*3.1415");
                }
            }
        }

        for (var i = 0; i < screen.value.length; i++) {
            var eIndex = screen.value.indexOf("e");
            if (eIndex == 0) {
                screen.value = screen.value.replace("e", "2.7182");
            }

            if (eIndex !== -1 && eIndex > 0) {
                var characterBeforee = screen.value[eIndex - 1];
                if (
                    characterBeforee == "+" ||
                    characterBeforee == "-" ||
                    characterBeforee == "*" ||
                    characterBeforee == "/"
                ) {
                    screen.value = screen.value.replace("e", "2.7182");
                } else {
                    screen.value = screen.value.replace("e", "*2.7182");
                }
            }
        }

        screen.value = eval(screen.value)
            .toFixed(4)
            .replace(/\.?0+$/, "");
        if (eval(screen.value) == "Infinity") {
            screen.value = "Answer is Infinity...";
        }

        if (screen.value == "NaN") {
            screen.value = "Incomplete Expression...";
        }

        res = screen.value;
    } catch (error) {
        screen.value = "Expression Error!";
        res = screen.value;
    }

    addButton(exp, res);
}

function addButton(Exp, Res) {
    const button = document.createElement("button");
    button.classList.add("historyButton");
    button.innerHTML = `${Exp} = ${Res} <button class='delhistory'>Delete</button>`;
    button.addEventListener("click", (e) => {
        expression = e.target.innerText;
        let deleteValue = expression.split("=")[0];
        if (deleteValue == "Delete") {
            button.remove();
            return;
        }
        screen.value = deleteValue;
    });
    button.classList.add("ModifyButtons");
    herDiv = document.getElementsByClassName("history")[0];
    herDiv.appendChild(button);
}

function ShowHistory() {
    showHistory == 0
        ? ((document.getElementById("history").style.display = "flex"),
          (showHistory = 1))
        : ((document.getElementById("history").style.display = "none"),
          (showHistory = 0));
}

function ShowVariable() {
    ShowVar == 0
        ? ((document.getElementById("variable").style.display = "flex"),
          (ShowVar = 1))
        : ((document.getElementById("variable").style.display = "none"),
          (ShowVar = 0));
}

function createVar(Exp, Res) {
    const button = document.createElement("button");
    button.classList.add("historyButton");
    button.innerText = `${Exp} = ${Res}`;
    button.addEventListener("click", (e) => {
        expression = e.target.innerText;
        let addVar = expression.split("=")[0];
        screen.value += addVar;
    });
    herDiv = document.getElementById("variableOutputs");
    herDiv.appendChild(button);
}

function addVar() {
    let name = document.getElementById("varName").value;
    let val = document.getElementById("varValue").value;
    if (name == "e") {
        val = "2.7182";
    }
    if (val == "e") {
        val = "2.7182";
    }
    if (val == "π") {
        val = "3.1415";
    }
    if (name == "e" || name == "π") {
        screen.value = "This is constant!";
        return;
    }
    if (/\d/.test(name)) {
        screen.value = "Incorrect name!";
        return;
    }
    if (!/^\d+$/.test(val)) {
        if (val != "2.7182" && val != "3.1415") {
            screen.value = "Incorrect value!";
            return;
        }
    } else {
        screen.value = "";
    }
    const index = names.indexOf(name);
    document.getElementById("varName").value = "";
    document.getElementById("varValue").value = "";
    if (index !== -1) {
        values[index] = val;
        createVar(name, val);
    } else {
        names.push(name);
        values.push(val);
        createVar(name, val);
    }
}

function allClear() {
    screen.value = "";
}

function sqrt() {
    screen.value += "√()";
}

function power() {
    screen.value += "p(,)";
}

function getSin() {
    screen.value += "sin()";
}

function cos() {
    screen.value += "cos()";
}

function tan() {
    screen.value += "tan()";
}
