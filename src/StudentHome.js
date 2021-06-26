import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import './AdminHome.css' 
import moment from 'moment'
import{Link,} from "react-router-dom";
import VerticalBarGraph from '@chartiful/react-vertical-bar-graph'
function StudentHome(user) {

   
    const[name,setname]=useState("")
    const[classs,setclasss]=useState("")
    const[section,setsection]=useState("")
    const [student,setstudent]=useState()
    const[notice,setNotice]=useState([])
    const[rollno,setrollno]=useState("")
    const[assignemt,setassignemt]=useState([])
    const[va,setva]=useState(false)
    const[vm,setvm]=useState(false)
    const[vt,setvt]=useState(false)
    const[id,setid]=useState("")
    const[ename,setename]=useState()
    const[year,setyear]=useState()
    const[exam,setexam]=useState()
    const[tt,settt]=useState([])
    const [sattd,setsattd]=useState([])

    function myFunction()
{
 
    let root = document.documentElement;
      root.classList.toggle("dark-mode");
      
    
}

    useEffect(() => {
        
  
        db.collection("student").doc((user.user.email.substring(0,8)).toUpperCase()).get().then((doc)=>{
            setstudent(doc.data())
            setname(doc.data().s_first_name)
            setclasss(doc.data().s_class)
            setrollno(doc.data().roll_no)
            setsection(doc.data().section)
            setid(doc.data().student_id)
        }) 
        db.collection("student_attendance").onSnapshot((snapshot) => {
            setsattd(
              snapshot.docs.map((docu) => ({
                id: docu.id,
                attd: docu.data(), 
              }))
            );
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
          db.collection("assignment")
          .orderBy("time")
            .onSnapshot((snapshot) => {
                setassignemt(
                snapshot.docs.map((docu) => ({
                  id: docu.id,
                  card: docu.data(),
                  time : docu.data().time.toDate(),
                  
                }))
              );
            });
            db.collection("timetable")
              .onSnapshot((snapshot) => {
                  settt(
                  snapshot.docs.map((docu) => ({
                    id: docu.id,
                    card: docu.data(),
          
                    
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
              db.collection("examination").onSnapshot((snapshot) => {
                setexam(
                  snapshot.docs.map((docu) => ({
                    id: docu.id,
                    exam: docu.data(), 
                  }))
                );
              })
    },[])

const toggle1=()=>{
 setva(true)
 setvt(false)
 setvm(false)
}
const toggle2=()=>{
    setva(false)
    setvt(false)
    setvm(true)
    setename("")
    setyear("")
}
const toggle3=()=>{
    setva(false)
    setvt(true)
    setvm(false)
}
    if(va===true)
    {

var p = 0;
 var d=0;
 var a=0;
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
            Student Portal
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
              <li><a onClick={()=> setva(false)} >Dashboard</a></li>
              <li onClick = {toggle1}><a className="is-active" >View  Attendance </a></li>
              <li onClick = {toggle2}><a>View Marks</a></li>
              <li onClick = {toggle3}><a>View  Timetable </a></li>
              
            </ul>
            
            <ul className="menu-list">
            
              <li>
             
                <ul>
                 
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
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
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
           value={id}
           disabled ="true"
          
         />
          <> </>
    
         <> </>
         </div>
         </form>
<div className ="atflex"> 
  <div>
         <a  className="is-active">PRESNT </a>
         {sattd.map(({ attd}) => {
      
            if(id===attd.student_id )
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
        {sattd.map(({ attd}) => {
      
      if(id===attd.student_id )
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
    )
    }

else if(vm===true)
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

<link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
<link rel="stylesheet" type="text/css" href="/css/style.css" />


<nav className="navbar is-white">
  <div className="container">
    <div className="navbar-brand">
      <Link className="navbar-item brand-text" to="/">
        Student Portal
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
          <li><a onClick={()=> setvm(false)}>Dashboard</a></li>
          <li onClick = {toggle1}><a >View  Attendance </a></li>
          <li onClick = {toggle2}><a className="is-active" >View Marks</a></li>
          <li onClick = {toggle3}><a>View  Timetable </a></li>
          
        </ul>
        
        <ul className="menu-list">
        
          <li>
         
            <ul>
             
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
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
        <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
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
        <br/><br/>
        <div className ="flexi">

        <div>
           <input
            required="true"
            type="text"
            value={id}
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
              
              if(exam.student_id===id&&exam.exam_name===ename&&exam.year===year)
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
)
}
else if(vt===true)
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

<link rel="stylesheet" href="https://unpkg.com/bulma@0.9.0/css/bulma.min.css" />
<link rel="stylesheet" type="text/css" href="/css/style.css" />


<nav className="navbar is-white">
  <div className="container">
    <div className="navbar-brand">
      <Link className="navbar-item brand-text" to="/">
        Student Portal
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
          <li><a onClick={()=> setvt(false)}>Dashboard</a></li>
          <li onClick = {toggle1}><a >View  Attendance </a></li>
          <li onClick = {toggle2}><a  >View Marks</a></li>
          <li onClick = {toggle3}><a className="is-active" >View  Timetable </a></li>
          
        </ul>
        
        <ul className="menu-list">
        
          <li>
         
            <ul>
             
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
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
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
       
      <table border={5} cellSpacing={0} align="center">
        {/*<caption>Timetable</caption>*/}
        <tbody><tr>
            <td align="center" height={50} width={100}><br />
              <b>Day/Period</b><br />
            </td>
            <td align="center" height={50} width={100}>
              <b>I<br />9:30-10:20</b>
            </td>
            <td align="center" height={50} width={100}>
              <b>II<br />10:20-11:10</b>
            </td>
            <td align="center" height={50} width={100}>
              <b>III<br />11:10-12:00</b>
            </td>
            <td align="center" height={50} width={100}>
              <b>12:00-12:40</b>
            </td>
            <td align="center" height={50} width={100}>
              <b>IV<br />12:40-1:30</b>
            </td>
            <td align="center" height={50} width={100}>
              <b>V<br />1:30-2:20</b>
            </td>
            <td align="center" height={50} width={100}>
              <b>VI<br />2:20-3:10</b>
            </td>
            <td align="center" height={50} width={100}>
              <b>VII<br />3:10-4:00</b>
            </td>
          </tr>
          <tr>
            <td align="center" height={50}>
              <b>Monday</b></td>
            <td align="center" height={50}>Eng</td>
            <td align="center" height={50}>Mat</td>
            <td align="center" height={50}>Che</td>
            <td rowSpan={6} align="center" height={50}>
              <h2>L<br />U<br />N<br />C<br />H</h2>
            </td>
            <td colSpan={3} align="center" height={50}>LAB</td>
            <td align="center" height={50}>Phy</td>
          </tr>
          <tr>
            <td align="center" height={50}>
              <b>Tuesday</b>
            </td>
            <td colSpan={3} align="center" height={50}>LAB
            </td>
            <td align="center" height={50}>Eng</td>
            <td align="center" height={50}>Che</td>
            <td align="center" height={50}>Mat</td>
            <td align="center" height={50}>SPORTS</td>
          </tr>
          <tr>
            <td align="center" height={50}>
              <b>Wednesday</b>
            </td>
            <td align="center" height={50}>Mat</td>
            <td align="center" height={50}>phy</td>
            <td align="center" height={50}>Eng</td>
            <td align="center" height={50}>Che</td>
            <td colSpan={3} align="center" height={50}>LIBRARY
            </td>
          </tr>
          <tr>
            <td align="center" height={50}>
              <b>Thursday</b>
            </td>
            <td align="center" height={50}>Phy</td>
            <td align="center" height={50}>Eng</td>
            <td align="center" height={50}>Sci</td>
            <td colSpan={3} align="center" height={50}>LAB
            </td>
            <td align="center" height={50}>Math</td>
          </tr>
          <tr>
            <td align="center" height={50}>
              <b>Friday</b>
            </td>
            <td colSpan={3} align="center" height={50}>LAB
            </td>
            <td align="center" height={50}>Mat</td>
            <td align="center" height={50}>Che</td>
            <td align="center" height={50}>Eng</td>
            <td align="center" height={50}>Phy</td>
          </tr>
          <tr>
            <td align="center" height={50}>
              <b>Saturday</b>
            </td>
            <td align="center" height={50}>Eng</td>
            <td align="center" height={50}>Che</td>
            <td align="center" height={50}>Mat</td>
            <td colSpan={3} align="center" height={50}>SEMINAR
            </td>
            <td align="center" height={50}>SPORTS</td>
          </tr>
        </tbody></table>
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
            Student Portal
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
              <li onClick = {toggle1}><a>View  Attendance </a></li>
              <li onClick = {toggle2}><a>View Marks</a></li>
              <li onClick = {toggle3}><a>View  Timetable </a></li>
              
            </ul>
            
            <ul className="menu-list">
            
              <li>
             
                <ul>
                 
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
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
          <li><a></a></li>
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
                  Hello {name}, {classs} {section}
                  <br/>
                  roll no : {rollno}
                </h1>
                <h2 className="subtitle">
                  I hope you are having a great day!
                </h2>
                <a className="button is-small is-primary" onClick={myFunction}>Light | Dark</a>
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
                          if(student.s_class===card.class&&student.section===card.section)
                          {
                             return(
                              <tr>
                              <td width = "25%">{moment(time).format('DD-MM-YYYY')}</td>
                              <td width = "15%"className="level-top">{card.class} {card.section}</td>
      
                              <td>{card.notice}</td>
                             
                              
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
            <div className="column is-6">
              <div className="card events-card">
                <header className="card-header">
                  <p className="card-header-title">
                    Assignment
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
                      {assignemt.map(({ card,time,id}) => {
                       
                       
                          if(student.s_class===card.class&&student.section===card.section)
                          {
                           
                             return(
                              <tr>
                              <td width = "25%">{moment(time).format('DD-MM-YYYY')}</td>
                              <td width = "15%"className="level-top">{card.class} {card.section}</td>
      
                              <td>{card.assignment}</td>
                             
                              
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
      </div>
    </div>
  </div>


    </div>
    )
}

export default StudentHome
