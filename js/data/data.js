function getQuery(){
    var str = (location.search.length > 0 ? location.search.substring(1) : ''),
    args = {},
    items = str.length ? str.split("&") : [],
    item = null,
    name = null,
    value = null;
    for (i=0; i < items.length; i++){
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
    }
    return args;
}
var args = getQuery();
var inputContent = decodeURIComponent(args['pwd'])


var newAjax = new Vue({
	el:'#app',
	data:{
		tatalNum:[],
		list:[],
		pageNum: 1,
        pageSize: 10,
        isMore:true,
        inputValue:'',
        loading: true,
        loadHeight:'',
        keyNull:false,
        htmlChange:'正在加载中',
        wxShareInfo:{
            title:"",
            imgUrl:"",
            href:window.location.href,
            desc:""
        }
	},
	mounted: function(){
		this.getData();
		this.loadHeight=window.innerHeight - 75
		if(weiChatInit.isWeixinBrowser()){
            setTimeout(weiChatInit.wxReady(this.wxShareInfo),500)
        }
	},
	methods: {
		getData: function(){
			var that = this;
			if(inputContent == 'undefined'){
				that.inputValue =''
			}else{
				that.inputValue = inputContent
			}
			$.ajax({
				url:changeUrl.address + "/project/list.do",
				type:"get",
				data:{
					talent_searchKey: that.inputValue,
					pageNum: that.pageNum,
        			pageSize: that.pageSize,
				},
				success: function(res){
					that.loading=false
					that.isMore=true
					that.tatalNum = res
					that.list=that.list.concat(res.data);
					if(that.list.length==0){
						that.keyNull=true
					}else{
						that.keyNull=false
					}
					if(that.tatalNum.count<10 || this.pageNum>that.tatalNum.count/this.pageSize){
						that.loadHeight=0
						that.htmlChange='已全部加载完毕'
					}
					that.wxShareInfo.title = '国际学校四库全书 - 项目数据库'
					that.wxShareInfo.imgUrl = 'http://data.xinxueshuo.cn/upImage/upInstitutionImg/100062/100062-logo.jpg'
					that.wxShareInfo.desc = '共有'+that.tatalNum.count+'个项目，查看详情'
				},
				error:function(res){

				}
			})
		},
		searchClick: function(){
			this.list=[]
			window.location.href = './data.html?pwd='+this.inputValue
			this.getData()
		},
		// 回车搜索
		searchEnterFun:function(e){
            var keyCode = window.event? e.keyCode:e.which;
            if(keyCode == 13){
				this.list=[]
				window.location.href = './data.html?pwd='+this.inputValue
				this.getData()
            }
        },
        // 下拉刷新
        handleScroll: function(){
        	var scrollTop = $(window).scrollTop();
		    var elementHeight = $(window).height();
		    var h1 = scrollTop + elementHeight;
		    var scrollHeight = document.documentElement.scrollHeight;
		    var documentHeight = $(document).height();
		    if (h1 >= scrollHeight) {
		       	this.pageNum++
				this.getData();
		    }
        },
        // 判断是否有上一页
		goBack: function(){
			console.log(window.history.length)
			if (window.history.length <= 1) {
                window.location.href='../index.html'
                return false
            } else {
                window.history.go(-1);
            }
		},
	}
	
});