import Layout from './layout/Layout.js'
import SodukuGenerator from './Soduku/SodukuGenerator.js'

import './styles/main.css'

const SODUKU_BOARD = document.getElementById("soduku-board");
let layout = "ola!";

var sodukuGen = new SodukuGenerator(() => {
    console.log("BOARD GENERATED !!")
    layout = new Layout(SODUKU_BOARD, sodukuGen)
    layout.draw()
})
sodukuGen.generate()


