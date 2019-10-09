var newAjax = new Vue({
	el:'#app',
	data:{
		list:[],
		inputValue:'',
		msgList:[]
	},
	mounted: function(){
		this.getData();
		this.getList();
		window.addEventListener('scroll', this.handleScroll)
	},
	methods: {
		getData: function(){
			var that = this;
			$.ajax({
				url:changeUrl.address + '/school/suggest_search.do',
				type:"get",
				data:{
					keyword: ''
				},
				success: function(res){
					that.list=res.data.list;
					if(res.data.count==0){
						alert('请输入正确的搜索关键字')
						that.isMore=false
					}
				},
				error:function(res){

				}
			})
		},
		getList: function(){
			var that = this;
			$.ajax({
				url:changeUrl.address + '/article/list.do',
				type:"get",
				data:{
					pageNum: 1,
					pageSize: 8
				},
				success: function(res){
					that.msgList=res.data.list.slice(0,3)
				},
				error:function(res){

				}
			})
		},
		searchClick: function(){
			this.getData()
			window.location.href = './school/school.html?pwd='+this.inputValue
		},
		// 回车搜索
		searchEnterFun:function(e){
            var keyCode = window.event? e.keyCode:e.which;
            if(keyCode == 13){ 
				this.getData()
				window.location.href = './school/school.html?pwd='+this.inputValue
            }
        },

	}
	
});

