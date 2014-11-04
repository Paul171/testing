define(["jquery",
	"mustache",
	"bootstrap",
	"serverCall",
	"text!web/layout/layout.html",
	"text!web/layout/intro.html",
	"text!web/layout/project.html",
	"text!web/layout/experience.html",
	"data",
	"loading",
	"iscroll"]
	,function($,mustache,bootstrap,server,view,introView, projectView, experienceView, data,Loading){
	"use strict";
	var me = function(){
		this.model = new data();	
		//console.log(this.model);
		data.setData(server.getServerData("ss","ss"));
		data.setData(server.getiPhoneData());
		this.contentRoot = $('body');	
		this.scrollItem = $('#scrollable');
		this.displayContent();	
	}
	me.prototype.showContent = function(){
		
		return function(text, render){
			console.error("text",text);
			return data.getData().nls.menu[render(text)];
		}
	}
	me.prototype.displayContent = function(){
		
	   var deferred = $.Deferred();
	   this.contentRoot.append( mustache.render(view,$.extend(data.getData(),{f:this.showContent})));
	   this.contentRoot.find('#intro').empty().append( mustache.render(introView, $.extend(data.getData(),{f:this.showContent})));
	   $('li[role="presentation"]').on('click', $.proxy(this.loadingMask,this));
		console.log("display",this.contentRoot);
		$('.dropdown-toggle').dropdown();
		console.log("scrollable",$("#scrollable"));
		new IScroll('#scrollable',{mouseWheel: true,scrollbars: true, shrinkScrollbars:'scale'});
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		//this.contentRoot.append(mustache.render(view,this.model));
	}
	me.prototype.loadingMask = function(){
		console.log(this.contentRoot);
		var loading = new Loading(this.contentRoot);
		loading.showPleaseWait();
	}
	return me;
});