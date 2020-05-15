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

/*
var obj = getMatrixLimit(0, 0)
console.log('0 , 2, 0, 2'+' -> '+ obj.m_s_r+', '+obj.m_e_r+', '+ obj.m_s_c+', '+ obj.m_e_c)
var obj = getMatrixLimit(1, 1)
console.log('0 , 2, 0, 2'+' -> '+ obj.m_s_r+', '+obj.m_e_r+', '+ obj.m_s_c+', '+ obj.m_e_c)
var obj = getMatrixLimit(2, 2)
console.log('0 , 2, 0, 2'+' -> '+ obj.m_s_r+', '+obj.m_e_r+', '+ obj.m_s_c+', '+ obj.m_e_c)
var obj = getMatrixLimit(3, 3)
console.log('3 , 5, 3, 5'+' -> '+ obj.m_s_r+', '+obj.m_e_r+', '+ obj.m_s_c+', '+ obj.m_e_c)
var obj = getMatrixLimit(4, 4)
console.log('3 , 5, 3, 5'+' -> '+ obj.m_s_r+', '+obj.m_e_r+', '+ obj.m_s_c+', '+ obj.m_e_c)
var obj = getMatrixLimit(5, 5)
console.log('3 , 5, 3, 5'+' -> '+ obj.m_s_r+', '+obj.m_e_r+', '+ obj.m_s_c+', '+ obj.m_e_c)
var obj = getMatrixLimit(6, 6)
console.log('6 , 8, 6, 8'+' -> '+ obj.m_s_r+', '+obj.m_e_r+', '+ obj.m_s_c+', '+ obj.m_e_c)
var obj = getMatrixLimit(7, 7)
console.log('6 , 8, 6, 8'+' -> '+ obj.m_s_r+', '+obj.m_e_r+', '+ obj.m_s_c+', '+ obj.m_e_c)
var obj = getMatrixLimit(8, 8)
console.log('6 , 8, 6, 8'+' -> '+ obj.m_s_r+', '+obj.m_e_r+', '+ obj.m_s_c+', '+ obj.m_e_c)

*/

