import {Base64} from 'js-base64';

class Auth {
    // 定义验证token方法
    // basic-auth 需要对token进行base64加密 
    // account:password
    // token:
    // Authorization: Basic base64(account:password) 注意前缀Basic base64(user:pass)返回的格式，
    _encode(){
        const token = wx.getStorageSync('token');
        const base64 = Base64.encode(token+':');
        // 注意格式 'Basic '+加密账号  有个空格！！！
        return 'Basic '+base64;
    }
}
export {Auth};