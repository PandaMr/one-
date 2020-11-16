// components/classify/music/index.js
import {classifyBehavior} from '../classify-behavior.js';
// 获取音乐控制对象
const musicManage = wx.getBackgroundAudioManager();
Component({
    // 组件继承 行为
    behaviors:[classifyBehavior],
    /**
     * 组件的属性列表
     */
    properties: {
        url: String,
        title: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        playingSrc:'images/player@playing.png',
        pauseSrc:'images/player@pause.png',
        playing:false
    },

    // 组件加载时
    attached: function () {
        // 加载组件判断音乐是否为播放状态 调用播放图标恢复
        this._recoverStatus();
    },
    // 组件移出时
    detached: function () {
        // 暂停播放
        // musicManage.pause();
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 播放按钮事件
        onPlay:function(event){
            if(!this.data.playing){
                this.setData({
                    playing: true
                });
                // 设置音乐的标题和路径  播放音乐
                musicManage.title = this.properties.title;
                musicManage.src = this.properties.url;
            }else{
                this.setData({
                    playing: false
                });
                // 暂停音乐
                musicManage.pause()
            }
            
        },

        // 修复播放图标
        _recoverStatus:function(){
            // 音乐全部暂停状态
            if(musicManage.paused){
                this.setData({
                    playing: false
                })
                return;
            }
            // 播放的音乐是当前音乐 图标切换为true
            if(musicManage.src == this.properties.url){
                this.setData({
                    playing: true
                })
            }
        }
    }
    
})
