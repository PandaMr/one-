// components/nav/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title:String,
        latest:Boolean,
        first:Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        nextSrc: 'images/next.png',
        disNextSrc: 'images/disnext.png',
        previousSrc: 'images/previous.png',
        disPreviousSrc: 'images/disPrevious.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
        onRight:function(evnet){
            if (!this.properties.first) {
                this.triggerEvent('right', {}, {});
            }
        },
        onLeft:function(evnet) {
            if(!this.properties.latest){
                this.triggerEvent('left', {}, {});
            }
        }
    }
})
