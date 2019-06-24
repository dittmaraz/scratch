var cmd = require('node-cmd')
const path = '/home/sean/projects'
cmd.get(
  `cd ${path}
  pwd
  `,
  function(err,data,stderr){
    console.log(data)
  })