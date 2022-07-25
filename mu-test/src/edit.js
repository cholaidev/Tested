import React from 'react';
import { Formik,ErrorMessage, Field, FieldArray } from 'formik';
import { useState } from "react/cjs/react.development"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';
import * as Yup from "yup";
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import axios from 'axios';


function ItemLIst() {
    const [itemData, setItemData] = useState([])

    const validationSchemas = Yup.object().shape({
        sales_order:Yup.string().required('sales_order must be required'),
        add_customer:Yup.string().required('add customer must be required'),
        sales_order_date:Yup.string().required('sales order date must be required').typeError('sales order date must be required'),

    })

    const WhiteTextTypography = withStyles({
        root: {
            color: "#0047b3"
        }
    })(Typography);
    

    

   
   
    // const handleChanges = (item, evnt) => {
    //     console.log("change", item)
    //     if (item.id) {
    //         let itemId = null
    //         for (let i = 0; i < rowsData.length; i++) {
    //             itemId += 1

    //         }
    //         console.log("itemId", itemId)

    //         // const quantity="quantity"
    //         const objIndex = rowsData.findIndex((obj => obj.id == itemId));
    //         console.log("index", objIndex)
    //         // rowsData[objIndex].quantity=item.quantity
    //         const rowsInput = [...rowsData];
    //         rowsInput[objIndex].item = item.item
    //         rowsInput[objIndex].quantity = item.quantity
    //         rowsInput[objIndex].rate = item.rate
    //         rowsInput[objIndex].amount = item.amount
    //         setRowsData(rowsInput);
    //         console.log('data', rowsInput)
    //     } else {

    //         const { name, value } = evnt.target;
    //         const rowsInput = [...rowsData];
    //         rowsInput[item][name] = value;
    //         setRowsData(rowsInput);
    //         console.log('data', rowsInput)
    //     }



    // }
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get('http://localhost:4000/api/v1/item')
            console.log("itemData", data.data)
            setItemData(data.data)
        }
        fetchData()
    }, [])

    const top100Films = [
        { id: 1, item: 'Apple', quantity: 1994, rate: 112, amount: 1000 },
        { id: 2, item: 'Samsung', quantity: 1972, rate: 113, amount: 1000 },
        { id: 3, item: 'Redme', quantity: 1974, rate: 114, amount: 1000 },
        { id: 4, item: 'Realme', quantity: 2008, rate: 115, amount: 1000 },]

    const [idCount, setIdCount] = useState(2)
    const [value,setValue]=useState()
     
 const val =value
 console.log('val',val)
    
 const [inputs, setInputs] = useState({
    add_customer: "",
    sales_order: "",
    reference: "",
    sales_order_date: null,
    expected_shipping_date: null,
    delivery_method: "",

})
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
    const sums =rowsData.reduce(add,0)
    console.log("sum",sums)
    function add(a,{amount}){
        console.log("a",a)
        console.log("amount",amount)
        if(amount!==''){
        const parseAmount = JSON.parse(amount)
        const parseA = JSON.parse(a)
        return  parseA + parseAmount
        }
        else{
            return a+ amount
        }

    }

    const top100Filmss = [
        { label: 'Apple', year: 1994 },
        { label: 'Samsung', year: 1972 },
        { label: 'Redme', year: 1974 },
        { label: 'Realme', year: 2008 },]

    const addTableRows = () => {

        const rowsInput = {
            id: idCount,
            item: null,
            quantity: '',
            rate: '',
            amount: ''
        }
        setIdCount((count) => count + 1)
        console.log('count', idCount)
        setRowsData([...rowsData, rowsInput])
        console.log("merge", [...rowsData, rowsInput])
        console.log("rowInput", rowsInput)

    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }
    const [amount, setAmount] = useState(0)
    const [quantity,setQuantity] = useState()

    
    const handleChanges = (item, evnt) => {
    
        console.log("change", item)
        console.log("autoIndex", evnt)
        const rowIndex = evnt


        if (item.id) {
            const itemAmount = item.selling_price
            setAmount(itemAmount)

           // const itemQuantity = item.


            const objIndex = rowIndex
            // const objIndex = rowsData.findIndex((obj => obj.id == itemId));
            console.log("index", objIndex)
            const rowsInput = [...rowsData];
            rowsInput[objIndex].itemId = item.id
            rowsInput[objIndex].item = item.name
            // rowsInput[objIndex].quantity = item.quantity
            rowsInput[objIndex].rate = item.selling_price
            rowsInput[objIndex].amount = item.selling_price
            setRowsData(rowsInput);
            console.log('data', rowsInput)
        } else {

            const { name, value } = evnt.target;
            console.log("name", name)
            // console.log("quan", {['quantity']:value}) 
            // const quantityValue   =  {['quantity']:value}
            console.log('val', value)
            //  console.log('val',typeof value)
            if (name == 'quantity') {
                if (value) {
                    console.log("if")
                    const valChange = value * amount
                    console.log("valChange", valChange)
                    const rowsInput = [...rowsData];
                    rowsInput[item].amount = valChange
                    setRowsData(rowsInput);
                    // delete rowsInput[item].amount
                    console.log('data', rowsInput)
                } else {
                    console.log("elseOfQua")
                    const rowsInput = [...rowsData];
                    rowsInput[item].amount = 0
                    setRowsData(rowsInput);
                }

            }
            if(name == 'rate'){
                if(value){
                    const rateChange= value*rowsData[item].quantity
                    console.log("rateChange",rateChange)
                    setAmount(rateChange)
                    const rowsInput = [...rowsData];
                    rowsInput[item].amount = rateChange
                    setRowsData(rowsInput);
                    // delete rowsInput[item].amount
                    console.log('data', rowsInput)
                }else {
                    //console.log("elseOfQua")
                    const rowsInput = [...rowsData];
                    rowsInput[item].amount = 0
                   setAmount(0)
                    setRowsData(rowsInput);
                }

            }
            // console.log('else')
           
            const rowsInput = [...rowsData];
            rowsInput[item][name] = value;
            setRowsData(rowsInput);
            console.log('data', rowsInput)
        }
    }
    return (
        <div>
            
           
            {/* { 
           rowsData.map((data, index) => {
           console.log('datas',data)
           const datasItem = data.item
           console.log("datasitem",datasItem)

           })} */}

<Formik
initialValues={{items:rowsData,
            add_customer: inputs.add_customer,
            sales_order: inputs.sales_order,
            reference: inputs.reference,
            sales_order_date: inputs.sales_order_date,
            expected_shipping_date: inputs.expected_shipping_date,
            delivery_method: inputs.delivery_method,

}
}
onSubmit={(values)=>{
    console.log("submit",values)
}}
validationSchema={Yup.object({
    quantity: Yup.number()
    .max(3, 'Must be 15 characters or less')
     
    // lastName: Yup.string()
    //   .max(20, 'Must be 20 characters or less')
    //   .required('Required'),
    // email: Yup.string().email('Invalid email address').required('Required'),
  })}
  
enableReinitialize={true}>
 {render={({ handleChange, values, setFieldValue, handleSubmit ,errors, touched}) => (
        <Grid container >
            <Grid item container paddingLeft={2} paddingTop={1}>
                    <WhiteTextTypography variant="h5">New Salesorder</WhiteTextTypography>

                </Grid>
                <Grid container direction="row" spacing={3} paddingLeft={2} paddingTop={3}>
                    <Grid item md={8} sm={12} xs={12}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            //getOptionLabel={(option) => option.label ||""}
                            name="add_customer"
                            // getOptionLabel={option => option.label || label}
                            options={top100Filmss}
                            value={values.add_customer}
                            onChange={(e, value) => {
                                const select = value.label
                                console.log('labels', select)
                                console.log('dropdown', value)
                                setFieldValue("add_customer", select || "")
                            }}


                            sx={{ width: 500 }}
                            renderInput={(params) => <TextField    {...params} label="Item" size='small'
                                helperText={errors.add_customer && touched.add_customer ? errors.add_customer : null}
                                error={errors.add_customer && touched.add_customer ? errors.add_customer : null} />}

                        />

                    </Grid>
                    <Grid item md={8} sm={12} xs={12} >
                        <TextField
                            name="sales_order" id="outlined-basic" value={values.sales_order} onChange={handleChange} style={{ width: 350 }} label="Sales Order*" InputLabelProps={{ shrink: true }} size='small'
                            helperText={errors.sales_order && touched.sales_order ? errors.sales_order : null}
                            error={errors.sales_order && touched.sales_order ? errors.sales_order : null}
                        />


                    </Grid>
                    <Grid item md={8} sm={12} xs={12} >
                        <TextField name="reference" id="outlined-basic" value={values.reference} onChange={handleChange} style={{ width: 350 }} label="Reference" InputLabelProps={{ shrink: true }} size='small' />

                    </Grid>
                    <Grid item md={5} sm={12} xs={12}>
                        <TextField name="sales_order_date" id="outlined-basic" value={values.sales_order_date} onChange={handleChange} style={{ width: 350 }} label="Sales Order Date*" InputLabelProps={{ shrink: true }} size='small'
                            helperText={errors.sales_order_date && touched.sales_order_date ? errors.sales_order_date : null}
                            error={errors.sales_order_date && touched.sales_order_date ? errors.sales_order_date : null} />

                    </Grid>
                    <Grid container direction="row" paddingLeft={3} spacing={4} paddingTop={4}>
                        <Grid item md={5} xs={12}  >
                            <TextField name="expected_shipping_date" id="outlined-basic" value={values.expected_shipping_date} onChange={handleChange} style={{ width: 350 }} label="Expected Shipping Date" InputLabelProps={{ shrink: true }} size='small' />
                        </Grid>

                    </Grid>
                    <Grid item md={5} xs={12} paddingTop={4}>
                        <TextField name="delivery_method" id="outlined-basic" value={values.delivery_method} onChange={handleChange} style={{ width: 350 }} label="Delivery Method" InputLabelProps={{ shrink: true }} size='small' />
                    </Grid>
                </Grid>

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
                                    console.log("length", rowsData.length)
                                    return (

                                        <tr key={index}>
                                            <td>
                                                <Autocomplete
                                                    getOptionLabel={option => option.name || item}

                                                    id="combo-box-demo"
                                                    value={item}
                                                    onChange={(e, itemValue) => {
                                                        // console.log("e",e)
                                                        console.log('itemValue', itemValue)

                                                        handleChanges(itemValue, index)

                                                    }}
                                                    options={itemData}
                                                    sx={{ width: 300 }}
                                                    renderInput={(params) => <TextField name="item"  {...params} label="item" />}
                                                />
                                            </td>
                                            <td><input type="quantity" value={quantity}
                                                onChange={(evnt) => (handleChanges(index, evnt))}
                                                name="quantity" className="form-control" /> 
                                                <ErrorMessage name="quantity" /></td>
                                            <td><input type="rate" value={rate} onChange={(evnt) => (handleChanges(index, evnt))} name="rate" className="form-control" /> </td>
                                            <td><input type="amount" value={amount} onChange={(evnt) => (handleChanges(index, evnt))} name="amount" className="form-control" /> </td>
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
            <Grid
                xl={8}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={0}
            >
                <TextField name="sub_total" id="outlined-basic"  value={sums} type='number' InputLabelProps={{ shrink: true }} label="Sub Total" variant="outlined" InputProps={{
                    startAdornment: <InputAdornment position="start">Total(Rs.)</InputAdornment>,
                }} />
                 <button type="submit" onClick={formik.handleSubmit}>Submit</button> 
            </Grid>

        </Grid>
 )}
          
         </Formik>
        </div>

    )
};
export default ItemLIst