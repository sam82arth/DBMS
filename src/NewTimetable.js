import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import './AdminHome.css' 
import moment from 'moment'
import{Link,} from "react-router-dom";


function NewTimetable() {
  const[cls,setcls]=useState()
  const[section,setsection]=useState()
  const[sub,setsub]=useState([])
  const[stff,setstff]=useState([])



  let form  = document.getElementById('form');
  
  
  const submit = (event) => {
    if(form.checkValidity())
    {
      event.preventDefault();
        
  return db
    .collection("time_table")
    .doc(cls+"_"+section.toUpperCase())
    .set({
     class:cls,
     section:section,
     monday_sub : sub,
     tuesday_sub : sub,
     wednesday_sub : sub,
     thursday_sub : sub,
     friday_sub : sub,
     saturday_sub : sub,
     monday_staff : stff,
     tuesday_staff :stff,
     wednesday_staff : stff,
     thursday_staff:stff,
     friday_staff:stff,
     saturday_staff:stff,
     
      

    }).then((docRef) => {
      window.alert("Successfully added timetable to the database");     
      form.reset();
      setsection("")
      setsub([])
      setstff([])
  })
  .catch((error) => {
      window.alert(error);
  });
  ;
     
    }
    };




  return (
    <div>
      <form id = "form">
            <div>
            <br/> <br/> 
            <div className = "flexi"> 
              <div>
          <input
            placeholder="Class"
           type="text" 
           onChange={(e) => setcls(e.target.value)}
         />
          </div>
          <div>
         <input

           type="text" 
           placeholder = "section"
           value={section}
           onChange={(e) => setsection(e.target.value.toUpperCase())}
         />
         </div></div>
         </div>
        
         <br/><br/>
         <table className="table is-fullwidth is-striped">
        <tbody>
           
 
              

    
                      
                      <section className ="wid"> 
               <tr>
                            <td width = "30%">1st period</td>
                              <td width = "40%"className="level-top"></td>
      
                              <td><input 
                              placeholder = "subject"
                              required="true"
                              onChange={(e) => sub[0]=(e.target.value.toUpperCase())}
                              ></input></td>
                              <td><input
                                 placeholder = "staff id"
                                 required="true"
                                 onChange={(e) => stff[0]=(e.target.value.toUpperCase())}
                              ></input></td>
        
                </tr>
                <tr>
                           
      
                <td width = "30%">2nd period</td>
                              <td width = "40%"className="level-top"></td>
      
                              <td><input
                              required ="true" 
                              placeholder = "subject"
                              onChange={(e) => sub[1]=(e.target.value.toUpperCase())}
                              ></input></td>
                               <td><input
                                 placeholder = "staff id"
                                 required="true"
                                 onChange={(e) => stff[1]=(e.target.value.toUpperCase())}
                              ></input></td>
        
                </tr>
                <tr>
                           
      
                           <td width = "30%">3rd period</td>
                                         <td width = "40%"className="level-top"></td>
                 
                                         <td><input 
                                         required ="true" 
                              placeholder = "subject"
                              onChange={(e) => sub[2]=(e.target.value.toUpperCase())}
                              ></input></td>
                                       <td><input
                                 placeholder = "staff id"
                                 required="true"
                                 onChange={(e) => stff[2]=(e.target.value.toUpperCase())}
                              ></input></td>
                   
                           </tr>
                           <tr>
                           
      
                           <td width = "30%">4th period</td>
                                         <td width = "40%"className="level-top"></td>
                 
                                         <td><input 
                                         required ="true" 
                              placeholder = "subject"
                              onChange={(e) => sub[3]=(e.target.value.toUpperCase())}
                              ></input></td>
                                        <td><input
                                 placeholder = "staff id"
                                 required="true"
                                 onChange={(e) => stff[3]=(e.target.value.toUpperCase())}
                              ></input></td>
                   
                           </tr>
                           <tr>
                           
      
                           <td width = "30%">5th period</td>
                                         <td width = "40%"className="level-top"></td>
                 
                                         <td><input 
                                         required ="true" 
                              placeholder = "subject"
                              onChange={(e) => sub[4]=(e.target.value.toUpperCase())}
                              ></input></td>
                                          <td><input
                                 placeholder = "staff id"
                                 required="true"
                                 onChange={(e) => stff[4]=(e.target.value.toUpperCase())}
                              ></input></td>
                   
                           </tr>
                           <tr>
                           
      
                           <td width = "30%">6th period</td>
                                         <td width = "40%"className="level-top"></td>
                 
                                         <td><input 
                                         required ="true" 
                              placeholder = "subject"
                              onChange={(e) => sub[5]=(e.target.value.toUpperCase())}
                              ></input></td>
                                   <td><input
                                 placeholder = "staff id"
                                 required="true"
                                 onChange={(e) => stff[5]=(e.target.value.toUpperCase())}
                              ></input></td>
                   
                           </tr>
                           <tr>
                           
      
                           <td width = "30%">7th period</td>
                                         <td width = "40%"className="level-top"></td>
                 
                                         <td><input 
                                         required ="true" 
                              placeholder = "subject"
                              onChange={(e) => sub[6]=(e.target.value.toUpperCase())}
                              ></input></td>
                                     <td><input
                                 placeholder = "staff id"
                                 required="true"
                                 onChange={(e) => stff[6]=(e.target.value.toUpperCase())}
                              ></input></td>
                   
                           </tr>
                           <tr>
                           
      
                           <td width = "30%">8th period</td>
                                         <td width = "40%"className="level-top"></td>
                 
                                         <td><input 
                                         required ="true" 
                              placeholder = "subject"
                              onChange={(e) => sub[7]=(e.target.value.toUpperCase())}
                              ></input></td>
                                      <td><input
                                 placeholder = "staff id"
                                 required="true"
                                 onChange={(e) => stff[7]=(e.target.value.toUpperCase())}
                              ></input></td>
                   
                           </tr>
                </section>
            
               
            
             </tbody>
             </table>
             <div className ="block">
                  <input type="submit" className="btnsubmit" value="Submit!" onClick = {submit} />
                  </div>
             </form>
    </div>
  )
}

export default NewTimetable
