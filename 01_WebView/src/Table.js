import React, { useEffect, useRef } from 'react';
import Styled from 'styled-components';
import { useWindowSize } from '@react-hook/window-size';
import { useNavigate } from 'react-router-dom';

const Table = Styled.table`
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
    border: 1px solid grey;
    font-weight: ${props => props.isLastContent ? 'bold' : 'normal'};
    
    &:active,
    &:hover,
    &:focus {
      background-color: skyblue;
      cursor: pointer;
    }
`;

const Th = Styled.th`
    padding: 10px 50px;
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

const Content = ({ data, index, isLastContent }) => {

    const navigate = useNavigate();

    return (
        <TableRow isLastContent={isLastContent} onClick={() => { navigate(`/DataSetDetail/${index}`) }}>

            {data.map((v, i) => { return (<TableData>{v}</TableData>) })}

        </TableRow >
    )
};

const ContentTable = ({ header, contents, onClickTableRow }) => {

    const navigate = useNavigate();

    return (
        <Table>
            <TableHead>
                {header.map((data, i) => <Th>{data}</Th>)}
            </TableHead>

            <TableBody>
                {contents.map((data, i) => {
                    return (
                        <Content data={data} index={i} isLastContent={i == (contents.length - 1)} />
                    )
                })}
            </TableBody>
        </Table>
    )

};


export default ContentTable;