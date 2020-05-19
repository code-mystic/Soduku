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

describe("getBoxLimit () : ", function() {
  let len = 9;
  for(let r = 0; r < len; r++) {
    for(let c = 0; c < len; c++) {
      let cord = soduGen.getBoxLimit(r, c)
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

describe("getRowValues() ", function() {
  let len = solutionMatrix1.length
  for(let r = 0; r < len; r++) {
    let nums = solutionMatrix1[r]
    let numsToCheck = soduGen.getRowValues(solutionMatrix1, r)
    it(`row ${r} - [${nums}] -> [${numsToCheck}] `, () => expect(numsToCheck).to.eql(nums))
  }
})

describe("getColValues() ", function() {
  let len = solutionMatrix1.length, nums = []
  for(let c = 0; c < len; c++) {
    let nums = []
    for(let r = 0; r < len; r ++) {
      nums.push(solutionMatrix1[r][c])
    }
    let numsToCheck = soduGen.getColValues(solutionMatrix1, c)
    it(`column ${c} - [${nums}] -> [${numsToCheck}] `, () => expect(numsToCheck).to.eql(nums))
  }
})

describe("getBoxValues() ", function() {
  let len = solutionMatrix1.length;
  for(let r = 0; r < len; r++) {
    for(let c = 0; c < len; c ++) {
      if(r < 3) {
        if(c < 3) {
          let nums = soduGen.getBoxValues(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([8,6,4,3,2,5,9,7,1]))
        } else if (c < 6) {
          let nums = soduGen.getBoxValues(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([3,7,1, 8,4,9, 2,6,5]))
        } else if (c < 9) {
          let nums = soduGen.getBoxValues(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([2,5,9, 7,6,1, 8,4,3]))
        }
      } else if (r < 6) {
        if(c < 3) {
          let nums = soduGen.getBoxValues(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([4,3,6, 1,9,8, 2,5,7]))
        } else if (c < 6) {
          let nums = soduGen.getBoxValues(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([1,9,2, 6,5,7, 4,8,3]))
        } else if (c < 9) {
          let nums = soduGen.getBoxValues(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([5,8,7, 4,3,2, 9,1,6]))
        }
      } else if (r < 9) {
        if(c < 3) {
          let nums = soduGen.getBoxValues(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([6,8,9, 7,1,3, 5,4,2]))
        } else if (c < 6) {
          let nums = soduGen.getBoxValues(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([7,3,4, 5,2,8, 9,1,6]))
        } else if (c < 9) {
          let nums = soduGen.getBoxValues(solutionMatrix1, r, c, true)
          it(`row ${r} - column ${c}`, () => expect(nums).to.eql([1,2,5, 6,9,4, 3,7,8]))
        }
      }
    }
  }
})
