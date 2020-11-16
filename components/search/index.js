// components/search/index.js
import { KeywordModel } from "../../models/keyword.js";
import { BookModel } from "../../models/book.js"
 
const keywordModel = new KeywordModel();
const bookModel = new BookModel();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        loadMore: {
            type: String,
            observer: 'loadMore'
        } 
    },
    
    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        searchBook: [],
        searching: false,
        loading: false,
        loadingCenter: false,
        total: 0,
        emptyBook: false,
        q:''
    },

    // 组件初始化时调用
    attached(){
        // 获取历史搜索 
        const historyWords = keywordModel.getHistory();
        this.setData({
            historyWords: historyWords
        });

        const hotWords = keywordModel.getHot();
        hotWords.then((res)=>{
            this.setData({
                hotWords: res.hot
            })
        })
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 加载更多
        loadMore() {
            if(!this.data.q){
                return
            }
            if(this.data.total <= this.data.searchBook.length){
                return
            }
            // 加载图标
            this._loading();
            // 获取再次请求书籍的开始位置
            let length = this.data.searchBook.length;
            bookModel.search(this.data.q, length, 20).then((res)=>{
                // 请求回来的数据添加到数组中
                let books = this.data.searchBook.concat(res.books);
                this.setData({
                    searchBook: books,
                    loading: false
                });
            });
        },
        onCancel(event){
            this.triggerEvent('cancel',{},{});
        },
        onDelete(event){
            this.setData({
                searching: false,
                searchBook: [],
                emptyBook: false,
                q: '',
                
            });
        },
        onSearch(event){
            // 展示搜索页面
            this.setData({
                searching: true,
                loadingCenter: true
            });
            // 获取搜索文字 或 标签文字
            const word = event.detail.value || event.detail.text;
            bookModel.search(word, 0 , 20).then((res)=>{
                this.setData({
                    searchBook: res.books,
                    q: word,
                    total:res.total,
                    loadingCenter: false,
                    emptyBook: res.total== 0 ? true : false
                });
                // 搜索后的文字 添加搜索历史
                keywordModel.addToHistory(word);
            });
        },

        _loading(){
            this.setData({
                loading: true
            });
        }

    }

})
