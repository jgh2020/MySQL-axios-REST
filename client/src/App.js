import React, { useState, useEffect, Component }  from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Addword from './post';
import Updateword from './put';
import Deleteword from './delete';

function App () {
  let [words, setWords] = useState([]);
  let [isAddFormShown, setIsAddFormShown] = useState(false);
  let [isUpdateFormShown, setIsUpdateFormShown] = useState(false);
  let [updateID, setUpdateID] = useState(0);
  let [inputEng, setInputEng] = useState("");
  let [inputKor, setInputKor] = useState("");
  let [searchKeyword, setSearchKeyword] = useState("");
 
  useEffect(() => {
    axios.get('/api/data', {
    }).then(res => setWords(res.data)
    ).catch(err => console.log(err));
  }, [])

  let searchResults = words.filter(
    (el) => el.engword.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || el.korword.indexOf(searchKeyword) > -1
  );

  return (
    <div className="App">
        <input type="test" placeholder="Search" onChange={(e)=>{ setSearchKeyword(e.target.value) }}/><br/><br/>
        <button onClick={()=>{
          setIsAddFormShown(!isAddFormShown);
          setInputEng("");
          setInputEng("");
        }}>Add</button>
        <Addword inputEng={inputEng} inputKor={inputKor} setInputEng={setInputEng} setInputKor={setInputKor} 
          isAddFormShown={isAddFormShown} setIsAddFormShown={setIsAddFormShown}/>
        {
          searchResults.length > 0
          ? 
            <div>
              <p>결과는 : {searchResults.length}</p>
              {
                searchResults.map(function(a, index){
                  return(
                    <div key={index}>
                      <TableRow>
                        <TableCell>{a.id}</TableCell>
                        <TableCell><img src={"http://placeimg.com/64/64/"+index+""}/></TableCell>
                        <TableCell>{a.engword}</TableCell>
                        <TableCell>{a.korword}</TableCell>
                        <TableCell><button onClick={()=>{
                          setIsUpdateFormShown(!isUpdateFormShown);
                          setUpdateID(a.id);
                          setInputEng("");
                          setInputEng("");
                        }}>Update</button></TableCell>
                        <Updateword a={a} updateID={updateID} setUpdateID={setUpdateID} inputEng={inputEng} inputKor={inputKor} setInputEng={setInputEng} 
                          setInputKor={setInputKor} isUpdateFormShown={isUpdateFormShown} setIsUpdateFormShown={setIsUpdateFormShown}/>
                        <Deleteword a={a}/>
                      </TableRow>
                    </div>
                  )
                })
              }
            </div>
          : <p>No data!!</p>
        }       
    </div>
  )
}

export default App;

 // <<1번 : fetch 방법>>
          // fetch("http://localhost:5000/api/data", { 
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   method: "GET",
          //   body: JSON.stringify(),
          // })
          //   .then((res) => res.json())
          //   .then((json) => {
          //     setCustomers(json);
          //   });

          // <<2번 : axios 방법>>
