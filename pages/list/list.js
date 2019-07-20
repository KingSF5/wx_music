// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'https://v1.itooi.cn/tencent/topList?id=26&pageSize=10&page=0&format=1',
      //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)//服务器返回数据
        that.setData({
          data:res.data.data
        })
      }
    })
  },

  /*创建一个函数，当点击列表项的时候，会进到openPlay*/
  openPlay:function(e){
    //console.log(e);
    //哪个被点击：data-id所传过来的view索引，对应到songlist的索引
    var id =e.currentTarget.dataset.id;
    console.log("id"+id);

    //传递数据到play界面
    wx.setStorage({
      key: 'songInfo',
      data: this.data.data[id],
    })
    
    wx.navigateTo({
      url:"../play/play",
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