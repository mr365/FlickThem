myApp.factory('PopularPhotos',['$http','$q',function($http,$q){
	
	var popularPhotos = {}, defer = $q.defer();
  var url = 'https://api.flickr.com/services/feeds/photos_public.gne?&jsoncallback=JSON_CALLBACK&tags=kittens&format=json';
	popularPhotos.APIconfig = {
		key : 'd053de4ef8f6d1c9955410c0fa67e234',
		secret : '82f96cade648c7cb'
	};
	
	var flickrAPIforPropleGetPhotos = 'https://api.flickr.com/services/rest?'+
    '&api_key='+ 'd053de4ef8f6d1c9955410c0fa67e234' +
		'&format='+'json'+
		'&jsoncallback=JSON_CALLBACK'+
		'&method=' + 'flickr.people.getPhotos' +
		'&user_id=' + '113231763@N07'+
		'&extras=' + 'description,owner_name'+
		'&per_page=' + '48'+
		'&page='     + '4'; //'&tags=' + 'kittens,cats,instacats,france,nature,coffee,tea'+
	
	var flickrTagGetHotList = 'https://api.flickr.com/services/rest?'+
		'&api_key='+ 'd053de4ef8f6d1c9955410c0fa67e234' +
		'&format='+'json'+
		'&jsoncallback=JSON_CALLBACK'+
		'&method=' + 'flickr.tags.getHotList' +
		'&count=40';
	//var trusted_url = $sce.trustAsResourceUrl(flickrAPIforPropleGetPhotosOf);	
  
	popularPhotos.getPopularPhotos = function(){
		return $http.jsonp(flickrAPIforPropleGetPhotos).success(function(res){
			popularPhotos.per_page = res.photos.perpage;
			return popularPhotos.imageData = res;
		}).error(function() {
        $log.debug('fetch error');
      })
      .finally(function() {
        defer.resolve();
      });

      return defer.promise;		
	};
	return popularPhotos;
}]);