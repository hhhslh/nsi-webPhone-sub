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
			$.ajax({
				url:changeUrl.address + "/school/list.do",
				type:"post",
				data:{
					searchKey: localStorage.getItem("searchContent"),
					pageNum: that.pageNum,
        			pageSize: that.pageSize,
				},
				success: function(res){
					that.tatalNum = res.data
					that.list=that.list.concat(res.data.list);
					if(res.data.total==0){
						alert('请输入正确的搜索关键字')
						that.isMore=false
					}
					// localStorage.clear()
				},
				error:function(res){

				}
			})
		},
		// 点击搜索
		searchClick: function(){
			localStorage.setItem("searchContent",this.$refs.input.value)
			this.list=[]
			this.getData()
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
		// 回车搜索
		searchEnterFun:function(e){
            var keyCode = window.event? e.keyCode:e.which;
            if(keyCode == 13){
                localStorage.setItem("searchContent",this.$refs.input.value)
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
		    	localStorage.setItem("searchContent",this.$refs.input.value)
		       	this.pageNum++
				this.getData();
		    }
        }

	},
})
