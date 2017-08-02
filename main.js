/**
 * pdf预览公共页面
 */
var app = angular.module('App', ['pdf']);
app.controller('DocCtrl', function($scope,$timeout,myService) {
	  
	  $scope.pdfUrl ='...'
	  $scope.scroll = 0;
	  $scope.loading = '加载中...';

	  $scope.getNavStyle = function(scroll) {
	    if(scroll > 100) return 'pdf-controls fixed';
	    else return 'pdf-controls';
	  }

	  $scope.onError = function(error) {
	    console.log(error);
	  }

	  $scope.onLoad = function() {
	    $scope.loading = '';
	  }

	  $scope.onProgress = function (progressData) {
	    console.log(progressData);
	  };


	});
	app.service('myService',['$http', function ($http) {
	    this.getPdf1 = function(param){
	    	return $http.get('/ovu-pcos/pcos/knowledge/read.do?kb_id='+param).then(function(resp) {
	    		return resp.data;
	    	});
	    }
	   
	          
	
	 }]);