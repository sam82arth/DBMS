import React, { useState } from "react";

import { auth, db } from "./firebase";
import './AddStudent.css';


function AddClass() {
    const[cclass,setclass]=useState('');
    const[section,setsection]=useState('');
    const[ct,setct]=useState('');
    const [eng,seteng]=useState('');
   const[gk,setgk]=useState('')
    const[hindi,sethindi]=useState('');
    const[maths,setmaths]=useState('');
    const[sc,setsc]=useState('');
    const[monitor,setmonitor]=useState('');
    const[snk,setsnk]=useState('');
    const[sst,setsst]=useState('');
    const[strength,setstrength]=useState(0);

  
  
  
     
  
      let form  = document.getElementById('form');
  
  
      const submit = (event) => {
        if(form.checkValidity())
        {
          event.preventDefault();
            
      return db
        .collection("class")
        .doc(cclass+"_"+section)
        .set({
          cl_class: cclass,
          cl_section:section,
          class_teacher_id: ct,
          english_staff_id: eng,
          gk_staff_id:gk,
          hindi_staff_id: hindi,
          maths_staff_id:maths,
          scienec_staff_id:sc,
          sbk_staff_id:snk,
          social_science_staff_id:sst,
          monitor_id:monitor,
          strength:strength
          
  
        }).then((docRef) => {
          window.alert("Successfully added student to the database");     
          form.reset();
      })
      .catch((error) => {
          window.alert(error);
      });
      ;
         
        }
        };
  
  
      return (
          <div >
      
  
              <div  className ="form2" >
            
                  <form id = "form">
  
                  <div className ="block">
                  <input
                      required="true"
                    type="text"
                    placeholder="Class "
                    onChange={(e) => setclass(e.target.value)}
                  />
                   <input
                       
                    type="text"
                    placeholder="Section"
                    onChange={(e) => setsection(e.target.value)}
                  />
                   <input
                    required="true"
                    type="text"
                    placeholder="Class Teacher ID"
                    onChange={(e) => setct(e.target.value)}
                  />
                  </div>
  
                  <div className ="block">
                  <input
                      required="true"
                    type="text"
                    placeholder="English Teacher Staff Id"
                    onChange={(e) => seteng(e.target.value)}
                  />
                   <input
                    required="true"
                    type="text"
                    placeholder="Hindi Teacher Staff Id"
                    onChange={(e) => sethindi(e.target.value)}
                  />
                     <input
                    required="true"
                    type="text"
                    placeholder="Maths Teacher Staff Id"
                    onChange={(e) => setmaths(e.target.value)}
                  />
                   
                  
                  </div>
  
  

  
          
  
                  <div className ="block">
               
                  <input
                    required="true"
                    type="text"
                    placeholder="G.K. Teacher Staff Id"
                    onChange={(e) => setgk(e.target.value)}
                   
                  />
                  <input
                    required="true"
                  
                    type="text"
                    placeholder="Science Teacher Staff Id"
                    onChange={(e) => setsc(e.target.value)}
                  />
                   <input
                    required="true"
                    type="text"
                    placeholder="Social Science Teacher Staff Id"
                    onChange={(e) => setsst(e.target.value)}
                  />
                  
                  </div>
  
                    <div className ="block">

                    <input
                     required="true"
                   
                     type="number"
                     placeholder="Strength"
                     onChange={(e) => setstrength(e.target.value)}
                    
                   />
                    
                    <input
                    required="true"
                    onChange={(e) => setstrength(e.target.value)}
                    type="text"
                    placeholder="Monitor ID"
                   
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
  


export default AddClass
