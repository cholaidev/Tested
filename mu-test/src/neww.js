import React,{ useEffect,useState} from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { configData } from "../../config/config.helper";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button } from '@mui/material';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import * as Yup from "yup";
import {  useFormik } from 'formik';
import { authHeader } from '../../context/helpers/auth-header';
import "./index";
import "./index.css";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";

const validationSchemas=Yup.object().shape({
  purchase_order:Yup.string().required('purchase_order must be required'),
  purchase_order_date:Yup.date().required('Purchase Order Date must be required').typeError('Purchase Order Date must be required'),
  expected_delivery_date:Yup.date().required('purhase order date must be required').typeError('Delivery Date must be required')
})


function EditPO(props) {
  const receivedData = props.location.state;
  console.log("received vendor",receivedData.vendors.vendor_display_name);
  const poitemID = receivedData.id;
  const purchaseDate = moment(new Date(receivedData.purchase_order_date)).format("yyyy-MM-DD");
  const deliveryDate = moment(new Date(receivedData.expected_delivery_date)).format("yyyy-MM-DD");
  console.log("receivedData",receivedData);  
  const history = useHistory();
  const [vendor,setVendor] = useState([]);  
  const [items,setItems] = useState([]);

  const [idCount, setIdCount] = useState(2);
  const [amount, setAmount] = useState(0);
  const [inputs, setInputs] = useState([]);
  // console.log("edit PO inputs",inputs);  
  const [rowsData, setRowsData] = useState([
    {
        // id: 1,
        item_name: null,
        quantity: '',
        rate: '',
        amount: ''
    }
]);


useEffect(async()=>{
  var authToken = await authHeader();
  var CurrentToken = authToken.currentToken;

  const purchaseitem = await axios.get(configData.API_URL +"purchaseOrder/po?id="+poitemID);    
  setInputs(purchaseitem.data);
  setRowsData(purchaseitem.data.purchase_order_item);
  setVendor(purchaseitem.data.vendors);
  console.log("Edit Item details",purchaseitem.data);  
  
    const temp = await axios.get(configData.API_URL +"vendors/vendor");    
    setVendor(temp.data);
    console.log("vendor details",temp.data);  
    
    const item = await axios.get(configData.API_URL +"item/", {
      headers: { Authorization: `Bearer ${CurrentToken}` }
    });    
      setItems(item.data);
      console.log("item details",item.data);  
 },[]);

 const{handleSubmit,setFieldValue,handleChange,values,touched,errors} = useFormik({
  initialValues: {
    // vendor_ID: receivedData.vendor_id,
    add_vendor: receivedData.vendors,
    purchase_order: receivedData.purchase_order_number,
    reference: receivedData.reference,
    purchase_order_date: purchaseDate,
    expected_delivery_date: deliveryDate,
    items: rowsData,
    vendornotes:receivedData.customer_notes
  },
  // enableReinitialize:true,
    validationSchema : validationSchemas,
   
    onSubmit () {
      console.log('test');
      const newData={

        vendor_id:values.vendor_name,
        purchase_order_number:values.purchase_order,
        reference :values.reference,
        purchase_order_date:values.purchase_order_date,
        expected_delivery_date:values.expected_delivery_date,
        items:rowsData,
        customer_notes:values.vendornotes
        };
        console.log('New submited Data:',newData);
        createData(newData).then(res => {     
          console.log(res);
          history.push('/purchases/po');
        })

    }
 })
 const createData= async(newData) =>{
  var authToken = await authHeader();
  console.log('create authtoken',authToken);
  var CurrentToken = authToken.currentToken;
  const data = await axios.post(configData.API_URL +"purchaseOrder/po", newData,
  {headers: { Authorization: `Bearer ${CurrentToken}` }})

  return data;
}

 const addTableRows = () => {
    const rowsInput = {
      // id: idCount,
      item_name: null,
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
  console.log("Items Data", rowsData);
  rows.splice(index, 1);
  console.log("Remailning rows after delete", rows);
  setRowsData(rows);
}

const handleChanges = (item, evnt) => {
    
  console.log("change", item)
  console.log("autoIndex", evnt)
  const rowIndex = evnt
  const itemAmount = item.selling_price
  setAmount(itemAmount)

  if (item.id) {
     const objIndex = rowIndex
      console.log("index", objIndex)
      const rowsInput = [...rowsData];
      rowsInput[objIndex].item_id = item.id
      rowsInput[objIndex].item_name = item.name
      rowsInput[objIndex].rate = item.selling_price
      rowsInput[objIndex].amount = item.selling_price
      setRowsData(rowsInput);
      console.log('data', rowsInput)
  } else {

      const { name, value } = evnt.target;
      console.log("name", name)
      console.log('val', value)
      if (name == 'quantity') {
          if (value) {
              console.log("if")
              const valChange = value * rowsData[item].rate
              console.log("valChange", valChange)
              const rowsInput = [...rowsData];
              rowsInput[item].amount = valChange
              setRowsData(rowsInput);
              console.log('data', rowsInput)
          } else {
              console.log("elseOfQnty")
              const rowsInput = [...rowsData];
              rowsInput[item].amount = 0
              setRowsData(rowsInput);
          }

      }
      if(name == 'rate'){
        if(value && rowsData[item].quantity ==0 ){
          rowsData[item].quantity = 1;
        const rateChange= value*rowsData[item].quantity
        console.log("rateChange",rateChange)
        setAmount(rateChange)
        const rowsInput = [...rowsData];
        rowsInput[item].amount = rateChange
        setRowsData(rowsInput);
        console.log('data', rowsInput)
        }else if(value && rowsData[item].quantity !==0){
              const rateChange= value*rowsData[item].quantity
              console.log("rateChange",rateChange)
              setAmount(rateChange)
              const rowsInput = [...rowsData];
              rowsInput[item].amount = rateChange
              setRowsData(rowsInput);
              console.log('data', rowsInput)
          }else {
              const rowsInput = [...rowsData];
              rowsInput[item].amount = 0
             setAmount(0)
              setRowsData(rowsInput);
          }
      }
      const rowsInput = [...rowsData];
      rowsInput[item][name] = value;
      setRowsData(rowsInput);
      console.log('data', rowsInput)
  }
}
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

 
const handleClickClose=()=>{
  history.push('/purchases/po');
  }
  


return(
    
 <Grid root sx={{ flexGrow: 1 }}>
    <Grid container paddingLeft={1}>
      <Typography variant="h6" paddingBottom={2}>Create Purchase Order</Typography>
    </Grid> 
    <Grid root paddingLeft={3} paddingRight={4}>
     <Grid item md={4} container paddingTop={2}>
        <Stack spacing={2}  sx={{ width: '100%' }}>
        <Autocomplete  
        name="vendor_name"
        value={values.add_vendor}
        options={vendor}
        getOptionLabel={option => option.vendor_display_name||values.add_vendor.vendor_display_name}
        // getOptionSelected={option => option.vendor_display_name == receivedData.vednors.vendor_display_name}
        onChange={(e, value) =>{
          console.log('vendor dropdown', value)
          console.log('vendor dropdown', value.id)
          setFieldValue("vendor_ID", value.id|| "")}}
        renderInput={(params) => <TextField {...params} name='vendor_name' label="Vendor Name" 
        helperText={errors.vendor_name && touched.vendor_name ? errors.vendor_name : null}
        error={errors.vendor_name && touched.vendor_name ? errors.vendor_name : null} InputLabelProps={{ shrink: true }}/>}
        />
          <TextField size="small" variant="outlined" value={values.purchase_order} name="purchase_order" InputLabelProps={{shrink:true}} onChange={handleChange} label="Purchase Order" helperText={errors.purchase_order && touched.purchase_order ? errors.purchase_order : null} error={errors.purchase_order && touched.purchase_order ? errors.purchase_order : null}/>  
          <TextField size="small" variant="outlined" value={values.reference} name="reference" InputLabelProps={{shrink:true}} onChange={handleChange} label="Reference"/>
          <TextField size="small" type="date" variant="outlined" value={values.purchase_order_date} name="purchase_order_date" InputLabelProps={{shrink:true}} onChange={handleChange} label="Date" helperText={errors.purchase_order_date && touched.purchase_order_date ? errors.purchase_order_date : null} error={errors.purchase_order_date && touched.purchase_order_date ? errors.purchase_order_date : null}/>
          
          <TextField size="small" type="date" variant="outlined" value={values.expected_delivery_date} name="expected_delivery_date" InputLabelProps={{shrink:true}} onChange={handleChange} label="Expected Delivery Date" helperText={errors.expected_delivery_date && touched.expected_delivery_date ? errors.expected_delivery_date : null} error={errors.expected_delivery_date && touched.expected_delivery_date ? errors.expected_delivery_date : null}/> 
        </Stack>
     </Grid>
    </Grid>
    <Grid>
    <Grid container padding={2}  >
      <Grid item md={6} xs={12} sx={{borderTop: 1, borderBottom: 1, borderColor: 'divider' }}> 
        <table className="item-table">
          <thead>
            <tr>
            <th>item</th>
            <th>quantity</th>
            <th>rate</th>
            <th>amount</th>
            <th><button className="btn btn-outline-success" onClick={addTableRows} >+</button></th>
            </tr>
          </thead>
          <tbody >
          {/* <Stack spacing={2}> */}
            {rowsData.map((data, index) => {
              const { item, quantity, rate, amount } = data;
              console.log('item', data)
              console.log("length", rowsData.length)
              console.log('itemValue1', items)
              return (
                <tr key={index}>
                <td className="itemAutoComplete"><Autocomplete
                      options={items}
                      getOptionLabel={option => option.name || item}
                      getOptionSelected={option => option.name == data.item_name}
                      value={items.id}
                      onChange={(e, itemValue) => {
                      handleChanges(itemValue, index)   
                      }}
                    renderInput={(params) => <TextField name="item_name"  {...params} InputLabelProps={{ shrink: true }}  label="" />}
                          />
                </td>
                <td><input type="number" value={quantity} onChange={(evnt) => (handleChanges(index, evnt))} name="quantity" className="form-control" /> </td>
                <td><input type="number" value={rate} onChange={(evnt) => (handleChanges(index, evnt))} name="rate" className="form-control" /> </td>
                <td><input type="amount" value={amount} onChange={(evnt) => (handleChanges(index, evnt))} name="amount" className="form-control" /> </td>
                <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button></td>
                </tr>
                    )
                })
                }
        {/* </Stack> */}
        </tbody>
        </table>
      </Grid>
      
    </Grid>
    <Grid container padding={2}>
    <Grid root md={6} container padding={2} direction="column" justifyContent="left" alignItems="left">
        <TextField  name="sub_total" value={sums} type='number' InputLabelProps={{ shrink: true }} label="Sub Total" variant="outlined" InputProps={{
          startAdornment: <InputAdornment position="start">Total(Rs.)</InputAdornment>,
      }} />
      </Grid>
    </Grid>
    <Grid container padding={2}>
      <Grid item md={8} lg={6}>
          <Stack spacing={2}>
            <TextareaAutosize size="small" name="vendornotes" InputLabelProps={{shrink:true}} value={values.vendornotes} minRows={3} onChange={handleChange} aria-label="Remarks"
            variant="standard" placeholder="Vendor Remarks"  />
            </Stack>
      </Grid>
  </Grid>
    </Grid>
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Stack direction="row" spacing={2} paddingBottom={2}>
        <Button style={{  backgroundColor: "#1976d2"}} variant="contained" class="handle-submit" onClick={handleSubmit} >Save</Button>
        <Button style={{  backgroundColor: "#781055"}} variant="contained" onClick={handleClickClose}>Cancel</Button>
      </Stack>
    </Grid>
  </Grid>
);
}



export default EditPO;