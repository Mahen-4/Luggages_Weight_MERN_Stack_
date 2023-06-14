import '../App.css';
import React from "react"
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';
function Journey() {
    const [luggageName, setLuggageName] = React.useState("");
    const [luggageWeight, setLuggageWeight] = React.useState(0);
    const [luggageColor, setLuggageColor] = React.useState("");
    const [luggageType, setLuggageType] = React.useState("Suitcase");
    const [luggageList, setLuggageList] = React.useState([]);
    const [reload, setReload] = React.useState(0);

    const [weightUpdate, setWeightUpdate] = React.useState(0);

    const addToList = () => {
        Axios.post("http://localhost:3001/addLuggage",{journeyCreator: 'testeurCreator',journeyName: journeyName, luggageName: luggageName, luggageWeight: luggageWeight, luggageColor: luggageColor, luggageType: luggageType});   
        setReload(reload +1)
      };

    const updateWeight = (e) => {
      Axios.post("http://localhost:3001/updateWeight", {updateWeightvalue: weightUpdate, updateLuggage: e.target.parentNode.dataset.name, journeyname: journeyName})
      setReload(reload +1)
    }
    
    const deleteLuggage = (e) => {
      Axios.post("http://localhost:3001/deleteLuggage",{deleteLuggageName: e.target.parentNode.dataset.name, journeyname: journeyName})
      setReload(reload +1)
    }

    const { journeyName } = useParams()

    React.useEffect(()=>{
      //get data of the journey
        Axios.post("http://localhost:3001/insertJourneyAndRead",{journeyCreator: 'testeurCreator',journeyName: journeyName}).then((response)=>{
          setLuggageList(response.data.AllLuggage);
          console.log(response.data)
      });
    },[journeyName, reload])

  return (
    <div className="Journey">
        <Link to="/">Home</Link>
        <div>
          <label>Name of Luggage :</label>
          <input type="text" onChange={(e)=> setLuggageName(e.target.value)}/>
        </div>
        <div>
          <label>Weight of Luggage :</label>
          <input type="number" min={0} onChange={(e)=> setLuggageWeight(e.target.value)}/>
        </div>
        <div>
          <label>Color of Luggage :</label>
          <input type="color" onChange={(e)=> setLuggageColor(e.target.value)}/>
        </div>
        <div>
          <label>type of Luggage :</label>
          <select onChange={(e)=> setLuggageType(e.target.value)}>
            <option>Suitcase</option>
            <option>Handluggage</option>
          </select>
        </div>
        <button onClick={addToList}>Add Luggage</button>

        <div>
            {
                luggageList.map((val,key)=>{
                    return(
                        <div key={key} data-name={val.LuggageName}>
                            <h1>{val.LuggageName}</h1>
                            <h2>{val.Weight} kg</h2>
                            <input type="number" min={0} onChange={(e)=>{setWeightUpdate(e.target.value)}}/>
                            <div onClick={updateWeight}>Update</div>
                            <div onClick={deleteLuggage}>Delete</div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  );
}

export default Journey;
