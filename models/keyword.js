import {HTTP} from "../utils/http-promise.js"

class KeywordModel extends HTTP{
    // 获取历史关键字
    key = 'history';
    maxLength = 10;
    getHistory(){
        let words = wx.getStorageSync(this.key);
        if(!words){
            return []
        }
        return words;
    }

    // 添加关键字
    addToHistory(keyword){
        // 获取历史搜索 数列 
        let words = this.getHistory();
        // 判断当前搜索 是否包含历史搜索
        let has = words.includes(keyword);
        if(!has){
            // 判断数组长度  队列 先进先出 新搜索书籍放在第一个 删除最后一个
            if(words.length >= this.maxLength){
                words.pop();
            }
            words.unshift(keyword);
            wx.setStorageSync(this.key, words);
        }
        
    }

    // 获取热门搜索
    getHot(){
        return this.request({
            url:'/v1/book/hot_keyword'
        })
    }

    
}
export { KeywordModel }