// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    murl:'',
    mname:'',
    mauthor:'',
    mposter:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //将传递过来的参数值赋值给该页面play的页面初始化数据
    this.setData({
      murl: options.mu,
      mname: options.mn,
      mauthor: options.ma,
      mposter: options.mp
    });

    //实现播放：使用微信小程序的接口提供对象
    var myMusic = wx.getBackgroundAudioManager();
    myMusic.title = this.data.mname;
    myMusic.singer = this.data.mauthor;
    myMusic.src = this.data.murl;
  },

  listenerButtonPause: function () {
    wx.pauseBackgroundAudio();
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
    let that = this
    wx.onBackgroundAudioPlay(() => {
      that.timer && clearInterval(that.timer)
      that.timer = setInterval(() => {
        wx.getBackgroundAudioPlayerState({
          success: res => {
            let per = (res.currentPosition / res.duration) * 10000
            that.setData({
              musicPercent: Math.round(per) / 100 + '',
              duration: res.duration
            })
          }
        })
      }, 1000)
    })
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