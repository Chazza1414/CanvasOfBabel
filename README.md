# BabelArt

This is a private project that generates a Canvas of Babel and the CSV files for stencils that can be used to paint it.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## Running the Project:

To run the project you will need (to do) the following:

### Download the Project:

Create a folder locally that will contain the project

#### Using GIT desktop/command line:

- Follow instructions to install GIT
- Clone the project using either HTTPS/SSH/CLI using the links under the green 'Code' button

#### Download the .zip file for the project:

- Click the 'Download ZIP' button from the GitHub Repo page, under the green 'Code' button
- Save to the folder create for the project
- Extract the ZIP file

### Install Node and Node Package Manager (NPM):

Node is a JavaScript runtime environment used for web development
NPM is a package/library/module manager/installer allowing for the use of fundamental packages such as Angular (the web front end)

Installing Node by default installs NPM
Note: Both are open source

You should download the versions most similar to mine which should just be v20.15.1 (the Long-Term Support one)

Follow instructions to install (v20.15.1):

https://nodejs.org/en/download/package-manager

I'm assuming you have Visual Studio Code already, if not download it here - https://code.visualstudio.com/download

Open the folder containing the (extracted) project in VS Code and open a new terminal (if one isn't opened by default) by clicking on: Terminal -> New Terminal

#### Verify Node and NPM Installations:

- In the terminal type: 'npm -v', this should return the version number of the NPM installation
- In the terminal type: 'node -v', this should return the version number of the Node installation

Note: This will require a restart of VS Code if the terminal was opened before the Node and NPM installations

### Prepare the Development Environment:

- In the terminal run 'npm install'
- Wait for this to finish (could be a few mins)

This will install all the packages I have used for development allowing you to run the project

### Open the Web Page:

- Type 'npm start' in the terminal
- Wait for this to run, it should open the Babel page in your browser - if it doesn't, go to the URL: [http](http://localhost:4200/)


## Using the Project:

Instructions on how to use each feature and adapt the code to fit your needs

### Generate Button:

Each click of this will regenerate the Babel Canvas

### Export Button:

Clicking this (once) will download and prompt you to save the CSV files for each stencil (again, i can't be 100% sure that this works correctly)

### Changing the Colours:

The colours used are HTML colours - here is a good page to choose from: https://www.w3schools.com/tags/ref_colornames.asp
Alternatively, I think hexadecimal colour values (e.g. #ABCDEF) should work?

- Open the file src -> app -> app.component.ts
- Add or remove values from the 'colour_array' ensuring proper syntax (commas, quotes and brackets)
- If the webpage is already running then simply saving should update the page and reload it

### Changing the number of cells:

Follow steps above to change the colours but instead change the variables:

- 'num_rows' - for the number of rows
- 'num_columns' - for the number of columns

## Getting Help

Ring your nephew!
