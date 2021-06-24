import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import './AdminHome.css' 
import moment from 'moment'
import{Link,} from "react-router-dom";
import AddAssignment from "./AddAssignment";
import UploadMarks from "./UploadMarks";





function TeacherHome(user) {

const [notice,setNotice]=useState([])
const[jd,setJd]=useState([]);
const [student,setStudent]=useState("sft_dummy_id");
const [ast,setAst]=useState(false)
const [asf,setAsf]=useState(false);
const [card,setCard]=useState(null);
const [Scard,setScard]=useState(null);
const [sta,setsta]=useState(false);
const  [stsearch,setStsearch]=useState(false)
const  [asg,setasg]=useState(false)
const [sattd,setsattd]=useState([])
const [sfattd,setsfattd]=useState([])
const [staffl,setstaffl]=useState([])
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
const[um,setum]=useState(false)
const [name,setname]=useState([])
const [attclass,setattclass]=useState([])
const [attsection,setattsection] = useState([])

function myFunction()
{
 
    let root = document.documentElement;
      root.classList.toggle("dark-mode");
      
    
}



useEffect(() => {
  
    db.collection("staff").doc(user.user.email.substring(0,3)).get().then((doc)=>{
        setteacher(doc.data())
        setname(doc.data().sf_name)
    })
    
    db.collection("student_attendance").onSnapshot((snapshot) => {
      setsattd(
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
            
            setasg(false)
            setAst(false)
            setsta(false);
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
    setStsearch(false);
    setAsf(false);
    setsta(true);
    setum(false)
  }

  const toggle3 =() =>{
    setAst(false);
    setasg(true)
    setStsearch(false);
    setAsf(false);
    setsta(false);
    setum(false)
  }
  
  const toggle4=() =>{
    setAst(false);
    setasg(false)
    setStsearch(false);
    setAsf(false);
    setsta(false);
    setum(true)
  }


const execute_attedance= (event) =>{
    let form  = document.getElementById('form');
    if(form.checkValidity())
    {
      event.preventDefault();
   
    const absent = document.querySelectorAll('input[type=checkbox]:not(:checked)');
    const present =  document.querySelectorAll('input[type=checkbox]:checked');
    for(var i=0;i<absent.length;i++)
    {
      db.collection("student_attendance").doc(absent[i].value+"_"+date).set({
        date:date,
        student_id:absent[i].value,
        present: "no",
  
      })
    }
    for(var i=0;i<present.length;i++)
    {
      db.collection("student_attendance").doc(present[i].value+"_"+date).set({
        date:date,
        student_id:present[i].value,
        present: "yes",
  
      })
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
                Admin
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

                    
                          <input className="input_s" type="text" placeholder   onChange={(e) => setStudent(e.target.value)} value = {student}/>
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
                Admin
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
           placeholder ="section"
           onChange={(e) => setattsection(e.target.value)}
         />

          </div>
          <div>
            </div>
          
          {sstudent.map(({ card, id}) => {
            if(attclass===card.s_class && attsection === card.section)
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
                  Admin
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
                Admin
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
                Admin
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
                  <li onClick = {toggle1}><a>Search Student</a></li>
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




