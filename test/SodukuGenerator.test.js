import {expect} from 'chai'

import sodukuGenerator from '../src/Soduku/SodukuGenerator.js'


//One valid source matrix
let str1 = "864371259325849761971265843436192587198657432257483916689734125713528694542916378";
function buildSodukuMatrix (inpustStr) {
    let arr = [...str1], matrix = [], counter = 0

    let i=0, row = [];
    while (i < arr.length) {
        if(i === 0 || i % 9 === 0) {
            matrix[counter] = row = []
            counter++
        }
        row.push(Number(arr[i]))
        i++
    }
    return matrix;
}
let solutionMatrix1 = buildSodukuMatrix(str1)

// SOME HELPER FUNCTIONS
function getTotalMatrixLength(matrix) {
  let counter = 0, len = matrix.length, len2;
  for(let r = 0; r < len; r++) {
    len2 = matrix[r].length
    for(let c = 0; c < len2; c++) {
      counter++
    }
  }
  return counter;
}

function checkValuesInMatrix (matrix, len, expectedVal) {
  let val = expectedVal, isSame = true;
  for(let r = 0; r < len; r++) {
    for(let c = 0; c < len; c++) {
      let num = matrix[r][c]
      //possible values could be array or a specific number
      if(num !== val) {
        isSame = false;
        break
      }
    }
    if(!isSame) {
      break
    }
  }
  return isSame
}

function findTargetValuesInMatrix (matrix, values = []) {
  if(!matrix || values.length == 0) {
    return
  }
  let counter = 0, len = matrix.length;
  for(let r = 0; r < len; r++) {
    for(let c = 0; c < len; c++) {
      let num = matrix[r][c]
      if(values.includes(num)) {
        counter ++
      }
    }
  }

  return counter;
}

var soduGen = new sodukuGenerator()
const unique_nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

describe("Generate Matrix", function() {
  describe("Define a matrix of 3x3 with value 1", function(){
    let matrix = soduGen.createMatrix(3, 1)
    it('Length of matrix [3x3] should be 3', function() {
      expect(matrix.length).to.equal(3)
    })
    it('Length of all indices of matrix [3x3] should be 9', function() {
      let counter = getTotalMatrixLength(matrix)
      expect(counter).to.equal(9)
    })
    it('All values of matrix [3x3] should be 1', function(){
      let isSame = checkValuesInMatrix(matrix, 3, 1)
      expect(isSame).to.equal(true)
    })  
  })

  describe("Define a matrix of 6x6 with value 2", function() {
    let matrix = soduGen.createMatrix(6, 2)
    it('Length of matrix [6x6] should be 6', function() {
      expect(matrix.length).to.equal(6)
    })
    it('Length of all indices of matrix [6x6] should be 36', function() {
      let counter = getTotalMatrixLength(matrix)
      expect(counter).to.equal(36)
    })
    it('All values of matrix [6x6] should be 2', function(){
      let isSame = checkValuesInMatrix(matrix, 6, 2)
      expect(isSame).to.equal(true)
    })
  })

  describe("Define a matrix without any argument", function() {
    let matrix = soduGen.createMatrix()
    it('Length of default matrix should be 9', function() {
      expect(matrix.length).to.equal(9)
    })
    it('Length of all indices of default matrix should be 81', function() {
      let counter = getTotalMatrixLength(matrix)
      expect(counter).to.equal(81)
    })
    it('All values of default matrix should be 0', function(){
      let isSame = checkValuesInMatrix(matrix, 9, 0)
      expect(isSame).to.equal(true)
    })
  })
})

