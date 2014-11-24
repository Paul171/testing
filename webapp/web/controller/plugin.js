define(['jquery'],function(jQuery){
	'use strict';
	(function($){
		var _count = 0;

	$.fn.showNext = function(){
		var content = this.parents('#intro').find('div.horizontalShow');
		var width = content.find('.interest').outerWidth();
		_count = _count+1;
		// setLevel(_count);
		content.css('margin-left', - _count*width - 60 +'px'); //width+padding
		// content.css('margin-left', Number(content.css('margin-left').replace('px',''))+_count*width + 60 +'px'); //width+padding
		
	}
	$.fn.showPrev = function(){
		var content = this.parents('#intro').find('div.horizontalShow');
		var width = content.find('.interest').outerWidth();
		content.css('margin-left', Number(content.css('margin-left').replace('px',''))+_count*width + 60 +'px'); //width+padding
		_count = _count-1;
	}
	$.fn.arrowDisplay = function(){
		var prev = this.find('.prev');
		var next = this.find('.next');
		var content = this.find('div.horizontalShow');
		
		var length = content.children('div.panel').length -1;
		console.log("next",prev, next,_count,length);
		if( length == _count){
			next.css('display','none');
			prev.css('display','block');
		}
		else if(_count == 0){
			prev.css('display','none');
			next.css('display','block');
		}
		else{
			prev.css('display','block');
			next.css('display','block');
		}
	}
	// function setLevel(count){
	// 	_count = count;
	// }
}(jQuery));
});
