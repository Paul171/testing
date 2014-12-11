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
	"plugin",
	"matrixCal",
	"strokeStyle"]
	,function($,mustache,bootstrap,server,view,introView, projectView, experienceView, data,Loading, iscroll, plugin, matrixCal,stroke){
	"use strict";
	var me = function(){
		this.model = new data();	
		//console.log(this.model);
		data.setData(server.getServerData("ss","ss"));
		data.setData(server.getiPhoneData());
		this.paint = false;
		this.contentRoot = $('body');	
		this.stroke = new stroke();
		// this.matrixCalculation = {
		// 	strokePre: null,
		// 	strokeNow: null,
		// 	distance:0,
		// 	sampleX:0,
		// 	sampleY:0,
		// 	 templateX:0,
		// 	templateY:0,
		// 	calculate: function(){
		// 		console.log("calculate");
		// 	},
		// };
		// // debugger
		// this.matrixCalculation.calculate();
		// // this.matrixCal = new matrixCal();
		// console.log("c",matrixCal);	
		matrixCal.calculate();
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
	   this.proj = this.proj.empty().append( mustache.render(projectView, $.extend(data.getData(),{f:this.showContent})));
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
		this.iscroll = new IScroll('#scrollable',{mouseWheel: true,scrollbars: true, shrinkScrollbars:'scale'});
		this.iscroll.on('scrollStart',function(e){
			console.log("e",e);
		});
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		var self =this;
		var canvasDiv = document.getElementById('canvasDiv');
		var canvasWidth = self.contentRoot.width()+'px',
			canvasHeight= '200px';
		this.canvas = document.createElement('canvas');
		this.canvas.setAttribute('width', canvasWidth);
		this.canvas.setAttribute('height', canvasHeight);
		this.canvas.setAttribute('id', 'canvasDraw');
		canvasDiv.appendChild(this.canvas);
		if(typeof G_vmlCanvasManager != 'undefined') {
			this.canvas = G_vmlCanvasManager.initElement(canvas);
		}
		this.context = this.canvas.getContext("2d");
		$('#canvasDraw').mousedown(function(e){
			// debugger
			// debugger
			var top = e.target.offsetParent.offsetTop + e.target.offsetTop + self.contentRoot.find('.header').height();
			var left= e.target.offsetParent.offsetLeft + e.target.offsetLeft;
		  var mouseX = e.pageX - left;
		  var mouseY = e.pageY - top;
				
		  self.paint = true;
		  self.addClick(mouseX, mouseY,self.paint);
		  self.redraw();
		});
		$('#canvasDraw').mousemove(function(e){
		  if(self.paint){
		  	// debugger
		  	var top = e.target.offsetParent.offsetTop + e.target.offsetTop + self.contentRoot.find('.header').height();
		  	var left= e.target.offsetParent.offsetLeft + e.target.offsetLeft;
		    self.addClick(e.pageX - left, e.pageY - top, true);
		    self.redraw();
		  }
		});
		$('#canvasDraw').mouseup(function(e){
		  self.paint = false;
		});
		//If the marker goes off the paper, then forget you
		$('#canvasDraw').mouseleave(function(e){
		  self.paint = false;
		});
		window.addEventListener('resize',function(){
			console.log("innerWidth",innerWidth,outerWidth,self.intro.width(),self.contentRoot.width());
			$('.next').css('right',self.intro.width() - self.contentRoot.width()+'px');
		});
		//this.contentRoot.append(mustache.render(view,this.model));
	}
	me.prototype.addClick = function(x, y, dragging)
	{
	  this.stroke.setXCoordinate(x);
	  this.stroke.setYCoordinate(y);
	  // clickDrag.push(dragging);
	}
	me.prototype.redraw = function(){
	  this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); // Clears the canvas
	  
	  this.context.strokeStyle = "#df4b26";
	  this.context.lineJoin = "round";
	  this.context.lineWidth = 5;
	  var clickX=this.stroke.getXCoordinate();
	  var clickY=this.stroke.getYCoordinate();		
	  for(var i=0; i < clickX.length; i++) {		
	    this.context.beginPath();
	    if(i){
	      this.context.moveTo(clickX[i-1], clickY[i-1]);
	     }else{
	       this.context.moveTo(clickX[i]-1, clickY[i]);
	     }
	     this.context.lineTo(clickX[i], clickY[i]);
	     this.context.closePath();
	     this.context.stroke();
	  }
	}
	me.prototype.loadingMask = function(){
		console.log(this.contentRoot);
		var loading = new Loading(this.contentRoot);
		loading.showPleaseWait();
	}
	return me;

});