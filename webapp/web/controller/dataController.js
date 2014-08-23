define(["jquery","mustache","bootstrap","serverCall","text!web/layout/layout.html","data","loading","iscroll"],function($,mustache,bootstrap,server,view,data,Loading){
	"use strict";
	var me = function(){
		this.model = new data();	
		//console.log(this.model);
		data.setData(server.getServerData("ss","ss"));
		this.contentRoot = $('body');	
		this.scrollItem = $('#scrollable');
		this.displayContent();	
	}
	me.prototype.displayContent = function(){
		
	   var deferred = $.Deferred();
	   this.contentRoot.append( mustache.render(view,data.getData()));
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