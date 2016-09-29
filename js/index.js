var app = angular.module('myApp', ['ngStorage', 'satellizer']);
app.config(function($authProvider) {

  $authProvider.facebook({
    clientId: 'Facebook App ID',
    responseType: 'token'
  });
   $authProvider.google({
      clientId: '201212795221-dbv4vgk1ljbjio6v41376lbu2osgcfv2.apps.googleusercontent.com',
     responseType: 'token'
    });
  
});
app.controller("Editor", function($scope, $localStorage,$auth) {

  //adding shapes
  $scope.canvas = new fabric.Canvas('canvas');
  $scope.fill = "#000000"; //inital color
  $scope.newRect = function() {
    var rect = new fabric.Rect({
      left: 20,
      top: 20,
      fill: $scope.fill,
      width: 30,
      height: 30
    });
    $scope.canvas.add(rect);
  };
  $scope.newCircle = function() {
    var cir = new fabric.Circle({
      radius: 20,
      fill: $scope.fill,
      originX: 'center',
      originY: 'center'
    });
    $scope.canvas.add(cir);
  };
  //Editing shapes
  /* $scope.selected = function(){
     $scope.select=$scope.canvas.getActiveObject() === 'undefined';
     console.log($scope.select);
     $scope.$digest();
     return $scope.select;
   } */
  $scope.delete = function() {
    $scope.canvas.getActiveObject().remove();
  };
  $scope.clear = function() {
    if (confirm("Are you sure you want to clear?")) {
      $scope.canvas.clear();
    }
  };
  $scope.changeColor = function() {
    $scope.canvas.getActiveObject().set("fill", $scope.fill);
    $scope.canvas.renderAll();
  };
  /////
  //Save and Load Controls  
  $localStorage.fileList = [];
  $scope.data = $localStorage.fileList;
  $scope.save = function() {
    var saveFile = {
      name: $scope.name,
      layout: JSON.stringify($scope.canvas)
    };
    $localStorage.fileList.push(saveFile);

  };
  $scope.load = function(x) {
    console.log($localStorage.fileList[x].layout);
    $scope.canvas.loadFromJSON($localStorage.fileList[x].layout, $scope.canvas.renderAll.bind($scope.canvas), function(o, object) {
      fabric.log(o, object);
    });
  };
  $scope.removeItem = function(x) {
    $scope.data.splice(x, 1);
    $localStorage.fileList = $scope.data;
  };
      $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
  

});