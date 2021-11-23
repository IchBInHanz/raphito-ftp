const fse = require('fs-extra');
const archiver = require('archiver');
const rimraf = require("rimraf");

const readline = require('readline');
const {google} = require('googleapis');

document.getElementById('push').addEventListener('click', () => {
    push()
})


async function push() {
    document.getElementById('push').innerText = '...'
    const srcDir = projects[prjId]['localPath']+'/';
    const destDir = path.join(__dirname, '/data/tmp/'+prjId+'/');
    await fse.copy(srcDir, destDir, { overwrite: true }, async (err) => {
        if (err) {
            alert(err)
        } else {
            alert("success!");
            var output = await fs.createWriteStream(__dirname + '/data/tmp/'+prjId+'.zip');
            var archive = await archiver('zip');
            archive.pipe(output);
            archive.directory(destDir, false);
            await archive.finalize();
            await rimraf(destDir, () => { alert("done"); });
        }
    });
    // await drive()
    document.getElementById('push').innerText = 'Pushed!'
    return
}