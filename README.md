STUD-DEV
========

JIRA Asana Integration Project

### Installing

- Get Node.js - [here](https://nodejs.org)

- `$ -> git clone https://github.com/CPetrunik/JIRANA.git`

- `$ -> cd JIRANA`

- `$ -> npm install`

- `$ -> npm run build`

- Open `chrome://extensions` in Google Chrome

- Check the "Developer Mode" Checkbox

- Click "Load Unpacked Extension..."

- Choose `PATH_TO_JIRANA/bld`

### Developer Commands

**`npm start`**  
will listen to changes in the `src` folder and auto build appropriate parts of the app when changes occur.

**`npm run build`**  
will clean the `bld` folder and build the entire app

**`npm run clean`**  
will clean the `bld` and `tmp` folders

**`npm test `**  
will run the test suite