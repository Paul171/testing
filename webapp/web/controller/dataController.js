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
		this.canvas = null;
		this.canvasTemplate = null;
		this.stroke = new stroke();
		this.character = [];
		this.ratio = 1;
		this.chkRedraw = false;
		this.templateCharacter = [];
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
		console.log("this.iscroll",this.iscroll);
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		var self =this;
		this.canvasTemplate = document.querySelector('#canvasTemplate');
		this.canvas = document.querySelector('#canvasDraw');
		$(this.canvas).attr('width',(innerWidth<768?this.contentRoot.width()-10:this.contentRoot.width()*0.4));
		$(this.canvasTemplate).attr('width',(innerWidth<768?this.contentRoot.width()-10:this.contentRoot.width()*0.4));
		this.canvasWidth_org = $(this.canvas).attr('width');
		if(typeof G_vmlCanvasManager != 'undefined') {
			this.canvas = G_vmlCanvasManager.initElement(canvas);
		}
		this.context = this.canvas.getContext("2d");
		this.contextTemplate = this.canvasTemplate.getContext("2d");
		$('#canvasDraw,#canvasTemplate').mousedown(function(e){
			// debugger
			self.stroke= new stroke();
			var top = e.target.offsetParent.offsetTop + e.target.offsetParent.offsetParent.offsetTop + e.target.offsetTop + self.iscroll.y;
			var left= e.target.offsetParent.offsetLeft + e.target.offsetLeft;
		  var mouseX = e.offsetX - left ;
		  var mouseY = e.pageY - top;
		  // console.log("this.iscroll",self.iscroll);
		  self.paint = true;
		  self.addClick(mouseX, mouseY,self.paint);
		  var context = (e.target.id == 'canvasDraw')?self.context:self.contextTemplate;
		  // if(e.target.id == 'canvasDraw'){
	  	  context.beginPath();
	  	  self.redraw(context,e.target.id);
		  // }
		  // else{
		  // 	self.contextTemplate.beginPath();
		  // 	self.redraw(self.contextTemplate);
		  // }
		  
		});
		$('#canvasDraw,#canvasTemplate').mousemove(function(e){
			console.log("self.paint",self.paint);
		  if(self.paint){
		  	// debugger

		  	var top = e.target.offsetParent.offsetTop + e.target.offsetParent.offsetParent.offsetTop + e.target.offsetTop + self.iscroll.y;
		  	var left= e.target.offsetParent.offsetLeft + e.target.offsetLeft;
		  	console.log(e);
		    self.addClick(e.offsetX - left,e.pageY- top, true);
		    console.log("top",top,"left",left,"e.pageX",e.pageX,"e.pageY",e.pageY);
		    // self.redraw();
		    // if(e.target == this.canvas){
			  	self.redraw((e.target.id == 'canvasDraw')?self.context:self.contextTemplate,e.target.id);
			// }
			// else{
			  	// self.redraw(self.contextTemplate);
			// }
		  }
		});
		$('#canvasDraw,#canvasTemplate').mouseup(function(e){
		  self.paint = false;
		  // self.context.closePath();
		  if(e.target.id == 'canvasDraw'){
			  	self.redraw(self.context,e.target.id);
			  	self.character.push(self.stroke);
		  }
		  else{
			  	self.redraw(self.contextTemplate,e.target.id);
			  	self.templateCharacter.push(self.stroke);
		  }
		  // self.character.push(self.stroke);
		  self.stroke = new stroke();
		});
		//If the marker goes off the paper, then forget you
		$('#canvasDraw,#canvasTemplate').mouseleave(function(e){
		  self.paint = false;
		});
		window.addEventListener('resize',function(){
			console.log("innerWidth",innerWidth,outerWidth,self.intro.width(),self.contentRoot.width());
			$('.next').css('right',self.intro.width() - self.contentRoot.width()+'px');
			var resizeDate = new Date();
			// debugger
			if(innerWidth <= 767){
				$(self.canvas).attr('width',self.contentRoot.width()-10);	
				$(self.canvasTemplate).attr('width',self.contentRoot.width()-10);	
			}
			else{
				$(self.canvas).attr('width',self.contentRoot.width()*0.4-10);
				$(self.canvasTemplate).attr('width',self.contentRoot.width()-10);
			}
			self.chkRedraw = false;
			setTimeout(function(){
				var date = new Date();
				if(date>resizeDate &&!self.chkRedraw){	
					// debugger
					var ratio = $(self.canvas).attr('width')/self.canvasWidth_org;
					self.canvasWidth_org = $(self.canvas).attr('width');
					// scale the template and drawing area
					self.redraw(self.context, 'canvasDraw', ratio);
					self.redraw(self.contextTemplate, 'canvasTemplate', ratio);
					// debugger
					self.chkRedraw = true;
					// self.ratio = 1;
				}
			},2000);
		});
		//this.contentRoot.append(mustache.render(view,this.model));
	}
	me.prototype.addClick = function(x, y, dragging)
	{
	  this.stroke.setXCoordinate(x);
	  this.stroke.setYCoordinate(y);
	  // clickDrag.push(dragging);
	}
	//redrawCharacter(): should accept two arguments, one is character, the other one is context
	me.prototype.redrawCharacter = function(context, character,ratio){
		if(character){
		  	for(var i=0; i< character.length; i++){
		  	  var currentStroke = character[i];
			  var clickX=currentStroke.getXCoordinate();
			  var clickY=currentStroke.getYCoordinate();		
			  // console.log("currentStroke",currentStroke);
			  for(var n=0; n < clickX.length; n++) {		
			    if(ratio != 1){
					currentStroke.setCoordinateByIndex(n, clickX[n]*this.ratio, clickY[n]);
					// currentStroke.setYCoordinate(clickY[n]*ratio);
				}
			    if(n){

			      context.moveTo(clickX[n-1], clickY[n-1]);
			     }else{
			       context.moveTo((clickX[n]-1), clickY[n]);
			     }
			     context.lineTo(clickX[n], clickY[n]);
			     
			     context.stroke();
			  }
			  console.log("character currentStroke",currentStroke);
			  console.log("this.character[i]",character[i]);	
			}
		}
	}
	// accept two arguments, one is ratio which can be optional, the other one is context for different canvas
	me.prototype.redraw = function(context, id, ratio){
		// debugger
	  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
	  // var ratio = $(this.canvas).attr('width')/(this.contentRoot.width() -10) ==1?1:0.4;
	  this.ratio = (ratio?ratio:1);
	  // var ratio = 1;
	  // this.ratio = ratio;
	  console.log("th.ratio",this.ratio);
	  console.log("ratio",ratio);
	  context.strokeStyle = "#df4b26";
	  context.lineCap = "round";
	  context.lineJoin = "round";
	  context.lineWidth = 5;
	  // debugger
	  // if(this.character){
	  // 	for(var i=0; i< this.character.length; i++){
		 //  	  var currentStroke = this.character[i];
			//   var clickX=currentStroke.getXCoordinate();
			//   var clickY=currentStroke.getYCoordinate();		
			//   // console.log("currentStroke",currentStroke);
			//   for(var n=0; n < clickX.length; n++) {		
			//     if(ratio != 1){
			// 		currentStroke.setCoordinateByIndex(n, clickX[n]*this.ratio, clickY[n]);
			// 		// currentStroke.setYCoordinate(clickY[n]*ratio);
			// 	}
			//     if(n){

			//       this.context.moveTo(clickX[n-1], clickY[n-1]);
			//      }else{
			//        this.context.moveTo((clickX[n]-1), clickY[n]);
			//      }
			//      this.context.lineTo(clickX[n], clickY[n]);
			     
			//      this.context.stroke();
			//   }
			//   console.log("character currentStroke",currentStroke);
			//   console.log("this.character[i]",this.character[i]);	
		 //  }
	  // }
	  if(ratio){
	  	this.redrawCharacter(context,(id=='canvasDraw')? this.character:this.templateCharacter,this.ratio);
	  	// this.redrawCharacter(context, this.templateCharacter,this.ratio);
	  }
	  else if(id){
	  	if(id=='canvasDraw'){
	  		this.redrawCharacter(context, this.character,this.ratio);
	  	}
	  	else{
	  		this.redrawCharacter(context, this.templateCharacter,this.ratio);		
	  	}
	  }
	  var currentStroke = this.stroke;
	  var clickX=currentStroke.getXCoordinate();
	  var clickY=currentStroke.getYCoordinate();
	  console.log("currentStroke",currentStroke);
	  for(var n=0; n < clickX.length; n++) {
		// if(ratio != 1){
		// 	// debugger
		// 	currentStroke.setCoordinateByIndex(n, clickX[n], clickY[n]);
		// 	// currentStroke.setXCoordinate(clickX[n]*ratio);
		// 	// currentStroke.setYCoordinate(clickY[n]*ratio);
		// }		
	    context.moveTo(clickX[n], clickY[n]);
	    if(n){
	      context.lineTo(clickX[n-1], clickY[n-1]);
	     }else{
	      context.lineTo((clickX[n]-1), clickY[n]);
	     }
	     
	     
	     context.stroke();
	  }
	  console.log("stroke currentStroke",currentStroke);
	  console.log("this.stroke",this.stroke);	
	  
	  
	}
	me.prototype.loadingMask = function(){
		console.log(this.contentRoot);
		var loading = new Loading(this.contentRoot);
		loading.showPleaseWait();
	}
	return me;

});