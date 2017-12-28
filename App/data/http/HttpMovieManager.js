const Base = {
  name: 'apikey',
  value: '0df993c66c0c636e29ecbb5344252a4a'
}

/*基础链接头*/
const BaseUrl = "https://api.douban.com/v2"
/*正在热映*/
const Movie_Hoting_Url = "/movie/in_theaters"
/*top250*/
const Movie_UpComming_Url="/movie/top250"
/*口碑榜*/
const Movie_Praise_Url = "/movie/weekly"
/*北美票房榜*/
const Movie_North_Url = "/movie/us_box"
/*新片榜*/
const Movie_News_Url = "/movie/new_movies"
/*电影条目信息*/
const Movie_Detail_Url = '/movie/subject/'
/*电影搜索*/
const Movie_Search_Url = '/movie/search'
/*apikey*/
const DouBan_ApiKey='00aefce4d06e0bb7020cf6ae714a2325';

export default class HttpMovieManager {
  /*正在热映*/
  getHottingMovie(start,count) {
    return new Promise((resolve,reject) => {
      fetch(BaseUrl+Movie_Hoting_Url+"?start="+start+"&count="+count)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
        .done()
    })
  }

  getMovieDetail(id) {
    return new Promise((resolve, reject) => {
      fetch(BaseUrl+Movie_Detail_Url+id)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
        .done()
    })
  }
  getPhotoDatas(id, count) {
    return new Promise((resolve, reject) => {
      fetch(BaseUrl+Movie_Detail_Url+id+'/photos'+"?count="+count+"&"+Base.name+"="+Base.value)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
        .done()
    })
  }
  // 评论
  
  getCommenaryData(id, start, count) {
    return new Promise((resolve, reject) => {
      fetch(BaseUrl+Movie_Detail_Url+id+"/comments"+"?start="+start+"&count="+count+"&"+Base.name+"="+Base.value)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
        .done()
    })
  }
  getOtherMovieData(index, start,count) {
    let Suffix = Movie_UpComming_Url;
    let key = "";
    switch (index) {
      case 0:
        break;
      case 1:
        Suffix = Movie_Praise_Url;
        key = "&"+Base.name+"="+Base.value;
        break;
      case 2:
        Suffix = Movie_North_Url;
        break;
      case 3:
        Suffix = Movie_News_Url;
        key = "&"+Base.name+"="+Base.value;
        break;
    }
    return new Promise((resolve, reject) => {
      fetch(BaseUrl+Suffix+"?start="+start+"&count="+count+key)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
        .done()
    })
  }
  
  getSearchData(index,str,start,count) {
    let type = "&q="
    if(index === 1) {
      type = "&tag="
    }
    return new Promise((resolve, reject) => {
      fetch(BaseUrl+Movie_Search_Url+"?start="+start+"&count="+count+type+str)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
        .done()
    })
  }
}