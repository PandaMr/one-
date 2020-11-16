// components/classify/movie/index.js
import {classifyBehavior} from '../classify-behavior.js'
Component({
    // 组件继承 行为 获取公共的属性，数据，方法
    behaviors:[classifyBehavior],
    /**
     * 组件的属性列表
     */
    properties: {
        // 继承了行为里的属性  这里不需要再次定义了 
        // img: String,
        // content: String
        hidden: Boolean
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

    }
})
