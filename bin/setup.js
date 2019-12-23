const spaceImport = require('contentful-import')
const exportFile = require('../contentful/export.json')
const inquirer = require('inquirer')
const chalk = require('chalk')
const path = require('path')
const { writeFileSync } = require('fs')

const argv = require('yargs-parser')(process.argv.slice(2))

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env

// env vars are given precedence followed by args provided to the setup
// followed by input given to prompts displayed by the setup script
spaceId = CONTENTFUL_SPACE_ID || argv.spaceId
managementToken = argv.managementToken
accessToken =
  CONTENTFUL_ACCESS_TOKEN || argv.accessToken

console.log('Writing config file...')
const configFiles = [`.env.development`, `.env.production`]
  .map(file => path.join(__dirname, '..', file))

const fileContents = [
  `# All environment variables will be sourced`,
  `# and made available to gatsby-config.js, gatsby-node.js, etc.`,
  `# Do NOT commit this file to source control`,
  `CONTENTFUL_SPACE_ID='${spaceId}'`,
  `CONTENTFUL_ACCESS_TOKEN='${accessToken}'`
].join('\n') + '\n'

configFiles.forEach(file => {
  writeFileSync(file, fileContents, 'utf8')
  console.log(`Config file ${chalk.yellow(file)} written`)
})  

