// components/like/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like:{
            type:Boolean,
            value:false
        },
        count:{
            type:Number,
            value:0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        like_src:'/static/images/like_true.png',
        dislike_src:'/static/images/like.png'
    }, 

    /**
     * 组件的方法列表
     */
    methods: {
        // 触发喜欢按钮事件
        onLike:function(event){
            // 获取like 和 count 的值
            let like = this.properties.like;
            let count = this.properties.count;
            count  = like?count-1:count+1;
            // 设置值
            this.setData({
                like: !like,
                count: count,
            });
            let behavior = this.properties.like?'like':'cancel';
            // 自定义触发事件
            this.triggerEvent('like',{
                behavior:behavior
            },{});
        }
    }
})
