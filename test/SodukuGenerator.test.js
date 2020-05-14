import {expect} from 'chai'

import sodukuGenerator from '../src/Soduku/SodukuGenerator.js'

var soduGen = new sodukuGenerator()
soduGen.generate()

describe('BASIC TESTS', function(){
  describe("Length of values", function(){
      it('number of values should be 9', function() {
          expect(soduGen.VALUE_ARR.length).to.equal(9)
      })
  })
})

//var sodukuGenerator = require('../src/Soduku/SodukuGenerator.js')

/*import sodukuGenerator from '../src/Soduku/SodukuGenerator.js'

var soduGen = new SodulkuGenerator()

describe('BASIC TESTS', function(){
    describe("Length of total Matrix", function(){
        it('Length of total matrix should be 9x9 = 81', function() {
            expect(soduGen.matrix.length).to.equal(81)
        })
    })
})*/

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


/*var assert = require('assert');


var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };


expect(foo).to.equal('bar');
expect(foo).to.have.lengthOf(3);
expect(beverages).to.have.property('tea').with.lengthOf(3);

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe('CHAI EXPECT', function() {
    it('IS FOO A STRING', function() {
        expect(foo).to.be.a('string');
    });
  });
});*/

