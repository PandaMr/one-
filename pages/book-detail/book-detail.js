// pages/book-detail/book-detail.js
import {BookModel} from '../../models/book.js';
import {LikeModel} from '../../models/like.js';

const bookModel = new BookModel();
const likeModel = new LikeModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        book:null,
        comments:[],
        likeCount: 0,
        likeStatus: false,
        posting: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中',
        });
        // 接收书籍id  显示书籍详情
        const bookId = options.bookId;
        console.log(bookId)
        // 获取书籍详情
        const bookDetail = bookModel.getBookDetail(bookId);
        // 获取书籍评论
        const bookComments = bookModel.getBookComments(bookId);
        // 获取书籍点赞状态和数量
        const likeStatus = bookModel.getLikeStatus(bookId);
        
        // 将三个异步请求包装成一个promise，按照传入的顺序返回结果
        Promise.all([bookDetail, bookComments, likeStatus]).then((res)=>{
            wx.hideLoading();
            this.setData({
                book: res[0],
                comments: res[1],
                likeCount: res[2].favorNumbers,
                likeStatus: res[2].like_status
            });
        });
    },

    onLike(event){
        const behavior = event.detail.behavior;
        console.log(event,this.data.book.id);
        // 喜欢
        likeModel.like(behavior,this.data.book.id, 400);
    },
    onComment(event){
        this.setData({
            posting:true
        })
    },
    // 取消短评
    onCancel(event){
        this.setData({
            posting: false
        })
    },

    // 添加短评
    onPost(event){
        // 获取用户点击标签上的文字 或 用户输入框输入的文字
        const comment = event.detail.text || event.detail.value;
        if(!comment){
            return;
        }
        if(comment.length > 12){
            wx.showToast({
                title: '抱歉，最多12个字',
                success: 'none'
            })
            return ;
        }

        // 调用添加评论接口 参数book_id, content 
        bookModel.postComment(this.data.book.id, comment).then((res)=>{
            // 添加评论在最前
            this.data.comments.unshift({
                content: comment,
                numbers: 1
            });
            // 更新数据
            this.setData({
                comments: this.data.comments,
                posting: false
            });
            // 提示信息
            wx.showToast({
                title: '+1',
                icon: 'success'
            });
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