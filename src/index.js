import Layout from './layout/Layout.js'

import './styles/main.css'

const SODUKU_BOARD = document.getElementById("soduku-board")

let layout = new Layout(SODUKU_BOARD)
layout.draw()