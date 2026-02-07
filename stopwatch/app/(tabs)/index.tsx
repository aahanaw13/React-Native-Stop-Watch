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
    setLaps([]);
  }
  //record a lap
  const handleLap=()=>{
    if(isRunning){
      const lapTime=(laps.length>0?laps[0].totalTime:0);

      setLaps([{lapTime, totalTime:time,id:Date.now()},...laps])
    }
  };
  const formattedTime=formatTime(time);
  //get min and max lap times for highlighting 
  const getLapstyle= (lapTime)=>{
    if(laps.length<2) return{};
    const lapTime= laps.map((I)=>I.lapTime);
    const minLap=Math.min(...lapTimes);
    const maxLap=Math.max(...lapTimes);
    if (lapTime===minLap) return styles.fastestLap;
    if (lapTime===maxLap) return styles.slowestLap;
    return {};
  }
  const renderLapItem = ({ item, index }) => {
    const lapFormatted = formatTime(item.lapTime);
    return (
      <View style={[styles.lapItem, getLapStyle(item.lapTime)]}>
        <Text style={styles.lapText}>Lap {laps.length - index}</Text>
        <Text style={styles.lapTime}>
          {lapFormatted.minutes}:{lapFormatted.seconds}.{lapFormatted.milliseconds}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Time Display */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {formattedTime.hours}:{formattedTime.minutes}:{formattedTime.seconds}
          <Text style={styles.milliseconds}>.{formattedTime.milliseconds}</Text>
        </Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        {/* Left Button: Reset or Lap */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={isRunning ? handleLap : handleReset}
          disabled={!isRunning && time === 0}
        >
          <Text style={[
            styles.buttonText,
            !isRunning && time === 0 && styles.disabledText
          ]}>
            {isRunning ? 'Lap' : 'Reset'}
          </Text>
        </TouchableOpacity>

        {/* Right Button: Start or Pause */}
        <TouchableOpacity
          style={[
            styles.button,
            isRunning ? styles.pauseButton : styles.startButton,
          ]}
          onPress={isRunning ? handlePause : handleStart}
        >
          <Text style={[
            styles.buttonText,
            isRunning ? styles.pauseText : styles.startText
          ]}>
            {isRunning ? 'Pause' : 'Start'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lap List */}
      <View style={styles.lapsContainer}>
        <FlatList
          data={laps}
          renderItem={renderLapItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No laps recorded</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

