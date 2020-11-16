// 引入配置文件 
import {config} from '../config.js'
import {Auth} from 'auth.js'

const auth = new Auth();

// 定义错误信息
const tips = {
    1: "遇到一些错误！",
    404: "抱歉，您访问的API不存在！"
}

//二次封装http请求
// 定义类
class HTTP {
    
    // 1. 创建promise
    // 2.在promise中编写异步代码
    // 3.使用then()方法 获取结果

    // 使用解构 用户可以传来一个对象
    request({url, data={}, method='GET'}){
        return new Promise((resolve, reject)=>{
            // 发送请求
            this._request(url, resolve, reject, data, method);
        })
    }
    // 定义方法 发起请求
    _request(url, resolve, reject, data={}, method='GET'){
        // 发起微信请求
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                Authorization: auth._encode(),
            },
            success:(res)=>{
                const code = res.statusCode.toString();
                // 判断状态码，请求成功后把成功的结果返回给调用者
                if(code.startsWith('2')){
                   resolve(res.data);
                }else{
                    // 失败改变promise状态为已失败
                    reject();
                    const error_code = res.data.error_code;
                    this._http_err(error_code);
                    console.log(res.data);
                }
            },
            fail:(err)=>{
                reject();
                this._http_err(1);
                console.log(err);
            }
        })
    }
    _http_err(error_code){
        if(!error_code){
            error_code = 1;
        }
        wx.showToast({
            title: tips[error_code],
            icon:'none',
            duration:2000
        })
    } 
}
export {HTTP};