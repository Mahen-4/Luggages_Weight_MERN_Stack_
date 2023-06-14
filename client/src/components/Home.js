import '../App.css';
import React from "react"
import Axios from "axios"
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button"
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
function Home() {

  const [journeyName, setJourneyName] = React.useState("");
  const [userJourney, setUserJourney] = React.useState([]);
  const [reload, setReload] = React.useState(0)

  const addToList = () => {
    Axios.post("http://localhost:3001/insertUser",{journeyCreator: "testeurCreator",journeyName: journeyName});
    // window.location.reload(false)
    setReload(reload +1)
  };

  const deleteJourney = (e) => {
    Axios.post("http://localhost:3001/deleteJourney", {journeyname: e.target.parentNode.dataset.name, journeyCreator: 'testeurCreator'})
    setReload(reload +1)
  }

  React.useEffect(()=> {
        Axios.post("http://localhost:3001/readUser",{userName:"testeurCreator"})
        Axios.get("http://localhost:3001/readUserJourney").then((response)=>{
            setUserJourney(response.data)
        })
    },[reload])

  return (
    <div className="Home">
      <form>
        <div>
          {/* <input type="text" onChange={(e)=> setJourneyName(e.target.value)}/> */}
          <TextField id="standard-basic" label="Name of Journey" variant="standard"  onChange={(e)=> setJourneyName(e.target.value)}/>
        </div>
        <AddCircleIcon onClick={addToList} id="addIcon">Add Journey</AddCircleIcon>
      </form>
      

      <div>
        {
            userJourney.map((val,key)=>{
                return(
                    <div key={key} id="listJourney">
                        <ul data-name={val.JourneyName}>
                            <li><Link to={`/journey/${val.JourneyName}`} className="links"><Button variant="contained" className='btn'>{val.JourneyName}</Button></Link></li>
                            <div onClick={deleteJourney}><DeleteIcon id="deleteJourney"></DeleteIcon></div>
                        </ul>
                    </div>
                )
            })
        }
      </div>
    </div>
  );
}

export default Home;
