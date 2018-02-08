


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
    app();

  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.", checkIfString());
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      alert(displayPeople(filteredPeople));
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      alert(displayPeople(filteredPeople));
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      alert(displayPeople(filteredPeople));
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      alert(displayPeople(filteredPeople));
      break;
    case "age":
      filteredPeople = searchByAge(people);
      alert(displayPeople(filteredPeople));
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      alert(displayPeople(filteredPeople));

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
  });

  return newArray;
}

function mainMenu(person, people){

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
      alert(("The following is " + person.firstName + " " + person.lastName + "'s personal info: \n\n" + displayPerson(person)));
    break;
    case "family":
      alert("The following are " + person.firstName + " " + person.lastName + "'s family members: \n\n" + displayPeople(findFamily(person, people)));
    break;
    case "descendants":
      alert("The following are " + person.firstName + " " + person.lastName + "'s descendants: \n\n" + displayPeople(findDescendants(person, people)));
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", checkIfString);
  var lastName = promptFor("What is the person's last name?", checkIfString);
  let newArray = people.filter(function (el) {
    if((el.firstName == firstName) && (el.lastName == lastName)) {
      return true;
    }
  });
  return newArray[0];
}




function displayPeople(people){
  return people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n");
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
      newArray.push(siblings[i]);
    }
  }

  if (children != null) {
    for(let i = 0; i < children.length; i ++){
      newArray.push(children[i]);
    }
  }

  if (spouse != null) {
    for(let i = 0; i < spouse.length; i ++){
    newArray.push(spouse[i]);
  }
}

  if (parents != null) {
    for(let i = 0; i < parents.length; i ++) {
      newArray.push(parents[i]);
    }
  }

  return newArray;
}



function findDescendants(person, people) {
  let descendants = findChildren(person, people);

  for(let i = 0; i < descendants.length; i++) {
    descendants = descendants.concat(findDescendants(descendants[i], people));
  }

  return descendants;
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
  return personInfo;
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


function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}


function chars(input){
  return true;
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

function searchByHeight(people){
  let userInputHeight = prompt("What is the indivuduals height?");
  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });

  return newArray;
}


function searchByEyeColor(people){
  let userInputEyeColor = prompt("What is the individuals eye color?");
  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
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

function searchByAge(people){
  let userInputAge = prompt("What is the individuals age?");
  let newArray = people.filter(function (el) {
    if(el.age == userInputAge) {
      return true;
    }
  });

  return newArray;
}




function searchByTraits(people) {
 let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.", checkIfString());
 let filteredPeople;
 let foundPerson;
   switch(userSearchChoice) {
   case "height":
     filteredPeople = searchByHeight(people);
     alert(displayPeople(filteredPeople));
     break;
   case "weight":
     filteredPeople = searchByWeight(people);
     alert(displayPeople(filteredPeople));
     break;
   case "eye color":
     filteredPeople = searchByEyeColor(people);
     alert(displayPeople(filteredPeople));
     break;
   case "gender":
     filteredPeople = searchByGender(people);
     alert(displayPeople(filteredPeople));
     break;
   case "age":
     filteredPeople = searchByAge(people);
     alert(displayPeople(filteredPeople));
     break;
   case "occupation":
     filteredPeople = searchByOccupation(people);
     alert(displayPeople(filteredPeople));
   default:
     alert("You entered an invalid search type! Please try again.");
     break;
 return searchByTraits(people)
 }
 userSearchChoice = prompt("Would you like to search the list again?");
     if(userSearchChoice === "yes"){
       searchByTraits(filteredPeople, people)
     }
      if (userSearchChoice === "no"){
        foundPerson = filteredPeople[0];
       }

 // next step => conditional, length of filteredPeople
 mainMenu(foundPerson, people);
}
