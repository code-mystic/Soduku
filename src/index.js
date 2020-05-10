import Layout from './layout/Layout.js'
import SodukuGenerator from './Soduku/SodukuGenerator.js'

import './styles/main.css'

const SODUKU_BOARD = document.getElementById("soduku-board")

var sodukuGen = new SodukuGenerator()
sodukuGen.generate()

let layout = new Layout(SODUKU_BOARD, sodukuGen)
layout.draw()