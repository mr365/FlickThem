myApp.factory('PopularPhotos',['$http','$q',function($http,$q){
	
	var popularPhotos = {}, defer = $q.defer();
  var url = 'https://api.flickr.com/services/feeds/photos_public.gne?&jsoncallback=JSON_CALLBACK&tags=kittens&format=json';
	popularPhotos.APIconfig = {
		key : 'd053de4ef8f6d1c9955410c0fa67e234',
		secret : '82f96cade648c7cb'
	};
		
	//Angular 1.6.x uses a $sce serive for whitelisting a URL
	//var trusted_url = $sce.trustAsResourceUrl(flickrAPIforPropleGetPhotosOf);	
  
	popularPhotos.getPopularPhotos = function(flickrAPIforPropleGetPhotos){
		return $http.jsonp(flickrAPIforPropleGetPhotos).success(function(res){
			popularPhotos.per_page = res.photos.perpage;
			return popularPhotos.imageData = res;
		}).error(function() {
        console.log('fetch error');
      })
      .finally(function() {
        defer.resolve();
      });

      return defer.promise;		
	};
	return popularPhotos;
}]);