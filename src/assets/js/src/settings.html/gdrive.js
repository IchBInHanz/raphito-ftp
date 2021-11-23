const fs = require('fs');
const { google } = require('googleapis');

const SCOPES = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.install',
    'https://www.googleapis.com/auth/drive.apps.readonly',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.activity',
    'https://www.googleapis.com/auth/drive.activity.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.scripts'
];
const TOKEN_PATH = __dirname + '/configs/gdrive_token.json';
const CLIENT_SECRET_PATH = __dirname + '/configs/client_secret_raphito-ftp.apps.googleusercontent.com.json'


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementById('connect-gdrive').addEventListener('click', () => {
    getAccessToken()
})


function getAccessToken() {
    fs.readFile(CLIENT_SECRET_PATH, (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        var credentials = JSON.parse(content)
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        document.getElementById('gdrive-authurl').href = authUrl;
        document.getElementById('gdrive-authurl-copy').value = authUrl
        document.getElementById('gdrive-token-modal').style.display = "block";
        document.getElementById('gdrive-send-token').addEventListener('click', () => {
            document.getElementById('gdrive-send-token').innerText = '...'
            var code = document.getElementById('gdrive-token').value
            oAuth2Client.getToken(code, async (err, token) => {
                if (err) {
                    console.error('Error retrieving access token', err)
                    document.getElementById('gdrive-send-token').style.backgroundColor = 'var(--red-btn)'
                    document.getElementById('gdrive-send-token').innerText = 'Error!'
                    await sleep(2000)
                    document.getElementById('gdrive-token-modal').style.display = "none";

                } else {
                    oAuth2Client.setCredentials(token);
                    fs.writeFile(TOKEN_PATH, JSON.stringify(token), async (err) => {
                        if (err) return console.error(err);
                        document.getElementById('gdrive-send-token').style.backgroundColor = 'var(--green-btn)'
                        document.getElementById('gdrive-send-token').innerText = 'Success!'
                        await sleep(2000)
                        document.getElementById('gdrive-token-modal').style.display = "none";
                    });
                }
            });
        })
    });
}


// function gdrive() {
//     fs.readFile(__dirname + '/configs/client_secret_raphito-ftp.apps.googleusercontent.com.json', (err, content) => {
//         if (err) return console.log('Error loading client secret file:', err);
//         authorize(JSON.parse(content), listFiles);
//     });

//     function authorize(credentials, callback) {
//         const {client_secret, client_id, redirect_uris} = credentials.installed;
//         const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

//         fs.readFile(TOKEN_PATH, (err, token) => {
//             if (err) return getAccessToken(oAuth2Client, callback);
//             oAuth2Client.setCredentials(JSON.parse(token));
//             callback(oAuth2Client);
//         });
//     }

//     function listFiles(auth) {
//         const drive = google.drive({version: 'v3', auth});
//         drive.files.list({
//             pageSize: 100,
//             fields: 'nextPageToken, files(id, name)',
//         }, (err, res) => {
//             if (err) return console.log('The API returned an error: ' + err);
//             const files = res.data.files;
//             if (files.length) {
//                 console.log('Files:');
//                 files.map((file) => {
//                     console.log(`${file.name} (${file.id})`);
//                 });
//             } else {
//                 console.log('No files found.');
//             }
//         });
//     }
// }