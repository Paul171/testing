define(["jquery","i18n!web/models/nls/data"],function($,nls){
	'use strict';
    var me= function(){
     console.log("me"); 
     this.data = null;
     this.init();
    };
    var car = function(){
    	console.log("hihi");
    };
    me.prototype = new car();
    //me.prototype.constructor = me;
	me.prototype.init = function(){
		console.log("hihib");
		//items = $.getJSON("models/test.json");
		//console.log("items",items);
		//return items;
	};
	me.getData = function(){
		console.log("dsfds",this.data);
		return this.data;
	};
	me.setData = function(jsonData){
		this.data = $.extend(this.data,jsonData, {nls:nls});
	};
	return me;
});