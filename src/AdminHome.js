import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import VerticalBarGraph from '@chartiful/react-vertical-bar-graph'

import './AdminHome.css' 
import moment from 'moment'
import
{
Link,
} from "react-router-dom";
import AddStudent from "./AddStudent";
import AddStaff from "./AddStaff"
import AddClass from "./AddClass";
import NewTimetable from "./NewTimetable"
function AdminHome(user) {

const [notice,setNotice]=useState([])
const[jd,setJd]=useState([]);
const [student,setStudent]=useState("STUDENT_ID");
const [staff,setStaff]=useState("STAFF_ID");
const [ast,setAst]=useState(false)
const [asf,setAsf]=useState(false);
const [card,setCard]=useState(null);
const [Scard,setScard]=useState(null);
const [staffa,setStaffa]=useState(false);
const  [stsearch,setStsearch]=useState(false)
const  [sfsearch,setSfsearch]=useState(false)
const [sattd,setsattd]=useState([])
const [sfattd,setsfattd]=useState([])
const [staffl,setstaffl]=useState([])
const [days,setdays]=useState(1)
const [present,setpresent]=useState(0);
const [date,setdate]=useState()
const [tt,sett]=useState(false);
const [ac,setac]=useState(false);
const [sstudent,setsstudent]=useState([])
const [as,setas]=useState("")
const [cls,setcls]=useState("")
const [section,setsection] =useState("")
const [name,setname]=useState()
const[ename,setename]=useState()
const[year,setyear]=useState()
const[exam,setexam]=useState()
const [ar,setar]=useState(false)
const [vc,setvc]=useState(false)
function myFunction()
{
 
    let root = document.documentElement;
      root.classList.toggle("dark-mode");
      
    
}




  
 
useEffect(() => {
  db.collection("notice")
  .orderBy("time")
    .onSnapshot((snapshot) => {
      setNotice(
        snapshot.docs.map((docu) => ({
          id: docu.id,
          card: docu.data(),
          time : docu.data().time.toDate(),
          
        }))
      );
    });
    db.collection("examination").onSnapshot((snapshot) => {
                setexam(
                  snapshot.docs.map((docu) => ({
                    id: docu.id,
                    exam: docu.data(), 
                  }))
                );
              })
    db.collection("staff").where("staff_id","!=","STAFF_ID").onSnapshot((snapshot) => {
      setstaffl(
        snapshot.docs.map((docu) => ({
          id: docu.id,
          card: docu.data(),
  
          
        }))
      );
    });
    db.collection("student").where("student_id" ,"!=","STUDENT_ID").onSnapshot((snapshot) => {
      setsstudent(
        snapshot.docs.map((docu) => ({
          id: docu.id,
          card: docu.data(), 
        }))
      );
    })

    db.collection("job_designation")
    .onSnapshot((snapshot) => {
      setJd(
        snapshot.docs.map((docu) => ({
          id: docu.id,
          job_id: docu.data().job_id, 
          job_name : docu.data().job_name,
        }))
      );
    });

    db.collection("student_attendance").onSnapshot((snapshot) => {
      setsattd(
        snapshot.docs.map((docu) => ({
          id: docu.id,
          attd: docu.data(), 
        }))
      );
    })

    db.collection("staff_attendance").onSnapshot((snapshot) => {
      setsfattd(
        snapshot.docs.map((docu) => ({
          id: docu.id,
          attd: docu.data(), 
        }))
      );
    })
   
}, []);


const execute= (event) =>{
  let form  = document.getElementById('form');
  if(form.checkValidity())
  {
    event.preventDefault();
 
  const absent = document.querySelectorAll('input[type=checkbox]:not(:checked)');
  console.log(absent.length)
  const present =  document.querySelectorAll('input[type=checkbox]:checked');
  for(var i=0;i<absent.length;i++)
  {
    db.collection("staff_attendance").doc(absent[i].value+"_"+date).set({
      date:date,
      staff_id:absent[i].value.toUpperCase(),
      present: "no",

    })
  }
  for(var i=0;i<present.length;i++)
  {
    db.collection("staff_attendance").doc(present[i].value+"_"+date).set({
      date:date,
      staff_id:present[i].value.toUpperCase(),
      present: "yes",

    })
  }
  form.reset();
  }
  
}


const toggle1 = () => {

  db.collection('student').doc(student)
.get().then((DocumentSnapshot) =>
      {
       
        setScard(DocumentSnapshot.data())
        setStsearch(true)
        setyear("")
        setename("")
        sett(false)
        setSfsearch(false)
        setAst(false)
        setStaffa(false);
        setAsf(false);
        setac(false)
        setvc(false)
      }

);



  var temp=0,temp2=0;;
  for(var i=0;i<sattd.length;i++)
  {
      if(sattd[i].attd.student_id===student)
      {
        temp++;
        if(sattd[i].attd.present==="yes")
          temp2++;
      }
       
  }

  setpresent(temp2)
  setdays(temp)


 
}

const toggle2 = () => {
  db.collection('staff').doc(staff)
  .get().then((DocumentSnapshot) =>
        {
          setCard(DocumentSnapshot.data())
          setStsearch(false)
          setSfsearch(true)
          setAst(false)
          setAsf(false);
          setStaffa(false);
          setac(false)
          sett(false)
          setvc(false)
          setar(false)
        }
  );

  var temp=0,temp2=0;;
  for(var i=0;i<sfattd.length;i++)
  {
      if(sfattd[i].attd.student_id===staff)
      {
        temp++;
        if(sfattd[i].attd.present==="yes")
          temp2++;
      }
       
  }
  setpresent(temp2)
  setdays(temp)

}
const toggle3=() =>{
  setAst(true);
  setSfsearch(false)
  setStsearch(false);
  setAsf(false);
  setac(false)
  setStaffa(false);
  sett(false)
  setar(false)
  setvc(false)
}

const toggle4 = ()=>{
  setAst(false);
  setSfsearch(false)
  setStsearch(false);
  setAsf(true);
  setac(false)
  setStaffa(false);
  setar(false)
  setvc(false)
}


const toggle5 =() =>{
  setAst(false);
  setSfsearch(false)
  setStsearch(false);
  setAsf(false);
  setac(false)
  setStaffa(true);
  setar(false)
  setvc(false)
  sett(false)
}

const toggle6=() =>{
  setAst(false);
  setSfsearch(false)
  setStsearch(false);
  setAsf(false);
  sett(false)
  setac(false)
  setStaffa(false);
  setar(false)
  setvc(false)
  setac(true)
}

const toggle7 = () =>{
  setAst(false);
  setSfsearch(false)
  setStsearch(false);
  setAsf(false);
  setStaffa(false);
  setvc(false)
  setac(false);
  setas("")
  sett(false)
  setar(true)
}
const toggle8 = () =>{
  setAst(false);
  setSfsearch(false)
  setStsearch(false);
  setAsf(false);
  setStaffa(false);
  setvc(false)
  setac(false);
  setas("")
  sett(true)
  setar(false)
}



const toglle9 = () =>{
  setAst(false);
  sett(false);
  setSfsearch(false)
  setStsearch(false);
  setAsf(false);
  setac(false)
  sett(false)
  setvc(true)
  setar(false)
  setStaffa(false);
}

if(stsearch===true)
{
  
    return (
      <div>

     
            <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Admin - Free Bulma template</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />
        {/* Bulma Version 0.9.0*/}
        <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        {/* START NAV */}
        
        <nav className="navbar is-white">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item brand-text" to="/">
                Admin Portal
              </Link>




              <div className="navbar-burger burger" data-target="navMenu">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div id="navMenu" className="navbar-menu">
              <div className="navbar-start">
                
                <a className="navbar-item" onClick={() => auth.signOut()}>
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </nav>
        {/* END NAV */}
        <div className="container">
          <div className="columns">
            <div className="column is-3 ">
              <aside className="menu is-hidden-mobile">
                <p className="label black">
                  General
                </p>
                <ul className="menu-list">
                <li onClick = {()=>setStsearch(false)}><a>Dashboard</a></li>
                <li  onClick = {toggle2} ><a>Search Staff</a></li>
                  <li><a className="is-active">Search Student</a></li>
          
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
             
                  <li>
               
                    <ul>
                      <li><a onClick = {toggle3}>Add Student</a></li>
                      <li><a>Add Staff</a></li>
                      <li><a onClick={toggle6}>Add Class </a></li>
                      <li><a onClick={toggle8}>New TimeTable</a></li>
                      <li onClick = {toggle5}><a>Staff Attendance</a></li>
                      <li onClick={toggle7}><a>Attendance Report</a></li>
                      <li onClick = {toglle9}><a>View Class</a></li>
                    </ul>
                  </li>
                  
                </ul>
                <p className="menu-label">
           
                </p>
                <ul className="menu-list">
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                </ul>
              </aside>
            </div>

            <div className="column is-9">
            <div>
           
           
               
                      <p className="card-header-title">
                        Student Search
                      </p>
                        <div className = "searchbox">

                    
                          <input className="input_s" type="text" placeholder   onChange={(e) => setStudent(e.target.value.toUpperCase())} value = {student}/>
                          <span className="icon is-medium is-left">
                           
                          </span>
                   
                      <a onClick = {toggle1} className ="search">
                      <a  className="button is-small is-secondary" > Search</a>
                      </a>
                      </div>
                  
                 
          
         
            </div>
            <br/> 
              <div className = "card">  
              <div className="id-card-tag" />
        <div className="id-card-tag-strip" />
        <div className="id-card-hook" />
        <div className="id-card-holder">
          <div className="id-card">
            <div className="header">
  
            </div>
            <div className="photo">
              
            </div>
           <h2 className = "school">VIKAS HIGH SCHOOL</h2>
            <h2>{Scard.student_id}</h2>
            <div className = "photo">
            <img src = "./icon.png"></img>
            </div>
            <h2>{Scard.s_first_name} {Scard.s_middle_name} {Scard.s_last_name} </h2>
            <h3></h3>
            <div className="qr-code">

            </div>
            <h4 className = "category">DOB : {Scard.dob}, {Scard.gender} </h4>
            <h4 className = "category">DOA : {Scard.date_of_admission} , Student   </h4>
            <h4 className = "category"> {Scard.s_class} {Scard.section} , year : {Scard.academic_year}</h4>
            <h4 className = "category">{Scard.contact_no}</h4>
            <h4 className = "category">{Scard.email}</h4>
            <br />
            
          </div>
        </div>
              </div>
              <div className="column is-9">
        <br/><br/>
        <div className ="flexi">

        <div>
           <input
            required="true"
            type="text"
            value={student}
            disabled="true"
          
          />
          </div>
            <div>

            <select  onChange={(e) => setename(e.target.value)}  placeholder="Exam"  required="true">
         <option value="" selected="selected">Exam</option>
          <option value="Internal 1">Internal 1</option>
          <option value="Internal 2">Internal 2</option>
          <option value="Final">Final</option>

          </select>
          </div>

          <div>
           <input
            required="true"
            type="number"
            placeholder="Year"
            onChange={(e) => setyear(e.target.value)}
          />
          </div>
          </div>
          <br/><br/>
          <table className="table is-fullwidth is-striped">
        <tbody>
           
          {exam.map(({ exam,time}) => {
              console.log(exam)
              if(exam.student_id===student&&exam.exam_name===ename&&exam.year===year)
              {
                  return(
                      
                      <section className ="wid"> 
               <tr>
                            <td width = "40%">ENGLISH</td>
                              <td width = "60%"className="level-top"></td>
      
                              <td>{exam.english_marks}</td>
        
                </tr>
                <tr>
                            <td width = "25%">HINDI</td>
                              <td width = "15%"className="level-top"></td>
      
                              <td>{exam.hindi_marks}</td>
        
                </tr>
                <tr>
                            <td width = "25%">MATHS</td>
                              <td width = "15%"className="level-top"></td>
      
                              <td>{exam.maths_marks}</td>
        
                </tr>
                <tr>
                            <td width = "25%">SCIENCE</td>
                              <td width = "15%"className="level-top"></td>
      
                              <td>{exam.science_marks}</td>
        
                </tr>
                <tr>
                            <td width = "25%">SOCIAL SCIENCE</td>
                              <td width = "15%"className="level-top"></td>
      
                              <td>{exam.social_science_marks}</td>
        
                </tr>
                <tr>
                            <td width = "25%">GK </td>
                              <td width = "15%"className="level-top"></td>
      
                              <td>{exam.gk_marks}</td>
        
                </tr>
                <tr>
                            <td width = "25%">OBTAINED MARKS </td>
                              <td width = "15%"className="level-top"></td>
      
                              <td>{exam.marks_obtained}</td>
        
                </tr>
                <tr>
                            <td width = "25%">TOTAL MARKS </td>
                              <td width = "15%"className="level-top"></td>
      
                              <td>{exam.total_marks}</td>
        
                </tr>
                <tr>
                            <td width = "25%">PERCENTAGE </td>
                              <td width = "15%"className="level-top"></td>
      
                              <td>{exam.percentage}</td>
        
                </tr>
                </section>
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
    );
   
    
  
}
else if(sfsearch===true)
  {
    
    var pos = jd.map(function(e) { return e.job_id; }).indexOf(card.job_id);
 
    return (
      <div>

<div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Admin - Free Bulma template</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />
        {/* Bulma Version 0.9.0*/}
        <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        {/* START NAV */}
        
        <nav className="navbar is-white">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item brand-text" to="/">
                Admin Portal
              </Link>




              <div className="navbar-burger burger" data-target="navMenu">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div id="navMenu" className="navbar-menu">
              <div className="navbar-start">
               
                <a className="navbar-item" onClick={() => auth.signOut()}>
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </nav>
        {/* END NAV */}
        <div className="container">
          <div className="columns">
            <div className="column is-3 ">
              <aside className="menu is-hidden-mobile">
                <p className="label">
                  General
                </p>
                <ul className="menu-list">
                <li  onClick = {()=>setSfsearch(false)}><a>Dashboard</a></li>
                  <li><a className="is-active">Search Staff</a></li>
            
                  <li  onClick = {toggle1} ><a>Search Student</a></li>
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
              
                  <li>
               
                    <ul>
                    <li><a onClick = {toggle3}>Add Student</a></li>
                      <li><a onClick = {toggle4}>Add Staff</a></li>
                      <li><a onClick={toggle6}>Add Class </a></li>
                      <li><a onClick={toggle8}>New TimeTable</a></li>
                      <li onClick = {toggle5}><a>Staff Attendance</a></li>
                      <li onClick={toggle7}><a>Attendance Report</a></li>
                      <li onClick = {toglle9}><a>View Class</a></li>
                    </ul>
                  </li>
                 
                </ul>
                <p className="menu-label">
           
                </p>
                <ul className="menu-list">
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>

                </ul>
              </aside>
              
            </div>
            <div className="column is-9">
            <div>
          
           
               
                      <p className="card-header-title">
                        Staff Search
                      </p>
                        <div className = "searchbox">

                    
                          <input className="input_s" type="text" placeholder   onChange={(e) => setStaff(e.target.value.toUpperCase)}  defaultValue= {staff}/>
                          <span className="icon is-medium is-left">
                           
                          </span>
                   
                      <a onClick = {toggle2} className ="search">
                      <a  className="button is-small is-secondary" > Search</a>
                      </a>
                      </div>
                  
                 
          
         
            </div>
         <br/>
              <div className = "card">  
              <div className="id-card-tag" />
        <div className="id-card-tag-strip" />
        <div className="id-card-hook" />
        <div className="id-card-holder">
          <div className="id-card">
            <div className="header">
  
            </div>
            <div className="photo">
              
            </div>
           <h2 className = "school">VIKAS HIGH SCHOOL</h2>
            <h2>{card.staff_id}</h2>
            <div className = "photo">
            <img src = "./icon.png"></img>
            </div>
            <h2>{card.sf_name} </h2>
            <h3></h3>
            <div className="qr-code">

            </div>
            <h4 className = "category">DOB : {card.sf_dob} , {card.sf_gender} </h4>
            <h4 className = "category">DOJ : {card.date_of_joining} ,{ jd[pos].job_name }</h4>
            <h4 className = "category">{card.mob_no}</h4>
            <h4 className = "category">{card.sf_email}</h4>
            <br />
            
          </div>
        </div>
              </div>
      
         
          </div>
          
          </div>
        </div>
      </div>
  
  


         
        </div>
    );
  }
else 
if(ast===true)
{

  //ADD STUDENT
  return (
    <div>

<div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Admin - Free Bulma template</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />
      {/* Bulma Version 0.9.0*/}
      <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
      <link rel="stylesheet" type="text/css" href="/css/style.css" />
      {/* START NAV */}
      
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item brand-text" to="/">
              Admin Portal
            </Link>




            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
             
              <a className="navbar-item" onClick={() => auth.signOut()}>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* END NAV */}
      <div className="container">
        <div className="columns">
          <div className="column is-3 ">
            <aside className="menu is-hidden-mobile">
              <p className="label black">
                General
              </p>
              <ul className="menu-list">
              <li  onClick = {()=>setAst(false)}><a>Dashboard</a></li>
                <li><a onClick = {toggle2}>Search Staff</a></li>
               
                <li  onClick = {toggle1} ><a>Search Student</a></li>
              </ul>
              <p className="label">
                Administration
              </p>
              <ul className="menu-list">
              <li><a className="is-active" >Add Student</a></li>
                <li>
                  <ul>
                    
                    <li><a  onClick = {toggle4}>Add Staff</a></li>
                    <li><a onClick={toggle6}>Add Class</a></li>
                    <li><a onClick={toggle8}>New Timetable</a></li>
                    <li onClick = {toggle5}><a>Staff Attendance</a></li>
                    <li onClick={toggle7}><a>Attendance Report</a></li>
                    <li onClick = {toglle9}><a>View Class</a></li>
                  </ul>
                </li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
              <p className="menu-label">
                
              </p>
              <ul className="menu-list">
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
            </aside>
            
          </div>
          <AddStudent user = {user}/>
          
        
        </div>
      </div>
    </div>
  



       
      </div>
  );
}
 


else 
if(asf===true)
{

  //ADD Staff
  return (
    <div>

<div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Admin - Free Bulma template</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />
      {/* Bulma Version 0.9.0*/}
      <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
      <link rel="stylesheet" type="text/css" href="/css/style.css" />
      {/* START NAV */}
      
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item brand-text" to="/">
              Admin Portal
            </Link>




            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
             
              <a className="navbar-item" onClick={() => auth.signOut()}>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* END NAV */}
      <div className="container">
        <div className="columns">
          <div className="column is-3 ">
            <aside className="menu is-hidden-mobile">
              <p className="label black">
                General
              </p>
              <ul className="menu-list">
              <li  onClick = {()=>setAsf(false)}><a>Dashboard</a></li>
                <li><a onClick = {toggle2}>Search Staff</a></li>
               
                <li  onClick = {toggle1} ><a>Search Student</a></li>
              </ul>
              <p className="label">
                Administration
              </p>
              <ul className="menu-list">
              <li><a onClick = {toggle3}>Add Student</a></li>
                <li>
                  <ul>
                    
                    <li><a className="is-active"  >Add Staff</a></li>
                    <li><a onClick={toggle6}>Add Class</a></li>
                    <li><a onClick={toggle8}>New Timetable</a></li>
                    <li onClick = {toggle5}><a>Staff Attendance</a></li>
                    <li onClick={toggle7}><a>Attendance Report</a></li>
                    <li onClick = {toglle9}><a>View Class</a></li>
                  </ul>
                </li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
              <p className="menu-label">
                
              </p>
              <ul className="menu-list">
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
            </aside>
         
          </div>
          <div>
          <AddStaff user = {user}/>
          </div>
        
        </div>
       
      </div>
    </div>
  



       
      </div>
  );
}

else 
if(tt===true)
{

  //ADD Staff
  return (
    <div>

<div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Admin - Free Bulma template</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />
      {/* Bulma Version 0.9.0*/}
      <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
      <link rel="stylesheet" type="text/css" href="/css/style.css" />
      {/* START NAV */}
      
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item brand-text" to="/">
              Admin Portal
            </Link>




            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
             
              <a className="navbar-item" onClick={() => auth.signOut()}>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* END NAV */}
      <div className="container">
        <div className="columns">
          <div className="column is-3 ">
            <aside className="menu is-hidden-mobile">
              <p className="label black">
                General
              </p>
              <ul className="menu-list">
              <li  onClick = {()=>sett(false)}><a>Dashboard</a></li>
                <li><a onClick = {toggle2}>Search Staff</a></li>
               
                <li  onClick = {toggle1} ><a>Search Student</a></li>
              </ul>
              <p className="label">
                Administration
              </p>
              <ul className="menu-list">
              <li><a onClick = {toggle3}>Add Student</a></li>
                <li>
                  <ul>
                    
                    <li><a  >Add Staff</a></li>
                    <li><a onClick={toggle6}>Add Class</a></li>
                    <li><a className="is-active"  onClick={toggle8}>New Timetable</a></li>
                    <li onClick = {toggle5}><a>Staff Attendance</a></li>
                    <li onClick={toggle7}><a>Attendance Report</a></li>
                    <li onClick = {toglle9}><a>View Class</a></li>
                  </ul>
                </li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
              <p className="menu-label">
                
              </p>
              <ul className="menu-list">
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
            </aside>
         
          </div>
          <div>
          <NewTimetable />
          </div>
        
        </div>
       
      </div>
    </div>
  



       
      </div>
  );
}


else if(staffa===true)
{
  return(
    <div>



<div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Admin - Free Bulma template</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />
      {/* Bulma Version 0.9.0*/}
      <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
      <link rel="stylesheet" type="text/css" href="/css/style.css" />
      {/* START NAV */}
      
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item brand-text" to="/">
              Admin Portal
            </Link>




            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
             
              <a className="navbar-item" onClick={() => auth.signOut()}>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* END NAV */}
      <div className="container">
        <div className="columns">
          <div className="column is-3 ">
            <aside className="menu is-hidden-mobile">
              <p className="label black">
                General
              </p>
              <ul className="menu-list">
              <li  onClick = {()=>setStaffa(false)}><a>Dashboard</a></li>
                <li><a onClick = {toggle2}>Search Staff</a></li>
               
                <li  onClick = {toggle1} ><a>Search Student</a></li>
              </ul>
              <p className="label">
                Administration
              </p>
              <ul className="menu-list">
              <li><a onClick = {toggle3}>Add Student</a></li>
                <li>
                  <ul>
                    
                    <li><a  >Add Staff</a></li>
                    <li><a onClick={toggle6}>Add Class</a></li>
                    <li><a onClick={toggle8}>New Timetable</a></li>
                    <li onClick = {toggle5}><a className="is-active" >Staff Attendance</a></li>
                    <li onClick={toggle7}><a>Attendance Report</a></li>
                    <li onClick = {toglle9}><a>View Class</a></li>
                  </ul>
                </li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
              <p className="menu-label">
                
              </p>
              <ul className="menu-list">
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
            </aside>
            
          </div>

          <div className="column is-9">
          <form id = "form">
            <div>
            <br/> <br/> 
          <input
                    required="true"
                  type="date"
                 
                  onChange={(e) => setdate(e.target.value)}
                />

          </div>
          <div>
            </div>
          
        

          {staffl.map(({ card, id}) => {
            return(
              <div>
            <ul className="menu-list">
           <li> <a> {card.sf_name+"      "}  {card.staff_id}   </a>  </li>
           <input className  = "boxat"  type="checkbox" value={card.staff_id} />
            </ul>
            </div>
            )
          }
          )}
          <button type ="submit"onClick = {execute}>Submit</button>
          </form>
            </div>
        </div>
      </div>
    </div>

    </div>
  )
  }

else if(ac===true)
{
  return(
    <div>

   
<div>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Admin - Free Bulma template</title>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />
      {/* Bulma Version 0.9.0*/}
      <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
      <link rel="stylesheet" type="text/css" href="/css/style.css" />
      {/* START NAV */}
      
      <nav className="navbar is-white">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item brand-text" to="/">
              Admin Portal
            </Link>




            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start">
             
              <a className="navbar-item" onClick={() => auth.signOut()}>
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* END NAV */}
      <div className="container">
        <div className="columns">
          <div className="column is-3 ">
            <aside className="menu is-hidden-mobile">
              <p className="label black">
                General
              </p>
              <ul className="menu-list">
              <li  onClick = {()=>setac(false)}><a>Dashboard</a></li>
                <li><a onClick = {toggle2}>Search Staff</a></li>
               
                <li  onClick = {toggle1} ><a>Search Student</a></li>
              </ul>
              <p className="label">
                Administration
              </p>
              <ul className="menu-list">
              <li><a onClick = {toggle3}>Add Student</a></li>
                <li>
                  <ul>
                    
                    <li><a  onClick = {toggle4}>Add Staff</a></li>
                    <li><a  className="is-active" onClick={toggle6}>Add Class</a></li>
                    <li><a onClick={toggle8}>New Timetable</a></li>
                    <li onClick = {toggle5}><a >Staff Attendance</a></li>
                    <li onClick={toggle7}><a>Attendance Report</a></li>
                    <li onClick = {toglle9}><a>View Class</a></li>
                  </ul>
                </li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
              <p className="menu-label">
                
              </p>
              <ul className="menu-list">
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
                <li><a></a></li>
              </ul>
            </aside>
            
          </div>
          <div className="column is-9">
                  <AddClass/>
          </div>


        </div>
      </div>
    </div>

    </div>
  )
}
else if(ar==true)
{
  var p = 0;
 var d=0;
 var a=0;

 
  return(
    <div>

<div>
                  <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Admin - Free Bulma template</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />
        {/* Bulma Version 0.9.0*/}
        <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        {/* START NAV */}
        
        <nav className="navbar is-white">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item brand-text" to="/">
                Admin Portal
              </Link>




              <div className="navbar-burger burger" data-target="navMenu">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div id="navMenu" className="navbar-menu">
              <div className="navbar-start">
                
                <a className="navbar-item" onClick={() => auth.signOut()}>
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </nav>
        {/* END NAV */}
        <div className="container">
          <div className="columns">
            <div className="column is-3 ">
              <aside className="menu is-hidden-mobile">
                <p className="label black">
                  General
                </p>
                <ul className="menu-list">
                  <li><a onClick = {()=> setar(false)}>Dashboard</a></li>
                  <li onClick = {toggle2}><a>Search Staff</a></li>
                  <li onClick = {toggle1}><a>Search Student</a></li>
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
                
                  <li>
                 
                    <ul>
                     <li onClick = {toggle3}><a>Add Student</a></li>
                      <li><a onClick= {toggle4}>Add Staff</a></li>
                      <li><a onClick={toggle6}>Add Class</a></li>
                      <li><a onClick={toggle8}>New Timetable</a></li>
                      <li onClick = {toggle5}><a>Staff Attendance</a></li>
                      <li onClick={toggle7}><a className="is-active" > Attendance Report</a></li>
                      <li onClick = {toglle9}><a>View Class</a></li>
                    </ul>
                  </li>
                
                </ul>
                <p className="menu-label">
           
                </p>
                <ul className="menu-list">
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                </ul>
              </aside>
            </div>

            <div className="column is-9">
            <form id = "form">
            <div>
            <br/> <br/> 
          <input
            placeholder="staff id"
           type="text" 
           value={as}
           onChange={(e) => setas(e.target.value.toUpperCase())}
         />
          <> </>
    
         <> </>
         </div>
         </form>
<div className = "atflex">
  <div>
         <a  className="is-active">PRESNT </a>
         {sfattd.map(({ attd, id}) => {
           console.log(attd)
           console.log(as)
            if(as===attd.staff_id )
            {
             if(attd.present=="yes")
             {
             p++
            return(
              <div>
            <ul className="menu-list">

           <li> <a> {attd.date}</a>  </li>
   
       
            </ul>
            
            </div>
            )
             }
            }
            
          }
          )}
          <br/>
       </div>
          <div>
<a  className="is-active">ABSENT </a>
        {sfattd.map(({ attd, id}) => {
      
      if(as===attd.staff_id )
      {
       if(attd.present=="no")
       {
       a++;
      return(
        <div>
      <ul className="menu-list">

     <li> <a> {attd.date}</a>  </li>

 
      </ul>
      
      </div>
      )
       }
      }
      d=a+p
    
      
    }
    )}
    </div>
</div>
    <br/><br/>
    <div className= "graph" >
         <VerticalBarGraph
        
  data={[p, a, d]}
  labels={['Present', 'Absent', 'Days']}
  width={500}
  height={300}
  barRadius={5}
  barWidthPercentage={0.65}
  baseConfig={{
    hasXAxisBackgroundLines: false,
    xAxisLabelStyle: {
      position: 'right',
   
    }
  }}
  style={{
    paddingVertical: 10
  }}
/></div>
            </div>
         
          </div>
        </div>
      </div>
 
    </div>
  
    </div>
  )

}

else if(vc===true)
{
      return(
        <div>
                  <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Admin - Free Bulma template</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />
        {/* Bulma Version 0.9.0*/}
        <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        {/* START NAV */}
        
        <nav className="navbar is-white">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item brand-text" to="/">
                Admin Portal
              </Link>




              <div className="navbar-burger burger" data-target="navMenu">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div id="navMenu" className="navbar-menu">
              <div className="navbar-start">
                
                <a className="navbar-item" onClick={() => auth.signOut()}>
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </nav>
        {/* END NAV */}
        <div className="container">
          <div className="columns">
            <div className="column is-3 ">
              <aside className="menu is-hidden-mobile">
                <p className="label black">
                  General
                </p>
                <ul className="menu-list">
                <li onClick = {()=>setvc(false)}><a>Dashboard</a></li>
                  <li onClick = {toggle1}><a >Search Student</a></li>
                  <li onClick = {toggle1}><a>Search Student</a></li>
          
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
             
                  <li>
               
                    <ul>
                    <li onClick = {toggle3}><a>Add Student</a></li>
                      <li><a onClick= {toggle4}>Add Staff</a></li>
                      <li><a onClick={toggle6}>Add Class</a></li>
                      <li><a onClick={toggle8}>New Timetable</a></li>
                      <li onClick = {toggle5}><a>Staff Attendance</a></li>
                      <li onClick={toggle7}><a>Attendance Report</a></li>
                      <li onClick = {toglle9}><a className = "is-active">View Class</a></li>
                    </ul>
                  </li>
                  
                </ul>
                <p className="menu-label">
           
                </p>
                <ul className="menu-list">
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                </ul>
              </aside>
            </div>

            <div className="column is-9">
            <form id = "form">
            <div>
            <br/> <br/> 
            <div className ="flexi">
              <div>
          <input
            placeholder="Class"
           type="text" 
           onChange={(e) => setcls(e.target.value)}
         />
          <> </>
          </div>
          <div>
         <input

           type="text" 
           placeholder = "section"
           value={section}
           onChange={(e) => setsection(e.target.value.toUpperCase())}
         />
         </div>
            </div>
         <> </>
         </div>
         </form>
         {sstudent.map(({ card, id}) => {
           console.log(card)
            if(cls===card.s_class && section === card.section)
            {
            
            return(
              <div>
            <ul className="menu-list">

           <li> <a> {card.s_first_name+" "+card.s_middle_name+" "+card.s_last_name+"            "}{card.student_id}  {card.roll_no}</a>  </li>
   
       
            </ul>
            
            </div>
            )
            }
            
          }
          )}
       
            </div>
         
          </div>
        </div>
      </div>
 
    </div>
      )

}

    return (
      
          // DASHBOARD
        <div>
          
       

            <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Admin - Free Bulma template</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet" />

        <link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
     
        
        <nav className="navbar is-white">
          <div className="container">
            <div className="navbar-brand">
              <Link className="navbar-item brand-text" to="/">
                Admin Portal
              </Link>




              <div className="navbar-burger burger" data-target="navMenu">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div id="navMenu" className="navbar-menu">
              <div className="navbar-start">
                
                <a className="navbar-item" onClick={() => auth.signOut()}>
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </nav>
        {/* END NAV */}
        <div className="container">
          <div className="columns">
            <div className="column is-3 ">
              <aside className="menu is-hidden-mobile">
                <p className="label">
                  General
                </p>
                <ul className="menu-list">
                  <li><a className="is-active">Dashboard</a></li>
                  <li onClick = {toggle2}><a>Search Staff</a></li>
                  <li onClick = {toggle1}><a>Search Student</a></li>
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
                
                  <li>
                 
                    <ul>
                     <li onClick = {toggle3}><a>Add Student</a></li>
                      <li><a onClick= {toggle4}>Add Staff</a></li>
                      <li><a onClick={toggle6}>Add Class</a></li>
                      <li><a onClick={toggle8}>New Timetable</a></li>
                      <li onClick = {toggle5}><a>Staff Attendance</a></li>
                      <li onClick={toggle7}><a>Attendance Report</a></li>
                      <li onClick = {toglle9}><a>View Class</a></li>
                    </ul>
                  </li>
                
                </ul>
                <p className="menu-label">
                  
                </p>
                <ul className="menu-list">
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                  <li><a></a></li>
                </ul>
              </aside>
            </div>
            <div className="column is-9">
              {/* <nav className="breadcrumb" aria-label="breadcrumbs">
                <ul>
                  <li><a href="../">Bulma</a></li>
                  <li><a href="../">Templates</a></li>
                  <li><a href="../">Examples</a></li>
                  <li className="is-active"><a href="#" aria-current="page">Admin</a></li>
                </ul>
              </nav> */}
              <section className="hero is-info welcome is-small">
                <div className="hero-body">
                  <div className="container">
                    <h1 className="title">
                      Hello, Admin.
                    </h1>
                    <h2 className="subtitle">
                      I hope you are having a great day!
                    </h2>
                    <a className="button is-small is-primary" onClick={myFunction}>Light | Dark</a>
                  </div>
                </div>
              </section>
              <section className="info-tiles">
                <div className="tile is-ancestor has-text-centered">
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">100</p>
                      <p className="subtitle">Teachers</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">990</p>
                      <p className="subtitle">Students</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">25</p>
                      <p className="subtitle">Classrooms</p>
                    </article>
                  </div>
                  <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">170</p>
                      <p className="subtitle">Total Staff</p>
                    </article>
                  </div>
                </div>
              </section>
              <div className="columns">
                <div className="column is-6">
                  <div className="card events-card">
                    <header className="card-header">
                      <p className="card-header-title">
                        Notice
                      </p>
                      <a href="#" className="card-header-icon" aria-label="more options">
                        <span className="icon">
                          <i className="fa fa-angle-down" aria-hidden="true" />
                        </span>
                      </a>
                    </header>
                    <div className="card-table">
                      <div className="content">
                        <table className="table is-fullwidth is-striped">
                          <tbody>
                          {notice.map(({ card,time,id}) => {
                                 return(
                                  <tr>
                                  <td width = "25%">{moment(time).format('DD-MM-YYYY')}</td>
                                  <td width = "15%"className="level-top">{card.class} {card.section}</td>
          
                                  <td>{card.notice}</td>
                                  <td width="5%"><i class="fa fa-remove red-color " onClick={() =>  db.collection("notice").doc(id).delete()}/></td>
                                  
                                </tr>

                              )
             
                            })}
                           
                            
                          </tbody>
                        </table>
                      </div>
                    </div>
                  
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    
  
        </div>
    )
}

export default AdminHome




