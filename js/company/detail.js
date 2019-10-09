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
				url:changeUrl.address + '/institution/detail.do',
				type:"get",
				data:{
					institutionId: datailSchool
				},
				success: function(res){
					that.list=res.data;
					that.wxShareInfo.title = '教育机构库 - ' + that.list.name
					that.wxShareInfo.imgUrl = 'http://data.xinxueshuo.cn/upImage/upInstitutionImg/100062/100062-logo.jpg'
					that.wxShareInfo.desc = '成立时间：'+that.list.foundedTime+'，省份：' + that.list.areas + '，简介：' + that.list.introduction.substring(0,20)+'...'
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