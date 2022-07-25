import React, { useState,} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import axios from 'axios';
import { authHeader } from '../../context/helpers/auth-header';
import { configData } from "../../config/config.helper";
import { useFormik } from 'formik';
import {createPackage} from './createPackage'
import moment from "moment";

import * as Yup from "yup";
//import '../packages/color.css'

import Divider from '@mui/material/Divider';




export default function Packages() {
    
    const [inputs, setInputs] = useState( {

       customer_name:'',
       sales_order_number:'',
       package_slip:'',
       date:'',
       customer_notes:''
    
    
      });
   
    // const [salesOrde, setData] = useState([])
    const [customer, setCustomer] = useState([])
    const [customerId, setCustomerId] = useState()
    //console.log('cusId',customerId)
    const [saleOrder, setSaleOrder] = useState([])
    const sale = [saleOrder.salesOrder]
    const[packages,setPackages]=useState([0])
    
    const[num,setNum]=useState([])
    console.log('cus',customerId)
    console.log('salesOdered',sale)
    const saleOrderNumber=num.sales_order_number
    console.log('num',num)

    console.log('packagesSales',saleOrder)
    var now = new Date();
   
 
    var day = ("0" + now.getDate()).slice(-2);
    
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    // var today = (day)+"-"+(month)+"-"+now.getFullYear()
    
    // const Dates = moment(new Date(today)).format("yyyy-MM-DD");
    console.log('date',today)

    const { handleSubmit, setFieldValue, handleChange,handleBlur, touched, values, errors } = useFormik({
        initialValues: {
            customer_name:customerId,
            sales_order_number:num.num,
            package_slip:inputs.package_slip,
            date:today,
            packing:packages,
            customer_notes:inputs.customer_notes

        },
        enableReinitialize:true,
        onSubmit(values) {

            packages.forEach(
                         ({ items,orderd,packed,quantity}, idx, arr) => arr[idx] = ({items,orderd,packed,quantity })
                    )
                     console.log('foreachpackages',packages)
            
                    const pack  = packages.map(v=>({...v,orderd:1,packed:0,}))
                    console.log("new",pack)
            
                     console.log(values)
            

          const newData = {

            customer_id: (values.customer_name).id,
            sales_order_id: num.id,
            package_slip: values.package_slip,
            date:values.date,
            internal_notes:values.customer_notes,
            items:pack
          }
          console.log('neww',newData)
          createPackage(newData).then(res=>{
          console.log('successsfully')
          })
            
        }
    });

    var now = new Date();
   
 
    var day = ("0" + now.getDate()).slice(-2);
    
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
    // var today = (day)+"-"+(month)+"-"+now.getFullYear()
    
    // const Dates = moment(new Date(today)).format("yyyy-MM-DD");
    console.log('date',today)

    
 
    //('#datePicker').val(today);  
    

      const getCustomer = async () => {
        var authToken = await authHeader();
        var CurrentToken = authToken.currentToken
        const data = await axios.get(configData.API_URL + '/customer',
                { headers: { Authorization: `Bearer ${CurrentToken}` } })
        console.log("getCustomer", data.data);
        setCustomer(data.data);
        
      };
      useEffect(() => {
        getSalesOrderData();
        getCustomer();
       
       // getItemData(data)
       
      }, [num]);
   
    //   useEffect(() => {
        
    //       alert('no value')type='date'
        
    //   }, [customerId])
    
    //   function userReducer(state, action) {
    //     console.log('action',action)
    //     switch (action.type) {
    //       case "salesOrder":
    //         return { ...state,  data:action.payload   };
         
    //       default: {
    //         throw new Error(`Unhandled action type: ${action.type}`);
    //       }
    //     }
    //   }
    //   var [state, dispatch] = React.useReducer(userReducer, saleOrder);
    //   const states=state.data
    //   console.log('states',states)
    const selectsalesOrder=()=>{
     console.log('fine')
     setSaleOrder(null)


    }

        const handleChanges = (customer,e) => {
        console.log('event',e)

        if(customer.salutation){
            if(customerId==undefined){
                console.log('customers',customer)
                setCustomerId(customer)
            
               
            const salesOrder=customer.salesOrder
            console.log('salesOrder',salesOrder)
            // dispatch({ type: 'salesOrder' ,payload:([salesOrder ]) })
            setSaleOrder(prevState => ({ ...prevState,salesOrder }));
                
            }
            else{
                const salesOrder=customer.salesOrder
                console.log('alert')
                alert('are you sure you want to  change this customer',selectsalesOrder(),
                setSaleOrder(prevState => ({ ...prevState,salesOrder }))
                )
               
            }

            
        }
        else{
            const { name, value } = e.target;
            console.log('name',name)
            console.log('value',value)
           
            if(name =='quantity to pack'){
                 const rowInput =[...packages]
                 rowInput[customer].quantity=e.target.value
                 setPackages(rowInput);
                 const pack  = packages.map(v=>({...v,ordered:1,packed:0,}))
                 console.log("new",pack)
                
                 //setPackages(rowInput) 
            }
            else{
               const salesOrderID=customer.id
               const sales_order_number=customer.sales_order_number
               console.log('salesOrder',salesOrderID)
               console.log('sales_order_number',sales_order_number)
               setNum({id:salesOrderID,num:sales_order_number})
 
            }
          
        }  

    }
    const getSalesOrderData = async () => {
        const data = await axios.get(
          "http://localhost:4000/api/v1/salesOrder/?id="+num.id
        );
        console.log("get", data.data);
        //setData(data.data);
        setPackages(data.data.orderItem)
    //    console.log('packedPackags',packages)
        // setPackages(pack)
       
        
      };
      
    const deleteTableRows = () => {

    }
   
   

    const handleClickClose = () =>{

    }
    // const getItemData =  () => {
        
    //     customer.forEach(
    //         ({ customers}, idx, arr) => arr[idx] = ({ customers })
    //     );
    //     console.log('right',customer)
    //     setCustomer(customer)

    // };

    return (
        <Grid container  >

            <Grid item xs={12} >
                <Stack direction="column" spacing={2}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "felx-start",
                            paddingLeft: '32px'
                        }}>
                        <Typography variant='h4'>New Package</Typography>

                    </Box>

                    <Box
                        sx={{
                            backgroundColor: "#f0f2f0",
                            display: "flex",
                            height: '250px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            paddingLeft: '30px'
                        }}>

                        <Stack direction="column" spacing={6}>
                       
                                <>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                name="customer"
                                getOptionLabel={option => option.customer_display_name || ""}
                                //value={values.customer_name}
                                options={customer}
                                onChange={(e, value) => {
                                    console.log('dropdown', value)
                                    const select = value.customer_display_name
                                    console.log('labels', select)
                                    handleChanges(value,e)
                                }}
                                sx={{ width: 400 }}
                                renderInput={(params) => <TextField name="customer"{...params} label="Customer Name" />}
                            />

                   <Autocomplete
                     disablePortal
                     id="combo-box-demo"
                     name="saleOrder"
                     options={sale}
                     getOptionLabel={option => option.sales_order_number || ""}
                     sx={{ width: 400 }}
                     
                     onChange={(e, value) => {
                        // console.log('dropdown', value)
                        const select = value.sales_order_number
                       
                        handleChanges(value,e)
                    }}

                    renderInput={(params) => <TextField {...params} label="Sales Order" />}
                        />
                            </>
                            
                       
                        </Stack>
                    </Box>

                </Stack>



                <Box
                    sx={{
                        backgroundColor: "white",
                        display: "flex",
                        height: '250px',
                        flexDirection:'column',
                        justifyContent: 'flex-start',
                        paddingLeft: '30px',
                        paddingTop: '20px',


                    }}>



                    <Box
                        sx={{
                            width: 402,
                            maxWidth: '100%',
                        }}
                    >
                        <Stack direction="column" spacing={3}>
                            <TextField fullWidth size='small' InputLabelProps={{ shrink: true }} onChange={handleChange} name='package_slip' label="Package Slip" id="fullWidth" />
                            <TextField fullWidth size='small' type='date' value={today} InputLabelProps={{ shrink: true }} onChange={handleChange} name='date' label="Date" id="fullWidth" />
                        </Stack>
                    </Box>

                   

