var postsData = require('../../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
       isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var postId = options.id;
    this.data.currentPostId = postId;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData
    })
    // console.log(postData);
    //收藏开始   初始化代码
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {}
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
  },
  // 播放背景音乐
  onMusicTap:function(event){
    var currentPostId = this.data.currentPostId;
    var postData = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;

    if (isPlayingMusic){
      wx.stopBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
     }
     else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic:true
      })
     }


  },





  onCollectionTap:function(event){
    // wx.setStorageSync('dsd',"我好帅撒大苏打实打实大大大苏打")
    // console.log(wx.getStorageSync('key'))
    // wx.clearStorage()
     //拿到初始化的缓存的值
    var postsCollected = wx.getStorageSync('posts_collected')
    //拿到这个值
    var postCollected = postsCollected[this.data.currentPostId];
    //取反操作  收藏变成未收藏
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected;

    //更新文章是否收藏的这个缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量 从而实现图片的切换
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected?'收藏成功':'取消成功',
      icon: 'success',
      duration: 800
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