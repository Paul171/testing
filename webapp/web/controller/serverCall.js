define(["jquery","lib/crossDomainAjax"],function($){
	var me = function(){
		this.data = null;
	};
	me.getServerData =  function(options,callback){
		self = this;
		$.ajax({
			url:'http://localhost/webapp/web/models/data.php',
			async: false,
			type: 'post',
			dataType: 'json'
		}).done(function(obj){  self.data = obj;});
		//getting html content start
		//$.get('http://www.aastocks.com/tc/stocks/market/index/hk-index-con.aspx?index=HSI',function(data){ console.log("data",$(data.responseText).find('div#ETFLast').html());});
		//getting html content end
	  return self.data;
	};

	return me;
});