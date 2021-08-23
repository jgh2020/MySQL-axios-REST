import React from 'react';
import axios from 'axios'
import TableCell from '@material-ui/core/TableCell'

function Updateword(props){
    if (props.isUpdateFormShown === true && props.a.id === props.updateID){
        return(
            <TableCell>
                <form>
                    Engword : <input type="text" placeholder="New Engword" onChange={ (e)=>{ props.setInputEng(e.target.value) } }/><br/>
                    Korword : <input type="text" placeholder="New Korword" onChange={ (e)=>{ props.setInputKor(e.target.value) } }/><br/>
                    <button onClick={(e)=>{
                        if (props.inputEng === "" || props.inputKor === ""){
                            alert('Please fill all two fields!');
                            e.preventDefault();
                        } else {
                            e.preventDefault();
                            axios.put("/api/data/"+props.a.id, {
                                engword : props.inputEng,
                                korword : props.inputKor
                            });
                            props.setIsUpdateFormShown(false);
                            props.setUpdateID(0);
                            window.location.replace("/");
                        }
                    }}>Submit</button>
                    <button onClick={()=>{
                        props.setIsUpdateFormShown(false);
                        props.setUpdateID(0);
                    }}>Cancel</button>
                </form>
            </TableCell>
        )
    } else return ( null )
}

export default Updateword;

