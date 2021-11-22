const fs = require('fs');
const path = require('path');

let prjId = new URLSearchParams(window.location.search).get('prjId')


let rawdata = fs.readFileSync(path.join(__dirname, '/configs/projects.json'));
let projects = JSON.parse(rawdata);
document.getElementById('title').innerHTML = projects[prjId]['name'].toString()