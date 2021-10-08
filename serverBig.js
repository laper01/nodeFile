const express = require('express');
const app = express();
const port = 5000;
const busboy = require('connect-busboy');
const fs = require('fs-extra');
const path = require('path');  

app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer    
}))

const uploadPath = path.join(__dirname, 'fu/');
fs.ensureDir(uploadPath);

app.get('/',(req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="upload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="fileToUpload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
})
// upload
app.post('/upload',(req, res, next)=>{
    req.pipe(req.busboy);

    req.busboy.on('file', (fieldName, file, filename)=>{
        console.log(`upload of ${filename} started`);
        const fsstream = fs.createWriteStream(path.join(uploadPath,filename));
        
        file.pipe(fsstream);

        fsstream.on('close',()=>{
            console.log(`upload of ${filename} finish`);
            res.redirect('back');
        })
    })
})
app.listen(port,()=>{
    console.log('server listening to ', port);
})