function tensorProduct(matrix1, matrix2) {
    let newMatrix = [...Array(matrix1.length * matrix2.length)].map(x => Array(matrix1[0].length * matrix2[0].length).fill(0));

    let unitRows = matrix2.length;
    let unitColumns = matrix2[0].length;
    let rowCount = 0, colCount = 0;


    for (let i = 0; i < newMatrix.length; i++) {
        for (let j = 0; j < newMatrix[i].length; j++) {
            rowIndex = i % matrix2.length;
            colIndex = j % matrix2[rowIndex].length;
            newMatrix[i][j] = matrix2[rowIndex][colIndex];

            newMatrix[i][j] *= matrix1[rowCount][colCount];
            // console.log(`${matrix1[rowCount][colCount]} at ${rowCount}, ${colCount}`)
            
            if (j % unitColumns == 1) {
                colCount++;
            }
        }

        colCount = 0;
        if (i % unitRows == 1) {
            rowCount++;
        }

    }
    
    return newMatrix;
}

function printMatrix(matrix, justify_spaces) {
    let ljustify = num => {
        let digits = 0;
        numCopy = num;
        while (num > 0) {
            digits++;
            num = Math.floor(num / 10);
        }
        if (num == 0) {
            digits = 1;
        }

        let str = " ".repeat(justify_spaces - digits) + numCopy;
        return str;
    }

    for (let row of matrix) {
        let temp_str = "";
        for (let item of row) {
            temp_str += ljustify(item);
        }
        console.log(temp_str);
    }
}


// printMatrix(xnext, 4);

let canvas = document.getElementById('canv');
let sidelength = window.innerHeight - 25;
canvas.width = sidelength;
canvas.height = sidelength;
let ctx = canvas.getContext('2d');
ctx.fillStyle = "#FFFFFF";
let iterationsSlider = document.getElementById('user');
let textfield = document.getElementById('stringinput');
let button = document.getElementById('go');

let unit = [[1, 1], [0, 1]];

function draw_matrix(matrix) {
    let vertical_sidelength = Math.ceil(sidelength / matrix.length);
    let horizontal_sidelength = Math.ceil(sidelength / matrix[0].length);
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                ctx.fillRect(vertical_sidelength * j, horizontal_sidelength * i, vertical_sidelength, horizontal_sidelength);
            }
        }
    }
}

function calculate_matrix(iterations, unit) {
    let matrix = unit;
    for (let i = 0; i < iterations; i++) {
        matrix = tensorProduct(matrix, unit);
    }
    return matrix;
}

// draw_matrix(tensorProduct(tensorProduct(unit, unit), unit));

function change(iterations) {
    ctx.clearRect(0, 0, sidelength, sidelength);
    draw_matrix(calculate_matrix(iterations, unit));
    console.log(iterations)
}

function changeMatrix(stringInput) {
    ctx.clearRect(0, 0, sidelength, sidelength);
    let rowsarray = stringInput.split("\\");
    let temparray = [];
    
    for (let i of rowsarray) {
        temparray.push(i.split("&"));
    }
    let finalarray = [];
    for (let row of temparray) {
        finalarray.push(row.map(stringnumber => Number(stringnumber)));
    }

    unit = finalarray;
    console.log(unit);

    // draw_matrix(calculate_matrix(3, unit));
}

button.addEventListener('click', () => {
    // changeMatrix(textfield.value);
    changeMatrix(textfield.value);
});

// draw_matrix(calculate_matrix(3, unit));
unit = [[1, 0], [0, 1]];
x4 = tensorProduct([[1, 0], [0, 1]], [[1, 0], [0, 1]]);

x16 = calculate_matrix(3, unit);
draw_matrix(x16);