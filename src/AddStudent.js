import React, { useState, useEffect } from "react";
import Navbar from './Navbar';
import { auth, db } from "./firebase";
import firebase from "firebase";
import './AddStudent.css';


function AddStudent(user) {

  const[fname,setfName]=useState('');
  const[mname,setmName]=useState('');
  const[lname,setlName]=useState('');
  const [id,setId]=useState('');
  const [s_class, setClass]=useState('');
  const [section, setSection]=useState('');
  const [year,setYear]=useState('');
  const[dob,setdob]=useState('');
  const[rollno,setrollno]=useState('')
  const[gender,setgender]=useState('');
  const[aadhar,setaadhar]=useState('');
  const[doa,setdoa]=useState('');
  const[mobile,setmobile]=useState('');
  const[bg,setbg]=useState('');
  const[address,setadress]=useState('');
  const[ffname,setffName]=useState('');
  const[foccupation,setfoccupation]=useState('');
  const[mfname,setmmName]=useState('');
  const[moccupation,setmoccupation]=useState('');
  const[email,setemail]=useState();



   

    let form  = document.getElementById('form');


    const submit = (event) => {
      if(form.checkValidity())
      {
        event.preventDefault();
            console.log(dob)
    return db
      .collection("student")
      .doc(id)
      .set({
        aadhar_no: aadhar,
        academic_year: year,
        student_id: id,
        address: address,
        blood_group : bg,
        contact_no:mobile,
        date_of_admission:doa,
        dob:dob,
        email:email,
        father_name:ffname,
        father_occupation : foccupation,
        mother_name : mfname,
        mother_occupation : moccupation,
        gender:gender,
        roll_no:rollno,
        s_class:s_class,
        section:section,
        s__first_name:fname,
        s_middle_name:mname,
        s_last_name:lname,

      }).then((docRef) => {
        window.alert("Successfully added student to the database");
        setClass("")
        setId("")
        setSection("")
        setYear("")
        setadress("");
        setbg("")
        setfName("")
        setmName("")
        setlName("")
        setffName("")
        setfoccupation("")
        setmobile("")
        setemail("")
        setmmName("")
        setmoccupation("")
        setdoa("")
        setdob("")
        setgender("")
        setrollno("")
        setemail("")
         
        auth
        .createUserWithEmailAndPassword(id+"@vikashighschool.com", dob).then((cred) =>{
          console.log(cred)
          window.location.reload();

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
                  placeholder="Student Id"
                  onChange={(e) => setId(e.target.value)}
                />
                 <input
                  required="true"
                  type="text"
                  placeholder="Class"
                  onChange={(e) => setClass(e.target.value)}
                />
                 <input
                  required="true"
                  type="text"
                  placeholder="Section"
                  onChange={(e) => setSection(e.target.value)}
                />
                
                </div>


                <div className ="block">
                <input
                    required="true"
                  type="number"
                  placeholder="Academic Year"
                  onChange={(e) => setYear(e.target.value)}
                />
                  <select  onChange={(e) => setgender(e.target.value)}  placeholder="Gender" required >
               <option value="" selected="selected">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
               
                </select>
                 <input
                  required="true"
                  type="text"
                  placeholder="Roll No."
                  onChange={(e) => setrollno(e.target.value)}
                />
                
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
                  placeholder="Blood Group"
                  onChange={(e) => setbg(e.target.value)}
                />
                
                </div>

                



                <div className ="block">
                <input
                    required="true"
                  type="text"
                  placeholder="Aadhar Number"
                  onChange={(e) => setaadhar(e.target.value)}
                />
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

                <input
                  required="true"
                  disabled="true"
                  type="text"
                  placeholder="Date of Admission = >"
                 
                />
              

                 <input
                    required="true"
                  type="date"
                  placeholder="Date of Admission"
                  onChange={(e) => setdoa(e.target.value)}
                />

                <input
                    required="true"
                  type="text"
                  placeholder="Father's Name"
                  onChange={(e) => setffName(e.target.value)}
                />
                
               
                
                </div>
                <div className="block">
                <input
                  required="true"
                  type="text"
                  placeholder="Father's Occupation"
                  onChange={(e) => setfoccupation(e.target.value)}
                />
                <input
                    required="true"
                  type="text"
                  placeholder="Mother's Name"
                  onChange={(e) => setmmName(e.target.value)}
                />
                 <input
                  required="true"
                  type="text"
                  placeholder="Mother's Occupation"
                  onChange={(e) => setmoccupation(e.target.value)}
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

export default AddStudent
