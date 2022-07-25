import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { useState } from "react/cjs/react.development"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@mui/material/Typography';

function ItemLIst() {
    const WhiteTextTypography = withStyles({
        root: {
            color: "#0047b3"
        }
    })(Typography);


    

    const handlechange = (e) => {
        console.log('changing');

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
    return (
        <div>
           
            {/* { 
           rowsData.map((data, index) => {
           console.log('datas',data)
           const datasItem = data.item
           console.log("datasitem",datasItem)

           })} */}

            <Formik


                initialValues={{

                       add_customer: inputs.add_customer,
                       sales_order: inputs.sales_order,
                       reference: inputs.reference,
                       sales_order_date: inputs.sales_order_date,
                       expected_shipping_date: inputs.expected_shipping_date,
                       delivery_method: inputs.delivery_method,
                       items: rowsData

                }


                }
                enableReinitialize={true}
                onSubmit={values =>{
                    console.log('values', values)
                     setValue(values)
                       //console.log('submit',value)
                    }}

                render={({ handleChange, values, setFieldValue, handleSubmit ,errors, touched}) => (
                    <Form>
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
                        <FieldArray
                            name="items"
                            render={() => (
                                <div>
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


                                            {
                                                rowsData && values.items.map((data, index) => {

                                                    const valueItem = values.items
                                                    console.log('valueItem', valueItem)
                                                    console.log('index', index)
                                                    console.log('item', data)

                                                    //const itemId=data.id
                                                    //const objIndex = rowsData.findIndex((obj => obj.id == itemId));
                                                    // console.log('itemid',itemId)
                                                    // console.log('indexId',objIndex)
                                                    //console.log('arrayvalues',val)
                                                    const { item, quantity, rate, amount } = data;


                                                    return (

                                                        <tr key={index}>
                                                            <td>
                                                                <Autocomplete
                                                                    getOptionLabel={option => option.item || item}
                                                                    //name={`items.${index}.item`}
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
                                                                        setFieldValue(`items.${index}.item`, labels)
                                                                        //    setFieldValue(itemValue)

                                                                    }

                                                                    }
                                                                    //    / setRowsData(prevState => ({
                                                                    //         ...prevState,
                                                                    //         quantity: quantity
                                                                    //      }));
                                                                    // setRowsData(values => values.map((value, i) => i === e ? item: labels,));
                                                                    //setFieldValue("items", itemValue || "")


                                                                    sx={{ width: 300 }}
                                                                    renderInput={(params) => < TextField    {...params} label="item" />}
                                                                />
                                                            </td>
                                                            <td><TextField type="number" value={quantity} onChange={handleChange}
                                                                // onChange={(evnt) => (handleChanges(index, evnt))}
                                                                name={`items.${index}.quantity`} /> </td>
                                                            <td><TextField value={rate} onChange={handleChange}
                                                                //onChange={(evnt) => (handleChanges(index, evnt))} 
                                                                name={`items.${index}.rate`} className="form-control" /> </td>
                                                            <td><TextField type="number" value={amount} onChange={handleChange} name={`items.${index}.amount`} /> </td>
                                                            <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button></td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                            {/* <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} /> */}
                                        </tbody>
                                    </table>

                                    <div>
                                        <Button onClick={handleSubmit}>Submit</Button>
                                    </div>
                                </div>
                            )}
                        />

                    </Form>
                )}
            />
        </div>
    )
};
export default ItemLIst