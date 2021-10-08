const {createReadStream} = require('fs');

const stream = createReadStream('./content/big.txt',
  {highWaterMark: 90000,
    encoding:'utf8'
  });

// default buffer size 64kb

stream.on('data', (result)=>{
  console.log(result);
})

stream.on('error',(err)=>{
  console.log(err);
})

// stream server
const http = require('http');
const fs = require('fs');

http
  .createServer(function(req, res){

    const fileStream = fs.createReadStream('./content/big.txt', 'utf8');
      fileStream.on('open',()=>{
          fileStream.pipe(res)
      })
      fileStream.on('error',(err)=>{
        res.end(err);
      })
  })
  .listen(5000)