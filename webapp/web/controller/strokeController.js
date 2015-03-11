define(['jquery'],function($){
	'use strict';
	var strokeController = function(){
	  this.xCoordinate = [],
	  this.yCoordinate = [];
	  this.count = 0;
	};
	strokeController.prototype.getXCoordinate = function(){
		return this.xCoordinate;
	};
	strokeController.prototype.getYCoordinate = function(){
		return this.yCoordinate;
	};
	strokeController.prototype.setXCoordinate = function(x){
	    this.xCoordinate.push(x);
	};
	strokeController.prototype.setYCoordinate = function(y){
		this.yCoordinate.push(y);
	};
	strokeController.prototype.setCoordinateByIndex = function(index, replaceValueX, replaceValueY){
		this.yCoordinate[index] = replaceValueY;
		this.xCoordinate[index] = replaceValueX;
		this.count++;
	};
	strokeController.prototype.getCount = function(){
		return this.count;
	};
	return strokeController;
});