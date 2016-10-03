import {Meteor} from 'meteor/meteor';
import {Person} from '../imports/collections';
Meteor.startup(() => {
    if (!Person.find().count()) {
        Person.insert({name: "a"});
        Person.insert({name: "b"});
        Person.insert({name: "c"});
        Person.insert({name: "d"});
        Person.insert({name: "e"});
    }
});
Meteor.publish('xxx', function () {

    console.log('subscribing');
    return Person.find();
});

