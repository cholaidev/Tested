import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from "react/cjs/react.development"
import Select from '@mui/material/Select';

function TableRows({rowsData, deleteTableRows, handleChange}) {
  
   
      
    console.log('row',rowsData)
    const top100Films = [
        {id:1, item: 'apple', year: 1994 },
        {id:2, item: 'samsung', year: 1972 },
        { id:3,item: 'nokia', year: 1974 },
        { id:4,item: 'apple', year: 2008 },]
    return(
        
        rowsData.map((data, val)=>{
            const {item, quantity, rate,amount}= data;
            return(
                
                <tr key={val}>
                <td>
                <Autocomplete
                getOptionLabel={option => option.item ? option.item : ""}
                //name="item"
                disablePortal
                id="combo-box-demo"
                value={item} 
                onChange={(evnt)=>{(handleChange(val, evnt))
                       console.log('handleChange',handleChange)}
                }
            //    onChange={(e, itemValue) => {
            //     console.log('itemValue', itemValue)
            //     const labels = itemValue.label
            //     console.log('labels',labels)
            //     setRowsData(rowsData=>({
            //         ...rowsData,item:labels

            //     }))
                 //setFieldValue("items", itemValue || "")
                // }}
                options={top100Films}
                  sx={{ width: 300 }}
                 renderInput={(params) => <TextField value={item}  {...params} name="item" label="item" />}
/>
</td>
                <td><input type="quantity" value={quantity}  onChange={(evnt)=>(handleChange(val, evnt))} name="quantity" className="form-control"/> </td>
                <td><input type="rate" value={rate}  onChange={(evnt)=>(handleChange(val, evnt))} name="rate" className="form-control" /> </td>
                <td><input type="amount" value={amount}  onChange={(evnt)=>(handleChange(val, evnt))} name="amount" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={()=>(deleteTableRows(val))}>x</button></td>
            </tr>
            )
        })
   
    )
    
}
export default TableRows;