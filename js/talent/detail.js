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
  if(obj.substring(0,3) == "<p>"){
        var reg = new RegExp('</p><p>', 'g')
        var newObj = obj.replace(reg, '\n')
        return newObj.slice(3, newObj.length - 4)
    }else {
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
	},
	mounted: function(){
		this.getData();
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