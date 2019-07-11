#!/usr/bin/env node
const fs = require('fs');
const cmdNode = require('node-cmd');
const open = require('open')
const args = process.argv.slice(2);
const projectsFolder = '/home/sean/projects';
const chalk = require('chalk')
const dim = chalk.dim

let pkg = '';
var path = '';

if(args.length == 1){
    pkg = args[0]
}else{
    console.log("show help")
    process.exit(0);
}

path = projectsFolder + '/' + pkg + "_example"
if (!fs.existsSync(path)){
    log('CREATE ' + dim(path))
    fs.mkdirSync(path)
}

let fileData = `const ${pkg} = require('${pkg}');`

log('CREATE ' + dim(path + "/" + 'index.js'))
fs.writeFileSync(path + "/" + 'index.js',fileData)
log("NPM INIT -Y")
cmdNode.get(
    `cd ${path}
    npm init -y
    `,
    function(err,data,stderr){
        console.log(dim(data))
        log('NPM INSTALL --SAVE ' + dim(pkg.toUpperCase()))
        cmdNode.get(`cd ${path}
                    npm install --save ${pkg}
                    `,
                    function(err,data,stderr){
                        console.log(dim(data))
                        log("OPEN CODE .")
                        open(`${path}`,{app: 'code'})
            })
    })

function log(txt){
    console.log(txt)
}


const usage = function() {
  const usageText = `
  scratch sets up an en

  usage:
    scratch <package-name>
`
  console.log(usageText)
}