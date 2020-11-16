import { Base64 } from 'js-base64'
// pages/test/test.js
Page({
    // 获取token
    onGetToken() {
        wx.login({
            success: (res) => {
                if (res.code) {
                    // 获取token的地址，参数：type：消息小程序100，account：小程序code
                    wx.request({
                        url: 'http://localhost:3000/v1/token',
                        method: 'POST',
                        data: {
                            type: 100,
                            account: res.code
                        },
                        success: (res) => {
                            console.log(res.data);
                            // 成功拿到token放入缓存中
                            const code = res.statusCode.toString();
                            if (code.startsWith('2')) {
                                wx.setStorageSync('token', res.data.token);
                            }
                        }
                    })
                }
            }
        })
    },

    // token 验证
    onVerifyToken() {
        wx.request({
            url: 'http://localhost:3000/v1/token/verify',
            method: 'POST',
            data: {
                // 获取存入微信缓存的token 进行验证
                token: wx.getStorageSync('token')
            },
            success: (res) => {
                console.log(res.data)
            }
        })
    },
    // 获取最新期刊
    onGetLatest() {
        wx.request({
            url: 'http://localhost:3000/v1/classify/latest',
            method: 'GET',
            header: {
                Authorization: this._encode()
            },
            success: (res) => {
                console.log(res.data);
            }
        })
    },

    _encode() {
        // basic-auth 需要对token进行base64加密 
        // account:password
        // token:
        const token = wx.getStorageSync('token');
        const base64 = Base64.encode(token + ':');
        // Authorization: Basic base64(account:password)
        return 'Basic ' + base64;
    },
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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