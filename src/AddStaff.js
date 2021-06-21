import React, { useState, useEffect } from "react";

import { auth, db } from "./firebase";
import './AddStudent.css';


function AddStaff() {
    const[fname,setfName]=useState('');
    const[mname,setmName]=useState('');
    const[lname,setlName]=useState('');
    const [id,setId]=useState('');
   const[jid,setjId]=useState('')
    const[dob,setdob]=useState('');
    const[gender,setgender]=useState('');
    const[aadhar,setaadhar]=useState('');
    const[doj,setdoj]=useState('');
    const[mobile,setmobile]=useState('');
    const[address,setadress]=useState('');
    const[salary,setsalary]=useState(0);
        const[email,setemail]=useState('');
    const[teaching,setteaching]=useState('');
  
  
  
     
  
      let form  = document.getElementById('form');
  
  
      const submit = (event) => {
        if(form.checkValidity())
        {
          event.preventDefault();
            
      return db
        .collection("student")
        .doc(id)
        .set({
          sf_aadhar_no: aadhar,
          job_id:jid,
          sf_name: fname+" "+ mname+" "+lname,
          staff_id: id,
          salary:salary,
          address: address,
          date_of_joining:doj,
          sf_dob:dob,
          mob_no:mobile,
          sf_email:email,
          sf_gender:gender,
          teaching:teaching
          
  
        }).then((docRef) => {
          window.alert("Successfully added student to the database");     
          auth
          .createUserWithEmailAndPassword(id+"@vikashighschool.com", dob).then((cred) =>{
            console.log(cred)
           form.reset();
  
          })
          .catch((error) => {
            console.log(error)
          })
         
  
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
                    placeholder="First Name"
                    onChange={(e) => setfName(e.target.value)}
                  />
                   <input
                       
                    type="text"
                    placeholder="Middle Name"
                    onChange={(e) => setmName(e.target.value)}
                  />
                   <input
                    required="true"
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setlName(e.target.value)}
                  />
                  </div>
  
                  <div className ="block">
                  <input
                      required="true"
                    type="text"
                    placeholder="Staff Id"
                    onChange={(e) => setId(e.target.value)}
                  />
                   <input
                    required="true"
                    type="text"
                    placeholder="Job Id"
                    onChange={(e) => setjId(e.target.value)}
                  />
                    <select  onChange={(e) => setgender(e.target.value)}  placeholder="Gender" required >
                 <option value="" selected="selected">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                 
                  </select>
                   
                  
                  </div>
  
  

  
          
  
                  <div className ="block">
               
                  <input
                    required="true"
                    disabled="true"
                    type="text"
                    placeholder="Date of Birth = >"
                   
                  />
                  <input
                    required="true"
                  
                    type="date"
                    placeholder="Date of Birth = >"
                    onChange={(e) => setdob(e.target.value)}
                  />
                   <input
                    required="true"
                    type="text"
                    placeholder="Aadhar No."
                    onChange={(e) => setaadhar(e.target.value)}
                  />
                  
                  </div>
  
                    <div className ="block">

                    <input
                     required="true"
                   
                     type="number"
                     placeholder="Salary"
                     onChange={(e) => setsalary(e.target.value)}
                    
                   />
                    
                    <input
                    required="true"
                    disabled="true"
                    type="text"
                    placeholder="Date of Joining = >"
                   
                  />
                  <input
                    required="true"
                  
                    type="date"
                    placeholder="Date of Birth = >"
                    onChange={(e) => setdoj(e.target.value)}
                  />

                    </div>
                  
                 
  
  
                  <div className ="block">


                  <select  onChange={(e) => setteaching(e.target.value)}  placeholder="Gender" required >
                 <option value="" selected="selected">Teaching Staff</option>
                  <option value="Yes">Yes</option>
                  <option value="Noe">No</option>
               
                 </select>

                  <input
                    required="true"
                    type="tel"
                    placeholder="Contact No."
                    onChange={(e) => setmobile(e.target.value)}
                  />
                   <input
                      required="true"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                  
                  
                  </div>
  
                 
  
                  <div className ="block">
                    <textarea
                    required="true"
                    type="text"
                    placeholder="Address"
                    onChange={(e) => setadress(e.target.value)}
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
  

export default AddStaff
