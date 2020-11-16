// pages/book/book.js
import {BookModel} from '../../models/book.js';

const bookModel = new BookModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        books:[],
        searching: false,
        loadMore: null
    },

    onSearch(event){
        this.setData({
            searching: true
        })
    },
    onCancel(event){
        this.setData({
            searching: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取热门书籍
        bookModel.getHotList().then((res)=>{
            this.setData({
                books:res.books
            })
            console.log(this.data.books);
        })
        // const hotList = bookModel.getHotList();
        // hotList.then((res)=>{
        //     console.log(res);
        // });
        

        // book 页面全部使用promise
        // 1、创建promise
        // 2、在promise中编写异步代码
        // 3、then()方法中获取结果
        // const promise = new Promise((resolve, reject)=>{
        //     wx.getUserInfo({
        //         success:(res)=>{
        //             resolve(res);
        //         },
        //         fail:(error)=>{
        //             reject(error)
        //         }
        //     })
        // });
        // // 获取结果
        // promise.then((res)=>{
        //     console.log(res);
        // },(error)=>{
        //     console.log(error);
        // });
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

    },
    // 滚动条到达底部触发
    onReachBottom:function(){
        this.setData({
            loadMore: Math.random()
        })
    }
})