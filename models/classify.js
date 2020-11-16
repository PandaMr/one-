import {HTTP} from '../utils/http.js';
import { Base64 } from 'js-base64';
import { Auth } from '../utils/auth.js';

let auth = new Auth();

class ClassifyModel extends HTTP {
    // 获取最新一期
    // 异步函数没有return  使用回调函数获取返回值
    getLatest(sCallback){
        this.request({
            url: '/v1/classify/latest',
            method: 'GET',
            header: {
                Authorization: auth._encode()
            },
            success: (res) => {
                sCallback(res);
                this._setLatestIndex(res.index);
                let key = this._getKey(res.index);
                wx.setStorageSync(key, res);
            }
        });
    };

    // 获取我喜欢的期刊  Promise
    getMyFavor(sCallback){
        return new Promise((resolve, reject)=>{
            this.request({
                url: "/v1/classify/favor",
                method: 'GET',
                header:{
                    Authorization: auth._encode()
                },
                success:(res)=>{
                    resolve(res)
                }
            })
        })
    }

    // 切换期刊
    _getClassify(index, nextOrPrevious, sCallback) {
        // 加入缓存 优化服务器性能和客户端体验
        // 获取key 用于存放期刊 
        // 判断请求的是上一期还是下一期
        let key = nextOrPrevious == 'next' ? this._getKey(index+1) : this._getKey(index-1);
        let classify = wx.getStorageSync(key);
        if (!classify) {
            this.request({
                // url: '/v1/classify/' + index + '/' + nextOrPrevious,
                // 使用ES6模板字符串
                url: `/v1/classify/${index}/${nextOrPrevious}`,
                method: 'GET',
                header: {
                    Authorization: auth._encode()
                },
                success: (res) => {
                    // 缓存中加入新查到的数据
                    wx.setStorageSync(this._getKey(res.index), res);
                    sCallback(res);
                }
            });
        }else{
            sCallback(classify)
        }
        
    }

    // 设置缓存的key 用于存放期刊
    _getKey(index){
        let key = `classify-${index}`;
        return key;
    }

    // 获取上一期
    // getPrevious(index, sCallback){
    //     this.request({
    //         url:'/v1/classify/'+index+'/previous',
    //         method: 'GET',
    //         header: {
    //             Authorization: auth._encode()
    //         },
    //         success:(res)=>{
    //             sCallback(res);
    //         }
    //     })
    // };

    // 获取下一期
    // getNext(index, sCallback){
    //     this.request({
    //         url:'/v1/classify/'+index+'/next',
    //         method: 'GET',
    //         header: {
    //             Authorization: auth._encode()
    //         },
    //         success:(res)=>{
    //             sCallback(res);
    //         }
    //     })
    // }
    


    // 是否为第一期期刊
    isFirst(index){
        return index == 1 ? true : false;
    }
    // 判断是否是最后一期期刊
    isLetast(index){
        // 获取最新一期期刊index  和传入的当前index对比
        let latestIndex = this._getLatestIndex();
        return latestIndex==index ? true : false;
    }
    // 存入最新期刊的索引值
    _setLatestIndex(index){
        wx.setStorageSync('latest', index);
    }
    // 读取最新期刊的索引值
    _getLatestIndex(){
        let index = wx.getStorageSync('latest');
        return index;
    }
    
}
export {ClassifyModel};