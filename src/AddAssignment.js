import React, { useState, useEffect } from "react";
import {  db } from "./firebase";
import firebase from "firebase";
import moment from "moment";







function AddAssignment() {
const [classs,setclasss]=useState("")
const [section,setsection] = useState("")
const [assignment,setassignment]= useState("")
const [asgclass,setasgclass]=useState([])
const [asgsection,setasgsection] = useState([])
const [assignmentl,setassignmentl]=useState([])


useEffect(() => {
  
  db.collection("assignment").orderBy("timestamp","desc").onSnapshot((snapshot) => {
    setassignmentl(
      snapshot.docs.map((docu) => ({
        id: docu.id,
        card: docu.data(), 
        time : docu.data().timestamp.toDate(),
      }))
    );
  })
 
 
 
}, []);
let form  = document.getElementById('form1');
  
  
const submit = (event) => {
  if(form.checkValidity())
  {
    event.preventDefault();
      
return db
  .collection("assignment")
  .add({
  
    section :section.toUpperCase(),
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
                 value={section}
              type="text"
              placeholder="Section"
              onChange={(e) => setsection(e.target.value.toUpperCase())}
            />
           
            </div>

            <div className ="block">
            <textarea
                required="true"
              type="text"
              placeholder="Assignment"
              onChange={(e) => setassignment(e.target.value)}
            />
            
            </div>
            <div className ="block">
                  <input type="submit" className="btnsubmit" value="Submit!" onClick = {submit} />
                  </div>
            </form>
            </div>
            <br/>  <br/>
            <div className="columns">
                <div className="column is-6">
                  <div className="card events-card">
                    <header className="card-header">
                      <p className="card-header-title">
                        Older Assignments
                      </p>
                      <a href="#" className="card-header-icon" aria-label="more options">
                        <span className="icon">
                          <i className="fa fa-angle-down" aria-hidden="true" />
                        </span>
                      </a>
                    </header>
                    <div className="card-table">
                      <div className="content">
                        <br/> <br/>
                      <input
                     required="true"
                       type="text" 
                     placeholder = "class"
                     onChange={(e) => setasgclass(e.target.value)}
                        />
                       <> </>
                      <input
                      required="true"
                     type="text" 
                     value={asgsection}
                     placeholder ="section"
                      onChange={(e) => setasgsection(e.target.value.toUpperCase())}
                        />
                         <br/>
                         <br/>
                        <table className="table is-fullwidth is-striped">
                          <tbody>
                          <tr>
                                  <td width = "25%">Date</td>
                                  <td width = "15%"className="level-top">CLASS</td>
          
                                  <td>Assignment</td>
                            
                                  
                                </tr>
                          {assignmentl.map(({ card,time,id}) => {
                            if(card.class===asgclass && asgsection==card.section)
                            {
                                 return(
                                  <tr>
                                  <td width = "25%">{moment(time).format('DD-MM-YYYY')}</td>
                                  <td width = "15%"className="level-top">{card.class} {card.section}</td>
          
                                  <td>{card.assignment}</td>
                                  <td width="5%"><i class="fa fa-remove red-color " onClick={() =>  db.collection("assignment").doc(id).delete()}/></td>
                            
                                  
                                </tr>

                              )
                                 }
             
                            })}
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                  
                  </div>
                </div>

              </div>
        </div>
    )
}

export default AddAssignment
