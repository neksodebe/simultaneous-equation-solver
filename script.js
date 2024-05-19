

/*
    OUTDATED!

    Steps for trial and error:
        1. Check any possible combination of numbers within a range.
        2. Check whether or not the equations are true.
        3. If they are not, keep trying. Store already tried values in an array, and don't try them again.
        4. Once the correct values are found, display them.
*/
function solve(equationOne, equationTwo, attemptRange, variableOneName, variableTwoName) {
    // loop

    let foundX; // the value of X which was found
    let foundY; // the value of Y which was found

    let attemptCount = 0;

    let expressionOne = equationOne.split("=")[0].trim();
    let expressionTwo = equationTwo.split("=")[0].trim();

    let expectedValueOne = parseInt(equationOne.split("=")[1].trim());
    let expectedValueTwo = parseInt(equationTwo.split("=")[1].trim());

    console.log(`expected ${variableOneName}: ${expectedValueOne}`);
    console.log(`expected ${variableTwoName}: ${expectedValueTwo}`);

    let tableData = [];

    // let attemptedValues = [];
    // // structure of each item in attemptedValues:
    // // {x: number, y: number}

    let tableEnabled = document.getElementById("table-enabled").value;
    
    try {
        // IDEA: instead of checking random numbers, check one value of x with _ values of y
        for (var x = 0; x < attemptRange + 1; x++) {
            let foundThisStuff = false;
            for (var y = 0; y < attemptRange + 1; y++) {
                if (tableEnabled) {
                    let tableDataPre = [x, y];
                    attemptCount++;
                    let substitutedExpressionOne = convertAlgebraMultiplicationToTerms(convertAlgebraMultiplicationToTerms(expressionOne, variableTwoName), variableOneName).replaceAll(variableOneName, x).replaceAll(variableTwoName, y);
                    let resultExpressionOne = math.evaluate(substitutedExpressionOne);
                    // console.log(`expected: ${expectedValueOne}`);
                    // console.log(`got: ${resultExpressionOne}`);
                    tableDataPre.push(resultExpressionOne);

                    console.log("X matches");
                    let substitutedExpressionTwo = convertAlgebraMultiplicationToTerms(convertAlgebraMultiplicationToTerms(expressionTwo, variableTwoName), variableOneName).replaceAll(variableOneName, x).replaceAll(variableTwoName, y);
                    let resultExpressionTwo = math.evaluate(substitutedExpressionTwo);
                    // console.log(`expected: ${expectedValueTwo}`);
                    // console.log(`got: ${resultExpressionTwo}`);
                    tableDataPre.push(resultExpressionTwo);


                    if (resultExpressionOne == expectedValueOne) {
                        if (resultExpressionTwo == expectedValueTwo) {
                            console.log("Y matches");
                            console.log("Found!");
                            foundX = x;
                            foundY = y;
                            foundThisStuff = true;
                            break;
                        }
                    }

                    tableData.push(tableDataPre);

                    if (tableData.length > 4) {
                        tableData.shift();
                    }
                } else {
                    attemptCount++;
                    let substitutedExpressionOne = convertAlgebraMultiplicationToTerms(convertAlgebraMultiplicationToTerms(expressionOne, variableTwoName), variableOneName).replaceAll(variableOneName, x).replaceAll(variableTwoName, y);
                    let resultExpressionOne = math.evaluate(substitutedExpressionOne);
                    // console.log(`expected: ${expectedValueOne}`);
                    // console.log(`got: ${resultExpressionOne}`);

                    if (resultExpressionOne == expectedValueOne) {
                        console.log("X matches");
                        let substitutedExpressionTwo = convertAlgebraMultiplicationToTerms(convertAlgebraMultiplicationToTerms(expressionTwo, variableTwoName), variableOneName).replaceAll(variableOneName, x).replaceAll(variableTwoName, y);
                        let resultExpressionTwo = math.evaluate(substitutedExpressionTwo);
                        // console.log(`expected: ${expectedValueTwo}`);
                        // console.log(`got: ${resultExpressionTwo}`);
                        if (resultExpressionTwo == expectedValueTwo) {
                            console.log("Y matches");
                            console.log("Found!");
                            foundX = x;
                            foundY = y;
                            foundThisStuff = true;
                            break;
                        }
                    }




                }

            }
            if (foundThisStuff) {
                break;
            }
        }
    } catch (e) {
        console.log("Error: " + e);
        console.trace();
        showOutput(e);
        return;
    }


    if (foundX && foundY) {
        console.log("Successfully found X and Y after " + attemptCount + " tries!");
        console.log(`X: ${foundX}`);
        console.log(`Y: ${foundY}`);

        showOutput(`${variableOneName} = ${foundX}\n${variableTwoName} = ${foundY}`);
    } else {
        console.log("Could not find result! :(");
        showOutput("Could not find values :(");
    }

    setTimeout(() => { // so u can see it
        document.getElementById("status").style.display = "none";
    }, 10);

    if(tableEnabled) makeResultsTable(variableOneName, variableTwoName, expressionOne, expressionTwo, tableData);
}

function convertAlgebraMultiplicationToTerms(expression, variableName) {
    // Escape the variable name for regex
    const escapedVariableName = variableName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Match digit followed by variable, not preceded by backslash or inside groups
    const regex = new RegExp(`(?<!\\\\)(\\d+)(${escapedVariableName})(?![\\s]*[\\)\\\]\\}])`, 'g');
    return expression.replace(regex, '$1 * $2');
}


function showOutput(text) {
    document.getElementById("output").innerHTML = text;
}

function makeResultsTable(variableOneName, variableTwoName, expressionOne, expressionTwo, dataArray) {
    const table = document.getElementById('table');
    table.innerHTML = `
        <tr>
            <td>${variableOneName}</td>
            <td>${variableTwoName}</td>
            <td>${expressionOne}</td>
            <td>${expressionTwo}</td>
        </tr>

        <tr>
            <td>...</td>
            <td>...</td>
            <td>...</td>
            <td>...</td>
        </tr>
    `;

    for (i in dataArray) {
        table.innerHTML += `<tr><td>${dataArray[i][0]}</td><td>${dataArray[i][1]}</td><td>${dataArray[i][2]}</td><td>${dataArray[i][3]}</td></tr>`
    }



}

function useInputsAndSolve() {
    document.getElementById("status").style.display = "inline";
    let equationOne = document.getElementById("equation-one").value;
    let equationTwo = document.getElementById("equation-two").value;
    let attemptRange = document.getElementById("attempt-range").value;
    let variableOneName = document.getElementById("variable-one-name").value;
    let variableTwoName = document.getElementById("variable-two-name").value;

    if (!equationOne.includes(variableOneName) || !equationTwo.includes(variableOneName) || !equationOne.includes(variableTwoName) || !equationTwo.includes(variableTwoName)) {
        showOutput("You didn't use your variable in one or more of the equations! \nCheck if you've set the correct variable name.");
        document.getElementById("status").style.display = "none";
        return;
    }

    if (equationOne.split("=").length < 2 || equationTwo.split("=").length < 2) {
        showOutput("One or more of the equations is invalid (might be an expression instead of an equation)");
        document.getElementById("status").style.display = "none";
        return;
    }
    solve(equationOne, equationTwo, attemptRange, variableOneName, variableTwoName);
}