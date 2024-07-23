import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor() {
    // Initialize the 64x64 tables
    this.table_data = this.createEmptyTable(this.num_rows, this.num_columns);
  }

  // 2D array for Babel grid
  table_data: number[][];

  // number of rows in the table (y)
  num_rows: number = 64;
  // number of columns in the table (x)
  num_columns: number = 64;

  // HTML colour names used to fill the table cells
  // THIS MUST CONTAIN AN EVEN NUMBER
  colour_array = ["Aqua", "Blue", "Black", "Crimson", "DarkGreen", "DarkMagenta", "DarkOrchid", "GoldenRod"]

  downloadCSV(csvData: any, filename = 'data.csv') {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.click();
  
    URL.revokeObjectURL(url);
  }

  handleGenerateButtonClick() {
    this.populateBabelTable();
  }

  arrayToCSV(data: number[][]) {
    return data.map(row => row.join(',')).join('\n');
  }

  handleExportButtonClick() {
    let stencil_arrays = [];

    // add an empty array for every colour used
    for (let num = 0; num < this.colour_array.length; num++) {
      stencil_arrays[num] = this.createEmptyTable(this.num_rows, this.num_columns);
    }

    // iterate through every cell of the canvas
    for (let num = 0; num < this.colour_array.length; num++) {
      for (let row = 0; row < this.num_rows; row++) {
        for (let col = 0; col < this.num_columns; col++) {
          // if the colour of the current cell is that of the current stencil being created
          if (this.table_data[row][col] == num) {
            // specify that this should be empty space
            stencil_arrays[num][row][col] = 0;
          }
          // otherwise
          else {
            // specify that this should be stencil
            stencil_arrays[num][row][col] = 1;
          }
        }
      }
      this.downloadCSV(this.arrayToCSV(stencil_arrays[num]), 'data' + num + '.csv');
    }
  }

  // function used to colour a cell using it's number to index the colour array
  getColour(cell: number) {
    return this.colour_array[cell];
  }

  // function to assign a number to each cell (and hence a colour)
  chooseTileColour(matrix: number[][], row: number, column: number, num_colours: number): number {
    // flag used to keep iterating through the colours
    let found_number = false;
    // default colour value (will throw an error if picked)
    let chosen_number = -1;

    while (!found_number) {
      // initially assume the number is unique to the numbers adjacent
      let unique_number: Boolean = true;
      // generate a random number between 0 and 1, multiply it by the number of colours and then round down to the nearest integer
      chosen_number = Math.floor(Math.random() * num_colours)

      // if there is an adjacent cell to the left - not on the left wall
      if (column > 0) {
        // if they are the same value
        if (matrix[row][column - 1] == chosen_number) {
          unique_number = false;
        }
      }
      // if there is an adjacent cell above
      if (row > 0) {
        // if they are the same value
        if (matrix[row - 1][column] == chosen_number) {
          unique_number = false;
        }

        // if there is a column to the left (and a row above)
        if (column > 0) {
          // if the cell at the top left has the same number
          if (matrix[row - 1][column - 1] == chosen_number) {
            unique_number = false;
          }
        }

        // if there is column to the right (and a row above)
        if (column < this.num_columns - 1) {
          // if the cell at the top right has the same number
          if (matrix[row - 1][column + 1] == chosen_number) {
            unique_number = false;
          }
        }
      }

      // if the 'unique_number' flag stayed true (the adjacent cells don't have the same number)
      if (unique_number) {
        // exit the while loop
        found_number = true;
        return chosen_number;
      }
    }
    return -1;
  }

  createEmptyTable(rows: number, cols: number): number[][] {
    const table = [];
    for (let row = 0; row < rows; row++) {
      const currentRow = [];
      for (let col = 0; col < cols; col++) {
        // populate each cell with the value -1
        currentRow.push(-1);
      }
      table.push(currentRow);
    }
    return table;
  }

  // function to assign a colour to each cell of the table
  populateBabelTable() {
    for (let row = 0; row < this.num_rows; row++) {
      for (let col = 0; col < this.num_columns; col++) {
        this.table_data[row][col] = this.chooseTileColour(this.table_data, row, col, this.colour_array.length);
      }
    }
  }

  getTopLeftQuarter(matrix: number[][]): number[][] {
    const size = matrix.length / 2;
    const quarter = [];
    for (let row = 0; row < size; row++) {
      const currentRow = matrix[row].slice(0, size);
      quarter.push(currentRow);
    }
    return quarter;
  }

  rotateMatrixRight(matrix: number[][]): number[][] {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotatedMatrix: number[][] = [];
  
    for (let col = 0; col < cols; col++) {
      const newRow: number[] = [];
      for (let row = rows - 1; row >= 0; row--) {
        newRow.push(matrix[row][col]);
      }
      rotatedMatrix.push(newRow);
    }
  
    return rotatedMatrix;
  }

  ngOnInit(): void {
    this.populateBabelTable();
    //this.populateStencilTable();
  }
}
