/**
 * pdf预览公共页面
 */
var app = angular.module('App', ['pdf']);
app.controller('DocCtrl', function($scope,$timeout,myService) {
	  var a=location.search.replace('?','').split('=');
	  if(a.indexOf('kb_id') != -1){
		  var param=a[1];
		  myService.getPdf1(param).then(function(data){
			  if(data.success){
				  /*利用a标签的download属性可以完成下载
				   *var a = document.getElementById("downPdf");  
	                a.href='../../'+data.onlinePath;  
	                a.download='ss.img';  
	                a.click(); */ 
				  //直接利用浏览器自带的paf插件打开也可以的
				  //window.open('../../'+data.onlinePath);
				  $scope.pdfUrl = '../../'+data.onlinePath;
			  }else{
				  $scope.loading = '操作失败,'+data.msg;
			  }
			  
		  });
	  }else{
		  var param=a[1];
		  myService.getPdf2(param).then(function(data){
			  if(data.success){
				  //window.open('../../'+data.onlinePath);
				  $scope.pdfUrl = '../../'+data.onlinePath ;
			  }else{
				  $scope.loading =  '操作失败,'+data.msg;
			  }
		  });
	  }
	  
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
	    this.getPdf2 = function(param){
	    	return $http.get('/ovu-pcos/pcos/contractManagement/read.do?contractId='+param).then(function(resp) {
	    		return resp.data;
	    	});
	    }
	            
	
	 }]);