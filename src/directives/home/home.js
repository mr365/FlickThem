'use strict';
myApp.controller('homeCtrl', ['$scope','PopularPhotos',function($scope,PopularPhotos){
  var self = this;
  $scope.gallery = {};
  $scope.thumbnails = [];
  $scope.totalThumbnails = 0;
  PopularPhotos.getPopularPhotos().then(function(data){
      angular.forEach(data.data.photos.photo,function(key,value){
        this.push({
          url :'https://farm'+ data.data.photos.photo[value]["farm"]+ '.staticflickr.com/'+ data.data.photos.photo[value]["server"]+ '/'+ data.data.photos.photo[value]["id"]+'_'+data.data.photos.photo[value]["secret"]+ '_n.jpg', 
          title: data.data.photos.photo[value]["title"],
          owner: data.data.photos.photo[value]["ownername"]
        });
      },$scope.thumbnails);
    $scope.totalItems = data.data.photos.perpage;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 12;
  });
}])
.directive('homeDir',function(){
  return {
    templateUrl: 'https://mr365.github.io/FlickThem/src/directives/home/home.tpl.html',
    controller: 'homeCtrl',
    link: function(scope,elem,attr){
      $('#myModal').on('show.bs.modal', function (e) {
        var current_modal = $(this);
        var that = e.relatedTarget;
        var new_src = $(that).data('val').url.slice(0,-5);
        var new_title = $(that).data('val').title;
        var foot_note = $(that).data('val').owner;
        console.log(new_title);
        console.log(foot_note);
        new_src = new_src+'b.jpg';
        current_modal.find('.modal-body').html('<img class="img-thumbnail" src="'+ new_src +'" alt="flickr thumnails">');
        current_modal.find('#myModalLabel').text(new_title);
        current_modal.find('.modal-footer').text('A photo by:'+foot_note);
      });
    }
  };
});
