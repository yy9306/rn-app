import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation'

import Movie from './pages/movie/Movie'
import Theme from './pages/setting/Theme'
import MovieDetail from './pages/movie/MovieDetail'
import ImageDetailBrower from './pages/movie/ImageDetailBrower'
import MovieList from './pages/movie/MovieList'

/*
* 实现底部Tab
* */
const MainTabPage = TabNavigator({
  Movie:{screen: Movie},
},{
  animationEnabled: true,
  tabBarPosition: 'bottom',
  swipeEnabled: true,
  backBehavior: 'none',
  tabBarOptions: {
    // activeTintColor: MainColor,
    // inactiveTintColor: GrayColor,
    showIcon: true,
    upperCaseLabel: false,
    indicatorStyle: {
      height: 0,
    },
    style: {
      // backgroundColor: MainBg,
      height:54,
    },
    labelStyle: {
      padding:0,
      margin:0,
    },
    iconStyle: {
      padding:0,
      margin:0,
    }
  }
})

/*
* 实现跳转的栈
* */
const App = StackNavigator({
  Movie: {screen:Movie},
  Theme:{screen:Theme},
  MovieDetail: {screen: MovieDetail},
  ImageDetailBrower: {screen: ImageDetailBrower},
  MovieList: {screen: MovieList},
},{
  navigationOptions: {
    gesturesEnabled: true,
  },
  headerMode: 'screen'
})

export default App