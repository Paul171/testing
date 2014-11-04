define(["jquery","lib/crossDomainAjax"],function($){
	var me = function(){
		this.data = null;
	};
	me.getServerData =  function(options,callback){
		var self = this;
		$.ajax({
			url:'http://localhost/testing/webapp/web/models/data.php',
			async: false,
			type: 'post',
			dataType: 'json'
		}).done(function(obj){  self.data = obj;});
		//getting html content start
		//$.get('http://www.aastocks.com/tc/stocks/market/index/hk-index-con.aspx?index=HSI',function(data){ console.log("data",$(data.responseText).find('div#ETFLast').html());});
		//getting html content end
	  return self.data;
	};
	me.getiPhoneData = function(){
		var self = this;
		var url = ['http://store.apple.com/hk-zh/buyFlowSelectionSummary/IPHONE6?node=home/shop_iphone/family/iphone6&step=select&option.dimensionScreensize=4_7inch&option.dimensionColor=silver&option.dimensionCapacity=64gb&option.carrierModel=UNLOCKED%2FWW&carrierPolicyType=UNLOCKED',
		'http://store.apple.com/hk-zh/buyFlowSelectionSummary/IPHONE6?node=home/shop_iphone/family/iphone6&step=select&option.dimensionScreensize=4_7inch&option.dimensionColor=silver&option.dimensionCapacity=16gb&option.carrierModel=UNLOCKED%2FWW&carrierPolicyType=UNLOCKED'];
		$.ajax({url:url[1],
			type: 'get',
			constentType:'application/json; charset=utf-8',
			async: false,
			crossDomain: true,
			dataType: 'html'
		}).done(function(obj){
			console.log("obj1",obj);
			window.result = $(obj.results[0]).text().trim().replace(/\s/g,"").replace(/[\\n]+/g,"");
			self.data = $.extend({},self.data, {iphone: $.parseJSON(result)});
			console.log("obj", self.data);
			return self.data;
		});
	}
	return me;
});