import React, { useEffect, useState } from "react";
import Styled from 'styled-components';
import ContentTable from './Table';
import { useNavigate } from "react-router-dom";

const Title = Styled.div`
  font-size: 30px;
  font-weight: bold;
`;

var DbAddr = 'http://localhost:8000/';

function Home() {
    const [dataSet, SetDataSet] = useState([]);
    const [dataSetArr, SetDataSetArr] = useState([]);
    const [numOfTrueData, SetNumOfTrueData] = useState([]);
    const [numOfFalseData, SetNumOfFalseData] = useState([]);
    const [numOfUnusedData, SetNumOfUnusedData] = useState([]);
    const [numOfTrueDataArr, SetNumOfTrueDataArr] = useState([]);
    const [numOfFalseDataArr, SetNumOfFalseDataArr] = useState([]);
    const [numOfUnusedDataArr, SetNumOfUnusedDataArr] = useState([]);
    const [fileList, SetFileList] = useState([]);
    const summaryHeader = ["Log_Frame", "All", "True", "False", "미사용"];
    const [summaryValue, SetSummaryValue] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(DbAddr + 'DataSet').then((res) => res.json()).then(res => SetDataSet(res));
        fetch(DbAddr + 'DataSetArr').then((res) => res.json()).then(res => SetDataSetArr(res));
        fetch(DbAddr + 'FileList').then((res) => res.json()).then(res => SetFileList(res));
    }, [])

    useEffect(() => {
        let numTrue = 0;
        let numFalse = 0;
        let numUnused = 0;
        for (var i = 0; i < dataSet.length; i++) {
            if (dataSet[i].TP == 1) {
                numTrue++;
            } else if (dataSet[i].TP == 0) {
                numFalse++;
            } else {
                numUnused++;
            }
        }
        SetNumOfTrueData(numTrue);
        SetNumOfFalseData(numFalse);
        SetNumOfUnusedData(numUnused);
    }, [dataSet])

    useEffect(() => {
        let numTrueArr = Array.from({ length: dataSetArr.length }, () => 0);
        let numFalseArr = Array.from({ length: dataSetArr.length }, () => 0);
        let numUnusedArr = Array.from({ length: dataSetArr.length }, () => 0);
        for (var i = 0; i < dataSetArr.length; i++) {
            for (var j = 0; j < dataSetArr[i].length; j++) {
                if (dataSetArr[i][j].TP == 1) {
                    numTrueArr[i]++;
                } else if (dataSetArr[i][j].TP == 0) {
                    numFalseArr[i]++;
                } else {
                    numUnusedArr[i]++;
                }
            }
        }
        SetNumOfTrueDataArr(numTrueArr);
        SetNumOfFalseDataArr(numFalseArr);
        SetNumOfUnusedDataArr(numUnusedArr);
    }, [dataSetArr])

    // 테이블로 표시할 데이터 만들기
    useEffect(() => {
        let tempSummaryValue = [];
        for (let i = 0; i < dataSetArr.length; i++) {
            tempSummaryValue.push([fileList[i], dataSetArr[i].length, numOfTrueDataArr[i], numOfFalseDataArr[i], numOfUnusedDataArr[i]]);
        }
        tempSummaryValue.push(["합계", dataSet.length, numOfTrueData, numOfFalseData, numOfUnusedData])
        SetSummaryValue(tempSummaryValue);
    }, [numOfUnusedDataArr])

    return (
        <>
            <Title onClick={() => navigate(`DataSet`)}>SOF_R ML DataSet</Title>
            전체 데이터 개수 : {dataSet.length}
            <br />
            True 데이터 : {numOfTrueData}
            <br />
            False 데이터 : {numOfFalseData}
            <br />
            미사용 데이터 : {numOfUnusedData}
            <br />
            <br />
            {dataSetArr.length} 개 프레임에서 데이터 취득
            <ContentTable header={summaryHeader} contents={summaryValue} />
        </>
    )

}

export default Home;