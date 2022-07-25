import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from "react/cjs/react.development"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { withStyles } from "@material-ui/core/styles";
//import { useState } from "react/cjs/react.development"
// import TableRows from "../src/TableRows"
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
// import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import React from 'react';
import * as Yup from "yup";
//import { useForm } from "react-hook-form";
// import * as Yup from "yup";
import { useFormik, Form, FieldArray } from 'formik';
//import * as Yup from "yup";
// import 'bootstrap/dist/css/bootstrap.min.css';
function AddedDeleteTableRowss() {

    const validationSchemas = Yup.object().shape({
        // sales_order:Yup.string().required('sales_order must be required'),
        // add_customer:Yup.string().required('add customer must be required'),
        // sales_order_date:Yup.string().required('sales order date must be required').typeError('sales order date must be required'),

    })


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
    const [idCount, setIdCount] = useState(2)

    const { handleSubmit, setFieldValue, handleChange, values, errors, touched } = useFormik({

        initialValues: {

            add_customer: inputs.add_customer,
            sales_order: inputs.sales_order,
            reference: inputs.reference,
            sales_order_date: inputs.sales_order_date,
            expected_shipping_date: inputs.expected_shipping_date,
            delivery_method: inputs.delivery_method,

            items: [
                {
                    item: '',
                    quantity: '',
                    rate: '',
                    amount: ''
                }

            ],


        },
        enableReinitialize: true,
        validationSchema: validationSchemas,


        onSubmit(values) {


            console.log('values', values)
            // submitValue(data)


        }
    })
    // const submitValue = (data) => {
    //     const values = {
    //         'values': data,
    //         'rowdata': rowsData

    //     }
    //     console.log('submittedValue',values);
    //     console.log('mergedData',data)
    //     //onSubmit()
    // }

    const top100Films = [
        { id: 1, item: 'Apple', quantity: 1994, rate: 112, amount: 1000 },
        { id: 2, item: 'Samsung', quantity: 1972, rate: 113, amount: 1000 },
        { id: 3, item: 'Redme', quantity: 1974, rate: 114, amount: 1000 },
        { id: 4, item: 'Realme', quantity: 2008, rate: 115, amount: 1000 },]

    const top100Filmss = [
        { label: 'Apple', year: 1994 },
        { label: 'Samsung', year: 1972 },
        { label: 'Redme', year: 1974 },
        { label: 'Realme', year: 2008 },]



    const validationSchema = Yup.object().shape({
        sales_order: Yup.string().required('Required'),

    })

    const  datas = {values}



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
    const handleChanges = (index, evnt)=>{
        console.log('index',index)
        console.log('event',evnt)
    
        const { name, value } = evnt.target;
        const rowsInput = [...rowsData];
        rowsInput[index][name] = value;
        setRowsData(rowsInput);
      
     
     
    }
    const WhiteTextTypography = withStyles({
        root: {
            color: "#0047b3"
        }
    })(Typography);



    return (
        <div>

           
        
        
    
        

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
                                                            name="items[index].item"
                                                            // disablePortal
                                                            id="combo-box-demo"
                                                            value={item}
                                                            options={top100Films}
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
                                                                //setFieldValue("item", labels || "")
                                                                setFieldValue(itemValue)

                                                            }

                                                            }
                                                            //    / setRowsData(prevState => ({
                                                            //         ...prevState,
                                                            //         quantity: quantity
                                                            //      }));
                                                            // setRowsData(values => values.map((value, i) => i === e ? item: labels,));
                                                            //setFieldValue("items", itemValue || "")


                                                            sx={{ width: 300 }}
                                                            renderInput={(params) => < TextField     {...params} label="item" />}
                                                        />
                                                    </td>
                                                    <td><input type="number" value={quantity}
                                                        onChange={(evnt) => (handleChanges(index, evnt))}
                                                        name={`friends.${index}.quantity`}className="form-control" /> </td>
                                                    <td><input type="number" value={rate} onChange={(evnt) => (handleChanges(index, evnt))} name={`friends.${index}.rate`}className="form-control" /> </td>
                                                    <td><input type="number" value={amount} onChange={(evnt) => (handleChanges(index, evnt))} name="amount" className="form-control" /> </td>
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


                </Grid>
                <Grid
                    xl={8}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={0}
                >
                    <TextField name="sub_total" id="outlined-basic" onChange={handleChange} value={values.sub_total} type='number' InputLabelProps={{ shrink: true }} label="Sub Total" variant="outlined" InputProps={{
                        startAdornment: <InputAdornment position="start">Total(Rs.)</InputAdornment>,
                    }} />
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Grid item md={5} xs={12} paddingLeft={2} paddingTop={4}>
                    <Box
                        sx={{
                            width: 600,
                            maxWidth: '100%',
                        }}
                    >
                        <TextField name="customer_notes" onChange={handleChange} fullWidth value={values.customer_notes} label="Customer Notes" InputLabelProps={{ shrink: true }} id="fullWidth" />
                    </Box>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                >
                    <Button variant="contained" style={{ backgroundColor: "#781055", left: 100, top: 25, fontSize: "14px" }} onClick={handleSubmit}>Submit</Button>
                    <Button style={{ backgroundColor: "#781055", left: 100, top: 25, fontSize: "14px" }}
                        variant="contained" color="error">Cancel</Button>

                </Grid>


            </Grid>
           
            
       
            </div>       

    )
}
export default AddedDeleteTableRowss