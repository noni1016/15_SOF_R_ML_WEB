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
var DataSet;
var TestDataSet;

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/DataSet', function (req, res) {
    // dataBuffer = fs.readFileSync(DatabasePath + 'DataSet.json');
    // dataJSON = dataBuffer.toString()
    // DataSet = JSON.parse(dataJSON);
    DataSet = [];
    fs.readdir(DatabasePath, function (err, filelist) {
        filelist.map((v, i) => {
            if (v.search('.json') < 0) {
                let dataBuffer = fs.readFileSync(DatabasePath + v + '/DataSet.json');
                let dataJSON = dataBuffer.toString();
                dataObj = JSON.parse(dataJSON);
                dataObj.map((x, j) => {
                    DataSet.push(x);
                })

            }
        })
        res.json(DataSet);
    })

    // res.json(DataSet);
})

app.get('/DataSetArr', (req, res) => {
    DataSetArr = [];
    fs.readdir(DatabasePath, function (err, filelist) {
        filelist.map((v, i) => {
            if (v.search('.json') < 0) {
                let dataBuffer = fs.readFileSync(DatabasePath + v + '/DataSet.json');
                let dataJSON = dataBuffer.toString();
                DataSetArr.push(JSON.parse(dataJSON));
            }
        })
        res.json(DataSetArr);
    })
})

app.get('/FileList', (req, res) => {
    FileList = [];
    fs.readdir(DatabasePath, function (err, filelist) {    
        filelist.map((v, i) => {
            if (v.search('.json') < 0) {
                FileList.push(v);
            }
        })
        console.log(FileList);
        res.json(FileList);
    })
})

app.put('/DataSet/:dataSetNum/:index/:id/:class', (req, res) => {
    DataSetArr[req.params.dataSetNum][req.params.index].TP = Number(req.params.class);
    // for (let i = 0; i < DataSet.length; i++) {
    //     if (DataSet[i].Id == req.params.id && DataSet[i].LogInfo.LogFileName == DataSetArr[req.params.dataSetNum][req.params.index].LogInfo.LogFileName && DataSet[i].LogInfo.Frame == DataSetArr[req.params.dataSetNum][req.params.index].LogInfo.Frame) {
    //         DataSet[i].TP = Number(req.params.class);
    //     }
    // }
    // fs.writeFileSync(DatabasePath + 'DataSet.json', JSON.stringify(DataSet));
    fs.writeFileSync(DatabasePath + `${FileList[req.params.dataSetNum]}` + '/DataSet.json', JSON.stringify(DataSetArr[req.params.dataSetNum]));

    console.log('Json File Updated')

    res.json({ DataSet: DataSet, DataSetArr: DataSetArr });

})

app.get('/TestDataSet', function (req, res) {
    // dataBuffer = fs.readFileSync(DatabasePath + 'DataSet.json');
    // dataJSON = dataBuffer.toString()
    // DataSet = JSON.parse(dataJSON);
    dataBuffer = fs.readFileSync(DatabasePath + 'TestDataSet.json');
    dataJSON = dataBuffer.toString();
    TestDataSet = JSON.parse(dataJSON);

    res.json(TestDataSet);
})
