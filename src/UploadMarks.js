import React, { useState, useEffect } from "react";
import "./AddStudent.css"
import {  db } from "./firebase";
import firebase from "firebase";


function UploadMarks() {
    const [update,setupdate]=useState(false)
    const [exam,setexam]=useState([])
    const [eng,seteng]=useState(0);
   const[gk,setgk]=useState(0)
    const[hindi,sethindi]=useState(0);
    const[maths,setmaths]=useState(0);
    const[sc,setsc]=useState(0);
    const[snk,setsnk]=useState(0);
    const[sst,setsst]=useState(0);
    const[classs,setclasss]=useState(0);
    const[section,setsection]=useState(0);
    const[toal,settotal]=useState(0);
    const[perc,setperc]=useState(0);
    const[year,setyear]=useState();
    const[ename,setename]=useState();
    const[markso,setmarkso]=useState(0);
    const[sid,setsid]=useState()
    const[searchexam,setsearchexam]=useState()
    const[searchid,setseatchid]=useState();
    const[searchyear,setsearchyear]=useState(0);

    useEffect(() => {
  
        db.collection("examination").onSnapshot((snapshot) => {
          setexam(
            snapshot.docs.map((docu) => ({
              id: docu.id,
              exam: docu.data(), 
            }))
          );
        })
      }, []);

    


      let form  = document.getElementById('form');
  
  
      const submit = (event) => {
        if(form.checkValidity())
        {
          event.preventDefault();
            
      return db
        .collection("examination")
        .add({
         exam_name:ename,
         year:year,
         english:eng,
         maths:maths,
         sanskrit:snk,
         science:sc,
         social_science:sst,
         gk:gk,
         student_id:sid,
         total:toal,
         obtained_marks: gk+hindi+maths+sst+eng+sc+snk,
         percentage : ((gk+hindi+maths+sst+eng+sc+snk)/toal)*100

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
  


if(update === true)
{

    return (
        <div>
              <ul className="menu-list">
             
             <li>
          
               <ul className = "listt">
               <li ><a onClick= {()=>setupdate (false)} >New Marks Upload</a></li>
                 <li  onClick ={()=>setupdate (true)}><a className="is-active" >Update Existing</a></li>
                 
               </ul>
             </li>
             
           </ul>

           <div className="column is-9">
          <form id = "form">
            <div>
            <br/> <br/> 
          <input
            placeholder="student id"
           type="text" 
           onChange={(e) => setseatchid(e.target.value)}
         />
          <> </>
         <input

           type="number" 
           placeholder = "year"
           onChange={(e) => setsearchyear(e.target.valueAsNumber)}
         />
         <> </>

        

        <select  onChange={(e) => setsearchexam(e.target.value)}  placeholder="Exam"  required="true">
         <option value="" selected="selected">Exam</option>
          <option value="Internal 1">Internal 1</option>
          <option value="Internal 2">Internal 2</option>
          <option value="Final">Final</option>
          </select>

          </div>
          <div>
            </div>
          <br/><br/><br/>
          {exam.map(({ exam, id}) => {
            if(searchexam===exam.exam_name && searchyear === exam.year && searchid === exam.student_id)
            {
            return(
              <div>
                  
                  <div className ="block">
          <input
             
            type="number"
            placeholder="Marks in English"
            onChange={(e) => seteng(e.target.valueAsNumber)}
          />
           <input
             
             type="number"
             placeholder="Marks in Hindi"
             onChange={(e) => sethindi(e.target.valueAsNumber)}
           />
           <input
             
             type="number"
             placeholder="Marks in Maths"
             onChange={(e) => setmaths(e.target.valueAsNumber)}
           />
           
          </div>




  

          <div className ="block">
       
          <input
             
            type="number"
            placeholder="Marks in Science"
            onChange={(e) => setsc(e.target.valueAsNumber)}
          />
         <input
             
             type="number"
             placeholder="Marks in Social Science"
             onChange={(e) => setsst(e.target.valueAsNumber)}
           />
          <input
             
             type="number"
             placeholder="Marks in Sanskrit"
             onChange={(e) => setsnk(e.target.valueAsNumber)}
           />
          
          </div>

            <div className ="block">

            <input
             
             type="number"
             placeholder="Marks in G.K."
             onChange={(e) => setgk(e.target.valueAsNumber)
        
             }
           />

            <input
           
            disabled="true"
            type="number"
            value= {eng+maths+gk+sc+snk+sst+hindi}
           
          />
          <input
            required="true"
          
            type="number"
            placeholder="TotalMarks"
            onChange={(e) => settotal(e.target.valueAsNumber)}
          />

            </div>
          
            
            <button type ="submit">Update Maarks</button>
            </div>
            )
            }
          }
          )}
          <br/>
         
          </form>
            </div>
         
        </div>
    )
}


    return (
        <div>
              <ul className="menu-list">
             
             <li>
          
               <ul className = "listt">
               <li ><a  className="is-active" >New Marks Upload</a></li>
                 <li><a onClick = {()=>setupdate (true)}>Update Existing</a></li>
                 
               </ul>
             </li>
             
           </ul>

           <div >
      
  
      <div  className ="form2" >
    
          <form id = "form">

          <div className ="block">
          <input
            required="true"
            type="text"
            placeholder="Studnt ID"
            onChange={(e) => setsid(e.target.value)}
          />
        <select  onChange={(e) => setename(e.target.value)}  placeholder="Exam"  required="true">
         <option value="" selected="selected">Exam</option>
          <option value="Internal 1">Internal 1</option>
          <option value="Internal 2">Internal 2</option>
          <option value="Final">Final</option>
         
          </select>
           <input
            required="true"
            type="number"
            placeholder="Year"
            onChange={(e) => setyear(e.target.valueAsNumber)}
          />
          </div>

          <div className ="block">
          <input
             
            type="number"
            placeholder="Marks in English"
            onChange={(e) => seteng(e.target.valueAsNumber)}
          />
           <input
             
             type="number"
             placeholder="Marks in Hindi"
             onChange={(e) => sethindi(e.target.valueAsNumber)}
           />
           <input
             
             type="number"
             placeholder="Marks in Maths"
             onChange={(e) => setmaths(e.target.valueAsNumber)}
           />
           
          </div>




  

          <div className ="block">
       
          <input
             
            type="number"
            placeholder="Marks in Science"
            onChange={(e) => setsc(e.target.valueAsNumber)}
          />
         <input
             
             type="number"
             placeholder="Marks in Social Science"
             onChange={(e) => setsst(e.target.valueAsNumber)}
           />
          <input
             
             type="number"
             placeholder="Marks in Sanskrit"
             onChange={(e) => setsnk(e.target.valueAsNumber)}
           />
          
          </div>

            <div className ="block">

            <input
             
             type="number"
             placeholder="Marks in G.K."
             onChange={(e) => setgk(e.target.valueAsNumber)
        
             }
           />

            <input
           
            disabled="true"
            type="number"
            value= {eng+maths+gk+sc+snk+sst+hindi}
           
          />
          <input
            required="true"
          
            type="number"
            placeholder="TotalMarks"
            onChange={(e) => settotal(e.target.valueAsNumber)}
          />

            </div>
          
         


          <div className ="block">
          <input type="submit" className="btnsubmit" value="Submit!" onClick = {submit} />
          </div>
          </form>
          </div>
          </div>



        </div>
    )
}

export default UploadMarks