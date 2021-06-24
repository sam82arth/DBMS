import React, { useState, useEffect } from "react";
import "./AddStudent.css"
import {  db } from "./firebase";
import firebase from "firebase";

function ViewClass() {
const [c,setc]=useState([])


    useEffect(() => {
  
        db.collection("student").onSnapshot((snapshot) => {
          setc(
            snapshot.docs.map((docu) => ({
              id: docu.id,
              card: docu.data(), 
            }))
          );
        })
      }, []);

    return (
        <div>
             </div>
    )
}

export default ViewClass
