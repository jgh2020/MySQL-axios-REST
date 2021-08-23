import React from 'react';
import axios from 'axios'

function Addword(props){
    if (props.isAddFormShown === true){
        return(
            <form>
                Engword : <input type="text" placeholder="Eng" onChange={ (e)=>{ props.setInputEng(e.target.value) } }/><br/>
                Korword : <input type="text" placeholder="Kor" onChange={ (e)=>{ props.setInputKor(e.target.value) } }/><br/>
                <button onClick={(e)=>{
                    if (props.inputEng === "" || props.inputKor === ""){
                        alert('Please fill all two fields!');
                        e.preventDefault();
                    } else {
                        e.preventDefault();
                        axios.post("/api/data", {
                        engword : props.inputEng,
                        korword : props.inputKor
                        });
                        props.setIsAddFormShown(false);
                        window.location.replace("/");
                    }
                }}>Submit</button><button onClick={()=>{
                    props.setIsAddFormShown(false);
                }}>Cancel</button>
            </form>
        )
    } else return ( null )
}

export default Addword;

