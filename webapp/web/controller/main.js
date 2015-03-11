require.config({
	"baseUrl": '../',
	"paths": {
	 "jquery": 'lib/bower_components/jquery/dist/jquery.min',
	 "jquery_ui": '//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min',
	 "jquery_mobile": '//ajax.googleapis.com/ajax/libs/jquerymobile/1.4.2/jquery.mobile.min',
	 "bootstrap": "lib/bower_components/bootstrap/dist/js/bootstrap.min",
	 "data": "web/models/data",
	 "controller": "web/controller/dataController",
	 "mustache": "lib/mustache",
	 "text": "lib/plugin/text",
	 "i18n": "lib/plugin/i18n",
	 "waypoints": "lib/plugin/jquery-waypoints/waypoints",
	 "extjs": "lib/plugin/extjs/ext-all",
	 "serverCall": "web/controller/serverCall",
	 "loading": "lib/loading",
	 "crossDomainAjax": "lib/crossDomainAjax",
	 "iscroll": "lib/iscroll",
	 "plugin": "web/controller/plugin",
	 "hungarian": "web/controller/hungarian",
	 "matrixCal": "web/controller/matrixCalculation",
	 "strokeStyle": "web/controller/strokeController"
	},
	'shim':{
		'bootstrap': ['jquery']
	}
});
define(["jquery","controller","bootstrap"],function($,controller,bootstrap){
	"use strict";
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	  var msViewportStyle = document.createElement('style')
	  msViewportStyle.appendChild(
	    document.createTextNode(
	      '@-ms-viewport{width:auto!important}'
	    )
	  )
	  document.querySelector('head').appendChild(msViewportStyle)
	}
	var nua = navigator.userAgent
	var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
	if (isAndroid) {
	  $('select.form-control').removeClass('form-control').css('width', '100%')
	}
	//console.log("match",decodeURIComponent(location.search.match(/[\?|&]controller=([^&;]+?)(&|#|;|$)/)[1]));
	//  location.href = location.href + "?controller=login";	
	if(location.search){
		var dataInstance = new controller();
	}else{
		location.href = location.href + "?controller=login";
	}
	//console.log(dataInstance);
});