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
    const[updateid,setupdateid]=useState("")

    useEffect(() => {
      console.log("hi")
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
         english_marks:eng,
         maths_marks:maths,
         hindi_marks:hindi,
         sanskrit_marks:snk,
         science_marks:sc,
         social_science_marks:sst,
         gk_marks:gk,
         student_id:sid.toUpperCase(),
         total_marks:toal,
         marks_obtained: gk+hindi+maths+sst+eng+sc+snk,
         percentage : ((gk+hindi+maths+sst+eng+sc+snk)/toal)*100

        }).then((docRef) => {
          window.alert("Successfully added marks ");     
          form.reset();
    
      })
      .catch((error) => {
          window.alert(error);
      });
      ;
         
        }
        };


  
      const update_marks = (event) => {
        if(form.checkValidity())
        {
          event.preventDefault();
            
      return db
        .collection("examination").doc(updateid)
        .update({
        
          
          english_marks:eng,
          maths_marks:maths,
          hindi_marks:hindi,
          sanskrit_marks:snk,
          science_marks:sc,
          social_science_marks:sst,
          gk_marks:gk,
     
          total_marks:toal,
          marks_obtained: gk+hindi+maths+sst+eng+sc+snk,
          percentage : ((gk+hindi+maths+sst+eng+sc+snk)/toal)*100

        }).then((docRef) => {
          window.alert("Successfully updated marks");  
          setsearchexam("")
          setsearchyear("")
          setseatchid("")   
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
               <li ><a onClick= {()=>{
                  seteng(0)
                  sethindi(0)
                  setsc(0)
                  setsst(0)
                  setsnk(0)
                  setmaths(0)
                  setgk(0)
                 setupdate (false)} 
               }>New Marks Upload</a></li>
                 <li  onClick ={()=>{setupdate (true)
                  seteng(0)
                  sethindi(0)
                  setsc(0)
                  setsst(0)
                  setsnk(0)
                  setmaths(0)
                  setgk(0)
                  

                }}><a className="is-active" >Update Existing</a></li>
                 
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
           value={searchid.toUpperCase()}
           onChange={(e) => setseatchid(e.target.value.toUpperCase())}
         />
          <> </>
         <input

           type="number" 
           placeholder = "year"
           onChange={(e) => setsearchyear(e.target.value)}
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
            console.log(exam)
            if(searchexam===exam.exam_name && searchyear === exam.year && searchid === exam.student_id)
            {
            
     
                
             
           
             
                

            return(
              <div>
            <a onClick ={ ()=>{
                seteng(exam.english_marks)
                sethindi(exam.hindi_marks)
                setsc(exam.science_marks)
                setsst(exam.social_science_marks)
                setsnk(exam.snk_marks)
                setmaths(exam.maths_marks)
                setgk(exam.gk_marks)
                setupdateid(id)
                settotal(exam.total_marks)
            }}>Load Marks</a>  
         
                  
                  <div className ="block">
          <input
             value = {eng}
            type="number"
            placeholder="Marks in English"
            onChange={(e) => seteng(e.target.valueAsNumber)}
          />
           <input
                 value = {hindi}
             type="number"
             placeholder="Marks in Hindi"
             onChange={(e) => sethindi(e.target.valueAsNumber)}
           />
           <input
                 value = {maths}
             type="number"
             placeholder="Marks in Maths"
             onChange={(e) => setmaths(e.target.valueAsNumber)}
           />
           
          </div>




  

          <div className ="block">
       
          <input
                 value = {sc}
            type="number"
            placeholder="Marks in Science"
            onChange={(e) => setsc(e.target.valueAsNumber)}
          />
         <input
                 value = {sst}
             type="number"
             placeholder="Marks in Social Science"
             onChange={(e) => setsst(e.target.valueAsNumber)}
           />
          <input
                 value = {snk}
             type="number"
             placeholder="Marks in Sanskrit"
             onChange={(e) => setsnk(e.target.valueAsNumber)}
           />
          
          </div>

            <div className ="block">

            <input
                 value = {gk}
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
             value={toal}
            type="number"
            placeholder="TotalMarks"
            onChange={(e) => settotal(e.target.valueAsNumber)}
          />

            </div>
          
            
            <button type ="submit" onClick = {update_marks}>Update Maarks</button>
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
                 <li><a onClick = {()=>{setupdate (true)
                setsearchexam("")
                setsearchyear("")
                setseatchid("")
                seteng(0)
                  sethindi(0)
                  setsc(0)
                  setsst(0)
                  setsnk(0)
                  setmaths(0)
                  setgk(0)
                  setupdateid("")
                
                }}>Update Existing</a></li>
                 
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
            value={sid}
            placeholder="Student ID"
            onChange={(e) => setsid(e.target.value.toUpperCase())}
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
            onChange={(e) => setyear(e.target.value)}
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
