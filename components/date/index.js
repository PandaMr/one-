// components/date/index.js
Component({
    /**
     * 组件的属性列表 
     * 属性properties 会覆盖 data中的同名数据
     */
    properties: {
        index:{
            type:String,
            // 监听index值改变执行函数
            // 小于10在前加0
            // 监听函数里不能改变本函数的值，否则无限调用，导致内存溢出
            observer: function (newVal, oldVal,changedPath) {
                // console.log(newVal);
                // console.log(oldVal);
                // console.log(changedPath);
                let val = newVal<10 ? '0'+newVal : newVal;
                this.setData({
                    _index:val
                })
            }
        }
        
    },

    /**
     * 组件的初始数据
     * 数据的类型直接给默认值
     */
    data: {
        // test:Number, 错误写法
        months: [
            'Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','dec'
        ],
        month:'',
        year:'',
        _index:0
    },

    attached:function(){
        // console.log(this.data)
        // console.log(this.properties)
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();

        this.setData({
            year: year,
            month: this.data.months[month],
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
