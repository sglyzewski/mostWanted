/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function promptFor(question, valid){
  do {
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function checkIfString(entry) {
  if (typeof entry === 'string') {
    return true;
  }
}


function storeSearches(search) {
  //create an array of all the names that have been searched for
}

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  var people = addAgeToObject(data);
  switch(searchType){
    case 'yes':
    mainMenu(searchByName(people), people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Uh oh! You have entered invalid input. Please try searching again following instructions.)");
    app(); // restart app

  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.", checkIfString);
  let filteredPeople;
  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = getAge(dateElement);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(input);
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight === userInputWeight) {
      return true;
    }
  });

  return newArray;
}

function mainMenu(person, people){

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
      displayPeople(findFamily(person, people));
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", checkIfString);
  var lastName = promptFor("What is the person's last name?", checkIfString);;
  let newArray = people.filter(function (el) {
    if((el.firstName == firstName) && (el.lastName == lastName)) {
      return true;
    }
  });
  return newArray[0];
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}


function findSpouse(person, people) {
  let newArray = people.filter(function(el) {
    if (el.currentSpouse == person.id) {
      return true;
    }
  });
  return newArray;
}


function findChildren(person, people) {
  let newArray = people.filter(function(el) {
    for (let i = 0; i < el.parents.length; i++)
      if(el.parents[i] == person.id ) {
        return true;
    }
  });
  return newArray;
}

function findParents(person, people) {
  let newArray = people.filter(function(el) {
      if((person.parents).includes(el.id)) {
        return true;
      }

    });
    return newArray;
  }


function findFamily (person, people) {
  let newArray = [];
  let siblings = findSiblings(person, people);
  let children = findChildren(person, people);
  let spouse = findSpouse(person, people);
  let parents = findParents(person, people);

  if (siblings != null) {
    for(let i = 0; i < siblings.length; i ++){
      newArray.push(siblings);
    }
  }

  if (children != null) {
    for(let i = 0; i < children.length; i ++){
      newArray.push(children[i]);
    }
  }

  if (spouse != null) {
    for(let i = 0; i < spouse.length; i ++){
    newArray.push(spouse);
  }
}

  if (parents != null) {
    for(let i = 0; i < parents.length; i ++) {
      newArray.push(parents);
    }
  }

  return newArray;
}


function findSiblings(person, people) {
  let newArray = people.filter(function (el) {
    for (let i = 0; i < (el.parents).length; i++) {
      if(person == el) {
        return false;
      }
      if(person.parents.includes(el.parents[i]) ) {
        return true;
    }
  }
  });
  return newArray[0];
}


function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  alert(personInfo);

}


function addAgeToObject(people) {
  people = people.map(function(el){
	   el.age = getAge(el.dob);
	   return el;
    });
  return people;
}

function getAge(dateElement) {
  var date1 = new Date(getCurrentDate());
  var date2 = new Date(dateElement);
  var timeDifference = Math.abs(date2.getTime() - date1.getTime());
  var differentDays = Math.ceil(timeDifference / (1000 * 3600 * 24));
  //must round down with age!
  var age = Math.floor((differentDays / 365));
  return age;
}


function getCurrentDate() {
  var date = new Date();
  var currentDate = "";
    currentDate += (date.getMonth() + 1) + "/";
     currentDate += date.getDate() + "/";
     currentDate += date.getFullYear();
  return currentDate;
}


// helper function to pass into promptFor to validate yes/no answers

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}


function searchByOccupation(people){
  let userInputOccupation = prompt("What is the indivuduals occupation?");
  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
  });

  return newArray;
}




function searchByEyecolor(people){
  let userInputEyeColor = prompt("What is the individuals eye color?");
  let newArray = people.filter(function (el) {
    if(el.eyecolor == userInputEyeColor) {
      return true;
    }
  });
  return newArray;
}

function searchByGender(people){
  let userInputGender = prompt("What is the individuals gender?");
  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
  return newArray;
  }
