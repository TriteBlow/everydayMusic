import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class LearnFlex extends Component {
  render() {
    return (
        <View style ={styles.container}>
          <View style={styles.box1}><Text>1</Text></View>
          <View style={styles.box2}><Text>2</Text></View>
          <View style={styles.box3}><Text>3</Text></View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    display:"flex",
    flexDirection:"row"
  },
  box1:{
    width:100,
    height:100,
    backgroundColor:"#ccc"
  },
  box2:{
    width:100,
    height:100,
    backgroundColor:"#fcf"
  },
  box3:{
    width:100,
    height:100,
    backgroundColor:"#ffc"
  },
})
export default LearnFlex;
