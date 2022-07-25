import { useState } from "react/cjs/react.development"
import TableRows from "../src/TableRows"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
function AddDeleteTableRows(){
    
    const [rowsData, setRowsData] = useState([1]);
    //const [fieldValue, setFieldVAlue] = useState();

    // const rowsInput={
        
        
    //     item:'',
    //     quantity:'',
    //     rate:''  ,
    //     amount:''
    // } 
    // console.log('rowinputs',rowsInput)
 
    const addTableRows = ()=>{
  
        const rowsInput={
            //id:'',
            item:rowsData.item,
            quantity:'',
            rate:''  ,
            amount:''
        } 
        setRowsData([...rowsData ,rowsInput])
        
      
    }
   const deleteTableRows = (val)=>{
        const rows = [...rowsData];
        rows.splice(val, 1);
        setRowsData(rows);
   }
 
   const handleChange = (val, evnt)=>{
    
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[val][name] = value;
    setRowsData(rowsInput); 
}
//const [fieldValue, setFieldVAlue] = useState();


// const handleChanges =(val,evnt)=>{

//     const { name, value } = evnt.target;
//     const rowsInput = [...fieldValue];
//     rowsInput[val][name] = value;
//     console.log('rowinput',rowsInput)
//     setFieldVAlue(rowsInput);

// }
// const handleChanges =(index,evnt)=>{

//     const { name, value } = evnt.target;
//     const rowsInput = [...fieldValue];
//     rowsInput[index][name] = value;
//     console.log('rowinput',rowsInput)
//     setFieldVAlue(rowsInput);

// }
    return(
        <div className="container">
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
                   <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} />
                   </tbody> 
                </table>
                </div>
                <div className="col-sm-4">
                </div>
            </div>
        </div>
    )
}
export default AddDeleteTableRows