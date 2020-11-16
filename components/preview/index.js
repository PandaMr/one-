// components/preview/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        classify: {
            type: Object,
            observer: function (newVal) {
                if (newVal) {
                    var typeText = {
                        100: "电影",
                        200: "音乐",
                        300: "句子"
                    }[newVal.type];
                    var imageType = {
                        100: "movie",
                        200: "music",
                        300: "essay"
                    }[newVal.type];
                }
                this.setData({
                    typeText,
                    imageType: `/components/classify/${imageType}/${newVal.image}`
                })
            }
        }
        
    },
    // 组件加载
    attached(){

    },
    /**
     * 组件的初始数据
     */
    data: {
        likeCount: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
