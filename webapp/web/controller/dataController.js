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
	"iscroll",
	"plugin"]
	,function($,mustache,bootstrap,server,view,introView, projectView, experienceView, data,Loading, plugin){
	"use strict";
	var me = function(){
		this.model = new data();	
		//console.log(this.model);
		data.setData(server.getServerData("ss","ss"));
		data.setData(server.getiPhoneData());
		this.contentRoot = $('body');	
		this.contentRoot.append( mustache.render(view,$.extend(data.getData(),{f:this.showContent})));
		this.intro = this.contentRoot.find('#intro'),
		this.proj  = this.contentRoot.find('#proj'),
		this.exp   = this.contentRoot.find('#exp');
		this.scrollItem = $('#scrollable');
		this.displayContent();	
	}
	me.prototype.showContent = function(){
		
		return function(text, render){
			console.error("text",text);
			return data.getData().nls.menu[render(text)];
		}
	}
	me.prototype.switchTable = function(e){
		var dir = $(e.target).parent('div').attr('class');
		if( dir === "next"){
			// content.css('margin-left', - level*width - 60 +'px'); //width+padding
			// content.data('level',level+1);
			$(e.target).showNext();
		}
		else{
			$(e.target).showPrev();
		}
		this.intro.arrowDisplay();
		// content.find('.panel').width(content.find('.panel').width() - 180);
	}
	me.prototype.displayContent = function(){
		
	   var deferred = $.Deferred();

	   this.intro.empty().append( mustache.render(introView, $.extend(data.getData(),{f:this.showContent})));
	   this.proj = this.proj.empty().append( mustache.render(introView, $.extend(data.getData(),{f:this.showContent})));
	   this.exp = this.exp.empty().append( mustache.render(introView, $.extend(data.getData(),{f:this.showContent})));

	   this.intro.find('.prev .arrow').on('click',$.proxy(this.switchTable,this));
	   this.intro.find('.next .arrow').on('click',$.proxy(this.switchTable,this));
	   this.intro.find('.next').css('right',this.intro.width() - this.contentRoot.width());
	   // console.log("showNext",this.intro.find('.next').showNext());
	   this.intro.arrowDisplay();
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