import React, { useEffect, useState } from "react";
import Styled from 'styled-components';

const Container = Styled.div`
    position: relative;
    margin: 50px;
`;

const Title = Styled.div`
  font-size: 30px;
  font-weight: bold;
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

    background-color: ${props => {
        if (props.tp == 1) {
            return 'rgba(0, 0, 255, 0.1);'
        } else if (props.tp == 0) {
            return 'rgba(255, 0, 0, 0.1);'
        } else {
            return 'rgba(0, 0, 0, 0.1);'
        }
    }}
`;

const TableData = Styled.td`
padding: 20px 20px;
line-height: 18px;
color: black;
display: table-cell;
vertical-align: middle;
text-align: center;
border: 1px solid grey;
`;

const TableImg = Styled.img`
width: 100%;
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

var DbAddr = 'http://localhost:8000/';

const TestResult = () => {

    const [testDataSet, SetTestDataSet] = useState([]);

    const Content = ({data, index}) => {
        return(
            <TableRow key={index} tp={data.TP==data.Predict}>
                <TableData>{index}</TableData>
                <TableData>{data.FolderName}</TableData>
                <TableData>{data.Id}</TableData>
                <TableData>{data.TP}</TableData>
                <TableData><TableImg src={DbAddr + `Resource/${data.FolderName}/${data.Id}.png`}/></TableData>
                <TableData><TableImg src={DbAddr + `Resource/${data.FolderName}/${data.Id}_Pos.png`}/></TableData>
            </TableRow>
        )
    };

    useEffect(() => {
        fetch(DbAddr + 'TestDataSet').then((res) => res.json()).then(res => SetTestDataSet(res));
    }, [])

    return (
        <Container>
            <Title>ML Test Result</Title>
            <Table>
                <TableHead>
                    <th>Index</th>
                    <th>FolderName</th>
                    <th>ID</th>
                    <th>GroundTruth</th>
                    <th>Contour</th>
                    <th>Location</th>
                </TableHead>
                {testDataSet.map((v, i) => (<Content data={v} index={i} />))}

            </Table>
        </Container>
    )
};

export default TestResult;