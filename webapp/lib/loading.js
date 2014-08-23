define(['jquery','mustache','text!lib/loading.html'],function($,mustache,view){
	"use strict";
	var myApp = function(context){
		this.contentRoot = context;
		this.init();
	};
	myApp.prototype.init = function () {
		console.log(this.contentRoot);
		this.contentRoot.append(mustache.render(view));
		$( 'div#pleaseWaitDialog' ).modal();
		// return {
		// 	showPleaseWait: function() {
		// 		pleaseWaitDiv.modal();
		// 	},
		// 	hidePleaseWait: function () {
		// 		pleaseWaitDiv.modal('hide');
		// 	},

		// };
	};
	myApp.prototype.showPleaseWait = function(){
		$( 'div#pleaseWaitDialog' ).modal('show');
	};
	myApp.prototype.hidePleaseWait = function(){
		$( 'div#pleaseWaitDialog' ).modal('hide');
	};
	return myApp;
});