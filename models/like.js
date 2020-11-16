import {HTTP} from '../utils/http.js';
import { Auth } from '../utils/auth.js';

let auth = new Auth();

class LikeModel extends HTTP {
    like(behavior, artID, category){
        let url = behavior == 'like'?'/v1/like':'/v1/like/cancel';
        this.request({
            url:url,
            method:'POST',
            header: {
                Authorization: auth._encode()
            },
            data:{
                art_id: artID,
                type: category
            },
            success: (res) => {
                console.log(res);
            }
        })    

    };
    /* TODO: 获取收藏数
        1.根据用户传来的type,id获取期刊
        2.获取本期刊用户的喜欢状态
        3.返回收藏数和喜欢的状态
    */
    getLikeStatus(type, art_id, sCallback){
        this.request({
            url: `/v1/classify/${type}/${art_id}/favor`,
            method: 'GET',
            header: {
                Authorization: auth._encode()
            },
            success: sCallback
        })
    }
}
export {LikeModel}