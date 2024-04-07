import React, {Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image, useColorScheme, TouchableOpacity} from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
      <View style={styles.sectionContainer}>
        <Text
            style={[
              styles.sectionTitle,
              {
                color: isDarkMode ? Colors.white : Colors.black,
              },
            ]}>
          {title}
        </Text>
        <Text
            style={[
              styles.sectionDescription,
              {
                color: isDarkMode ? Colors.light : Colors.dark,
              },
            ]}>
          {children}
        </Text>
      </View>
  );
};

class Music extends Component {
  constructor(props) {
    super(props);
    this.songs = [
      {
        title:"",
        artist:"",
        album:"",
        picUrl:""
      }
    ];
    this.songsCount = 0;
    this.state = {
      hasRequestEnd:false,
      i: 0
    }
  }


  GetPlayList() {
    fetch("http://114.116.228.70/playlist", {
      method: "GET"
    }).then(
        async (res) => {
          const data = await res.json();
          const _songs = this.ParsePlaylist(data);
          this.songs = _songs;
          this.songsCount = _songs.length;
          this.setState({hasRequestEnd: true});
          //console.log(res.json());
        }
    ).catch(
        (e) => {
          console.log(e);
          this.setState({hasRequestEnd: true});

        }
    );
  }
  ParsePlaylist(data){
    let output = [];
    if(data.code === 200){
      for(let song of data.songs){
          output.push(
              {
                title:song.name,
                artist:song.ar[0].name,
                album:song.al.name,
                picUrl:song.al.picUrl
              }
          )
      }
    } else {
      output.push(
          {
            title:"",
            artist:"",
            album:"",
            picUrl:""
          }
      )
    }
    return output;
  }
  ChangeSong(){
    let _i = this.state.i;
    if (_i === this.songsCount-1) {
      _i = 0;
    } else {
      _i += 1;
    }
    this.setState({
      i: _i
    })
  }

  componentDidMount() {
    this.GetPlayList();
  }

  render() {
    return (
        <SafeAreaView>
          <View
              style={{
                // backgroundColor: isDarkMode ? Colors.black : Colors.white,
              }}>
            <Section title={this.props.title}/>
          </View>
          <View>
            <Text style={styles.sectionDescription}>
              {new Date().toDateString()}
            </Text>
          </View>
          <View style={styles.loadWrap}>
            <Image
                style={{
                  resizeMode: "cover",
                  height: 300,
                  width: 300,
                }}
                source={{uri:this.songs[this.state.i].picUrl}}/>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>
              {`歌手名:${this.songs[this.state.i].artist}`}
              {"\n"}
              {`专辑名:${this.songs[this.state.i].album}`}
              {"\n"}
              {`歌曲名:${this.songs[this.state.i].title}`}
              {"\n"}
            </Text>
          </View>

          <TouchableOpacity style={{
            width: 200,
            height: 50,
            backgroundColor: 'lime',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onPress = {()=>{this.ChangeSong()}}
          >
            <Text fontSize={24}>
              换
            </Text>
          </TouchableOpacity>

        </SafeAreaView>
    );
  }
}

// const styles = StyleSheet.create({
//   title:{
//     padding: 20,
//     fontSize: 25
//   }
// })

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  loadWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    height: '60%',
    width: '100%',
  },
  text: {
    fontSize: 20,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  textView: {
    justifyContent: "center",
    alignItems: "center"
  },
});

export default Music;
