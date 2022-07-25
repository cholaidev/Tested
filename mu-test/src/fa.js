import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from "react/cjs/react.development"
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik,ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import 'bootstrap/dist/css/bootstrap.min.css';
function Formik1() {
    const [itemData, setItemData] = useState([])
    const [inputs, setInputs] = useState({
        add_customer: "",
        sales_order: "",
        reference: "",
        sales_order_date: null,
        expected_shipping_date: null,
        delivery_method: "",
        //sub_total:""

    })
    const top100Films = [
        { id: 1, item: 'Apple', quantity: 1994, rate: 112, amount: 1000 },
        { id: 2, item: 'Samsung', quantity: 1972, rate: 113, amount: 1000 },
        { id: 3, item: 'Redme', quantity: 1974, rate: 114, amount: 1000 },
        { id: 4, item: 'Realme', quantity: 2008, rate: 115, amount: 1000 },]
    useEffect(() => {
        async function fetchData() {
            const data = await axios.get('http://localhost:4000/api/v1/item')
            console.log("itemData", data.data)
            setItemData(data.data)
        }
        fetchData()
    }, [])

    const [rowsData, setRowsData] = useState([
        {
            id: 1,
            itemId: null,
            item: null,
            quantity: 1,
            rate: 0,
            amount: 0
        }

        //id:'',


    ]);
    // const[Total,setTotal]=useState(0)
    // const sum = rowsData.reduce((a, {amount}) => a + amount, 0);
    // console.log("sum",sum)

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


    const [idCount, setIdCount] = useState(2)

    // const top100Films = [
    //     { id: 1, item: 'Apple', quantity: 1994, rate: 112, amount: 1000 },
    //     { id: 2, item: 'Samsung', quantity: 1972, rate: 113, amount: 1000 },
    //     { id: 3, item: 'Redme', quantity: 1974, rate: 114, amount: 1000 },
    //     { id: 4, item: 'Realme', quantity: 2008, rate: 115, amount: 1000 },]




    const addTableRows = () => {

        const rowsInput = {
            id: idCount,
            itemId: null,
            item: null,
            quantity: 1,
            rate: 0,
            amount: 0
        }
        setIdCount((count) => count + 1)
        setRowsData([...rowsData, rowsInput])
        console.log("merge", [...rowsData, rowsInput])

        // console.log("rowInput",rowsInput)

    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData];
        rows.splice(index, 1);
        setRowsData(rows);
    }
    const [amount, setAmount] = useState(0)
    const [quantity,setQuantity] = useState()

    
    const handleChange = (item, evnt) => {
    
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
    const handleChanges = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))

    }

    return (
        <>
<Formik
initialValues={{items:rowsData}}
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
 {formik => (
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

                                                        handleChange(itemValue, index)

                                                    }}
                                                    options={itemData}
                                                    sx={{ width: 300 }}
                                                    renderInput={(params) => <TextField name="item"  {...params} label="item" />}
                                                />
                                            </td>
                                            <td><input type="quantity" value={quantity}
                                                onChange={(evnt) => (handleChange(index, evnt))}
                                                name="quantity" className="form-control" /> 
                                                <ErrorMessage name="quantity" /></td>
                                            <td><input type="rate" value={rate} onChange={(evnt) => (handleChange(index, evnt))} name="rate" className="form-control" /> </td>
                                            <td><input type="amount" value={amount} onChange={(evnt) => (handleChange(index, evnt))} name="amount" className="form-control" /> </td>
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
        </>


    )
}
export default Formik1