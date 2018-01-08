import React,{Component} from 'react';
import * as Actions from '../../store/Actions.js';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  Modal,
  Platform,
} from 'react-native'

import {jumpPager, width} from '../../utils/Utils'
import NaviBarView from "../../widget/NaviBarView"
import StarRating from 'react-native-star-rating'
import LinearGradient from 'react-native-linear-gradient'
import {Movie_Types} from '../../data/constant/BaseContant'
import HttpMovieManager from "../../data/http/HttpMovieManager"

const itemHight = 200;
const moviesCount = 20;
const GrayWhiteColor = '#f5f5f5'
const GrayColor = '#9D9D9D'
const GrayBlackColor = '#666666'

class MovieList extends Component {
  static navigationOptions = {
    header: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      MainColor: 'red',
      movieData:{}
    }
    this.index = this.props.navigation.state.params.data.index
    this.HttpMovies = new HttpMovieManager();
    this.MainColor = this.props.color
  }
  componentWillMount() {
    let Navigate = this.props.navigation.state.params.data
    console.log(Navigate.title)
    if(Navigate.from === 'Search') {
      this.SearchData(Navigate.title)
    } else if (Navigate.from === 'Movie') {
      this.requestData()
    }
  }
  SearchData(str) {
    let index = 0
    let start = 0
    for(let i = 0; i < Movie_Types.length; i++) {
      if(Movie_Types[i].type == str) {
        index = 1
        break
      }
    }
    this.HttpMovies.getSearchData(index,str,start,moviesCount)
      .then((data) => {
        this.setState({movieData: data})
      }).catch((error) => {
        console.log(error)
    })
  }
  requestData() {
    let start = 0
    this.HttpMovies.getOtherMovieData(this.index, start, moviesCount)
      .then((data) => {
        this.setState({movieData: data})
      }).catch((error) => {
      console.log('error')
    })
  }
  
  _renderItemView(item) {
    item = item.subject ? item.subject : item;
    return(
      <TouchableOpacity activeOpacity={0.5}
                        onPress={() => {jumpPager(this.props.navigation.navigate, 'MovieDetail', item.id)}}>
        <View style={styles.item}>
          <Image source={{uri: item.images.large}}
                 style={styles.item_img}/>
          <View style={styles.item_right}>
            <Text style={styles.item_right_title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.item_right_text}
                  numberOfLines={1}>导演：{(item.directors[0] !== null) ? item.directors[0].name : '未知'}</Text>
            <Text style={styles.item_right_text}
                  numberOfLines={2}>主演：{item.casts.map((item, index) => item.name).join(' ')}</Text>
            <Text style={styles.item_right_text} numberOfLines={1}>{item.year}</Text>
            <View style={styles.item_right_rating}>
              <StarRating disabled={false}
                          rating={item.rating.average / 2}
                          maxStars={5}
                          halfStarEnabled={true}
                          emptyStar={require('../../data/img/icon_unselect.png')}
                          halfStar={require('../../data/img/icon_half_select.png')}
                          fullStar={require('../../data/img/icon_selected.png')}
                          starStyle={{width: 20, height: 20}}
                          selectedStar={(rating) => {
                          }}/>
              <Text style={styles.item_right_rating_text}>{item.rating.average.toFixed(1)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    if(this.state.movieData.subjects == null) {
      return (
        <LinearGradient style={styles.loading_view} colors={[this.MainColor,'white']}>
          <ActivityIndicator animating={true}
                             color={this.MainColor}
                             size='large' />
          <Text style={[styles.loading_text,{color: this.MainColor}]}>loading</Text>
        </LinearGradient>
      )
    }else {
      return (
        <View style={styles.container}>
          <StatusBar animated = {true}
                     backgroundColor = {this.MainColor}
                     barStyle = 'light-content'/>
          <NaviBarView backgroundColor={this.MainColor}/>
          <View style={[styles.toolbar,{backgroundColor:this.MainColor}]}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image source={require('../../data/img/icon_back.png')}
                     style={styles.toolbar_left_img}/>
            </TouchableOpacity>
            <View style={styles.toolbar_middle}>
              <Text style={styles.toolbar_middle_text}>{this.props.navigation.state.params.data.title}</Text>
            </View>
            <View style={styles.toolbar_right_img}/>
          </View>
          <FlatList data={this.state.movieData.subjects}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => this._renderItemView(item)}
                    showsVerticalScrollIndicator={false}/>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    color: state.color
  }
}

export default connect(mapStateToProps)(MovieList)

const styles = StyleSheet.create({
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
  },
  reload_view: {
    padding:8,
    textAlign: 'center',
    fontSize:20,
    fontWeight: '500',
    borderWidth:3,
    borderRadius:6,
  },
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  toolbar: {
    height:56,
    width:width,
    alignItems: 'center',
    flexDirection: 'row',
  },
  toolbar_left_img:{
    width:26,
    height:26,
    alignSelf: 'center',
    marginLeft: 20,
  },
  toolbar_middle: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolbar_middle_text: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white'
  },
  toolbar_right_img: {
    width:26,
    height:26,
    alignSelf: 'center',
    marginRight: 20,
  },
  item: {
    height:itemHight,
    width:width,
    flexDirection: 'row',
    padding:10,
    alignItems: 'center',
    borderColor: 'white',
    borderBottomWidth:1,
  },
  item_img: {
    width:96,
    height:155,
    borderRadius:4,
    marginRight:10,
  },
  item_right:{
    height:itemHight-20,
    flex:1,
    justifyContent:'center',
  },
  item_right_title: {
    color:GrayBlackColor,
    fontSize:16,
    fontWeight: '500',
    marginBottom: 10,
  },
  item_right_text: {
    fontSize:14,
    color:GrayColor,
    marginBottom: 4,
  },
  item_right_rating: {
    flexDirection: 'row',
    marginTop:6,
    alignItems: 'center',
  },
  item_right_rating_text: {
    fontSize: 14,
    color: '#ffcc33',
    fontWeight: '500',
    marginLeft: 8,
  }
})