import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  Animated,
  Platform,
} from 'react-native'

import {width} from '../../utils/Utils'
import NaviBarView from '../../widget/NaviBarView'
import {Theme_Datas} from '../../data/constant/BaseContant'

const itemHight = 200;

export default class Theme extends Component {

  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      MainColor: 'red',
      fadeAnim: new Animated.Value(0)
    }
  }
  
  componentDidMount() {
    return Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 500,
        // 启用原生动画驱动
        useNativeDriver: true,
      }).start()
  }
  
  _renderItemView(item, index) {
    return (
      <TouchableOpacity activeOpacity={0.5}
                        key={index}
                        onPress={()=> {
                          this.props.navigation.goBack()}}
      >
        <Animated.View style={[styles.item, {
          opacity: this.state.fadeAnim,
          transform: [{scale: this.state.fadeAnim}]
        }]} key={index}>
          <View style={[styles.item_top, {backgroundColor: item.color}]}/>
          <View style={styles.item_bottom}>
            <Text numberOfLines={1} style={[styles.item_bottom_text, {color: item.color}]}>{item.name}</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated = {true}
          backgroundColor = {this.state.MainColor}
          barStyle = 'light-content'
        />
        <NaviBarView backgroundColor={this.state.MainColor}/>
        <View style={[styles.toolbar,{backgroundColor:this.state.MainColor}]}>
          <TouchableOpacity activeOpacity={0.5}
                            onPress={() => {this.props.navigation.goBack()}} >
            <Image source={require('../../data/img/icon_back.png')}
                   style={styles.toolbar_left_img}
                   tintColor={'white'}/>
          </TouchableOpacity>
          <View style={styles.toolbar_middle}>
            <Text style={styles.toolbar_middle_text}>Theme</Text>
          </View>
          <View style={styles.toolbar_right_img}/>
        </View>
        <View style={styles.flat_view}>
          <FlatList data={Theme_Datas}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => this._renderItemView(item,index)}
                    showsVerticalScrollIndicator={false}
                    numColumns={3}/>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
    color:'white',
  },
  toolbar_right_img: {
    width:26,
    height:26,
    alignSelf: 'center',
    marginRight: 20,
  },
  item: {
    width:(width-40)/3,
    height:(width-40)*0.4,
    margin:5,
  },
  item_top: {
    width:(width-40)/3,
    flex:2,
    borderTopLeftRadius:4,
    borderTopRightRadius:4,
  },
  item_bottom: {
    width:(width-40)/3,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderBottomLeftRadius:4,
    borderBottomRightRadius:4,
    backgroundColor:'white',
  },
  item_bottom_text: {
    fontSize:14,
    fontWeight:'500',
    color:'#666',
  }
})