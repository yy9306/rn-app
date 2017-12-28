import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
  CameraRoll,
} from 'react-native';

import Swiper from 'react-native-swiper'
import NaviBarView from "../../widget/NaviBarView";
import {width, height} from '../../utils/Utils'
import HttpMovieManager from '../../data/http/HttpMovieManager'
import LinearGradient from 'react-native-linear-gradient'

export default class ImageDetailBrower extends Component {

  static navigationOptions = {
    header:null
  }
  constructor(props) {
    super(props)
    this.state = {
      paginationIndex: this.props.navigation.state.params.data.index,
      MainColor: 'red',
      imageDatas: []
    }
    this.HttpImages = new HttpMovieManager()
    this.requestPhotos()
  }
  
  requestPhotos() {
    console.log(this.props.navigation)
    this.HttpImages.getPhotoDatas(this.props.navigation.state.params.data.id, this.props.navigation.state.params.data.count)
      .then((data) => {
        console.log(data)
        this.setState({imageDatas: data.photos})
      }).catch((error) => {
        console.log('error')
    })
  }
  _renderSwiperItemView() {
    return this.state.imageDatas.map((item, index) => {
      return (
        <View key={index}
              style={styles.swiper_bigimg_view}>
           <Image style={styles.swiper_bigimg_image} source={{uri: item.image}}/>
        </View>
      )
    })
  }
  render() {
    if(!this.state.imageDatas.length) {
      return (
        <LinearGradient style={styles.loading_view} colors={[this.state.MainColor, 'white']}>
          <ActivityIndicator animating={true}
                             color={this.state.MainColor}
                             size='large'/>
          <Text style={styles.loading_text}>loading</Text>
        </LinearGradient>
      )
    }else{
      return (
        <LinearGradient style={styles.container} colors={[this.state.MainColor, 'white']}>
          {/*状态栏*/}
          <StatusBar
            animated = {true}
            backgroundColor = {this.state.MainColor}
            barStyle = 'light-content'
          />
          <NaviBarView backgroundColor={this.state.MainColor}/>
          <View style={styles.toolbar_view}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => {this.props.navigation.goBack()}}>
             <Image style={styles.toolbar_view_img}
                    source={require('../../data/img/icon_back.png')}/>
              <Text style={styles.toolbar_view_text}>{this.state.paginationIndex+1}/{this.state.imageDatas.length}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.swiper_view}>
            <Swiper loop={false}
                    showsPagination={false}
                    index={this.props.navigation.state.params.data.index}
                    onIndexChanged={(index)=>{
                      this.setState({
                        paginationIndex:index
                      })
                    }}>
              {this._renderSwiperItemView()}
            </Swiper>
          </View>
        </LinearGradient>
      )
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  loading_view: {
    flex:1,
    width:width,
    justifyContent:'center',
    alignItems:'center',
    // backgroundColor: 'red',
  },
  loading_text: {
    fontSize:18,
    fontWeight: '500',
    marginTop:6,
    backgroundColor: 'transparent',
    color: 'red'
  },
  reload_view: {
    padding:8,
    textAlign: 'center',
    fontSize:20,
    fontWeight: '500',
    borderWidth:3,
    borderRadius:6,
  },
  toolbar_view: {
    height:56,
    width: width,
    position: 'absolute',
    zIndex:1,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolbar_view_img: {
    width:26,
    height:26,
    marginLeft:16,
  },
  toolbar_view_downview: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    flexDirection: 'row-reverse'
  },
  toolbar_view_down: {
    width:26,
    height:26,
    marginRight:16,
  },
  toolbar_view_text: {
    color: 'white',
    fontSize:16,
    fontWeight: '500',
    marginLeft:16,
    backgroundColor: 'transparent',
  },
  swiper_view: {
    flex:1,
    width:width,
  },
  swiper_bigimg_view: {
    justifyContent:'center',
    alignItems: 'center',
    width:width,
    flex:1,
  },
  swiper_bigimg_image: {
    width:width,
    height: 200,
    flex:1,
    resizeMode: 'contain',
  },
})