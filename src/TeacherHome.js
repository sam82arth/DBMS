import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import './AdminHome.css' 
import moment from 'moment'
import{Link,} from "react-router-dom";
import AddAssignment from "./AddAssignment";
import UploadMarks from "./UploadMarks";
import VerticalBarGraph from '@chartiful/react-vertical-bar-graph'
import './AdminHome.css'



function TeacherHome(user) {

const [notice,setNotice]=useState([])
const [student,setStudent]=useState("sft_dummy_id");
const [ast,setAst]=useState(false)
const [asf,setAsf]=useState(false);
const [card,setCard]=useState(null);
const [Scard,setScard]=useState(null);
const [sta,setsta]=useState(false);
const  [stsearch,setStsearch]=useState(false)
const  [asg,setasg]=useState(false)
const [sattd,setsattd]=useState([])
const [days,setdays]=useState(1)
const [present,setpresent]=useState(0);
const [date,setdate]=useState()
const [tt,sett]=useState(false);
const [ac,setac]=useState(false);
const[classs,setclasss]=useState([])
const [sstudent,setsstudent]=useState([])
const [teacher,setteacher]=useState()
const [eng,seteng]=useState([])
const [hindi,sethindi]=useState([])
const [sank,setsank]=useState([])
const [science,setscience ]=useState([])
const [gk,setgk]=useState([])
const [maths,setmaths]=useState([])
const[ssc,setssc]=useState([])
const [sfattd,setsfattd]=useState([])
const[um,setum]=useState(false)
const [name,setname]=useState([])
const [attclass,setattclass]=useState([])
const [attsection,setattsection] = useState([])
const [vc,setvc]=useState(false)
const [ar,setar]=useState(false)
const [cls,setcls]=useState("")
const [section,setsection] =useState("")
const [as,setas]=useState("")
const [va,setva]=useState(false)

function myFunction()
{
 
    let root = document.documentElement;
      root.classList.toggle("dark-mode");
      
    
}



useEffect(() => {
  
    db.collection("staff").doc(user.user.email.substring(0,10)).get().then((doc)=>{
        setteacher(doc.data())
        // setname(doc.data().sf_name)
    })
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
    db.collection("student").where("student_id" ,"!=","student_id").onSnapshot((snapshot) => {
        setsstudent(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(), 
          }))
        );
      })
    // db.collection"assignment"
    db.collection("class").onSnapshot((snapshot) => {
     setclasss(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(), 
          }))
        );
      })
        
      db.collection("class").where("english_staff_id", "==", user.user.email.substring(0,3)).onSnapshot((snapshot) => {
        seteng(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(), 
          }))
        );
      })
      db.collection("class").where("hindi_staff_id", "==", user.user.email.substring(0,3)).onSnapshot((snapshot) => {
        sethindi(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(), 
          }))
        );
      })
      db.collection("class").where("maths_staff_id", "==", user.user.email.substring(0,3)).onSnapshot((snapshot) => {
        setmaths(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(), 
          }))
        );
      })
      db.collection("class").where("sank_staff_id", "==" ,user.user.email.substring(0,3)).onSnapshot((snapshot) => {
        setsank(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(), 
          }))
        );
      })
      db.collection("class").where("science_staff_id", "==" ,user.user.email.substring(0,3)).onSnapshot((snapshot) => {
        setscience(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(), 
          }))
        );
      })
      db.collection("class").where("social_science_staff_id","==",user.user.email.substring(0,3)).onSnapshot((snapshot) => {
        setssc(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(), 
          }))
        );
      })
      db.collection("class").where("gk_staff_id","==",user.user.email.substring(0,3)).onSnapshot((snapshot) => {
        setgk(
          snapshot.docs.map((docu) => ({
            id: docu.id,
            card: docu.data(), 
          }))
        );
      })
   
   
}, []);

  
const toggle1 =() => {
 
 
    db.collection('student').doc(student)
    .get().then((DocumentSnapshot) =>
          {
            
            setScard(DocumentSnapshot.data())
            setStsearch(true)
            setvc(false)
            setar(false)
            setasg(false)
            setAst(false)
            setsta(false);
            setva(false)
            setAsf(false);
            setum(false)

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


const toggle2 =() =>{
    setAst(false);
    setasg(false)
    setvc(false)
    setStsearch(false);
    setar(false)
    setAsf(false);
    setsta(true);
    setum(false)
    setva(false)
  }

  const toggle3 =() =>{
    setAst(false);
    setasg(true)
    setStsearch(false);
    setAsf(false);
    setsta(false);
    setvc(false)
    setar(false)
    setva(false)
    setum(false)
  }
  
  const toggle4=() =>{
    setAst(false);
    setasg(false)
    setStsearch(false);
    setAsf(false);
    setsta(false);
    setum(true)
    setar(false)
    setva(false)
    setvc(false)
  }

  const toggle5=() =>{
    setAst(false);
    setasg(false)
    setStsearch(false);
    setAsf(false);
    setsta(false);
    setum(false)
    setvc(true)
    setar(false)
    setva(false)
  }

  const toggle6=() =>{
    setAst(false);
    setasg(false)
    setStsearch(false);
    setAsf(false);
    setsta(false);
    setum(false);
    setar(true)
    setvc(false)
    setva(false)
  }
  const toggle7 =() =>{
    setAst(false);
    setasg(false)
    setvc(false)
    setStsearch(false);
    setar(false)
    setAsf(false);
    setsta(false);
    setum(false)
    setva(true)
  }



const execute_attedance= (event) =>{
    let form  = document.getElementById('form');
    if(form.checkValidity())
    {
      event.preventDefault();
   
    const absent = document.querySelectorAll('input[type=checkbox]:not(:checked)');
    const present =  document.querySelectorAll('input[type=checkbox]:checked');
    var i,j;
    for( j=0;j<absent.length;j++)
    {
      db.collection("student_attendance").doc(absent[j].value+"_"+date).set({
        date:date,
        student_id:absent[j].value,
        present: "no",
  
      })
    }
    for( i=0;i<present.length;i++)
    {
      db.collection("student_attendance").doc(present[i].value+"_"+date).set({
        date:date,
        student_id:present[i].value,
        present: "yes",
  
      })
    }
    if(i>=present.length && j>=absent.length)
    {
      setattclass("")
      setattsection("")
    }
    
  
    form.reset();
    }

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
                Teacher Portal
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
                  <li><a className="is-active">Search Student</a></li>
                  <li onClick = {toggle7}><a>View My Attendance</a></li>
          
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
             
                  <li>
               
                    <ul>
                    <li onClick = {toggle2}><a>Attendance</a></li>
                      <li><a>Timetable</a></li>
                      <li><a onClick = {toggle3}>Add Assignment</a></li>
                      <li><a onClick =  {toggle4}>Upload Marks</a></li>
                         <li><a onClick = {toggle5}>View Class</a></li>
                      <li><a onClick =  {toggle6}>View Attendance Record</a></li>
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
            <h4 className = "category"> {Scard.s_class} {Scard.s_section} , year : {Scard.academic_year}</h4>
            <h4 className = "category">{Scard.contact_no}</h4>
            <h4 className = "category">{Scard.email}</h4>
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

else if(sta===true)
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
                Teacher Portal
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
                <li onClick = {()=>setsta(false)}><a>Dashboard</a></li>
                  <li onClick = {toggle1}><a >Search Student</a></li>
                  <li onClick = {toggle7}><a>View My Attendance</a></li>
          
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
             
                  <li>
               
                    <ul>
                    <li ><a className="is-active" >Attendance</a></li>
                      <li><a>Timetable</a></li>
                      <li><a onClick = {toggle3}>Add Assignment</a></li>
                      <li><a onClick =  {toggle4}>Upload Marks</a></li>
                         <li><a onClick = {toggle5}>View Class</a></li>
                      <li><a onClick =  {toggle6}>View Attendance Record</a></li>
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
          required="true"
           type="date" 
           onChange={(e) => setdate(e.target.value)}
         />
          <> </>
         <input
          required="true"
           type="text" 
           placeholder = "class"
           onChange={(e) => setattclass(e.target.value)}
         />
         <> </>
         <input
          required="true"
           type="text" 
           value={attsection}
           placeholder ="section"
           onChange={(e) => setattsection(e.target.value.toUpperCase() )}
         />

          </div>
          <div>
            </div>
          
          {sstudent.map(({ card, id}) => {
            if(attclass===card.s_class && attsection=== card.section)
            {
            return(
              <div>
            <ul className="menu-list">

           <li> <a> {card.s_first_name+" "+card.s_middle_name+" "+card.s_last_name}  {card.student_id}  </a>  </li>
           <input className  = "boxat" type="checkbox" value={card.student_id} /> 
       
            </ul>
            
            </div>
            )
            }
            
          }
          )}
          <br/>
          <button type ="submit"onClick = {execute_attedance}>Submit Attendance</button>
          </form>
            </div>
         
          </div>
        </div>
      </div>
 
  
        </div>
    );
}


else if(asg===true){
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
                Teacher Portal
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
                  <li onClick = {()=>setasg(false)}><a>Dashboard</a></li>
                    <li onClick = {toggle1}><a >Search Student</a></li>
                    <li onClick = {toggle7}><a>View My Attendance</a></li>
            
                  </ul>
                  <p className="label">
                    Administration
                  </p>
                  <ul className="menu-list">
              
                    <li>
                
                      <ul>
                      <li ><a onClick = {toggle2} >Attendance</a></li>
                        <li><a>Timetable</a></li>
                        <li><a className="is-active"  onClick = {toggle3}>Add Assignment</a></li>
                        <li><a onClick =  {toggle4}>Upload Marks</a></li>
                           <li><a onClick = {toggle5}>View Class</a></li>
                      <li><a onClick =  {toggle6}>View Attendance Record</a></li>
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
              <AddAssignment/>
              </div>
          
            </div>
          </div>
        </div>
  
  
        </div>
    )
}
else if(um===true)
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
                Teacher Portal
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
                <li onClick = {()=>setum(false)}><a>Dashboard</a></li>
                  <li onClick = {toggle1}><a >Search Student</a></li>
                  <li onClick = {toggle7}><a>View My Attendance</a></li>
          
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
             
                  <li>
               
                    <ul>
                    <li ><a onClick = {toggle2} >Attendance</a></li>
                      <li><a>Timetable</a></li>
                      <li><a   onClick = {toggle3}>Add Assignment</a></li>
                      <li><a  className="is-active" onClick =  {toggle4}>Upload Marks</a></li>
                      <li><a   onClick = {toggle5}>View Class</a></li>
                      <li><a onClick =  {toggle6}>View Attendance Record</a></li>
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
            <UploadMarks/>
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
                Teacher Portal
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
                  <li onClick = {toggle7}><a>View My Attendance</a></li>
          
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
             
                  <li>
               
                    <ul>
                    <li ><a onClick = {toggle2} >Attendance</a></li>
                      <li><a>Timetable</a></li>
                      <li><a   onClick = {toggle3}>Add Assignment</a></li>
                      <li><a  onClick =  {toggle4}>Upload Marks</a></li>
                      <li><a  className="is-active"  onClick = {toggle5}>View Class</a></li>
                      <li><a onClick =  {toggle6}>View Attendance Record</a></li>
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
         </form>
         {sstudent.map(({ card, id}) => {
           console.log(card)
            if(cls===card.s_class && section === card.section)
            {
              console.log("hi")
            return(
              <div>
            <ul className="menu-list">

           <li> <a> {card.s_first_name+" "+card.s_middle_name+" "+card.s_last_name}  {card.student_id}  </a>  </li>
   
       
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
              Teacher Portal
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
                <li onClick = {()=>setar(false)}><a>Dashboard</a></li>
                  <li onClick = {toggle1}><a >Search Student</a></li>
                  <li onClick = {toggle7}><a>View My Attendance</a></li>
          
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
             
                  <li>
               
                    <ul>
                    <li ><a onClick = {toggle2} >Attendance</a></li>
                      <li><a>Timetable</a></li>
                      <li><a   onClick = {toggle3}>Add Assignment</a></li>
                      <li><a  onClick =  {toggle4}>Upload Marks</a></li>
                      <li><a   onClick = {toggle5}>View Class</a></li>
                      <li><a   className="is-active" onClick =  {toggle6}>View Attendance Record</a></li>
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
            placeholder="student id"
           type="text" 
           value={as}
           onChange={(e) => setas(e.target.value.toUpperCase())}
         />
          <> </>
    
         <> </>
         </div>
         </form>
<div className ="atflex"> 
  <div>
         <a  className="is-active">PRESENT </a>
         {sattd.map(({ attd, id}) => {
      
            if(as===attd.student_id )
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
        {sattd.map(({ attd, id}) => {
      
      if(as===attd.student_id )
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
    </div></div>

    <br/><br/>
    <div className = "graph">
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

/>
</div>
            </div>
         
          </div>
        </div>
      </div>
 
    </div>
  
    </div>
  )

}

else if(va===true)
{
  var p = 0;
  var d=0;
  var a=0;
 
  return (
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
                Teacher Portal
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
                <li onClick = {()=>setva(false)}><a>Dashboard</a></li>
                  <li onClick = {toggle1}><a >Search Student</a></li>
                  <li onClick = {toggle7}><a  className="is-active"  >View My Attendance</a></li>
          
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
             
                  <li>
               
                    <ul>
                    <li ><a onClick = {toggle2} >Attendance</a></li>
                      <li><a>Timetable</a></li>
                      <li><a   onClick = {toggle3}>Add Assignment</a></li>
                      <li><a  onClick =  {toggle4}>Upload Marks</a></li>
                      <li><a   onClick = {toggle5}>View Class</a></li>
                      <li><a  onClick =  {toggle6}>View Attendance Record</a></li>
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
            placeholder="student id"
           type="text" 
           value= {teacher.staff_id.toUpperCase()}
          disabled = "true"
         /> 
          <> </>
    
         <> </>
         </div>
         </form>
<div className ="atflex">
  <div>
         <a  className="is-active">PRESENT </a>
         {sfattd.map(({ attd, id}) => {

            if(teacher.staff_id===attd.staff_id )
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
      
      if(teacher.staff_id===attd.staff_id )
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
    <div className ="graph">
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
/>
</div>
            </div>
         
          </div>
        </div>
      </div>
 
    </div>
    </div>
  )
}
    return (
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
                Teacher Portal
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
                  <li><a >Dashboard</a></li>
                  <li onClick = {toggle1}><a>Search Student</a></li>
                  <li className="is-active" onClick = {toggle7}><a>View My Attendance</a></li>
                </ul>
                <p className="label">
                  Administration
                </p>
                <ul className="menu-list">
                
                  <li>
                 
                    <ul>
                     <li onClick = {toggle2}><a>Attendance</a></li>
                      <li><a>Timetable</a></li>
                      <li><a onClick = {toggle3}>Add Assignment</a></li>
                      <li><a onClick =  {toggle4}>Upload Marks</a></li>
                         <li><a onClick = {toggle5}>View Class</a></li>
                      <li><a onClick =  {toggle6}>View Attendance Record</a></li>
                  
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
         
              <section className="hero is-info welcome is-small">
                <div className="hero-body">
                  <div className="container">
                    <h1 className="title">
                      Hello, {name}
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
              {eng.map(({ card,}) => { 
    
                        return(
                       
                    <div className = "boxx">
                    <article className="tile is-child box">
                      <p className="title">English</p>
                      <p className="subtitle">{card.cl_class} {card.cl_section}</p>
                    </article>
                  </div> 
                        )
                  
              } )}
                    </div>
              </section>



              <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
              {hindi.map(({ card,}) => { 
    
                        return(
                       
                    <div className = "boxx">
                    <article className="tile is-child box">
                      <p className="title">Hindi</p>
                      <p className="subtitle">{card.cl_class} {card.cl_section}</p>
                    </article>
                  </div> 
                        )
                  
              } )}
                    </div>
              </section> 



              <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
              {maths.map(({ card,}) => { 
    
                        return(
                       
                    <div className = "boxx">
                    <article className="tile is-child box">
                      <p className="title">Maths</p>
                      <p className="subtitle">{card.cl_class} {card.cl_section}</p>
                    </article>
                  </div> 
                        )
                  
              } )}
                    </div>
              </section>



              <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
              {sank.map(({ card,}) => { 
    
                        return(
                       
                    <div className = "boxx">
                    <article className="tile is-child box">
                      <p className="title">Sanskrit</p>
                      <p className="subtitle">{card.cl_class} {card.cl_section}</p>
                    </article>
                  </div> 
                        )
                  
              } )}
                    </div>
              </section>

              <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
              {science.map(({ card,}) => { 
    
                        return(
                       
                    <div className = "boxx">
                    <article className="tile is-child box">
                      <p className="title">Sceince</p>
                      <p className="subtitle">{card.cl_class} {card.cl_section}</p>
                    </article>
                  </div> 
                        )
                  
              } )}
                    </div>
              </section>

              <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
              {ssc.map(({ card,}) => { 
    
                        return(
                       
                    <div className = "boxx">
                    <article className="tile is-child box">
                      <p className="title">Social Science</p>
                      <p className="subtitle">{card.cl_class} {card.cl_section}</p>
                    </article>
                  </div> 
                        )
                  
              } )}
                    </div>
              </section>
              <br/>  <br/>  <br/>
              <section className="info-tiles">
              <div className="tile is-ancestor has-text-centered">
              {gk.map(({ card,}) => { 
    
                        return(
                       
                    <div className = "boxx">
                    <article className="tile is-child box">
                      <p className="title">G.K.</p>
                      <p className="subtitle">{card.cl_class} {card.cl_section}</p>
                    </article>
                  </div> 
                        )
                  
              } )}
                    </div>
              </section>
              <br/>  <br/>  <br/>
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

export default TeacherHome




