// 导入类
import { ClassifyModel } from '../../models/classify.js';
import { LikeModel } from '../../models/like.js';

// 实例化类
let classifyModel = new ClassifyModel();
let likeModel = new LikeModel();

// pages/home/home.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        classify:null, //获取最新期刊拿到的数据
        latest: true,  
        first: false,
        likeCount:0,
        likeStatus:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 异步函数没有return  使用回调函数获取返回值
        classifyModel.getLatest((res) => {
            //   异步函数需要使用回调函数接收数据
            //   把接收的数据存到data里 渲染页面
            this.setData({
                classify: res,
                likeCount: res.fav_nums,
                likeStatus: res.like_status
            });
            console.log(this.data.classify);
        });
    },

    // 上一期
    onPrevious:function(event){
        this._updateClassify('previous');
    },
    // 下一期
    onNext:function(event){
        this._updateClassify('next');
    },

    // 封装切换期刊
    _updateClassify:function(nextOrPrevious){
        // 获取当前期刊的index 
        let index = this.data.classify.index;
        // 传入index 和回调函数获取 上一期期刊
        classifyModel._getClassify(index, nextOrPrevious, (res) => {
            // 调用用户喜欢期刊的状态和和数量
            this._getClassifyLikeStatus(res.type,res.id);
            this.setData({
                classify: res,
                latest: classifyModel.isLetast(res.index),
                first: classifyModel.isFirst(res.index)
            })
        })
    },

    // 自定义事件监听的函数
    // 喜欢按钮
    onlike: function (event) {
        console.log(event)
        let behavior = event.detail.behavior;
        // 调用likeModel classL类like方法获取点赞数 
        // 参数：喜欢或不喜欢，文章id,文章类型
        likeModel.like(behavior, this.data.classify.id, this.data.classify.type);
    },

    // 获取用户喜欢的状态和数量
    _getClassifyLikeStatus: function (category,artId){
        likeModel.getLikeStatus(category, artId, (res)=>{
            this.setData({
                likeCount: res.fav_nums,
                likeStatus: res.like_status
            });
        });
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