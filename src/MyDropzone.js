import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import csv from "csv";

export default function MyDropzone({setXAxis, setProjectionLower, setProjection, setProjectionUpper}) {

  const onDrop = useCallback(acceptedFile => {
    const reader = new FileReader();

    const thinkalatorIO = (data) => {
      fetch('https://four-cast-app.herokuapp.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"data": data})
      })
        .then(response => response.json())
        .then(forecast => {
          csv.parse(forecast.data, (err, data) => {
            if(!err) { 
              let xAxisValues = []
              let projLower = []
              let projected = []
              let projUpper = []
              data.shift()
              data.forEach(row => {
                if(row){
                  xAxisValues.push(row[1])
                  projected.push(parseFloat(row[2]).toFixed(2))
                  projLower.push(parseFloat(row[3]).toFixed(2))
                  projUpper.push(parseFloat(row[4]).toFixed(2))
                }
              })
              setXAxis(xAxisValues)
              setProjection(projected)  
              setProjectionLower(projLower)
              setProjectionUpper(projUpper)
            } else {
              console.error(err)
            }
          }) 
        })
        .catch(promiseError => console.error(promiseError))
    }

    reader.readAsText(acceptedFile[0]);
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {
        console.log(data)
        if (err) {
          return console.error("Parsed CSV error: ", err)
        }
          thinkalatorIO(data)
      })

    };

    
  }, [setXAxis, setProjectionLower, setProjection, setProjectionUpper]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className='drag-and-drop' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag and Drop a CSV here...or Click to Select File.</p>
      )}
    </div>
  );
}
