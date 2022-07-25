import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';





const rows = [
    
        { label: 'samsung', quantity: 10,rate:10000,amount:10000 },
    { label: 'redmi', quantity: 11,rate:20000,amount:30000 },
    { label: 'apple', quantity: 112,rate:110000,amount:110000 },
        
  
       
  
];

const top100Films = [
    { label: 'samsung', quantity: 10,rate:10000,amount:10000 },
    { label: 'redmi', quantity: 11,rate:20000,amount:30000 },
    { label: 'apple', quantity: 112,rate:110000,amount:110000 },
  ]

export default function BasicTable() {



    const [rowsData, setRowsData] = useState([]);
 
    const addTableRows = ()=>{
  
        const rowsInput={
            items:"",
            quantity:"",
            rate:"",
            amount:"",
            sub_total:"",
        } 
        setRowsData([...rowsData, rowsInput])
      
    }
    const handleChange = (index, evnt)=>{
    
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
      
     
     
    }
   const addRow=()=>{
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ITEMS</TableCell>
                <TableCell align="right">QUANTITY</TableCell>
                <TableCell align="right">RATE</TableCell>
                <TableCell align="right">AMOUNT</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {  <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          onChange={(evnt)=>(handleChange(index, evnt))}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />}
                  </TableCell>
                  <TableCell align="right">{<TextField name="quantity"id="outlined-basic"  onChange={(evnt)=>(handleChange(index, evnt))}  type='number' label="." variant="outlined" />}</TableCell>
                  <TableCell align="right">{<TextField name="rate" id="outlined-basic"  onChange={(evnt)=>(handleChange(index, evnt))} label="." variant="outlined" />}</TableCell>
                  <TableCell align="right">{<TextField name="amount" id="outlined-basic"  onChange={(evnt)=>(handleChange(index, evnt))} label="." variant="outlined" />}</TableCell>
                  
                </TableRow>
              ))}
             <Button className="btn btn-outline-success" onClick={addTableRows} >+</Button>
            </TableBody>
          </Table>
          <Grid>
          {/* <Button  onClick={() => {setRows(rows + 1)
           console.log('setNumberofrows',setRows)}}><AddIcon />Add another line</Button> */}
            </Grid>
        
        </TableContainer>
       
      );
      }

    //const[rows,setRows]= useState(3);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ITEMS</TableCell>
            <TableCell align="right">QUANTITY</TableCell>
            <TableCell align="right">RATE</TableCell>
            <TableCell align="right">AMOUNT</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {  <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />}
              </TableCell>
              <TableCell align="right">{<TextField name="quantity"id="outlined-basic"  type='number' label="." variant="outlined" />}</TableCell>
              <TableCell align="right">{<TextField name="rate" id="outlined-basic"  label="." variant="outlined" />}</TableCell>
              <TableCell align="right">{<TextField name="amount" id="outlined-basic"  label="." variant="outlined" />}</TableCell>
              
            </TableRow>
          ))}
          <button className="btn btn-outline-success" onClick={addTableRows} >+</button>
        </TableBody>
      </Table>
      <Grid>
      {/* <Button  onClick={() => {setRows(rows + 1)
       console.log('setNumberofrows',setRows)}}><AddIcon />Add another line</Button> */}
        </Grid>
    
    </TableContainer>
   
  );
}
