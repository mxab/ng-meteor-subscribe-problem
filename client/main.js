import angular from 'angular';
import 'angular-meteor';
import 'angular-ui-router';
angular.module('myApp', ['angular-meteor', 'ui.router'])
  .config(function ($stateProvider, $locationProvider) {

      $locationProvider.html5Mode(true);
      $stateProvider.state('stateA', {
          url: 'a',
          template: `<h2><STATE A</h2><p>STATUS: {{vm.state}}</p>`,
          controller: StateController,
          controllerAs: 'vm'
      });

      $stateProvider.state('stateB', {
          url: 'a',
          template: `<h2><STATE B</h2><p>STATUS: {{vm.state}}</p>`,
          controller: StateController,
          controllerAs: 'vm'
      });
  });
function StateController($reactive, $scope) {

    $reactive(this).attach($scope);

    this.state = "LOADING...";
    this.subscribe('xxx', ()=>[], (err)=> {
        if (err) {
            console.error(err);
            this.state = "ERROR";
        } else {
            this.state = "READY";
        }
    })
}



