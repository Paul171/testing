define(['jquery','mustache','text!lib/loading.html'],function($,mustache,view){
	"use strict";
	var matrixCalculation = function(){
		var strokePre=null,
		strokeNow= null,
		distance=0,
		sampleX=0,
		sampleY=0,
		 templateX=0,
		templateY=0;
	};
	matrixCalculation.calculate = function(){
			console.log("calculate");
	};
	return matrixCalculation;
});