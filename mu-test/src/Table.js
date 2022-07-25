import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';


export default function DataTables() {

    const [data, setData] = useState([])

    const columns = [
        { field: 'salutation', headerName: 'Salutation', width: 130 },
        { field: 'first_name', headerName: 'First Name', width: 130 },
        { field: 'last_name', headerName: 'Last Name', width: 130 },
        { field: 'company_name', headerName: 'Company Name', width: 130 },
        // {
        //   field: 'customer_display_name',
        //   headerName: 'Cstomer Dispaly Name',
          
        //   width: 200,
        // },
        {
          field: 'customer_email',
          headerName: 'Customer Email',
          //description: 'This column has a value getter and is not sortable.',
          //sortable: false,
          width: 160,
        //   valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        { field: 'customer_phone', headerName: 'Customer Phone', width: 130 },
        
        
      ];
      
    //   const rows = [
    //     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    //     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    //     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    //     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    //     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    //     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    //     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    //     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    //     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    //   ];
      



    const getCustomerData =async ()=>{
        const data = await axios.get(
         "http://localhost:4000/api/v1/customer"
        );
        console.log("get",data.data);
        setData(data.data);
      };
      useEffect(() =>{
       getCustomerData();
      },[]);




  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        //data={data}
        rows={data}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
    </div>
  );
}
