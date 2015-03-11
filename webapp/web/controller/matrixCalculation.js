define(['jquery','mustache','text!lib/loading.html'],function($,mustache,view){
	"use strict";
	var matrixCalculation = function(){
		this.strokePre=null,
		this.strokeNow= null,
		this.distance=0,
		this.sampleX=0,
		this.sampleY=0,
		this.templateX=0,
		this.templateY=0;
	};
	matrixCalculation.prototype.calculate = function calculate(s, t, status){
		var num = t.getXCoordinate().length;
		// debugger
		if(status === 0){
			for(var i = 0; i < num; i++){
				if( num > s.getXCoordinate().length -1){
					this.sampleX = 0;
					this.sampleY = 0;	
				}
				else{
					this.sampleX = s.getXCoordinate()[i];
					this.sampleY = s.getYCoordinate()[i];
				}
				this.templateX = t.getXCoordinate()[i];
				this.templateY = t.getYCoordinate()[i];
				this.distance += Math.sqrt(Math.pow((this.sampleX-this.templateX),2) + Math.pow((this.sampleY-this.templateY),2));
			}
		}else{
			num-=2;
			for(var i = 0; i < num; i++){
				if(num > s.getXCoordinate().length-1){
					this.sampleX = 0;
					this.sampleY = 0;
				}else{
					this.sampleX = s.getXCoordinate()[i];
					this.sampleY = s.getYCoordinate()[i];
				}

				this.templateX = t.getXCoordinate()[i];
				this.templateY = t.getYCoordinate()[i];
				this.distance += Math.sqrt(Math.pow((this.sampleX-this.templateX),2) + Math.pow((this.sampleY-this.templateY),2));
			}
		}	
		num = s.getXCoordinate().length;
		return ((1/num)*this.distance);
	};
	matrixCalculation.prototype.distanceCost = function distanceCost(s, t){
		var numOfSample = s.length;
		var numOfTemplate = t.length;

		var distance = new Array(numOfSample);
		for(var i = 0; i < numOfSample; i++){
			distance[i] = new Array(numOfTemplate);
		}
		for(var i = 0; i < numOfSample; i++){
			for(var n = 0; n < numOfTemplate; n++){
				var sStroke = s[i];
				var tStroke = t[n];
				distance[i][n] = Math.min(this.calculate(sStroke,tStroke,0),this.calculate(sStroke,tStroke,1));
			}
		}
		return distance;
	};
	matrixCalculation.prototype.angleCalculation = function(startx, starty, endx, endy){
		var angle = 0;
		var yCalculation = endy - starty;
		var xCalculation = endx - startx;
		if(xCalculation>0){
			angle = Math.atan(yCalculation/xCalculation);
		}else if(xCalculation<0){
			angle = Math.atan(yCalculation/xCalculation) - Math.PI;
		}else if(xCalculation===0){
			if(yCalculation>0){
				angle = Math.PI;
			}else if(yCalculation<0){
				angle = -Math.PI;
			}else if(yCalculation===0){
				angle = Math.atan(yCalculation/xCalculation);
			}
		}
		return angle;
	};
	matrixCalculation.prototype.strokeDirectionCost = function(s, t, status){
		var sinResult=0,
			sAngle	 =0,
			tAngle	 =0,
			num 	 = Math.min(s.getXCoordinate().length,t.getXCoordinate().length)-2;
			// debugger
		if(status === 0){
			for(var i = 0; i < num; i++){
				sAngle = this.angleCalculation(s.getXCoordinate()[i], s.getYCoordinate()[i+1],s.getXCoordinate()[i],s.getYCoordinate()[i+1]);
				tAngle = this.angleCalculation(t.getXCoordinate()[i], t.getYCoordinate()[i+1],t.getXCoordinate()[i],t.getYCoordinate()[i+1]);
				sinResult+=Math.sin(sAngle-tAngle);
			}
		}else{
			for(var i = 0; i < num; i++){
				sAngle = this.angleCalculation(s.getXCoordinate()[i], s.getYCoordinate()[i+1],s.getXCoordinate()[i],s.getYCoordinate()[i+1]);
				tAngle = this.angleCalculation(t.getXCoordinate()[i], t.getYCoordinate()[i+1],t.getXCoordinate()[i],t.getYCoordinate()[i+1]);
				sinResult+=Math.sin(sAngle- tAngle);
			}
		}
		return (1/num*sinResult);
	};
	matrixCalculation.prototype.directionCost = function directionCost(s,t){
		var numOfTemplate = t.length;
		var numOfSample = s.length;
		var direction = new Array(numOfSample);
		for(var i = 0; i<numOfSample;i++){
			direction[i] = new Array(numOfTemplate);
		}
		for(var i = 0; i < numOfSample; i++){
			for(var n =0; n < numOfTemplate; n++){
				// debugger
				direction[i][n] = Math.min(this.strokeDirectionCost(s[i],t[n],0),this.strokeDirectionCost(s[i],t[n],1));
			}
		}
		return direction;
	};
	matrixCalculation.prototype.combinedCost = function combinedCost(s, t){
		var numOfTemplate = t.length;
		var numOfSample = s.length;

		var combineCost = new Array(numOfSample);
		for(var i =0; i< numOfSample; i++){
			combineCost[i] = new Array(numOfTemplate);
		}
		// var dirCost = this.directionCost(s,t);
		// debugger
		var distCost = this.distanceCost(s,t);
		
		for(var i = 0; i < numOfSample;i++){
			for(var n =0; n < numOfTemplate;n++){
				combineCost[i][n] = distCost[i][n];
			}
		}
		return combineCost;
	}
	return matrixCalculation;
});