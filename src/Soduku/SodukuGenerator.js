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

let attempt = 1;

class SodukuGenerator {

    constructor () {
        this.matrix = [];
        this.VALUE_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.BLANK_CELL_PLACEHOLDER = 0;
        this.max_try = 0;
    }

    /* 
     * getNumbersInRow returns all the numbers in a specifc row   
    */
    getNumbersInRow (row_no) {
        let nums = [], col_cntr = 0;
        while (col_cntr < 9) {
            let val = this.getCellValue(row_no, col_cntr)
            if(Number.isInteger(val)) {
                nums.push(val);
            }
            col_cntr++;
        }
        return nums;
    }

    getRemianingNumbersInRow(row_no, row_nums=[]) {
        let nums = row_nums, remainingNums = [];
        //when no pre-catched row_nums has been passed
        if(nums.length == 0 && Number.isInteger(row_no)) {
            nums = this.getNumbersInRow(row_no)
        }

        remainingNums = this.VALUE_ARR.filter(num => {
            return !nums.includes(num)
        })
        return remainingNums
    }

    /* 
    * getNumbersInRow returns all the numbers in a specifc column   
    */
    getNumbersInColum(col_no) {
        let nums = [], row_cntr = 0;
        while (row_cntr < 9) {
            let val = this.getCellValue(row_cntr, col_no)
            if(Number.isInteger(val)) {
                nums.push(val);
            }
            row_cntr++;
        }
        return nums;
    }

    getRemianingNumbersInColum(col_no, col_nums = []) {
        let nums = col_nums, remainingNums =[];

        if(nums.length == 0 && Number.isInteger(col_no)) {
            nums = this.getNumbersInColum(col_no)
        }
        
        remainingNums = this.VALUE_ARR.filter(num => {
            return !nums.includes(num)
        })
        return remainingNums
    }

