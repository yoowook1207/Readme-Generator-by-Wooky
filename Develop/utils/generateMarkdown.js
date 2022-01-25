// 'Existing projects and communities', 'MIT License', 'GNU GPL v3.0'
// Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadge = license => {
  if (!license) {
    return '';
  }
  else if (license == 'Existing projects and communities') {
    return `![alt text](https://img.shields.io/static/v1?label=LICENSE&message=Existing_Projects_and_Communities&color=yellow)`
  }
  else if (license == 'MIT License') {
    return `![alt text](https://img.shields.io/static/v1?label=LICENSE&message=MIT_License&color=blue)`
  }
  else if (license == 'GNU GPL v3.0') {
    return `![alt text](https://img.shields.io/static/v1?label=LICENSE&message=GNU_GPL_v3.0&color=green)`
  }
}
// Create a function that returns the license link
// If there is no license, return an empty string
const renderLicenseLink = license => {
  if (!license) {
    return '';
  }
  else if (license == 'Existing projects and communities') {
    return `<br />https://choosealicense.com/community/`
  }
  else if (license == 'MIT License') {
    return `<br />https://choosealicense.com/licenses/mit/`
  }
  else if (license == 'GNU GPL v3.0') {
    return `<br />https://choosealicense.com/licenses/gpl-3.0/`
  }
}

// Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (!license) {
    return '';
  }
  return`
  ## License
  ${license}
  ${renderLicenseLink(license)}
  `
}

function renderLicenseNav(license) {
  if(!license) {
    return ''
  }
  return`* [License](#license)`
}

// Create a function to generate markdown for README
module.exports = fromUserData => {
  const {license, ...data} = fromUserData
  return `
  # ${data.projectName}

  ${renderLicenseBadge(license)}

  ## Description
  
  ${data.link}<br />
  ${data.description}

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  ${renderLicenseNav(license)}
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ## Installation

  ${data.installation}

  ## Usage
  ![alt text](${data.screenshot})<br />
  ${data.instructions}

  ${renderLicenseSection(license)}

  ## Contributing

  ${data.contributor}

  ## Tests

  ${data.demonstration}

  ## Questions

  ${data.reachOut}<br />
  ${data.email}
  

  &copy; ${new Date().getFullYear()} by ${data.name} https://github.com/${data.github}
`;
}