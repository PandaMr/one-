// components/classify/essay/index.js
import {classifyBehavior} from '../classify-behavior.js'

Component({
    // 组件继承 行为 就能拥有行为里的属性、数据和方法
    behaviors: [classifyBehavior],
    /**
     * 组件的属性列表
     */
    
    properties: {
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
