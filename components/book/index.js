// components/book/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        book: Object
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onBook:function(){
            // 点击图书进入图书详情页面
            const bookId = this.properties.book.id;
            // 调用微信的跳转页面接口 
            wx.navigateTo({
                url: `/pages/book-detail/book-detail?bookId=${bookId}`,
                success: function(res) {},
                fail: function(res) {},
                complete: function(res) {},
            })
        }
    }
})
