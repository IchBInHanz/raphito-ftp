var fs = require('fs');
var path = require('path');

let rawdata = fs.readFileSync(path.join(__dirname, '/configs/projects.json'));
let projects = JSON.parse(rawdata);

function openProject(prjId) {
    window.location.replace(`./project.html?prjId=${prjId}`);
}


for (const [key, value] of Object.entries(projects)) {
    var val = `
    <div class="project" onclick="openProject('${projects[key]['id']}');">
        <span id="project-name">${projects[key]['name']}</span>
    </div>
    `
    document.getElementById('projects-container').innerHTML += val;
}