describe("Generate diagonal Sub-matrix", function() {
  let matrix = soduGen.fillDiagonalSubMatrix(soduGen.createMatrix(), unique_nums)
  describe("For the default matrix", function() {
    it("number of positive intergers should be 27", function() {
      let count = findTargetValuesInMatrix(matrix, unique_nums)
      expect(count).to.equal(27)
    })
    it("number of default value (0) should be 54", function() {
      let count = findTargetValuesInMatrix(matrix, [0])
      expect(count).to.equal(54)
    })
  })
  
  describe("For the default matrix folliwing indices should have value", function() {
    it("Row 0 - Coloumn 0", () => expect(Number.isInteger(matrix[0][0]) && matrix[0][0] !== 0).to.be.true)
    it("Row 0 - Coloumn 1", () => expect(Number.isInteger(matrix[0][1]) && matrix[0][1] !== 0).to.be.true)
    it("Row 0 - Coloumn 2", () => expect(Number.isInteger(matrix[0][2]) && matrix[0][2] !== 0).to.be.true)

    it("Row 1 - Coloumn 0", () => expect(Number.isInteger(matrix[1][0]) && matrix[1][0] !== 0).to.be.true)
    it("Row 1 - Coloumn 1", () => expect(Number.isInteger(matrix[1][1]) && matrix[1][1] !== 0).to.be.true)
    it("Row 1 - Coloumn 2", () => expect(Number.isInteger(matrix[1][2]) && matrix[1][2] !== 0).to.be.true)

    it("Row 2 - Coloumn 0", () => expect(Number.isInteger(matrix[2][0]) && matrix[2][0] !== 0).to.be.true)
    it("Row 2 - Coloumn 1", () => expect(Number.isInteger(matrix[2][1]) && matrix[2][1] !== 0).to.be.true)
    it("Row 2 - Coloumn 2", () => expect(Number.isInteger(matrix[2][2]) && matrix[2][2] !== 0).to.be.true)

    
    it("Row 3 - Coloumn 3", () => expect(Number.isInteger(matrix[3][3]) && matrix[3][3] !== 0).to.be.true)
    it("Row 3 - Coloumn 4", () => expect(Number.isInteger(matrix[3][4]) && matrix[3][4] !== 0).to.be.true)
    it("Row 3 - Coloumn 5", () => expect(Number.isInteger(matrix[3][5]) && matrix[3][5] !== 0).to.be.true)

    it("Row 4 - Coloumn 3", () => expect(Number.isInteger(matrix[4][3]) && matrix[4][3] !== 0).to.be.true)
    it("Row 4 - Coloumn 4", () => expect(Number.isInteger(matrix[4][4]) && matrix[4][4] !== 0).to.be.true)
    it("Row 4 - Coloumn 5", () => expect(Number.isInteger(matrix[4][5]) && matrix[4][5] !== 0).to.be.true)

    it("Row 5 - Coloumn 3", () => expect(Number.isInteger(matrix[5][3]) && matrix[5][3] !== 0).to.be.true)
    it("Row 5 - Coloumn 4", () => expect(Number.isInteger(matrix[5][4]) && matrix[5][4] !== 0).to.be.true)
    it("Row 5 - Coloumn 5", () => expect(Number.isInteger(matrix[5][5]) && matrix[5][5] !== 0).to.be.true)
    


    it("Row 6 - Coloumn 6", () => expect(Number.isInteger(matrix[6][6]) && matrix[6][6] !== 0).to.be.true)
    it("Row 6 - Coloumn 7", () => expect(Number.isInteger(matrix[6][7]) && matrix[6][7] !== 0).to.be.true)
    it("Row 6 - Coloumn 8", () => expect(Number.isInteger(matrix[6][8]) && matrix[6][8] !== 0).to.be.true)

    it("Row 7 - Coloumn 6", () => expect(Number.isInteger(matrix[7][6]) && matrix[7][6] !== 0).to.be.true)
    it("Row 7 - Coloumn 7", () => expect(Number.isInteger(matrix[7][7]) && matrix[7][7] !== 0).to.be.true)
    it("Row 7 - Coloumn 8", () => expect(Number.isInteger(matrix[7][8]) && matrix[7][8] !== 0).to.be.true)

    it("Row 8 - Coloumn 6", () => expect(Number.isInteger(matrix[8][6]) && matrix[8][6] !== 0).to.be.true)
    it("Row 8 - Coloumn 7", () => expect(Number.isInteger(matrix[8][7]) && matrix[8][7] !== 0).to.be.true)
    it("Row 8 - Coloumn 8", () => expect(Number.isInteger(matrix[8][8]) && matrix[8][8] !== 0).to.be.true)
  })
})

