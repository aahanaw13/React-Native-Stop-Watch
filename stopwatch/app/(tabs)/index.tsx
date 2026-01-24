import React, {useState, useRef, useCallback} from "react";
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, StatusBar,
} from 'react-native';

const Stopwatch=()=>{
  const [time, setTime]=useState(0);
  const [isRunning, setIsRunning]=useState(false);
  const [lapse, setLapse]=useState([]);
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
      seconds:seconds.toString().padStart(2,"0"),
    }
  })
}