    getMatrixLimit (row_no, col_no) {
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

    /* 
    * getNumbersInSubMatrix returns all the numbers in a specifc sub-matrix   
    */
    getNumbersInSubMatrix(row_no, col_no, isFlat = true) {
        let nums = [];
        let matrix_start_row, matrix_end_row, matrix_start_col, matrix_end_col;
        
        let matrix_cords = this.getMatrixLimit(row_no, col_no);

        matrix_start_row = matrix_cords.m_s_r;
        matrix_end_row = matrix_cords.m_e_r;
        matrix_start_col = matrix_cords.m_s_c;
        matrix_end_col = matrix_cords.m_e_c;

        //get the values of this matrix
        for(let row = matrix_start_row; row <= matrix_end_row; row++) {
            nums[row] = [];
            for(let col = matrix_start_col; col <= matrix_end_col; col++) {
                let val = this.getCellValue(row, col)
                if(Number.isInteger(val)) {
                    nums[row].push(val);
                }
            }
        }

        return nums = isFlat ? nums.flat() : nums;
        
    }

    getRemianingNumbersInSubMatrix(row_no, col_no, sunMatrix_nums = []) {
        let nums = sunMatrix_nums, remainingNums =[];

        if(nums.length == 0 && Number.isInteger(col_no) && Number.isInteger(row_no)) {
            nums = this.getNumbersInSubMatrix(row_no, col_no)
        }
        
        remainingNums = this.VALUE_ARR.filter(num => {
            return !nums.includes(num)
        })
        return remainingNums
    }

    /*
     * Try to suffle previous numbers in this row to find a
     * duitable number for this cell
     * As we are backtracking only on the row, we need not to
     * newly derive row numbers
     */
    backtrackOptimization (row_no, col_no, row_nums = [], col_nums = [], sub_matrix_nums =  []) {
        /*
        * 1. Which number(s) in this row are yet to be filled 
        * 2. Which number(s) can be filled in this column
        * 3. Which number(s) can be filled in this sub-matrix
        */
       
        let remRowNums = this.getRemianingNumbersInRow(row_no);
        let remColNums = this.getRemianingNumbersInColum(col_no);
        let remSubMatrxNum, valsInTheTargetCol, valsInTheTargetMatrix, numberLeftInRow

        let optNum = -1;
        
        //case - 1: When the row has only one item left to fill
        if(false) {  //remRowNums.length == 1
            //debugger;
            let numberLeftInRow = remRowNums[0]
            //we can now traverse the row from the end to find the
            //first availble no that we can place in this column
            for(let i = col_no-1; i >= 0; i--) {
                let num = row_nums[i]
                //check whether this number can be placed in the 
                //required column (col_num)
                if (remColNums.includes(num)) {

                    //We have to find that whether the sub-matrix has this
                    //num other than it's own part of the row itself
                    let remSubMatrxNum = this.getNumbersInSubMatrix(row_no, col_no, false)
                    if(remSubMatrxNum.flat().includes(num) && !remSubMatrxNum[row_no].includes(num)) {
                        // That means the num is in the matrix but not in the
                        //part of the row that belongs to this matrix
                        continue;
                    }
                    //yes it can be placed.
                    //Now we need to check whether the remaining number in the
                    //row (numberLeftInRow) can be swaped with the column whose
                    //value we are trying to put
                    let valsInTheTargetCol = this.getRemianingNumbersInColum(i)
                    // @todo:: Possible optimization. This is only applicable if the 
                    // sun-matrix got changed by traversing. 
                    let valsInTheTargetMatrix = this.getRemianingNumbersInSubMatrix(row_no, i) 
                    if(!valsInTheTargetCol.includes(numberLeftInRow) && 
                        !valsInTheTargetMatrix.includes(numberLeftInRow)) {
                        //YES WE CAN SWAP
                        //row_nums[i] =  numberLeftInRow;
                        this.matrix[row_no][i] = numberLeftInRow
                        optNum = num
                        break;
                    }
                }
            } 
        } else {
            //debugger;
            for(let i = col_no-1; i >= 0; i--) {
                let num = row_nums[i]
                //check whether this number can be placed in the 
                //required column (col_num)
                if (remColNums.includes(num)) {

                    //We have to find that whether the sub-matrix has this
                    //num other than it's own part of the row itself
                    remSubMatrxNum = this.getNumbersInSubMatrix(row_no, col_no, false)
                    if(remSubMatrxNum.flat().includes(num) && !remSubMatrxNum[row_no].includes(num)) {
                        // That means the num is in the matrix but not in the
                        //part of the row that belongs to this matrix
                        continue;
                    }
                    //yes it can be placed.
                    //Now we need to check whether the remaining number in the
                    //row (numberLeftInRow) can be swaped with the column whose
                    //value we are trying to put
                    valsInTheTargetCol = this.getRemianingNumbersInColum(i)
                    // @todo:: Possible optimization. This is only applicable if the 
                    // sun-matrix got changed by traversing. 
                    valsInTheTargetMatrix = this.getRemianingNumbersInSubMatrix(row_no, i) 


                    for(let x = 0; x < remRowNums.length; x++) {
                        numberLeftInRow = remRowNums[x]
                        if(!valsInTheTargetCol.includes(numberLeftInRow) && 
                              !valsInTheTargetMatrix.includes(numberLeftInRow)) {
                            //YES WE CAN SWAP
                            //row_nums[i] =  numberLeftInRow;
                            this.matrix[row_no][i] = numberLeftInRow
                            optNum = num
                            break;
                        }
                    }

                    //if we have swapped and found the number lets break
                    if(optNum != -1) {
                        break;
                    }


                    
                }
            }
        }

        if(optNum == -1) {
            //debugger;
        }

        return optNum;
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

        //if we end up having no avilable numbers lets try to go
        //back row wise and see which number in this row could 
        //have been placed here
        let new_val = -1
        if(avlbl_nums.length == 0) {
            new_val = this.backtrackOptimization(row_no, col_no, row_nums, col_nums, sub_matrix_nums)
        } else {
            avlbl_nums = suffle(avlbl_nums)
            new_val = avlbl_nums.shift();
        }

        if(new_val == -1) {
            //debugger;
            //this.BLANK_CELL_PLACEHOLDER
        }
        return new_val;
    }
    
    /*
     * Takes a matrix and fill its diagonal submatrix(s) with 
     * unique numbers from 1-9
     * 
     */
    fillDiagonalSubMatrix (matrixToPopulate, valuesToPopulate) {
        let matrix = matrixToPopulate;
        if(!matrix) {
            return
        }
        let row_base = 0, col_base = 0, counter = 1;
        // we now we have 3 diagonal matrix so we will do the process
        // 3 times for 3 differen 3 x 3 matrix
        while (counter <= 3) {
            let num_arr = suffle([...valuesToPopulate])
            for(let row = row_base; row < (row_base+3); row++) {
                for(let col = col_base; col < (col_base+3); col++) {
                    let val = num_arr.shift()
                    matrix[row][col] = val
                }
            }
            row_base += 3;
            col_base += 3;
            counter++
        }

        return matrix;
    }

    populateRemainingCells (sourceMatrix) {
        //make a copy of the sourceMatrix
        let matrix = [...sourceMatrix]
        let numFound = true // we expect in most of the cases we will found it
        for(let r = 0; r < 9; r++) {
            for(let c = 0; c < 9; c++) {
                let val = this.matrix[r][c];
                //if the cell does not have any valid value
                if(!this.VALUE_ARR.includes(val)) {
                    let correctNum = this.getCorrectNum(r, c);
                    if(!this.VALUE_ARR.includes(correctNum)) {
                        console.log("terminating ..."+ correctNum)
                        //if correctNum is not an acceptable value 
                        // we have failed to get a correct number
                        numFound = false;
                        //empty the current matrix
                        matrix = []
                        break
                    }
                    this.matrix[r][c] = correctNum;
                }
            }
            //break the outer loop as well
            if(!numFound) {
                break
            }
        }

        //if for any cells we could not find a suitable number we return an empty 
        //matrix
        return matrix

        // if(numFound) {
        //     this.max_try ++
        //     console.log(this.max_try+ " Attempting again . . .")
        //     this.generate()
        //     //if(this.max_try > 0) {
        //     //    setTimeout(() => {
        //     //        this.generate()
        //     //    }, 10)
        //     //}
        //     //else{
        //     //    alert(`Sorry! We could not generate even after ${this.max_try} attempts`)
        //    // }

        // } else {
        //     this.cb();
        // }
    }

    /*
     * Creates a matrix of number (defaults to 9) abd fill with 
     * placeholder value .And returns it
     * Default matrix will be of length 9 x 9 with value 0
     */
    createMatrix (matrixLength, value) {
        let matrix = [];
        let placeholder_val = Number.isInteger(value) ? value : this.BLANK_CELL_PLACEHOLDER;
        let length = Number.isInteger(matrixLength) ? matrixLength : 9;

        for(let r = 0; r < length; r++) {
            matrix[r] = []
            for(let c = 0; c < length; c++) {
                matrix[r][c] = placeholder_val
            }
        }
        return matrix;
    }

    generate (callback) {
        this.matrix = this.createMatrix();
        
        this.matrix = this.fillDiagonalSubMatrix(this.matrix, this.VALUE_ARR)
        
        let context = this
        debugger;
        const prom1 = new Promise((resolve, reject) => {
            console.log("PROMISE INVOKED!!")
           let matrix = context.populateRemainingCells(context.matrix)

            if(matrix.length > 0) {
                resolve(matrix)
            }else {
                reject(new Error("Could not generate board"))
            }
        })

        prom1.then(matrix => {
            callback(matrix)
        })
        .catch(err => {
            
            console.log(attempt, err.message)
            if (attempt <= 1000) {
                context.generate()
                attempt++
            }
            
        })
    }

    getCellValue (row_no, col_nom) {
        if(!this.matrix[row_no]) {
           // debugger;
        }
        
        let num = this.matrix[row_no][col_nom]
        return num
    }
}

export default SodukuGenerator;