var app = angular.module('adminApp')

/**** Getters ***/

app.factory('getProjectSites', ['$log', '$q', '$http', function($log, $q, $http) {

  return function() {
    $log.log('getProjectSites ran!')
    var defer = $q.defer()

     $http({
      url: "app/appServer/getProjectSites.php",
      method: "GET"
    }).then(
      function(response) {
        var sites = {}
        response.data.forEach(function(currentSite) {
          sites[currentSite.projectSite_id] = currentSite
        })

        defer.resolve(sites)
      },
      function(error) {
        //TODO error handling
      })

    return defer.promise
  }

}])

app.factory('getCrew', ['$log', '$q', '$http', function($log, $q, $http) {

  return function() {
    $log.log('getCrew ran!')
    var defer = $q.defer()

     $http({
      url: "app/appServer/getCrew.php",
      method: "GET"
    }).then(
      function(response) {
        var crew = {}
        response.data.forEach(function(currentCrew) {
          crew[currentCrew.person_id] = currentCrew
        })
        defer.resolve(crew)
      },
      function(error) {
        //TODO error handling
      })

    return defer.promise
  }
}])

app.factory('getGroups', ['$log', '$q', '$http', function($log, $q, $http) {

  return function() {
    var defer = $q.defer()

    $http({
      method: "GET",
      url: "app/appServer/getGroups.php"
    }).then(function mySuccess(response) {
      var sites = {}
      response.data.forEach(function(currentGroup) {
        sites[currentGroup.group_id] = currentGroup
      })
      $log.log('site: ' + dump(sites, 'none'))
      defer.resolve(sites)
    },
    function myFailure() {
      // handle error
    })

    return defer.promise
  }
}])

/*** Setters ***/

app.factory('toggleSiteActive', ['$log', '$q', '$http', '$mdToast', function($log, $q, $http, $mdToast) {
  return function(mySiteId, myActiveStatus) {

    return $http({
      url: "app/appServer/toggleSiteActive.php",
      method: 'GET',
      params: {
        isActive: myActiveStatus,
        siteId: mySiteId
      }
    })
    //TODO: handle server fail
  }
}])

app.factory('updateActiveCrew', ['$log', '$q', '$http', '$mdToast', function($log, $q, $http, $mdToast) {
  return function(myPersonId, myActiveStatus, paramsToUpdate) {

    if (!paramsToUpdate) {
      paramsToUpdate = {}
    }

    paramsToUpdate["isActive"] = myActiveStatus
    paramsToUpdate["personId"] = myPersonId

    return $http({
      url: "app/appServer/updateActiveCrew.php",
      method: 'GET',
      params: paramsToUpdate
    })
    // TODO: catch errors on server fail

  }
}])

app.factory('updateActiveGroup', ['$log', '$q', '$http', '$mdToast', function($log, $q, $http, $mdToast) {
  return function(myGroupId, myActiveStatus, paramsToUpdate) {

    if (!paramsToUpdate) {
      paramsToUpdate = {}
    }

    paramsToUpdate["isActive"] = myActiveStatus
    paramsToUpdate["groupId"] = myGroupId

    $log.log("About to send request to updateActiveCrew.php with paramsToUpdate: " + dump(paramsToUpdate, 'none'))

    return $http({
      url: "app/appServer/updateActiveGroup.php",
      method: 'GET',
      params: paramsToUpdate
    })
    // TODO: catch errors on server fail

  }
}])
