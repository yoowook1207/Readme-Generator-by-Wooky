// Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Required)',
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your name!');
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter your GitHub username!');
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'projectName',
        message: 'Enter your Project name (Required)',
        validate: projectNameInput => {
          if (projectNameInput) {
            return true;
          } else {
            console.log('Please enter your Project name!');
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
          if (linkInput) {
            return true;
          } else {
            console.log('You need to enter a project GitHub link!');
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address (Required)',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter your email address!');
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
          if (descriptionInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Provide steps required to install the project (Required)',
        validate: installationInput => {
          if (installationInput) {
            return true;
          } else {
            console.log('You need to enter a project description!');
            return false;
          }
        }
    },
    {
        type: 'input',
        name: 'instructions',
        message: 'Provide instructions and examples for use (Required)',
        validate: instructionsInput => {
          if (instructionsInput) {
            return true;
          } else {
            console.log('You need to enter a project instructions!');
            return false;
          }
        }
    },
    {
        type: 'confirm',
        name: 'confirmScreenshot',
        message: 'Do you want to add screenshots for instructions?',
        default: true
      },
      {
        type: 'input',
        name: 'screenshot',
        message: 'Enter an URL of the screenshot from your gitHub repository.',
        when: ({ confirmScreenshot }) => confirmScreenshot
      },
    {
        type: 'checkbox',
        name: 'license',
        message: 'What license do you want to give for this project? (Check only one or nothing)',
        choices: ['Existing projects and communities', 'MIT License', 'GNU GPL v3.0']
    },
    
    {
        type: 'confirm',
        name: 'confirmContributing',
        message: 'Do you have contributors for this project?',
        default: true
      },
      {
        type: 'input',
        name: 'contributor',
        message: 'Provide some names of contributors of this project:',
        when: ({ confirmContributing }) => confirmContributing
      },
    {
        type: 'confirm',
        name: 'confirmTest',
        message: 'Would you like to provide a demonstration video on how to run the project for an "Test" section?',
        default: false
      },
      {
        type: 'input',
        name: 'demonstration',
        message: 'Enter your demonstration video URL',
        when: ({ confirmTest }) => confirmTest
      },
      {
        type: 'input',
        name: 'reachOut',
        message: 'Provide instructions how to reach out to you about this project',
        validate: contactInstruction => {
          if (contactInstruction) {
            return true;
          } else {
            console.log('You need to enter a contact instruction!');
            return false;
          }
        }
    },   
];


// Create a function to write README file
function writeToFile(fileContent) {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok:true,
                message: 'File created!'
            })
        })
    })
}

// Create a function to initialize app
const promptReadmeQ = dataReadme => {
    if (!dataReadme){
        dataReadme = [];
    }
    return inquirer.prompt(questions)
};

// Function call to initialize app
promptReadmeQ()
    .then(dataReadme => {
        return generateMarkdown(dataReadme)
    })
    .then(readmeMD => {
        return writeToFile(readmeMD);
    })
    .catch(err => {
        console.log(err)
    })