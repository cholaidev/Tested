import React,{ useEffect,useState} from "react";
import axios from 'axios';
// import { useHistory } from "react-router-dom";
// import { configData } from "../../config/config.helper";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import Tab from '@material-ui/core/Tab';
// import TabContext from '@material-ui/lab/TabContext';
//import TabList from '@material-ui/lab/TabList';
// import TabPanel from '@material-ui/lab/TabPanel';
import { Button } from '@mui/material';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import * as Yup from "yup";
import {  useFormik } from 'formik';
//import { authHeader } from '../../context/helpers/auth-header';
import "./index";
import "./index.css";
import { Autocomplete } from "@material-ui/lab";

const validationSchemas=Yup.object().shape({
  purchase_order:Yup.string().required('purchase_order must be required'),
  purchase_order_date:Yup.date().required('Purchase Order Date must be required').typeError('Purchase Order Date must be required'),
  //expected_delivery_date:Yup.date().required('purhase order date must be required').typeError('Delivery Date must be required')
})


function CreatePO() {


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



  //const history = useHistory();
  const [vendor,setVendor] = useState([]);
  const [items,setItems] = useState([]);
  const [value,setValue] = useState('1');
  const [idCount, setIdCount] = useState(2);
  const [amount, setAmount] = useState(0);
  const[itemValues,setItemValues] = useState();
  console.log('finalValue',)
  const [inputs, setInputs] = useState({
    // add_vendor: "",
    // purchase_order: "",
    // reference: "",
    // purchase_order_date: "",
    // expected_delivery_date: "",
    // vendornotes:""
  })
  const [rowsData, setRowsData] = useState([
    {
        id: 1,
        item_name: null,
        quantity: '',
        rate: '',
        amount: ''
    }
]);
console.log('rowInput',rowsData)
const dataRows=rowsData
console.log('rowdatas',dataRows)

// useEffect(async()=>{
//   var authToken = await authHeader();
//   var CurrentToken = authToken.currentToken;
//     const temp = await axios.get(configData.API_URL +"vendors/vendor");    
//     setVendor(temp.data);
//     console.log("vendor details",temp.data);  
    
//     const item = await axios.get(configData.API_URL +"item/", {
//       headers: { Authorization: `Bearer ${CurrentToken}` }
//     });    
//       setItems(item.data);
//       console.log("item details",item.data);  
//  },[]);

 const{handleSubmit,setFieldValue,handleChange,values,touched,errors} = useFormik({
  initialValues: {
    //vendor: inputs.vendor,
    purchase_order: inputs.purchase_order,
    reference: inputs.reference,
    purchase_order_date: inputs.purchase_order_date,
    expected_delivery_date: inputs.expected_delivery_date,
    items: dataRows,
    vendornotes:inputs.vendornotes
  },
 enableReinitialize:true,
    //validationSchema : validationSchemas,
   
    onSubmit (values) {
      console.log('values',values);
      setItemValues(values)

    //   const newData={
    //     vendor_id:values.vendor_name,
    //     purchase_order_number:values.purchase_order,
    //     reference :values.reference,
    //     purchase_order_date:values.purchase_order_date,
    //     expected_delivery_date:values.expected_delivery_date,
    //     items:rowsData,
    //     customer_notes:values.vendornotes
    //     };
        //console.log('received Data:',newData);
        // createData(newData).then(res => {     
        //   console.log(res);
        // })

    }
 })
//  const createData= async(newData) =>{
//   var authToken = await authHeader();
//   console.log('create authtoken',authToken);
//   var CurrentToken = authToken.currentToken;
//   const data = await axios.post(configData.API_URL +"purchaseOrder/po", newData,
//   {headers: { Authorization: `Bearer ${CurrentToken}` }})

//   return data;
// }

 const addTableRows = () => {
    const rowsInput = {
      id: idCount,
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
  rows.splice(index, 1);
  setRowsData(rows);
}

const handleChanges = (item, evnt) => {
    
  console.log("changes", item)
  console.log("autoIndex", evnt)
  const rowIndex = evnt


  if (item.id) {
      const itemAmount = item.selling_price
      setAmount(itemAmount)


      const objIndex = rowIndex
      console.log("index", objIndex)
      const rowsInput = [...rowsData];
      rowsInput[objIndex].item_id = item.id
      rowsInput[objIndex].item_name = item.item
      rowsInput[objIndex].rate = item.rate
      rowsInput[objIndex].amount = item.amount
      setRowsData(rowsInput);
      console.log('data', rowsInput)
  } else {

      const { name, value } = evnt.target;
      console.log("name", name)
      console.log('val', value)
      if (name == 'quantity') {
          if (value) {
              console.log("if")
              const valChange = value * amount
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
          if(value){
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

//  const tabChange = (event, newValue) => {
//     setValue(newValue);
//   };
  const handleClickClose=()=>{
   // history.push('/purchases/po');
   }
  


return(
    
 <Grid root sx={{ flexGrow: 1 }}>
           { console.log("vendor details",vendor) }
   <Grid container paddingLeft={1}>
      <Typography variant="h6" paddingBottom={2}>Create Purchase Order</Typography>
   </Grid>
   <Grid root paddingLeft={3} paddingRight={4}>
     <Grid item md={4} container paddingTop={2}>
        <Stack spacing={2}  sx={{ width: '100%' }}>
        <Autocomplete  
        name="vendor"
        value={values.vendor}
        options={top100Filmss}
        getOptionLabel={option => option.label||values.vendor}
        onChange={(e, value) =>{
            const vendorName = value.label
            console.log('vendor',vendor)
          console.log('vendor dropdown', value)
          console.log('vendor dropdown', value.id)
          setFieldValue("vendor",vendorName || "")
        }}
        renderInput={(params) => <TextField {...params}  label="Vendor Name" 
        helperText={errors.vendor_name && touched.vendor_name ? errors.vendor_name : null}
        error={errors.vendor_name && touched.vendor_name ? errors.vendor_name : null}/>}
        />
          <TextField size="small" variant="outlined" value={values.purchase_order} name="purchase_order" InputLabelProps={{shrink:true}} onChange={handleChange} label="Purchase Order" 
        //   helperText={errors.purchase_order && touched.purchase_order ? errors.purchase_order : null} 
        //   error={errors.purchase_order && touched.purchase_order ? errors.purchase_order : null}
          />  
          <TextField size="small" variant="outlined" value={values.reference} name="reference" InputLabelProps={{shrink:true}} onChange={handleChange} label="Reference"/>
          <TextField size="small" variant="outlined" value={values.purchase_order_date} name="purchase_order_date" InputLabelProps={{shrink:true}} onChange={handleChange} label="Date" 
        //   helperText={errors.purchase_order_date && touched.purchase_order_date ? errors.purchase_order_date : null}
        //    error={errors.purchase_order_date && touched.purchase_order_date ? errors.purchase_order_date : null}
           />
          <TextField size="small" variant="outlined" value={values.expected_delivery_date} name="expected_delivery_date" InputLabelProps={{shrink:true}} onChange={handleChange} label="Expected Delivery Date"
        //    helperText={errors.expected_delivery_date && touched.expected_delivery_date ?
        //     errors.expected_delivery_date : null} error={errors.expected_delivery_date && touched.expected_delivery_date ? errors.expected_delivery_date : null}
            /> 
        </Stack>
     </Grid>
   </Grid>
   <Grid>
    <Box sx={{typography: 'body1' }}>
      {/* <TabContext value={value}> */}
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={tabChange}>
              <Tab label="Items" value="1" />
              <Tab label="Vendor Notes" value="2" />
            </TabList>
        </Box> */}
        {/* <TabPanel value="1"> */}
          <Grid container >
          <Grid item md={9} xs={12}> 
            <table>
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
                  const { item, quantity, rate, amount } = data;
                  console.log('item', data)
                  console.log("length", rowsData.length)
                  return (
                    <tr key={index}>
                    <td><Autocomplete
                         options={top100Films}
                         getOptionLabel={option => option.item || item}
                         value={item}
                         onChange={(e, itemValue) => {
                         console.log('itemValue', itemValue)
                         handleChanges(itemValue, index)
                         }}
                        renderInput={(params) => <TextField name="item"  {...params} label="" />}
                             />
                    </td>
                    <td><input type="quantity" value={quantity} onChange={(evnt) => (handleChanges(index, evnt))} name="quantity" className="form-control" /> </td>
                    <td><input type="rate" value={rate} onChange={(evnt) => (handleChanges(index, evnt))} name="rate" className="form-control" /> </td>
                    <td><input type="amount" value={amount} onChange={(evnt) => (handleChanges(index, evnt))} name="amount" className="form-control" /> </td>
                    <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button></td>
                    </tr>
                        )
                    })
                    }

            </tbody>
            </table>
            
          </Grid>
          </Grid>
        {/* </TabPanel> */}
        {/* <TabPanel value="2"> */}
          <Grid container>
          <Grid item md={8} lg={6}>
              <Stack spacing={2}>
                <TextareaAutosize name="vendornotes" value={values.vendornotes} minRows={3} size="large" InputLabelProps={{ shrink: true }} onChange={handleChange} aria-label="Remarks"
                variant="standard" placeholder="Vendor Remarks"  />
                </Stack>
          </Grid>
          </Grid>
        {/* </TabPanel> */}
      {/* </TabContext> */}
    </Box>
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



export default CreatePO;