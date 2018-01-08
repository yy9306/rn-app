import React,{Component} from 'react';
import * as Actions from '../../store/Actions.js';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Platform,
  Dimensions
} from 'react-native'

import {width, jumpPager} from '../../utils/Utils'
import NaviBarView from "../../widget/NaviBarView";
import HttpMovieManager from "../../data/http/HttpMovieManager"
import Swiper from 'react-native-swiper'
import StarRating from 'react-native-star-rating'
import LinearGradient from 'react-native-linear-gradient'
import {Cate_Data} from '../../data/constant/BaseContant'

const itemHight = 200;
const moviesCount = 20;
const WhiteTextColor = '#ffffff'
const Translucent = 'rgba(125,125,125,0.6)'
const GrayWhiteColor = '#f5f5f5'

class Movie extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state={
      MainColor: 'red',
      hotMovies: {}
    }
    this.HttpMovies  = new HttpMovieManager();
    this.requestData()
  }
  // 获取数据
  requestData() {
    let start = 2, count = 20
    this.HttpMovies.getHottingMovie(start, count)
      .then((movies) => {
        this.setState({
          hotMovies: movies
        })
      })
  }
  getHotMovieDatas (isBanner) {
    let items = [];
    let movieDatas = this.state.hotMovies.subjects;
    if (movieDatas != null && movieDatas.length>4) {
      if (isBanner) {
        for (let i = 0; i < 4; i++) {
          items.push(movieDatas[i]);
        }
      } else {
        for (let i = 4; i < movieDatas.length; i++) {
          items.push(movieDatas[i]);
        }
      }
    }
    return items;
  }
  _swiperChildrenView(color) {
    let items = this.getHotMovieDatas(true)
    return items.map((item, i) => {
      return (
        <TouchableOpacity activeOpacity={0.5} key={i}
                          onPress={() => {
                            jumpPager(this.props.navigation.navigate, 'MovieDetail', item.id)
                          }}>
          <View style={[styles.swiper_children_view, {backgroundColor: color}]}>
            <Image style={styles.swiper_children_cover}
                   source={{uri: item.images.large}}/>
            <View style={styles.swiper_children_right}>
              <Text style={styles.swiper_children_title}
                    numberOfLines={1}
                    ellipsizeMode='tail'
              >
                {item.title}
              </Text>
              <View style={styles.swiper_children_director}>
                <Image source={{uri: item.directors[0].avatars.small}}
                       style={styles.swiper_children_director_img}
                />
                <Text style={styles.swiper_children_director_name}
                      numberOfLines={1}>
                  {(item.directors[0] != null ? item.directors[0].name : "未知")}
                </Text>
              </View>
              <View style={styles.swiper_children_casts_view}>
                <Text style={styles.swiper_children_casts_text}
                      numberOfLines={2}>
                  主演: {item.casts.map((data, i) => data.name).join(' ')}
                </Text>
              </View>
              <View style={styles.swiper_children_genres_view}
                    numberOfLines={2}>
                <Text style={styles.swiper_children_genres_text}>
                  {item.collect_count} 看过
                </Text>
              </View>
              <View style={styles.swiper_children_rating_view}>
                <StarRating disabled={false}
                            rating={item.rating.average / 2}
                            maxStars={5}
                            halfStarEnabled={true}
                            emptyStar={require('../../data/img/icon_unselect.png')}
                            halfStar={require('../../data/img/icon_half_select.png')}
                            fullStar={require('../../data/img/icon_selected.png')}
                            // starSize={20}
                            starStyle={{width: 20, height: 20}}
                            selectedStar={(rating) => {
                            }}/>
                <Text style={styles.swiper_children_rating_text}>{item.rating.average.toFixed(1)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    })
  }
  // 渲染tab
  _cateChildrenView() {
    return Cate_Data.map((item, i) => {
      return (
        <TouchableOpacity activeOpacity={0.5} key={i} style={styles.cate_children_touchview}
                          onPress={() => {
                            jumpPager(this.props.navigation.navigate, "MovieList", {
                              index: item.index,
                              title: item.title,
                              from: "Movie"
                            })
                          }}>
          <View style={styles.cate_children_view}>
            <LinearGradient colors={item.colors} style={styles.cate_children_linear}>
              <Image source={item.icon}
                     style={styles.cate_children_image}/>
            </LinearGradient>
            <Text
              style={styles.cate_children_text}>
              {item.title}
            </Text>
          </View>
        </TouchableOpacity>
      )
    })
  }
  // 渲染滚动列表
  _renderItemView(item, color) {
    return (
      <View style={styles.flat_item}>
        <TouchableOpacity activeOpacity={0.5}
                          style={styles.flat_item_touchableview}
                          onPress={() => {
                            jumpPager(this.props.navigation.navigate, "MovieDetail", item.id)
                          }}>
          <View style={[styles.flat_item_view,{backgroundColor: color}]}>
            <Image source={{uri:item.images.large}}
                   style={styles.flat_item_image}/>
           <View style={[styles.flat_item_detail,{backgroundColor: color}]}>
              <Text style={styles.flat_item_title} numberOfLines={1}>
                {item.title}
              </Text>
             <View style={styles.flat_item_rating_view}>
             <StarRating disabled={false}
                         rating={item.rating.average/2}
                         maxStars={5}
                         halfStarEnabled={true}
                         emptyStar={require('../../data/img/icon_unselect.png')}
                         halfStar={require('../../data/img/icon_half_select.png')}
                         fullStar={require('../../data/img/icon_selected.png')}
                         starStyle={{width: 14, height: 14}}
                         selectedStar={(rating)=>{}}/>
             <Text style={styles.flat_item_rating_number} numberOfLines={1}>{item.rating.average.toFixed(1)}</Text>
             </View>
           </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  // 渲染主题元素
  _getContentView(color) {
    return (
      <View style={styles.content_view}>
        {/*banner 栏*/}
        <View style={styles.middle_view}>
          <View style={styles.swiper}>
            <Swiper height={220}
                    autoplay={true}
                    autoplayTimeout={4}
                    dot = {<View style={styles.swiper_dot}/>}
                    activeDot = {<View style={styles.swiper_activeDot}/>}
                    paginationStyle={styles.swiper_pagination}
            >
              {this._swiperChildrenView(color)}
            </Swiper>
          </View>
          {/*分类栏*/}
          <View style={[styles.cate_view,{backgroundColor: color}]}>
            {this._cateChildrenView(color)}
          </View>
        </View>
        {/*列表*/}
        <View style={styles.flat_view}>
          <FlatList
            data={this.getHotMovieDatas(false)}
            keyExtractor={(item,index)=>index}
            renderItem={
              ({item}) => this._renderItemView(item, color)
            }
            showsVerticalScrollIndicator={false}
            numColumns={3} />
        </View>
      </View>
    )
  }
  render() {
    let {color} = this.props
    return (
      <View style={styles.container}>
        {/*状态栏*/}
        <StatusBar
          animated = {true}
          backgroundColor = {color}
          barStyle = 'light-content'
        />
        <NaviBarView backgroundColor={color}/>
        <View style={[styles.toolbar,{backgroundColor:color}]}>
          <TouchableOpacity activeOpacity={0.5}
            onPress={() => {jumpPager(this.props.navigation.navigate, 'Theme', null)}}
          >
            <Image
              source={require('../../data/img/icon_theme.png')}
              style={styles.toolbar_left_img}
              tintColor={'white'}/>
          </TouchableOpacity>
          <View style={styles.toolbar_middle}>
            <Text style={styles.toolbar_middle_text}>JM</Text>
          </View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {jumpPager(this.props.navigation.navigate, 'Search', null)}}>
            <Image
              source={require('../../data/img/icon_search.png')}
              style={styles.toolbar_right_img}
              tintColor={'white'}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollview_container}
                    showsVerticalScrollIndicator={false}>
          {this._getContentView(color)}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    color: state.color
  }
}

export default connect(mapStateToProps)(Movie)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
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
  scrollview_container: {
    flex: 1,
  },
  content_view: {
    flex: 1,
  },
  middle_view: {
    backgroundColor: WhiteTextColor,
    paddingBottom: 10,
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4,
  },
  swiper: {
    height: 220,
  },
  swiper_dot: {
    backgroundColor: Translucent,
    width: 16,
    height: 2,
    borderRadius: 1,
    marginLeft: 2,
    marginRight: 2,
  },
  swiper_activeDot: {
    backgroundColor: WhiteTextColor,
    width: 16,
    height: 2,
    borderRadius: 1,
    marginLeft: 2,
    marginRight: 2,
  },
  swiper_pagination: {
    justifyContent: 'flex-end',
    marginRight: 20,
  },
  swiper_children_view: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    margin :10,
    paddingLeft:10,
    paddingRight: 10,
    borderRadius: 6,
  },
  swiper_children_cover: {
    width: 112,
    height: 180,
    borderRadius: 4,
  },
  swiper_children_right: {
    marginTop: 20,
    height: 180,
    width: width-172,
    marginLeft: 20,
  },
  swiper_children_title: {
    fontSize: 18,
    marginBottom: 10,
    color: WhiteTextColor
  },
  swiper_children_director: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  swiper_children_director_img: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  swiper_children_director_name: {
    fontSize: 14,
    color: GrayWhiteColor
  },
  swiper_children_casts_view: {
    width: width-190,
    marginBottom: 10,
  },
  swiper_children_casts_text: {
    fontSize:14,
    flexWrap: 'wrap',
    color: GrayWhiteColor
  },
  swiper_children_genres_view: {
    width: width-190,
    marginBottom: 10,
  },
  swiper_children_genres_text: {
    fontSize:14,
    flexWrap: 'wrap',
    color: GrayWhiteColor,
  },
  swiper_children_rating_view: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  swiper_children_rating_text: {
    fontSize: 16,
    color: '#ffcc33',
    fontWeight: '500',
    marginLeft: 8,
  },
  cate_view: {
    height: 72,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 4,
  },
  cate_children_touchview: {
    width: (width-20)/4,
    height: 72,
  },
  cate_children_view: {
    width: (width-20)/4,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cate_children_linear: {
    width: 42,
    height: 42,
    borderRadius: 26,
    marginBottom:4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'blue'
  },
  cate_children_image: {
    width: 26,
    height: 26,
  },
  cate_children_text: {
    fontSize: 14,
    color: WhiteTextColor,
  },
  flat_view: {
    flex: 1,
    marginLeft:5,
    marginRight:5,
    backgroundColor: GrayWhiteColor,
  },
  flat_item: {
    height: itemHight,
    width:(width-10)/3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flat_item_touchableview: {
    height: itemHight-16,
  },
  flat_item_view: {
    height: itemHight-16,
    alignItems: 'center',
    borderRadius: 4,
  },
  flat_item_image: {
    width: (width-10)/3-10,
    height:itemHight-26,
    borderRadius: 4,
  },
  flat_item_detail: {
    width: (width-10)/3-10,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    padding: 2,
    borderBottomRightRadius:4,
    borderBottomLeftRadius:4,
  },
  flat_item_title: {
    fontSize: 14,
    color: WhiteTextColor,
  },
  flat_item_rating_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flat_item_rating_number: {
    fontSize: 12,
    color: '#ffcc33',
    fontWeight: '500',
    marginLeft: 4,
  },
})