describe("getMatrixLimit () : ", function() {
  let len = 9;
  for(let r = 0; r < len; r++) {
    for(let c = 0; c < len; c++) {
      let cord = soduGen.getMatrixLimit(r, c)
      if(r < 3) {
        if(c < 3) {
          it(`row ${r} - column ${c}`, () => expect(cord).to.eql({'m_s_r': 0, 'm_e_r': 2, 'm_s_c': 0, 'm_e_c': 2}))
        } else if (c < 6) {
          it(`row ${r} - column ${c}`, () => expect(cord).to.eql({'m_s_r': 0, 'm_e_r': 2, 'm_s_c': 3, 'm_e_c': 5}))
        } else if (c < 9) {
          it(`row ${r} - column ${c}`, () => expect(cord).to.eql({'m_s_r': 0, 'm_e_r': 2, 'm_s_c': 6, 'm_e_c': 8}))
        }
      } else if (r < 6) {
        if(c < 3) {
          it(`row ${r} - column ${c}`, () => expect(cord).to.eql({'m_s_r': 3, 'm_e_r': 5, 'm_s_c': 0, 'm_e_c': 2}))
        } else if (c < 6) {
          it(`row ${r} - column ${c}`, () => expect(cord).to.eql({'m_s_r': 3, 'm_e_r': 5, 'm_s_c': 3, 'm_e_c': 5}))
        } else if (c < 9) {
          it(`row ${r} - column ${c}`, () => expect(cord).to.eql({'m_s_r': 3, 'm_e_r': 5, 'm_s_c': 6, 'm_e_c': 8}))
        }
      } else if (r < 9) {
        if(c < 3) {
          it(`row ${r} - column ${c}`, () => expect(cord).to.eql({'m_s_r': 6, 'm_e_r': 8, 'm_s_c': 0, 'm_e_c': 2}))
        } else if (c < 6) {
          it(`row ${r} - column ${c}`, () => expect(cord).to.eql({'m_s_r': 6, 'm_e_r': 8, 'm_s_c': 3, 'm_e_c': 5}))
        } else if (c < 9) {
          it(`row ${r} - column ${c}`, () => expect(cord).to.eql({'m_s_r': 6, 'm_e_r': 8, 'm_s_c': 6, 'm_e_c': 8}))
        }
      }
    }
  }
})

describe("getNumbersInRow() ", function() {
  let len = solutionMatrix1.length
  for(let r = 0; r < len; r++) {
    let nums = solutionMatrix1[r]
    let numsToCheck = soduGen.getNumbersInRow(solutionMatrix1, r)
    it(`row ${r} - [${nums}] -> [${numsToCheck}] `, () => expect(numsToCheck).to.eql(nums))
  }
})

describe("getNumbersInColumn() ", function() {
  let len = solutionMatrix1.length, nums = []
  for(let c = 0; c < len; c++) {
    let nums = []
    for(let r = 0; r < len; r ++) {
      nums.push(solutionMatrix1[r][c])
    }
    let numsToCheck = soduGen.getNumbersInColum(solutionMatrix1, c)
    it(`column ${c} - [${nums}] -> [${numsToCheck}] `, () => expect(numsToCheck).to.eql(nums))
  }
})

describe("getNumbersInSubMatrix() ", function() {
  let len = solutionMatrix1.length;
  for(let r = 0; r < len; r++) {
    for(let c = 0; c < len; c ++) {
      if(r < 3) {
        if(c < 3) {
          let nums = soduGen.getNumbersInSubMatrix(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([8,6,4,3,2,5,9,7,1]))
        } else if (c < 6) {
          let nums = soduGen.getNumbersInSubMatrix(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([3,7,1, 8,4,9, 2,6,5]))
        } else if (c < 9) {
          let nums = soduGen.getNumbersInSubMatrix(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([2,5,9, 7,6,1, 8,4,3]))
        }
      } else if (r < 6) {
        if(c < 3) {
          let nums = soduGen.getNumbersInSubMatrix(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([4,3,6, 1,9,8, 2,5,7]))
        } else if (c < 6) {
          let nums = soduGen.getNumbersInSubMatrix(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([1,9,2, 6,5,7, 4,8,3]))
        } else if (c < 9) {
          let nums = soduGen.getNumbersInSubMatrix(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([5,8,7, 4,3,2, 9,1,6]))
        }
      } else if (r < 9) {
        if(c < 3) {
          let nums = soduGen.getNumbersInSubMatrix(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([6,8,9, 7,1,3, 5,4,2]))
        } else if (c < 6) {
          let nums = soduGen.getNumbersInSubMatrix(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([7,3,4, 5,2,8, 9,1,6]))
        } else if (c < 9) {
          let nums = soduGen.getNumbersInSubMatrix(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([1,2,5, 6,9,4, 3,7,8]))
        }
      }
    }
  }
})
