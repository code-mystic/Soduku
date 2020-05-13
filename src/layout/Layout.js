

function createElem (type = "div", attr_list = []) {
    let row_elem = document.createElement(type)

    if (attr_list.length > 0) {
        attr_list.forEach(attr => {
            let prop = row_elem.setAttribute(attr.type, attr.value)
        });
    }
    
    return row_elem
}

function appendChild(parent, child) {
    parent.appendChild(child)
}


class Layout {

    constructor(container, generator) {
        this.container = container;
        this.generator = generator;
    }

    // Draw function creates the soduku layout. It 
    // traverses left to right and then move to the next line
    // if no values are provided, it creates a blank (9x9)
    // diagram
    //
    // cell_values : The values which has to be plotted
    draw (cell_values = []) {
        const ROW_NO = 8, COL_NO = 8;
        for(let r = 0; r <= ROW_NO; r++) { //0 indexing
            let row_class_name = "row";
            if (r == 0) {
                // for the top row we need a thick top border
                row_class_name += " top_row"
            } else if((r+1) % 3 === 0) {
                //for every third row we need a thick bottom border
                row_class_name += " row_divider"
            }
            //create the rows & add to the board
            let row_attrs = [
                {type: 'id', value: `row_${r}`},
                {type: 'class', value: row_class_name}
            ]
            let row_cont = createElem('div', row_attrs)
            appendChild(this.container, row_cont)
            //create the cells inside the rows
            for(let c = 0; c <= COL_NO; c++) {
                let cell_class_name = "cell cell-text";
                if (c == 0) {
                    //for the left most cells we need a thick left border
                    cell_class_name += " left-cell"
                } else if((c+1) % 3 === 0) {
                    //for every third cell we need a thick right border
                    cell_class_name += " cell_right"
                }
                let cell_attr = [
                    {type: 'id', value: `cell_${r}_${c}`},
                    {type: 'class', value: cell_class_name}
                ]
                //create the cells with the styles
                let cell = createElem('div', cell_attr)
                //add the text inside the cell
                //let text = createElem('p', [{type: 'class', value: 'cell-text'}])
                // let val = this.generator.getCellValue(r, c);
                setTimeout(() => {
                    let val = this.generator.getCellValue(r, c);
                    if (val) {
                        cell.innerHTML = val
                    } else {
                        //@todo: we need to make the empty cell white, but the folliwng code
                        // somehow hides the border of the row-divider class
                        //cell.classList.add('empty-cell')
                    }
                }, 1000)
                
                
                //append the text and the cell
                //appendChild(cell, text)
                appendChild(row_cont, cell)
            }
        }
    }
}

export default Layout