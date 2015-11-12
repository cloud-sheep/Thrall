(function(){
	'use strict';
	
	angular.module('app').factory('sigUpSvc', sigUpSvc);
	
	sigUpSvc.$inject = ['common'];
	
	function sigUpSvc(common){
		
		function signUp(model){
			var url = '/user/save';
			
			return common.$http.post(url, model);
		}
		
		return {
			signUp: signUp			
		};
		
	}	
	
})();