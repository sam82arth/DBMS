import React, { useState, useEffect } from "react";
import {  db } from "./firebase";
import firebase from "firebase";



function AddAssignment() {
const [classs,setclasss]=useState("")
const [section,setsection] = useState("")
const [assignment,setassignment]= useState("")




let form  = document.getElementById('form1');
  
  
const submit = (event) => {
  if(form.checkValidity())
  {
    event.preventDefault();
      
return db
  .collection("assignment")
  .add({
  
    section :section,
    assignment: assignment,
    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    class:classs
    
    

  }).then((docRef) => {
    window.alert("Successfully added assignmet");     
    form.reset();
})
.catch((error) => {
    window.alert(error);
});
;
   
  }
  };




    return (
        <div>
            
            <div  className ="form2" >
            
            <form id = "form1">

            <div className ="block">
            <input
                required="true"
              type="text"
              placeholder="Class "
              onChange={(e) => setclasss(e.target.value)}
            />
             <input
                 
              type="text"
              placeholder="Section"
              onChange={(e) => setsection(e.target.value)}
            />
           
            </div>

            <div className ="block">
            <textarea
                required="true"
              type="text"
              placeholder="Assignemt"
              onChange={(e) => setassignment(e.target.value)}
            />
            
            </div>
            <div className ="block">
                  <input type="submit" className="btnsubmit" value="Submit!" onClick = {submit} />
                  </div>
            </form>
            </div>
        </div>
    )
}

export default AddAssignment
