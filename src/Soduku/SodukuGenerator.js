/**
 * the alogorithm to generate the soduku is as follows
 * 1. It creates a blank 9x9 matrix object and a similar random 
 *    9x9 matrix object with prefilled values (suffled)
 * 2. It tries to fill one number first in the entire matrix
 *    successfully following the Soduku rules
 * 3. It implements a chcek if by filling the number in a 
 *    particular row we can not fill the next row with the
 *    same number we go back (backtrack)
 * 4. If it can be placed it completes the entire matrix 
 *    and move to the next number
 * 5. Since the matrix is limited 9x9; time or space complexity
 *    has not been considered.
 *  
 */

function getRandomNum (limit = 9) {
    return Math.floor(Math.random() * Math.floor(limit));
}

function shuffle(arr) {
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
        //The final matrix object
        this.matrix = [];
        //the random matrix
        this.mapMatrix = []
    }

    //the starting function to generate
    generate(callback) {
        let success = true
        this.matrix = this.createMatrix(9, 0)
        this.randomMatrix = this.createMatrix(9, 0)
            .map(row => row.map((v, i) => i))
            .map(row => shuffle(row))

        //next lets start assigining values to the matrix
        //we will try and put values from 1-9
        for(let i = 1; i<= 9; i++) {
            while(!this.placeValue(i)) {
                debugger
                success = false
                break;
            }
            if(!success) {
                break;
            }
        }
        console.log(this.matrix)

        if(success) {
            callback()
        } else {
            this.generate(callback)
        }
        
        
    }


    placeValue(num) {
        //we should always start placing value from the first row
        return this.placeValueInRow(num, 0)
    }

    getRowValues (sourceMatrix, row_no) {
        let nums = [], col_cntr = 0;
        while (col_cntr < 9) {
            let val = this.getCellValue(sourceMatrix, row_no, col_cntr)
            if(Number.isInteger(val)) {
                nums.push(val);
            }
            col_cntr++;
        }
        return nums;
    }

    getColValues(sourceMatrix, col_no) {
        let nums = [], row_cntr = 0;
        while (row_cntr < sourceMatrix.length) {
            let val = this.getCellValue(sourceMatrix, row_cntr, col_no)
            if(Number.isInteger(val)) {
                nums.push(val);
            }
            row_cntr++;
        }
        return nums;
    }

    getBoxLimit (row_no, col_no) {
        let matrix_start_row, matrix_end_row, matrix_start_col, matrix_end_col;

        matrix_start_row = Math.floor(row_no / 3) * 3
        matrix_end_row = matrix_start_row + 2
        matrix_start_col = Math.floor(col_no / 3) * 3
        matrix_end_col = matrix_start_col + 2

        return {
            'm_s_r': matrix_start_row,
            'm_e_r': matrix_end_row,
            'm_s_c': matrix_start_col,
            'm_e_c':matrix_end_col
        }
    }

    getBoxValues(sourceMatrix, row_no, col_no, isFlat = true) {
        let nums = [];
        let matrix_start_row, matrix_end_row, matrix_start_col, matrix_end_col;
        
        let matrix_cords = this.getBoxLimit(row_no, col_no);

        matrix_start_row = matrix_cords.m_s_r;
        matrix_end_row = matrix_cords.m_e_r;
        matrix_start_col = matrix_cords.m_s_c;
        matrix_end_col = matrix_cords.m_e_c;
        
        //get the values of this matrix
        for(let row = matrix_start_row; row <= matrix_end_row; row++) {
            nums[row] = [];
            for(let col = matrix_start_col; col <= matrix_end_col; col++) {
                let val = this.getCellValue(sourceMatrix, row, col)
                if(Number.isInteger(val)) {
                    nums[row].push(val);
                }
            }
        }

        return nums = isFlat ? nums.flat() : nums;
        
    }


    checkRules(rowIndex, colIndex, val) {
        //get the existig row values
        let rowValues = this.getRowValues(this.matrix, rowIndex)
        //get the existing col values
        let colValues = this.getColValues(this.matrix, colIndex)
        //get the existing sub-matrix / box values
        let boxValues = this.getBoxValues(this.matrix, rowIndex, colIndex)

        //if any of these values have the required number included
        //we can not place it
        let allValues = rowValues.concat(colValues.concat(boxValues))
        //remove repetition
        let uniqueValues = [...new Set(allValues)]

        return uniqueValues.includes(val)
    }

    placeValueInRow(num, rowIndex) {
        let success = false
        let valToPlace = num
        let row = this.matrix[rowIndex]
        let rndIndices = this.randomMatrix[rowIndex]
        let colIndex

        for(let i = 0; i< 9; i++) {
            colIndex = rndIndices[i]
            //if the cell already have a value other than 0
            //we should go the the next
            let val = row[colIndex]
            if(val) {
                continue
            }

            //next we need to check whether we can place this 
            //value in the cell following Soduku rule
            if(this.checkRules(rowIndex, colIndex, valToPlace)) {
                continue
            }

            //we can place the value
            row[colIndex] = valToPlace

            //now here we need to check whether we can place
            //the required value in the next row. This is how
            //through recursion we complete one number for the
            //entire matrix. If this number can not be placed
            //in the next row, we backtrack one step
            if( (rowIndex+1) < 9) {
                if(!this.placeValueInRow(num, rowIndex+1)) {
                    //means we could not place it in the next row
                    // We backtrack
                    row[colIndex] = 0
                    continue
                }
            }
            success = true
        }

        return success
    }



    /**
     * Simply creates a nxn matrix, fills it with the value 
     * and returns it
     * 
     * @param {number} length : the length of the matrix
     * @param {number} value : the placeholder value to fill the matrix
     */
    createMatrix(length, value) {
        return Array.from({length: 9}, () => Array(9).fill(value))

    }

    getCellValue (sourceMatrix, row_no, col_nom) {
        return sourceMatrix[row_no][col_nom]
    }
}

export default SodukuGenerator