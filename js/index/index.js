var newAjax = new Vue({
	el:'#app',
	data:{
		list:[],
	},
	mounted: function(){
		this.getData();
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
		searchClick: function(){
			var val = this.$refs.input.value 
			console.log(val)
			localStorage.setItem("searchContent",val);
			this.getData()
			window.location.href = './school/school.html?pwd='+val
		},
		// 回车搜索
		searchEnterFun:function(e){
            var keyCode = window.event? e.keyCode:e.which;
            if(keyCode == 13){
                var val = this.$refs.input.value 
				console.log(val)
				localStorage.setItem("searchContent",val);
				this.getData()
				window.location.href = './school/school.html?pwd='+val
            }
        },

	}
	
});
