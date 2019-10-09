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
		this.getData()
		if(weiChatInit.isWeixinBrowser()){
            setTimeout(weiChatInit.wxReady(this.wxShareInfo),500)
        }
	},
	methods: {
		getData: function(){
			var that = this;
			$.ajax({
				url:changeUrl.address + '/school/detail.do',
				type:"get",
				data:{
					schoolId: datailSchool
				},
				success: function(res){
					that.list=res.data;
					that.wxShareInfo.title = '国际学校库 - '+that.list.schoolName
					that.wxShareInfo.imgUrl = that.list.schoolLogo=="" || that.list.schoolLogo==null ? "http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png":"http://data.xinxueshuo.cn" + that.list.schoolLogo 
					that.wxShareInfo.desc = '学校类型：'+that.list.schoolProperties+'，成立时间：' + that.list.foundedTime + '，省份：' + that.list.areas
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