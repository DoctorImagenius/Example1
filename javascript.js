var screen = document.querySelector("#screen");
var btn = document.querySelectorAll(".btn");
let varNameArray = [];
let varValueArray = [];
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
function result() {
    let exp = null;
    let res = null;
    exp = screen.value;
    try {
        for (var j = 0; j < screen.value.length; j++) {
            for (var i = 0; i < varNameArray.length; i++) {
                screen.value = screen.value.replace(
                    `${varNameArray[i]}`,
                    `${varValueArray[i]}`
                );
            }
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
function addButton(e, r) {
    const bt = document.createElement("button");
    bt.classList.add("historyButton");
    bt.innerHTML = `${e} = ${r} <button class='delhistory'>Delete</button>`;
    bt.addEventListener("click", (e) => {
        expression = e.target.innerText;
        let strVar = expression.split("=")[0];
        if (strVar == "Delete") {
            bt.style.display = "none";
            return;
        }
        screen.value = strVar;
    });
    bt.style.display = "flex";
    bt.style.justifyContent = "space-between";
    bt.style.alignItems = "center";

    hisDiv = document.getElementsByClassName("history")[0];
    hisDiv.appendChild(bt);
}
let showHistory = 0;
function history() {
    if (showHistory == 0) {
        document.getElementById("history").style.display = "flex";
        showHistory = 1;
    } else {
        document.getElementById("history").style.display = "none";
        showHistory = 0;
    }
}
let ShowVar = 0;
function ShowVariable() {
    if (ShowVar == 0) {
        document.getElementById("variable").style.display = "flex";
        ShowVar = 1;
    } else {
        document.getElementById("variable").style.display = "none";
        ShowVar = 0;
    }
}
function createVar(e, r) {
    const bt = document.createElement("button");
    bt.classList.add("historyButton");
    bt.innerText = `${e} = ${r}`;
    bt.addEventListener("click", (e) => {
        expression = e.target.innerText;
        let strVar = expression.split("=")[0];
        screen.value += strVar;
    });
    hisDiv = document.getElementById("variableOutputs");
    hisDiv.appendChild(bt);
}
function addVar() {
    let name = document.getElementById("varName").value;
    let val = document.getElementById("varValue").value;
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
    if (/^\d+$/.test(val)) {
        console.log("myString is a number");
    } else {
        if (val != "2.7182" && val != "3.1415") {
            screen.value = "Incorrect value!";
            return;
        }
    }
    const index = varNameArray.indexOf(name);
    document.getElementById("varName").value = "";
    document.getElementById("varValue").value = "";

    if (index !== -1) {
        console.log(`Element 30 is found at index ${index}`);
        varValueArray[index] = val;
        createVar(name, val);
    } else {
        varNameArray.push(name);
        varValueArray.push(val);
        createVar(name, val);
    }
}
function sqrt() {
    screen.value += "√()";
}
function power() {
    screen.value += "p(,)";
}
function sin() {
    screen.value += "sin()";
}
function cos() {
    screen.value += "cos()";
}
function tan() {
    screen.value += "tan()";
}
