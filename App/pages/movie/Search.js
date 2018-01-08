import React,{Component} from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
  Modal,
  ActivityIndicator,
  Animated,
  Easing,
  Platform,
} from 'react-native'
import NaviBarView from "../../widget/NaviBarView";
import {width, jumpPager} from '../../utils/Utils'
import {Movie_Types} from '../../data/constant/BaseContant'
import HttpMovieManager from "../../data/http/HttpMovieManager"
import {connect} from "react-redux";

const GrayColor = '#9D9D9D'
const MovieCount = 17

class Search extends Component{
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      MainColor: 'red',
      editValue: '',
      searchDatas:{}
    }
    this.HttpMovieManager = new HttpMovieManager()
    this.title = ''
    this.MainColor = this.props.color
  }
  _renderContentView() {
    return(
      <View style={styles.content}>
        <View style={[styles.search_view, {backgroundColor: this.MainColor}]}>
          <TouchableOpacity onPress={() => {
            this.props.navigation.goBack()
          }}>
            <Image style={styles.search_view_back}
                   source={require('../../data/img/icon_back.png')}/>
          </TouchableOpacity>
          <TextInput placeholder="search"
                     placeholderTextColor={GrayColor}
                     onChangeText={(text) => this.setState({editValue: text})}
                     value={this.state.editValue}
                     style={styles.search_view_edit}/>
          <TouchableOpacity onPress={() => {jumpPager(this.props.navigation.navigate, "MovieList", {
            from: 'Search',
            title: this.state.editValue
          })}}>
            <Image style={styles.search_view_icon}
                   source={require('../../data/img/icon_search.png')}/>
          </TouchableOpacity>
        </View>
        <View style={styles.recommend_view}>
          {this.renderRecommendView()}
        </View>
      </View>
    )
  }
  renderRecommendView() {
    return Movie_Types.map((item, i) => {
      return (
        <TouchableOpacity
          key={i}
          onPress={() => {
          this.setState({editValue: item.type})
        }}>
          <View style={styles.recommend_view_item}>
            <View style={[styles.recommend_view_item_icon_view,{borderColor:item.color}]}>
              <Image source={item.icon}
                     style={[styles.recommend_view_item_icon,{tintColor:item.color}]}/>
            </View>
            <Text style={[styles.recommend_view_item_text,{color:item.color}]}>{item.type}</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated = {true}
                   backgroundColor = {this.MainColor}
                   barStyle = 'light-content' />
        <NaviBarView backgroundColor={this.MainColor}/>
        {this._renderContentView()}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    color: state.color
  }
}

export default connect(mapStateToProps)(Search)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  search_view: {
    height:56,
    width:width,
    alignItems: 'center',
    flexDirection: 'row',
  },
  search_view_back: {
    width:26,
    height:26,
    marginLeft:20,
  },
  search_view_edit: {
    flex:1,
    margin:8,
    marginLeft:20,
    marginRight:20,
    padding:4,
    paddingLeft:8,
    backgroundColor: 'white',
    borderRadius:30,
  },
  search_view_icon: {
    width:26,
    height:26,
    marginRight:20,
  },
  recommend_view: {
    marginTop:40,
    padding:10,
    flexWrap:'wrap',
    flexDirection: 'row',
    justifyContent:'center'
  },
  recommend_view_item: {
    flexDirection: 'row',
    alignItems:'center',
    padding:20,
    paddingTop:16,
  },
  recommend_view_item_icon_view: {
    padding:4,
    borderWidth:2,
    borderRadius:30,
    marginRight:10,
    justifyContent:'center',
    alignItems: 'center',
  },
  recommend_view_item_icon: {
    width:26,
    height:26,
  },
  recommend_view_item_text: {
    fontSize:16,
  },
})