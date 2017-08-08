'use strict';
myApp.controller('homeCtrl', ['$scope','PopularPhotos',function($scope,PopularPhotos){
  var self = this, i;
  $scope.gallery = {};
  $scope.thumbnails = [];
  $scope.gallery.currentPage = 1;
  $scope.itemsPerPage = 10;

  $scope.getPhotos = function(pageNo){
    pageNo = pageNo !== undefined ? pageNo : 1; 

    var flickrAPIforPropleGetPhotos = 'https://api.flickr.com/services/rest?'+
    '&api_key='+ 'd053de4ef8f6d1c9955410c0fa67e234' +
    '&format='+'json'+
    '&jsoncallback=JSON_CALLBACK'+
    '&method=' + 'flickr.people.getPhotos' +
    '&user_id=' + '113231763@N07'+
    '&extras=' + 'owner_name'+
    '&per_page=' + '10'+
    '&page='     + pageNo;

    PopularPhotos.getPopularPhotos(flickrAPIforPropleGetPhotos).then(function(data){
      angular.forEach(data.data.photos.photo,function(key,value){
        this.push({
          url :'https://farm'+ data.data.photos.photo[value]["farm"]+ '.staticflickr.com/'+ data.data.photos.photo[value]["server"]+ '/'+ data.data.photos.photo[value]["id"]+'_'+data.data.photos.photo[value]["secret"]+ '_z.jpg', 
          title: data.data.photos.photo[value]["title"],
          owner: data.data.photos.photo[value]["ownername"]
        });
      },$scope.thumbnails);
      $scope.totalItems = data.data.photos.total;
    });
  };

  //get json data for building img src
  for(i=1;i<6;i++) {
    $scope.getPhotos(i); 
  }

}])
.directive('homeDir',function(){
  return {
    templateUrl: '/src/directives/home/home.tpl.html',
    controller: 'homeCtrl',

     link: function(scope,elem,attr){

      scope.totalList = [];
      scope.tempSwap = [];

      $('ul').on('click', function(e){
        scope.cp = e.target.text;
        if(scope.cp >= 5) {
          var cp = parseInt(scope.cp),
            temp = [];
          
          for(var j=cp+1; j<cp+5; j++){
            temp.push(j);
          }

          var newPages = _.difference(temp, scope.totalList);
          newPages = _.isEqualWith(temp,scope.totalList) ? temp : newPages;

          if(newPages.length>0){
            _.each(newPages,function(key){
              scope.getPhotos(key);
            });
          }
          scope.totalList = _.concat(scope.totalList,temp);
          scope.totalList = _.uniq(scope.totalList);

        }
      });
      

      $('#myModal').on('show.bs.modal', function (e) {
        var current_modal = $(this);
        var that = e.relatedTarget;
        var new_src = $(that).data('val').url.slice(0,-5);
        var new_title = $(that).data('val').title;
        var foot_note = $(that).data('val').owner;
        new_src = new_src+'b.jpg';
        current_modal.find('.modal-body').html('<span class="helper"></span><img class="img-thumbnail" src="'+ new_src +'" alt="flickr thumnails">');
        current_modal.find('#myModalLabel').text(new_title);
        current_modal.find('.modal-footer').text('A photo by:'+foot_note);
      });
    }
  };
});
