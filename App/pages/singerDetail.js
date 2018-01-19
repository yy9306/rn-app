import React, {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated
} from 'react-native'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

import {createSong} from '../common/song'
import {width,height, jumpPager} from '../base/Utils'

const windowHeight = width * 0.7;

export default class Singer extends Component{
  static navigationOptions = {
    header: null,
  }
  
  constructor(props) {
    super(props)
    this.state = {
      singerData: [],
    }
  
    this.singerDetail = require('../sources/json/singerDetail.json')
    this.title = this.props.navigation.state.params.data.name
    this.avatar = this.props.navigation.state.params.data.avatar
  }
  
  componentWillMount() {
    this._normalizeSongs(this.singerDetail.data.list)
  }
  
  _normalizeSongs (list) {
    let ret = []
    list.forEach((item) => {
      let {musicData} = item
      if (musicData.songid && musicData.albummid) {
        ret.push(createSong(musicData))
      }
    })
    this.setState({singerData: ret})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {this.props.navigation.goBack()}} style={styles.back}>
           <Image style={{width: 26, height: 26}}  source={require('./img/icon_back.png')}/>
        </TouchableOpacity>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{this.props.navigation.state.params.data.title}</Text>
        </View>
        <Image style={{
          resizeMode: 'cover',
          width: width,
          height: windowHeight,
        }}  source={{uri: this.avatar}}/>
        <View style={{
          flex: 1,
          // transform: [{translateY: -140}],
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#222',
        }} ref="list_wrapper">
          <FlatList
                    data={this.state.singerData}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={26}
                    renderItem={({item}) => {
                      return (
                        <View style={styles.listGroup}>
                          <Text numberOfLines={1} style={styles.singer_name}>{item.name}</Text>
                          <Text numberOfLines={1} style={styles.singer_album}>{item.singer}-{item.album}</Text>
                        </View>
                      )
                    }}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#222222',
  },
  bigImag: {
    width: width,
    height: 7/10*width,
  },
  titleWrapper: {
    marginTop: 10,
    flex: 1,
    width: 0.8 * width,
    height: 50,
    position: 'absolute',
    left: 0.1 * width,
    justifyContent: 'center',
    zIndex: 101,
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
  back: {
    position: 'absolute',
    left: 10,
    top: 25,
    zIndex: 10,
  },
  song_list_wrapper: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  listGroup: {
    height:64,
    flex: 1,
    justifyContent: 'center'
  },
  singer_name: {
    fontSize: 14,
    color: '#fff',
  },
  singer_album: {
    fontSize: 14,
    marginTop: 5,
    color: 'hsla(0,0%,100%,.3)'
  }
})

