// 引入配置文件 
import {config} from '../config.js'

// 定义错误信息
const tips = {
    1: "遇到一些错误！",
    404: "抱歉，您访问的API不存在！"
}

//二次封装http请求
// 定义类
class HTTP {
    // 定义方法
    request(params){
        // url,data,method
        if(!params.method){
            params.method = "GET";
        }
        // 发起微信请求
        wx.request({
            url: config.api_base_url + params.url,
            method: params.method,
            data: params.data,
            header: params.header,
            // {
            //     'content-type':'application/json'
            // },
            success:(res)=>{
                let code = res.statusCode.toString();
                // 判断状态码，请求成功后把成功的结果返回给调用者
                if(code.startsWith('2')){
                   params.success && params.success(res.data);
                }else{
                    var error_code = res.data.error_code;
                    this._http_err(error_code);
                    console.log(res.data);
                }
            },
            fail:(err)=>{
                this._http_err(1);
                console.log(err)
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