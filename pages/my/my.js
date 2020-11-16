// pages/my/my.js
import {BookModel} from '../../models/book.js';
import {ClassifyModel} from '../../models/classify.js';

const bookModel = new BookModel();
const classModel = new ClassifyModel();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        authorized: false,
        bookCount: 0,
        classify: null
    },
    // 用户授权调用方法
    onGetUserInfo(event){
        const userInfo = event.detail.userInfo;
        if(userInfo){
            this.setData({
                userInfo: userInfo,
                authorized: true
            })
        }
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.userAuthorized();
        this.getBookCount();
        this.getMyFavor();
        
    },

    // 用户授权
    userAuthorized(){
        // 查看用户是否授权
        wx.getSetting({
            success: (data) => {
                console.log(data)
                if (data.authSetting['scope.userInfo']) {
                    // 用户授权后 才能获取用户信息
                    wx.getUserInfo({
                        success: (data) => {
                            this.setData({
                                userInfo: data.userInfo,
                                authorized: true
                            })
                        }
                    });
                } else {
                    console.log('未授权')
                }
            }
        })
    },

    getBookCount(){
        bookModel.getBookCount().then((res)=>{
            this.setData({
                bookCount: res.count
            })
        })
    },

    // 获取我喜欢的期刊
    getMyFavor(){
        classModel.getMyFavor().then((res)=>{
            console.log(res);
            this.setData({
                classify:res
            })
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