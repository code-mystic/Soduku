/* The engine to generate a soduku Puzzle
   1. The basic algorith used here is that the 3 x 3 diagonal 
   matrix is independent of each other. We should generate 
   those first
   2. Then we should randomly choose a number between 1-9
      and check whether we can place that
   3. If we can not place that then we go back to the step - 2
      and repeat
   4. Post completion of all numbers we randomly remove some 
      of the numbers to create the puzzle
*/

function getRandomNum (limit = 9) {
    return Math.floor(Math.random() * Math.floor(limit));
}

function suffle(arr) {
    let copyArr = [...arr]
    let len = copyArr.length
    for(let i = 0; i < len; i++) {
        let rnd_num = getRandomNum(len)
        let temp = copyArr[i]
        copyArr[i] = copyArr[rnd_num]
        copyArr[rnd_num] = temp
    }
    return copyArr
}

class SodukuGenerator {

    constructor () {
        this.matrix = [];
        this.VALUE_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }
    
    fillDiagonalSubMatrix () {
        let row_base = 1, col_base = 1, counter = 1;
        // we now we have 3 diagonal matrix so we will do the process
        // 3 times for 3 differen 3 x 3 matrix
        while (counter <= 3) {
            let num_arr = suffle([...this.VALUE_ARR])
            for(let row = row_base; row < (row_base+3); row++) {
                for(let col = col_base; col < (col_base+3); col++) {
                    let val = num_arr.shift()
                    this.matrix[row][col] = val
                }
            }
            row_base += 3;
            col_base += 3;
            counter++
        }
    }

    generate () {
        for(let r = 1; r <= 9; r++) {
            this.matrix[r] = []
            for(let c = 1; c <= 9; c++) {
                this.matrix[r][c] = '' //this.getCorrectNum(r, c)
            }
        }
        this.fillDiagonalSubMatrix()
    }

    getCellValue (row_no, col_nom) {
        return this.matrix[row_no][col_nom]
    }
}

export default SodukuGenerator;