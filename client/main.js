import angular from 'angular';
import 'angular-meteor';
import 'angular-ui-router';
import {Meteor} from 'meteor/meteor';


angular.module('myApp', ['angular-meteor', 'ui.router'])
  .config(function ($stateProvider, $locationProvider) {

      $locationProvider.html5Mode(true);
      $stateProvider.state('stateA', {
          url: 'state-a',
          template: `<h2>STATE A</h2><p>STATUS: {{vm.state}}</p>`,
          controller: StateController,
          // controller: StateControllerWithout$reactive,
          controllerAs: 'vm'
      });

      $stateProvider.state('stateB', {
          url: 'state-b',
          template: `<h2>STATE B</h2><p>STATUS: {{vm.state}}</p>`,
          controller: StateController,
          // controller: StateControllerWithout$reactive,
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
    });
}


function StateControllerWithout$reactive($scope) {

    this.state = "LOADING...";
    var c = Meteor.autorun(()=> {
        console.log('Running autorun');
        var sub = Meteor.subscribe('xxx', {
            onReady: ()=> {
                console.log('ready');
                $scope.$apply(()=> {
                    this.state = "READY";
                })
            },
            onStop: (err)=> {
                console.log('stopped', err);
                $scope.$apply(()=> {
                    if (err) {
                        console.error(err);
                        this.state = "ERROR";
                    } else {
                        this.state = "STOPPED";
                    }
                })
            }
        });
    });
    $scope.$on('$destroy', ()=> {
        console.log('stopping autorun');
        c.stop();
    });

}
