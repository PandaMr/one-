//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
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
                      // 成功拿到token放入缓存中
                      const code = res.statusCode.toString();
                      if (code.startsWith('2')) {
                          wx.setStorageSync('token', res.data.token);
                      }
                  }
              })
          }
      }
    }),
          
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

    // 验证token
    onVerifyToken() {
        wx.request({
            url: 'http://localhost:3000/v1/token/verify',
            method: 'post',
            data: {
                token: wx.getStorageSync('token')
            },
            success: (res) => {
                console.log(res.data);
            }
        })
    },

  globalData: {
    userInfo: null
  }
})