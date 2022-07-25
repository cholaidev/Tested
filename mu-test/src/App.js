import React, { useState } from "react";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
export default function App() {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
  ]
  
  const [noOfRows, setNoOfRows] = useState(1);
  return (
    <div className="app container p-5">
     
      <table class="table table-hover table-bordered p-5">
        <thead>
          <tr>
            <th scope="col">ACTIONS</th>
            <th scope="col">ITEM DETAILS</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">RATE</th>
            <th scope="col">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
        {[...Array(noOfRows)].map(( index) => {
         
              return (
                <tr>
                <th scope="row">{index}<Button onClick={() => setNoOfRows(noOfRows - 1)}><DeleteIcon/></Button></th>
                <td><Autocomplete
              multiple
              disablePortal
              id="combo-box-demo"
              options={top100Films}
               sx={{ width: 500 }}
               renderInput={(params) => <TextField {...params} label="ITEMS" />}
                /></td>
                <td>50</td>
                <td></td>
              </tr>
                );
            })}

            
            </tbody>
            </table>
            <Button  onClick={() => setNoOfRows(noOfRows + 1)}><AddIcon />Add another line</Button>
            
       </div>
  );
}