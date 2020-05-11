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

    /* 
     * getNumbersInRow returns all the numbers in a specifc row   
    */
    getNumbersInRow (row_no) {
        let nums = [], col_cntr = 1;
        while (col_cntr <= 9) {
            let val = this.getCellValue(row_no, col_cntr)
            if(Number.isInteger(val)) {
                nums.push(val);
            }
            col_cntr++;
        }
        return nums;
    }

    /* 
    * getNumbersInRow returns all the numbers in a specifc column   
    */
    getNumbersInColum(col_no) {
        let nums = [], row_cntr = 1;
        while (row_cntr <= 9) {
            let val = this.getCellValue(row_cntr, col_no)
            if(Number.isInteger(val)) {
                nums.push(val);
            }
            row_cntr++;
        }
        return nums;
    }

    /* 
    * getNumbersInSubMatrix returns all the numbers in a specifc sub-matrix   
    */
    getNumbersInSubMatrix(row_no, col_no) {
        let nums = [];
        let matrix_start_row, matrix_end_row, matrix_start_col, matrix_end_col;
        if (row_no % 3 == 0) {
            matrix_end_row = row_no;
            matrix_start_row = matrix_end_row - 2
        }else {
            matrix_start_row = row_no - (row_no % 3) + 1
            matrix_end_row = matrix_start_row + 2
        }

        if(col_no % 3 == 0) {
            matrix_end_col = col_no
            matrix_start_col = matrix_end_col - 2
        } else {
            matrix_start_col = col_no - (col_no % 3) + 1
            matrix_end_col = matrix_start_col + 2
        }

        //get the values of this matrix
        for(let row = matrix_start_row; row < matrix_end_row; row++) {
            for(let col = matrix_start_col; col < matrix_end_col; col++) {
                let val = this.getCellValue(row, col)
                if(Number.isInteger(val)) {
                    nums.push(val);
                }
            }
        }

        return nums;
        
    }


    getCorrectNum(row_no, col_no) {
        let row_nums = this.getNumbersInRow(row_no);
        let col_nums = this.getNumbersInColum(col_no);
        let sub_matrix_nums = this.getNumbersInSubMatrix(row_no, col_no)

        let all_nums = row_nums.concat(col_nums).concat(sub_matrix_nums)
        let unique_nums = [... new Set(all_nums)]

        let avlbl_nums = this.VALUE_ARR.filter(num => {
            return !unique_nums.includes(num)
        })

        avlbl_nums = suffle(avlbl_nums)
        //debugger;
        console.log(unique_nums, unique_nums)

        /* @todo: We simply can not add numbers without checking how many
        cells for that column (maybe row as well) for that cell and whether
        in those empty cells we already have any strict requirement of any specifc 
        number. This may imporve the solution a bit*/

        let new_val = avlbl_nums.shift();
        if(!Number.isInteger(new_val)) {
            //debugger;
        }
        return new_val;
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

    populateCells () {
        for(let r = 1; r <= 9; r++) {
            for(let c = 1; c <= 9; c++) {
                let val = this.matrix[r][c];
                if(val === '') {
                    let correctNum = this.getCorrectNum(r, c);
                    this.matrix[r][c] = correctNum;
                }
            }
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
        this.populateCells()
    }

    getCellValue (row_no, col_nom) {
        return this.matrix[row_no][col_nom]
    }
}

export default SodukuGenerator;