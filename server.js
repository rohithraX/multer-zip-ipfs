var express = require('express');
var multer = require('multer');
var app = express();
var zip = new require('node-zip')();
var fs = require('fs');
var path = require('path');


var IPFS = require('ipfs-api')
const ipfs = IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        var a = file.mimetype;
        console.log(a);
        //if (a == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") { cb(null, file.fieldname + '-' + Date.now() + ".xlsx") }
        //else { 
        cb(null, file.originalname);// + '-' + Date.now() )//+ file.mimetype)
        //  }
    }
});
var upload = multer({ storage: storage });



app.listen(8001, () => {
    console.log('listening on 8001');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



app.post('/file', upload.single('file', function (err) {
    if (err) {
        res.status(400).send({ error: "Could not get file in request Payload" });
    }
}), (req, res) => {
    console.log(typeof (req.file));
    //var contents = fs.readFileSync(req.file.path);
    var filepath = req.file.path;
    var fileName = req.file.fileName;

    var nameReq = 'uploads/' + req.file.originalname;
    zip.file(req.file.originalname, fs.readFileSync(path.join('uploads/', req.file.originalname)));
    var dataz = zip.generate({ base64: false, compression: 'DEFLATE' });
    console.log(nameReq);
    console.log(dataz);
    
    fs.writeFileSync('test.zip', dataz, 'binary');
    var contents = fs.readFileSync('test.zip');
    var testBuffer = new Buffer(contents);
    ipfs.files.add(testBuffer, function (err, file1) {
        if (err) {
            console.log(err);
        }
        console.log(file1)
        var fileIPFShash = file1[0].hash;
        console.log(fileIPFShash)
        //var b = { "transactionDetails": resultf1, "contents": testBuffer.toString(), "hash": fileIPFShash };

        res.send(fileIPFShash);
        //console.log(fileIPFShash)

    })
    /// console.log(req.file.originalname);
    /// var inpHash = sha(contents);
    /// var resultf1;
    /// var fileIPFShash;
    /// fs.unlinkSync(filepath);
    /// //

    //var testBuffer = new Buffer(contents);
    console.log(fileName);
    ////

    //res.send(filepath)
});

