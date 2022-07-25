import React from 'react';
import { Formik, Form, Field } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from "react/cjs/react.development"
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

function BasicArrayExample () {
  const [idCount, setIdCount] = useState(2)

  const top100Films = [
    { id: 1, item: 'Apple', quantity: 1994, rate: 112, amount: 1000 },
    { id: 2, item: 'Samsung', quantity: 1972, rate: 113, amount: 1000 },
    { id: 3, item: 'Redme', quantity: 1974, rate: 114, amount: 1000 },
    { id: 4, item: 'Realme', quantity: 2008, rate: 115, amount: 1000 },]
  
  const [rowsData, setRowsData] = useState([
    {
        id: 1,
        item: null,
        quantity: '',
        rate: '',
        amount: ''
    }

    //id:'',


]);
const addTableRows = () => {

  const rowsInput = {
      id: idCount,
      item: null,
      quantity: '',
      rate: '',
      amount: ''
  }
  setIdCount((count) => count + 1)
  console.log('count',idCount)
  setRowsData([...rowsData, rowsInput])
  console.log("merge", [...rowsData, rowsInput])
  console.log("rowInput", rowsInput)

}

const deleteTableRows = (index) => {
  const rows = [...rowsData];
  rows.splice(index, 1);
  setRowsData(rows);
}

const handleChange = (item, evnt) => {
  console.log("change", item)
  if (item.id) {
      let itemId = null
      for (let i = 0; i < rowsData.length; i++) {
          itemId += 1

      }
      console.log("itemId", itemId)

      // const quantity="quantity"
      const objIndex = rowsData.findIndex((obj => obj.id == itemId));
      console.log("index", objIndex)
      // rowsData[objIndex].quantity=item.quantity
      const rowsInput = [...rowsData];
      rowsInput[objIndex].item = item.item
      rowsInput[objIndex].quantity = item.quantity
      rowsInput[objIndex].rate = item.rate
      rowsInput[objIndex].amount = item.amount
      setRowsData(rowsInput);
      console.log('data', rowsInput)
  } else {

      const { name, value } = evnt.target;
      const rowsInput = [...rowsData];
      rowsInput[item][name] = value;
      setRowsData(rowsInput);
      console.log('data', rowsInput)
  }



}
// const handleChanges = (event) => {
//   const name = event.target.name;
//   const value = event.target.value;
//   setInputs(values => ({ ...values, [name]: value }))

// }
  
  return(
  <div>
    <h1>items</h1>
    <Formik
      initialValues={{
        items: [
          {
             item: '',
             quantity: '',
             rate: '',
             amount: ''
          }
            
        ],
      }
    
    }
    
      
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      <Form>
      <Grid container >

<Grid container paddingLeft={2} paddingTop={3} >
    <div className="row">
        <div className="col-sm-8">
            <table className="table">
                <thead>
                    <tr>
                        <th>item</th>
                        <th>quantity</th>
                        <th>rate</th>
                        <th>amount</th>
                        <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
                    </tr>
                </thead>
                <tbody>


                    {rowsData.map((data, index) => {
                        //console.log('arrayvalues',val)
                        const { item, quantity, rate, amount } = data;
                        console.log('item', data)
                        return (

                            <tr key={index}>
                                <td>
                                    <Autocomplete
                                        getOptionLabel={option => option.item || item}
                                        //name="item"
                                        // disablePortal
                                        id="combo-box-demo"
                                        name="items[0].item" 
                                        value={item}
                                        // onChange={(evnt)=>{(handleChange(val, evnt))
                                        //     const item = val.item
                                        //     console.log('val',item)
                                        // console.log('handleChange',handleChange)}
                                        // }
                                        onChange={(e, itemValue) => {
                                            console.log('itemValue', itemValue)
                                            const labels = itemValue.item
                                            const quantity = itemValue.quantity
                                            const rate = itemValue.rate
                                            const amount = itemValue.amount
                                            console.log('labels', labels)
                                            console.log('quantity', quantity)
                                            console.log('rate', rate)
                                            console.log('amount', amount)
                                            handleChange(itemValue)
                                            //    / setRowsData(prevState => ({
                                            //         ...prevState,
                                            //         quantity: quantity
                                            //      }));
                                            // setRowsData(values => values.map((value, i) => i === e ? item: labels,));
                                            //setFieldValue("items", itemValue || "")
                                        }}
                                        options={top100Films}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => < TextField    {...params} label="item" />}
                                    />
                                </td>
                                <td><input type="number" value={quantity}
                                    onChange={(evnt) => (handleChange(index, evnt))}
                                    name="items[0].quantity" className="form-control" /> </td>
                                <td><input type="number" value={rate} onChange={(evnt) => (handleChange(index, evnt))} name="rate" className="form-control" /> </td>
                                <td><input type="number" value={amount} onChange={(evnt) => (handleChange(index, evnt))} name="amount" className="form-control" /> </td>
                                <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button></td>
                            </tr>
                        )
                    })
                    }

                    {/* <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} /> */}
                </tbody>
            </table>
        </div>
        <div className="col-sm-4">
        </div>
    </div>
</Grid>

<Button  type="submit"  
  style={{ backgroundColor: "#1392ed", left: 15, top: 25, fontSize: "14px" }}
   variant="contained" >Save</Button>
</Grid>
</Form>
    </Formik>
  </div>
);
    }
export default BasicArrayExample