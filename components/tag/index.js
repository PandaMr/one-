// components/tag/index.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true
    },
    properties: {
        text:String,
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
        onClick:function(){
            this.triggerEvent('onAdd',{
                text: this.properties.text
            },{});
        }
    }
})