<Grid container paddingTop={3} >
    <div className="row">
        <div className="col-sm-8">
            <table className="table">
                <thead>
                    <tr>
                        <th>ITEM</th>
                        <th>ORDERED</th>
                        <th>Packed</th>
                        <th>Quantity to Pack</th>

                    </tr>
                </thead>
                <tbody>


                    {packages.map((data, index) => {
                        //console.log('arrayvalues',val)
                        const { items, ordered, packed, quantity } = data;
                        console.log('item', items)
                        //console.log("length", rowsData.length)
                        return (

                            <tr key={index}>
                                <td>
                                <Box 
                                
                        sx={{
                            width: 402,
                            //height:10,
                            maxWidth: '100%',
                        }}
                    >
                        
                            <OutlinedInput value={items}  fullWidth size='small' />
                            
                        
                    </Box>
                                </td>
                                <td><input type="number" value={1}
                                    onChange={(evnt) => (handleChanges(index, evnt))}
                                    name="ordered" className="form-control" />
                                </td>
                                <td><input type="number" value={0} onChange={(evnt) => (handleChanges(index, evnt))} name="packed" className="form-control" /> </td>
                                <td><input type="number" value={quantity} onChange={(evnt) => (handleChanges(index, evnt))} name="quantity to pack" className="form-control" /> </td>
                                <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button></td>
                            </tr>
                        )
                    })}
                    

                    {/* <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} /> */}
                </tbody>
            </table>
        </div>
        <div className="col-sm-4">
        </div>
    </div>
             

              <Box sx={{display:'flex', width: '35%',paddingTop:'40px',paddingLeft:'10px' }}>

                     <TextField  onChange={handleChange} name='customer_notes'id="outlined-basic" InputLabelProps={{ shrink: true }} label="customer Notes"
                                  variant="outlined" fullWidth/>
                  </Box>
                  

                </Grid>

                <Box
                     sx={{
                        backgroundColor: "white",
                        display: "flex",
                        height: '107px',
                        flexDirection:'row',
                        justifyContent: 'flex-start',
                        alignItems:'flex-start',
                       paddingLeft: '10px',
                        paddingTop: '50px',
                       // marginTop:'10px'


                    }}>
                  <Button style={{backgroundColor: "#1392ed" }} variant="contained" 
                           onClick={handleSubmit}>Save</Button> 
                    <Button style={{ backgroundColor: "#781055",left: 100,top: 0,fontSize: "14px" }}
                            variant="contained"  onClick={handleClickClose}color="error">Cancel</Button>
          
                </Box>
                 </Box>
 
            </Grid>


        </Grid>



    )


}