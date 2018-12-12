Vue.filter('timeNull', function (obj) {
   if(obj == 0){
   	  return ''
   }else{
   	  return obj
   }
})
var newAjax = new Vue({
	el:'#app',
	data:{
		tatalNum:[],
		list:[],
		pageNum: 1,
        pageSize: 20,
        isMore:true
	},
	mounted: function(){
		this.getData();
		window.addEventListener('scroll', this.handleScroll)
	},
	methods: {
		getData: function(){
			var that = this;
			var	searchContent = this.$refs.input.value 
			$.ajax({
				url:changeUrl.address + "/institution/list.do",
				type:"get",
				data:{
					searchKey: searchContent,
					pageNum: that.pageNum,
        			pageSize: that.pageSize,
				},
				success: function(res){
					that.tatalNum = res
					that.list=that.list.concat(res.data);
					if(res.count==0){
						alert('请输入正确的搜索关键字')
						that.isMore=false
					}
				},
				error:function(res){

				}
			})
		},
		searchClick: function(){
			this.list=[]
			this.getData()
		},
		// 回车搜索
		searchEnterFun:function(e){
            var keyCode = window.event? e.keyCode:e.which;
            if(keyCode == 13){
				this.list=[]
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