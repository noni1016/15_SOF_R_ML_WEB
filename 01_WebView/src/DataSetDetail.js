import React, { useEffect, useState } from "react";
import Styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useWindowSize } from '@react-hook/window-size';
import { GoTrashcan } from 'react-icons/go'
import { HiSwitchHorizontal } from 'react-icons/hi'
import { IoMdAddCircle } from 'react-icons/io'

const Container = Styled.div`
    margin: 50px;
`;

const Title = Styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const TopImageBox = Styled.div`
    display: flex;
`;
const TopImage = Styled.div`
    flex: 1;
`;

const Table = Styled.table`
    width: 70%;
    margin: 5px;
    border-collapse: collapse;
    display: table;
    box-sizing: border-box;
    border-spacing: 2px;
    border-color: black;
    font-size: 18px;
    color: black;
`;

const TableHead = Styled.thead`
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
    border-bottom: 2px solid black;
`;

const TableBody = Styled.tbody`
    display: table-row-group;
    vertical-align: middle;
    border-color: black;
    width: 100%;
`;

const TableRow = Styled.tr`
    display: table-row;
    vertical-align: inherit;
    border: ${props => {
        if (props.tp == 1) {
            return '2px solid blue;'
        } else if (props.tp == 0) {
            return '2px solid red;'
        } else {
            return '2px solid gray;'
        }
    }}

    &:active,
    &:hover,
    &:focus {
        background-color: ${props => {
        if (props.tp == 1) {
            return 'rgba(0, 0, 255, 0.1);'
        } else if (props.tp == 0) {
            return 'rgba(255, 0, 0, 0.1);'
        } else {
            return 'rgba(0, 0, 0, 0.1);'
        }
    }}
    }
`;

const TableData = Styled.td`
padding: 20px 20px;
line-height: 18px;
color: black;
display: table-cell;
vertical-align: inherit;
text-align: center;
border: 1px solid grey;
`;

const TableImg = Styled.img`
width: 100%;
`;

var DbAddr = 'http://localhost:8000/';




function DataSetDetail() {
    const { dataSetId } = useParams();
    const [dataSet, SetDataSet] = useState([]);
    const [dataSetArr, SetDataSetArr] = useState([]);
    const [fileList, SetFileList] = useState([]);
    const [title, SetTitle] = useState('');
    const [dataSetImgUrl, SetDataSetImgUrl] = useState('');
    const [icpImageUrl, SetIcpImageUrl] = useState('');
    const [width, height] = useWindowSize();

    function OnClickSwitchBtn(index) {
        let tp = 0;
        if (dataSetArr[dataSetId][index].TP > 1) {
            alert('먼저 데이터를 추가하세요');
            return;
        } else if (dataSetArr[dataSetId][index].TP == 1) {
            tp = 0;
        } else if (dataSetArr[dataSetId][index].TP == 0) {
            tp = 1;
        }

        fetch(DbAddr + `DataSet/${dataSetId}/${index}/${dataSetArr[dataSetId][index].Id}/${tp}`, {
            method: `PUT`,
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then(res => { SetDataSet(res.DataSet); SetDataSetArr(res.DataSetArr); })
    }

    function OnClickTrashBtn(index) {
        let tp = 0;
        if (dataSetArr[dataSetId][index].TP > 1) {
            alert('이미 사용하지 않는 데이터입니다.');
            return;
        } else {
            tp = 2;
        }

        fetch(DbAddr + `DataSet/${dataSetId}/${index}/${dataSetArr[dataSetId][index].Id}/${tp}`, {
            method: `PUT`,
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then(res => { SetDataSet(res.DataSet); SetDataSetArr(res.DataSetArr); })
    }

    function OnClickAddBtn(index) {
        let tp = 2;
        if (dataSetArr[dataSetId][index].TP <= 1) {
            alert('이미 추가된 데이터입니다.');
            return;
        } else {
            tp = 0;
        }

        fetch(DbAddr + `DataSet/${dataSetId}/${index}/${dataSetArr[dataSetId][index].Id}/${tp}`, {
            method: `PUT`,
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => res.json()).then(res => { SetDataSet(res.DataSet); SetDataSetArr(res.DataSetArr); })
    }

    function Content({ data, index, fileName }) {
        return (
            <TableRow key={index} tp={data.TP} >
                <TableData>{data.Id}</TableData>
                <TableData><TableImg src={DbAddr + `Resource/${fileName}/${data.Id}.png`} /></TableData >
                <TableData><TableImg src={DbAddr + `Resource/${fileName}/${data.Id}_Pos.png`} /></TableData >
                {/* <TableData>{data.Feature.AvgMotionScore}</TableData>
                <TableData>{data.Feature.NumOfHighScorePntInBox}</TableData> */}
                <TableData>
                    <HiSwitchHorizontal style={{ cursor: 'pointer' }} size="50" onClick={() => OnClickSwitchBtn(index)} />
                    <br/>
                    <br/>
                    {(data.TP <= 1) && <GoTrashcan style={{ cursor: 'pointer' }} size="20" onClick={() => OnClickTrashBtn(index)} />}
                    {(data.TP > 1) && <IoMdAddCircle style={{ cursor: 'pointer' }} size="20" onClick={() => OnClickAddBtn(index)} />}
                </TableData>
            </TableRow >
        )
    }


    useEffect(() => {
        fetch(DbAddr + 'DataSet').then((res) => res.json()).then(res => SetDataSet(res));
        fetch(DbAddr + 'DataSetArr').then((res) => res.json()).then(res => SetDataSetArr(res));
        fetch(DbAddr + 'FileList').then((res) => res.json()).then(res => SetFileList(res));
    }, [])

    useEffect(() => {
        if (dataSetId == fileList.length) {
            SetTitle('All Data');
        } else {
            SetTitle(fileList[dataSetId]);
            SetDataSetImgUrl(DbAddr + `Resource/${fileList[dataSetId]}/DataSet.png`);
            SetIcpImageUrl(DbAddr + `Resource/${fileList[dataSetId]}/ICP.png`);
        }
    }, [fileList])

    return (
        <Container>
            <Title>{title}</Title>

            <TopImageBox>
                <TopImage>
                    <img src={icpImageUrl} width={width / 2} />
                </TopImage>
                <TopImage>
                    <img src={dataSetImgUrl} width={width / 2} />
                </TopImage>
            </TopImageBox>
            <Title>Datas</Title>
            <Table>
                <TableHead>
                    <th>Handle</th>
                    <th>ID</th>
                    <th>Contour</th>
                    {/* <th>static score</th>
                    <th>NumOfHighScorePntInBox</th> */}
                </TableHead>
                <TableBody>
                    {dataSetArr[dataSetId] && dataSetArr[dataSetId].map((v, i) => (<Content data={v} index={i} fileName={fileList[dataSetId]} />))}
                </TableBody>
            </Table>

        </Container>
    )
};

export default DataSetDetail;