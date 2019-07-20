// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    murl:'',
    mname:'',
    mauthor:'',
    mposter:'',
    play:false,
    myMusic:null,
    playImg:"../../images/play.png",
    visible:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hide: this.data.visible
    })
    console.log(options);
    if(options.mu!=null){//首页传参
      //将传递过来的参数值赋值给该页面play的页面初始化数据
      this.setData({
        murl: options.mu,
        mname: options.mn,
        mauthor: options.ma,
        mposter: options.mp
      });
      var myMusic = wx.getBackgroundAudioManager();
      myMusic.title = this.data.mname;
      myMusic.src = this.data.murl;
      this.setData({
        play: true,
        myMusic: myMusic
      });
    }else{//列表传参：通过storage
      let that = this;
        wx.getStorage({
         key: 'songInfo',
          success: function(res) {
            console.log("play-storage"+res.data.singer);
            that.setData({
              murl: res.data.url,
              mname: res.data.name,
              mauthor: res.data.singer,
              mposter: res.data.pic
            });
            
            //实现播放：使用微信小程序的接口提供对象
            var myMusic = wx.getBackgroundAudioManager();
            myMusic.title = that.data.mname;
            myMusic.src = that.data.murl;
            that.setData({
              play: true,
              myMusic: myMusic
            });
          
          
        },
      })
    }

  },

  showLyrics: function () {
    if (this.data.visible == 1) {
      this.data.visible = 0
    } else {
      this.data.visible = 1
    }
    this.setData({
      hide: this.data.visible
    })
  },
  /**
   * 实现音乐播放与暂停
   */
  playOrPause:function(){
    if(this.data.play){
      //暂停音乐
      this.data.play=false;
      this.data.myMusic.pause();
      this.setData({
        playImg:"../../images/play.png"
      })
    }else{
      //播放音乐
      this.data.play=true;
      this.data.myMusic.play();
      this.setData({
        playImg: "../../images/stop.png"
      })
    }
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