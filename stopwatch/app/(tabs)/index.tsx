import React, {useState, useRef, useCallback} from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, StatusBar,
} from 'react-native';

const Stopwatch=()=>{
  const [time, setTime]=useState(0);
  const [isRunning, setIsRunning]=useState(false);
  const [laps, setLaps]=useState([]);
  const intervalRef=useRef(null);
  //format time to HH:MM:SS:MS
  const formatTime=useCallback((ms)=>{
    const hours=Math.floor(ms/3_600_000);
    const minutes=Math.floor((ms%3_600_000)/60_000);
    const seconds=Math.floor((ms%60_000)/1_000);
    const milliseconds=Math.floor((ms%1_000)/10);
    return{
      hours:hours.toString().padStart(2, "0"),
      minutes:minutes.toString().padStart(2,"0"),
      seconds:seconds.toString().padStart(2,"0")
    }
  },[]);
  //start the stopwatch 
  const handleStart=()=>{
    if(!isRunning){
      setIsRunning(true);
      const startTime=Date.now()-time;
      intervalRef.current=setInterval(()=>{
        setTime(Date.now()-startTime)
      },10);
    }
  }
  //pause the stopwatch
  const handlePause=()=>{
    if(isRunning){
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  }
  //reset the stopwatch
  const handleReset=()=>{
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLapse([]);
  }
  //record a lap
  const handleLap=()=>{
    if(isRunning){
      const lapTime=(laps.length>0?laps[0].totalTime:0);

      setLaps([{lapTime, totalTime:time,id:Date.now()},...laps])
    }
  };
}