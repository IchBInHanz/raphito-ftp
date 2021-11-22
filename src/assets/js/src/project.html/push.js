const fse = require('fs-extra');
const archiver = require('archiver');

document.getElementById('push').addEventListener('click', () => {
    push()
})


async function push() {
    alert('Push: '+prjId)
    const srcDir = projects[prjId]['localPath']+'/';
    const destDir = path.join(__dirname, '/data/tmp/'+prjId+'/');
    alert(srcDir)
    alert(destDir)
    // To copy a folder or file
    await fse.copy(srcDir, destDir, { overwrite: true }, function (err) {
        if (err) {
            alert(err)
        } else {
            alert("success!");
        }
    });
    var output = fs.createWriteStream(__dirname + '/data/tmp/'+prjId+'.zip');
    var archive = archiver('zip');
    archive.pipe(output);
    archive.directory(destDir, false);
    // archive.directory(destDir, 'new-subdir');
    archive.finalize();
    alert('Done!')
    return
}