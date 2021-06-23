import { useState } from "react";
import "./App.css";
import MyDropzone from "./MyDropzone";
import MyPlotly from "./MyPlotly";

function App() {

  const [ xAxis, setXAxis ] = useState(null)
  const [ projectionLower, setProjectionLower ] = useState(null)
  const [ projection, setProjection ] = useState(null)
  const [ projectionUpper, setProjectionUpper ] = useState(null)

  return (
    <div className='App'>
      
      { xAxis ? <MyPlotly 
        xAxis={xAxis} 
        projectionLower={projectionLower} 
        projection={projection}
        projectionUpper={projectionUpper}
      /> : <MyDropzone 
      setXAxis={setXAxis}
      setProjectionLower={setProjectionLower}
      setProjection={setProjection}
      setProjectionUpper={setProjectionUpper}
    />}
    </div>
  );
}

export default App;
