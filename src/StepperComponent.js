import React, { useEffect, useRef, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep, MDBBtn, MDBInput } from "mdbreact";
import { render } from "@testing-library/react";
import Step1 from "./Step1";
import Steps from './Steps'
import CSVReader from "react-csv-reader";



function StepperComponent(props) {

  let fileObj = []
  let fileArray = []


  const[step, setStep] = useState({
    formActivePanel1: 1,
    
    formActivePanel1Changed: false,
  })

  const[imagePreview, setImagePreview] = useState({
    file: '',
    imagePreviewUrl: ''
  })

  const[address, setAddress] = useState('')
  const[bathroom, setBathroom] = useState(1)
  const[bedroom, setBedroom] = useState(1)
  const[description, setDescription] = useState('')
  const required = value => (value ? undefined : "Required");


  const handleForce = (data, fileInfo) => console.log(data, fileInfo);

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
  };
  
  
  const handleNextPrevClick = (a) => (param) => (e) => {
    setStep({
      ['formActivePanel' + a]: param,
      ['formActivePanel' + a + 'Changed']: true
    });
  }
  
  const handleSubmission = (e) => {
    e.preventDefault()
    console.log("address", address)
    console.log("bathroom", bathroom)
    console.log("bedroom", bedroom)
    console.log("description", description)
    console.log('image', imagePreview)
    alert('Form Submitted')
  }
  
  
 

  const multipleHandleImageChange = (e) => {
    fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        setImagePreview({ file: fileArray })
  }
  const handleImage = (e) => {
    e.preventDefault()
    console.log('Image :', imagePreview.file)
  }

  const handleImageChange = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {    
    setImagePreview({
        file : file,
        imagePreviewUrl : reader.result
      })
    }
    reader.readAsDataURL(file)
  }
  let {imagePreviewUrl} = imagePreview
  let $imagePreview = null
  if (imagePreviewUrl) {
    $imagePreview = (<img src={imagePreviewUrl} />);
  } else {
    $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
  }
 return (
        <div className ="stepper">
          
        
          {step.formActivePanel1 == 1 &&
          (
            <div className = "step1">
              <Steps step1></Steps>
              <button className = "add-button" onClick = {handleNextPrevClick(1)(2)}>Add From Scratch</button>
              <h2 style ={{marginTop: '40px'}}>OR</h2>
              <CSVReader 
              cssClass="react-csv-input"
              onFileLoaded={handleForce}
              parserOptions={papaparseOptions}/>
              <p>(You can see the results on console)</p>
            </div>
            
          )}
          <form role="form"  onSubmit = {handleSubmission}>
          {step.formActivePanel1 == 2 &&
          (<div className ="step2">
            <Steps step1 step2></Steps>
            <div className = "step2-container">
              <h1>Enter Your details</h1>
            

              <input type = "text"  placeholder = "Address" value = {address} onChange = {(e) => setAddress(e.target.value)} required = "required" />
              <input type = "number" max = "10" value = {bedroom} onChange = {(e) => setBedroom(e.target.value)} required = "required"  placeholder = "bedroom" />
              <input type = "number" max ="5" value = {bathroom} onChange = {(e) => setBathroom(e.target.value)} required = "required"  placeholder = "bathroom" />
              <input type = "text" value = {description} onChange = {(e) => setDescription(e.target.value)} placeholder = "Description(optional)" />
              <button className = "add-button" onClick = {handleNextPrevClick(1)(1)}>Previous</button>
              <button className = "add-button" onClick={handleNextPrevClick(1)(3)}>Submit</button>


            
            </div>
           
          </div>)}

          {step.formActivePanel1 == 3 &&
          (<div className = "step3">
            <Steps step1 step2 step3></Steps>
            <div className = "previewComponent">
              
              <input className = "fileInput" type="file" onChange ={(e) => handleImageChange(e)} ></input>
              <button className = "add-button" onClick = {handleNextPrevClick(1)(2)}>Previous</button>
              <button className = "add-button" onClick = {handleImage} >Upload Image</button>
              
            </div>
            <div className="imgPreview">
           {$imagePreview}
           </div>
        <button className ="add-button" onClick={handleSubmission}>Submit Your Form</button>
          </div>)}

        
      </form>
           </div>
          
        
)
}

export default StepperComponent
