/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function checkIfString(entry) {
  if (typeof entry === 'string') {
    return true;
  }
}


function userInterface(){
  let firstSearch = promptFor("Welcome to the 'Most Wanted' propotype person search. Type 'n' to search for a person's information by name. Type 't' to search for a person's information by their traits." );
  let keepSearching = true;
  while (keepSearching) {
  if (firstSearch.toLowerCase() === 'n') {
    searchByName();
  }
  else if (firstSearch.toLowerCase() === 't') {
    searchByTraits();
  }
  else {
    alert("Uh oh, you've entered invalid search critera. Make sure you are typing just 'n' to search by name or just 't' to search by a trait.")
  }
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
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;
  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = SearchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = getAge(dateElement);
      break;
    case "occupation" :
      filteredPeople = SearchByOccupation(input);
      break;
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
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(personID, people){
  let person = people.filter(function (el) {
    if(el.id == personID) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });
  let name = person[0].firstName + person[0].lastName

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
    break;
    case "family":
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





function searchByName(people) {
  var firstName = prompt("What is the person's first name?").toLowerCase();
  var lastName = prompt("What is the person's last name?").toLowerCase();

  let newArray = people.filter(function (el) {
    if((el.firstName.toLowerCase() == firstName) && (el.lastName.toLowerCase() == lastName)) {
      return true;
    }
  });

  return newArray[0].id;
}




// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}


function findFamily(person, people) {
  let family;
  family = people.map(function (el) {
    if (Object.values(people).indexOf(person.id) > -1) {
      return true;
    }
  });
  return family;
}

function displayPerson(person){
  person = person[0];
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


function searchByOccupaton(people){
   let userInputOccupation = prompt("What is the indivuduals occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
  });

  return newArray;

}

function searchByEyecolor(people){
  let userEyeColor = prompt("What is the individuals eye color?");

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

function name(input){
  return true;
}
