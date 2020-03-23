var util= require('../../utils/util.js')
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用对象存储我们过滤好的数据再传给template
      inTheaters:{},
      comingSoon:{},
      top250:{},
      searchResult:{},
      containerShow:true,
      searchPanelShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters"+"?start=0&count=3"
    var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3"
    var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
  
    this.getMovieListData(inTheatersUrl,"inTheaters","正在热映")
    this.getMovieListData(comingSoonUrl,"comingSoon","即将上映")
    this.getMovieListData(top250Url,"top250","Top250")
  },
  onMoreTap:function(event){
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  // 发请求
  getMovieListData: function (url, settedKey, categoryTitle){
    var that = this;
    wx.request({
      url: url,
      method:"GET",
      header:{
        "Content-Type": "json"
      },
      success:function(res){
        //  console.log(res.data)
        that.processDoubanData(res.data, settedKey, categoryTitle);
      },
      fail:function(error){
        console.log(error)
      }
    })
  },
  // 聚焦事件
  onBindFocus:function(e){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  //失焦事件
  onBindBlur:function(e){
    // console.log(e.detail.value)
    var text = e.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?tag=" + text;
    this.getMovieListData(searchUrl,"searchResult","")
  },
  onCancleImgTap:function(e){
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  },

  // 过滤接口数据
  processDoubanData: function (moviesDouban, settedKey,categoryTitle){
     var movies = [];
    for (var idx in moviesDouban.subjects){
      //获取处理数据
      var subject = moviesDouban.subjects[idx]
      var title = subject.title;
      // 处理一下电影的名字 超出6个字符 我们就用……代替
      if (title.length >= 6) {
        title = title.substring(0,6)+"...";
      }
  
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId:subject.id
      }
      movies.push(temp);
    }
  //  console.log(movies);
     var readyData={};
    readyData[settedKey]={
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
    // console.log(readyData)
  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})