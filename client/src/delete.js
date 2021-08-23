import React from 'react';
import axios from 'axios'
import TableCell from '@material-ui/core/TableCell'

function Deleteword(props){
    return(
        <TableCell><button onClick={(e)=>{
            var answer = window.confirm("Are you sure you want to delete this line?");
                if (answer) {
                    e.preventDefault();
                    axios.delete("/api/data/"+props.a.id);
                    window.location.replace("/");
                }
        }}>Delete</button></TableCell>
    )
}

export default Deleteword;

