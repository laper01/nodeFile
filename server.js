const express = require('express');
const app = express();
const multer = require('multer')
const port = 5000;
const path = require('path');
const busboy = require('connect-busboy')

const maxSize = 2097152;

function fileFilter(req, file , inst){
        var extFile = path.extname(file.originalname);
        // mime type test
        var filetypeallowed = /png/;
        var mimetype = filetypeallowed.test(file.mimetype); // return boolean
        // cek jika extension bukan png atau mimetype tidak sama dengan png
        if(extFile !== ".png" || !mimetype){
            // skip uploadnya
            return inst(new Error('Only pdfs are allowed'))
        } else {
            inst(null, true)
        }
    }
    

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const upload = multer({
    fileFilter:fileFilter, 
    storage:storage,
    limits: { fileSize: maxSize } 
})

app.get('/',(req, res)=>{
    res.send('Hello')
})

app.post('/single', upload.single('profile'), (req, res)=>{
    try{
        res.send(req.file);
    }catch(err){
        res.send(400);
    }
})

app.post('/bulk', upload.array('profiles',4),(req, res)=>{
    try {
        res.send(req.files);
    } catch(error) {
          console.log(error);
           res.send(400);
    }
})

app.listen(port,()=>{
    console.log('server listening to ', port);
})

// const upload = multer({dest:'uploads/'})
