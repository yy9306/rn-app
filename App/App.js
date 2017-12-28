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