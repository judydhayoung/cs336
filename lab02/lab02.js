// JavaScript source code


// JavaScript source code
/* CS336 Calvin College
 * Lab 2
 * 
 */

function Person(name, birthdate, friendList){
    this.name = name;
    this.birthdate = birthdate;
    this.friendList = friendList;
}

//mutator method that changes the name
Person.prototype.changeName = function(newName) {
    this.name = newName;
}

//accessor method that computes age; cf.a pretty decent function for this from Naveen Jose.)
//function copied from http://jsfiddle.net/codeandcloud/n33RJ/
Person.prototype.getAge = function(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//mutator method that adds a new friend
Person.prototype.addFriend = function(friend) {
    this.friendList.push(friend);
    }

//method to print a greeting(e.g., “I’m a person”)
Person.prototype.greet = function greet() {
    console.log("Hello, I am " + this.name);
    }



//Add some code to test your new prototype, e.g., create some instances, add friends, compare ages.
var person1 = new Person('Donald', 'Jan-01-2000', []);
console.log(person1);
person1.changeName('Mark');
person1.addFriend('Kevin');
person1.addFriend('Greg');
person1.getAge(this.birthdate);
console.log('age: ' + getAge("1980/08/10"));
