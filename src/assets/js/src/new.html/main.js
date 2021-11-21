const dialog = require('node-file-dialog')
const fs = require('fs')
const randomstring = require("randomstring");
const path = require('path');

document.getElementById('path').addEventListener('click', () => {
    dialog({
        type: 'directory'
    })
    .then(dir => {
        document.getElementById('path').value = dir[0]
    })
    .catch(err => console.log(err))
})

document.getElementById('create').addEventListener('click', () => {
    document.getElementById('create').innerHTML = '...'
    let rawdata = fs.readFileSync(path.join(__dirname, '/configs/projects.json'));
    let projects = JSON.parse(rawdata);
    var prjId = document.getElementById('name').value + '-' + randomstring.generate({ length: 10, charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' })
    projects[prjId] = {
        id: prjId,
        name: document.getElementById('name').value,
        localPath: document.getElementById('path').value
    }
    try {
        fs.writeFileSync(path.join(__dirname, '/configs/projects.json'), JSON.stringify(projects))
        document.getElementById('create').innerHTML = 'Success!'
        document.getElementById('create').disabled = true
    } catch (err) {
        console.error(err)
    }
})