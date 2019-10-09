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
var datailSchool = decodeURIComponent(args['School_name'])

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
		list:[],
		wxShareInfo:{
            title:"",
            imgUrl:"",
            href:window.location.href,
            desc:""
        }
	},
	mounted: function(){
		this.getData();
		if(weiChatInit.isWeixinBrowser()){
            setTimeout(weiChatInit.wxReady(this.wxShareInfo),500)
        }
	},
	methods: {
		getData: function(){
			var that = this;
			$.ajax({
				url:changeUrl.address + '/manager/project/get_projects.do',
				type:"get",
				data:{
					projectId: datailSchool
				},
				success: function(res){
					that.list=res.data;
					that.wxShareInfo.title = '项目数据库 - '+that.list.subjectname
					that.wxShareInfo.imgUrl ='http://data.xinxueshuo.cn/nsi/assets/img/project/project01.jpg'
					that.wxShareInfo.desc = '项目地点：'+that.list.areas+'，发布单位：' + that.list.company + '，简介：' + that.list.subjectintroduction.substring(0,20)+'...'
				},
				error:function(res){

				}
			})
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