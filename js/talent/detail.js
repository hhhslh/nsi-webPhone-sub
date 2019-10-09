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

Vue.filter('substringP', function(obj){
    if(obj == null){
        return ''
    }else if(obj.substring(0,3) == "<p>"){
        var reg = new RegExp('</p><p>', 'g')
        var newObj = obj.replace(reg, '\n')
        return newObj.slice(3, newObj.length - 4)
    }else{
        return obj
    }
})

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
            desc:"",
        },
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
				url:changeUrl.address + '/manager/talent/detail.do',
				type:"get",
				data:{
					talentId: datailSchool
				},
				success: function(res){
					that.list=res.data;
                    that.wxShareInfo.title = '教育人才库 - ' + that.list.name
                    that.wxShareInfo.imgUrl = that.list.sex == 1 || that.list.sex == '男'? 'http://img.zcool.cn/community/01786557e4a6fa0000018c1bf080ca.png' : 'http://img.zcool.cn/community/01a29158b69c22a801219c774b4b0b.png@1280w_1l_2o_100sh.png'
                    that.wxShareInfo.desc = '专业：' + that.list.major+'，期望工作职位：' + that.list.expectWorkPosition +'，期望工作地点：'+that.list.expectWorkPlace
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