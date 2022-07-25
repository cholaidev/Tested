import { Formik, Form, Field, FieldArray } from 'formik';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from "react/cjs/react.development"
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import React from 'react';

const FriendList = () => (
    <div>
        <h1>items</h1>
        <Formik
            initialValues={{
                subSkillName: "",
                queries: [
                    {
                        query: "",
                        intent: '',

                    }
                ]
            }}
            onSubmit={values =>
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                }, 500)
            }
            render={({ values }) => (
                <Form>

                    <FieldArray
                        name="value"
                        render={arrayHelpers => (
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
                                                        name="quantity" className="form-control" /> </td>
                                                    <td><input type="number" value={rate} onChange={(evnt) => (handleChanges(index, evnt))} name="rate" className="form-control" /> </td>
                                                    <td><input type="number" value={amount} onChange={(evnt) => (handleChanges(index, evnt))} name="amount" className="form-control" /> </td>
                                                    <td><button className="btn btn-outline-danger" onClick={() => (deleteTableRows(index))}>x</button></td>
                                                </tr>
                                            )
                                        })
                                        }

                                        {/* <TableRows rowsData={rowsData} deleteTableRows={deleteTableRows} handleChange={handleChange} /> */}
                                    </tbody>
                                </table>
                                {values.queries && values.queries.length > 0 ? (
                                    values.queries.map((friend, index) => (
                                        <div key={index}>
                                            <label>subskillname</label>
                                            <Field name={`queries.${index}.query`} placeholder='query' />
                                            <Field name={`queries.${index}.intent`} placeholder='intent' />


                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                            >
                                                -
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => arrayHelpers.push({


                                                    query: "",
                                                    intent: '',


                                                }
                                                )} // insert an empty string at a position
                                            >
                                                +
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <button type="button" onClick={() => arrayHelpers.push({

                                        query: "",
                                        intent: '',


                                    }
                                    )}>
                                        {/* show this when user has removed all friends from the list */}
                                        Add a queries
                                    </button>
                                )}
                                {/* <div>
                    <button type="submit">Submit</button>
                  </div> */}
                            </div>
                        )}
                    />
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            )}
        />
    </div>
);

export default FriendList;