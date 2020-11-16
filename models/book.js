import {
    HTTP
} from '../utils/http-promise.js'

class BookModel extends HTTP{
    // 获取热门图书
    getHotList(){
        // url , data , method
        return this.request({
            url:'/v1/book/hot_list',
            method:'GET',
            data:{}
        });
    };

    // 搜索图书   参数：q:图书名字   start: 开始位置 count: 数量
    search(q, start, count){
        return this.request({
            url: "/v1/book/search",
            method: 'GET',
            data: {
                q,
                start,
                count
            }
        })
    };

    // 获取图书详情  参数：bookId
    getBookDetail(bookId){
        return this.request({
            url: `/v1/book/${bookId}/detail`,
            method: 'GET',
        });
    };

    // 获取图书短评
    getBookComments(bookId){
        return this.request({
            url:`/v1/book/${bookId}/comment`,
            method: 'GET'
        });
    };

    // 获取书籍喜欢的状态 和 数量
    getLikeStatus(bookId){
        return this.request({
            url: `/v1/book/${bookId}/favor`,
        });
    };

    // 添加图书端短评  参数：book_id, content
    postComment(bookId, content){
        return this.request({
            url: '/v1/book/add/comment',
            method: 'POST',
            data: {
                book_id: bookId,
                content: content
            }
        });
    };

    // 获取我喜欢书籍的数量
    getBookCount(){
        return this.request({
            url: "/v1/book/count"
        });
    };
    

}

export {BookModel}