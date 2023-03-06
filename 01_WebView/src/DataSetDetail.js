import React, { useEffect, useState } from "react";
import Styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useWindowSize } from '@react-hook/window-size';

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
    border: ${props => props.isTrue ? '2px solid blue' : '2px solid red'};
    
    &:active,
    &:hover,
    &:focus {
      background-color: ${props => props.isTrue ? 'rgba(0, 0, 255, 0.1)' : 'rgba(255, 0, 0, 0.1)'};
      cursor: pointer;
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
    width: 70%;
`;

var DbAddr = 'http://localhost:8000/';

function Content({ data, index, fileName }) {
    return (
        <TableRow key={index} isTrue={data.TP}>
            <TableData>{data.Id}</TableData>
            <TableData><TableImg src={DbAddr + `Resource/${fileName}/${data.Id}.png`} /></TableData>
        </TableRow>
    )
}


function DataSetDetail() {
    const { dataSetId } = useParams();
    const [dataSet, SetDataSet] = useState([]);
    const [dataSetArr, SetDataSetArr] = useState([]);
    const [fileList, SetFileList] = useState([]);
    const [title, SetTitle] = useState('');
    const [dataSetImgUrl, SetDataSetImgUrl] = useState('');
    const [icpImageUrl, SetIcpImageUrl] = useState('');
    const [width, height] = useWindowSize();



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
        <div>
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
                    <th>ID</th>
                    <th>Image</th>
                </TableHead>
                <TableBody>
                    {dataSetArr[dataSetId].map((v, i) => (<Content data={v} index={i} fileName={fileList[dataSetId]} />))}
                </TableBody>

            </Table>

        </div>
    )
};

export default DataSetDetail;