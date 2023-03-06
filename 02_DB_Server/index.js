const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const DatabasePath = 'D:\\01_ADDev\\99_Git\\12_SOF_R_MAT_DESIGN_TOOL\\Local\\Dev\\ML\\DataSet\\';

app.use(cors());
app.use('/Resource', express.static('D:/01_ADDev/99_Git/12_SOF_R_MAT_DESIGN_TOOL/Local/Dev/ML/DataSet'));

app.listen(port, () => {
    console.log('서버가 실행됩니다.');
})

const fs = require('fs');
var FileList = [];
var DataSetArr = [];
fs.readdir(DatabasePath, function (err, filelist) {
    console.log(filelist);

    filelist.map((v, i) => {
        if (v.search('.json') < 0) {
            FileList.push(v);
            let dataBuffer = fs.readFileSync(DatabasePath + v + '/DataSet.json');
            let dataJSON = dataBuffer.toString();
            DataSetArr.push(JSON.parse(dataJSON));
        }
    })
    console.log(FileList);
})

const dataBuffer = fs.readFileSync(DatabasePath + 'DataSet.json');
const dataJSON = dataBuffer.toString()
const DataSet = JSON.parse(dataJSON);



app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/DataSet', function (req, res) {
    res.json(DataSet);
})

app.get('/DataSetArr', (req, res) => {
    console.log(DataSetArr.length);
    res.json(DataSetArr);
})

app.get('/FileList', (req, res) => {
    res.json(FileList);
})

app.put('/DataSet/:dataSetNum/:index/:id/:class', (req, res) => {
    DataSetArr[req.params.dataSetNum][req.params.index].TP = req.params.class;
    for (let i = 0; i < DataSet.length; i++) {
        if (DataSet[i].Id == req.params.id) {
            DataSet[i].TP = req.params.class;
        }
    }
    res.json({ DataSet: DataSet, DataSetArr: DataSetArr });
})


