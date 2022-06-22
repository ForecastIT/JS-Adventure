//The is the game engine
//Please Note: You will need an API key from OpenWeather, https://openweathermap.org/api, for JS Adventure to work correctly.

//--- Gloabal Varibles ---
//These variables connect our code with the 'id' on the html page.
var images = document.getElementById("images");
var text = document.getElementById("text");
var buttonBox = document.getElementById('buttonBox');
var input = document.getElementById('input');

//this is the variable for the name of the character
var player;

//Holds the local weather condition.
var setweather;

//Holds the alternative word fir the local weather condition.
var gameweather;

//Holds the time from the twelve hour clock function.
var v12HourClock;

//Your Open Weather Map API Key
var appid = '';
//-------------------------

//Get the geolocation from the BOM.
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    div.innerHTML = "The Browser Does not Support Geolocation";
  }
}

//Placesses the Coordinates in the Open Weather Maps API and retrieves the players local weather in JSON format and then fillers it down to the current conditions and saves it to local storage before sending it to a varible.
async function showPosition(position) {
  const res = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + appid + '')
  const data = await res.json()

  //Saves the weather data to local storage.
  localStorage.setItem('weatherdata', data.weather[0].main);
  setweather = (localStorage.getItem('weatherdata'));
  console.log(res);
  console.log(setweather);

//The if statement takes the data in setweather and matches to an alternative word. The alternative word is added to the varible gameweather. Add gameweather to a senario text string to display the current weather. 
  if (setweather = "Clouds") {
        gameweather = "cloudy"
     } else if (setweather = "Sun") {
        gameweather = "sunny"
     } else if (setweather = "Rain") {
        gameweather = "raining"}
       else if (setweather = "Clear"){
        gameweather = "clear"
     } else if (setweather = "Snow") {
        gameweather = "snowing"
     } else if (setweather = "extreme") {
        gameweather = "extremly dangerous"
     } else (gameweather = "okay");
   console.log(gameweather);
}

//Displays an error if geolocation is off or blocked in the browser.
function showError(error) {
  if (error.PERMISSION_DENIED) {
    div.innerHTML = "The User have denied the request for Geolocation.";
  }
}
getLocation();

//Gets the players name from the input field when the enter key is pressed.
input.onkeydown = function (event) {
  if (event.key == "Enter" || event.keyCode == 13) {
    //Checks to see of the input field is null.
    if(input.value  === "" || null ) {
      //Adds the message "I need to know your name first!" to the html id text
      document.getElementById("text").innerHTML = "I need to know your name first!"; //Adds the 
      //Resets the input to any empty value redy for the playsers name
      input.value ="";
    } else {
      //Outputs the Player Name from the BOM local storage.
      localStorage.setItem('playersname', input.value);
      player = (localStorage.getItem('playersname'));
      input.parentNode.removeChild(input)
      scenario = setScenarioText()
      advanceTo(scenario.two)
    return
    }  
  }
}

//Runs the in game clock based on the current system time eg. hh:mm:ss AM/PM
function showTime() {
  //Gets the time values
  var date = new Date();
  var vSec = String(date.getSeconds()).padStart(2, '0');
  var vMin = String(date.getMinutes()).padStart(2, '0');
  var v24hou = String(date.getHours()).padStart(2, '0');
  var vNoString24hou = date.getHours()
  var v12hou = (v24hou % 12) || 12;

  //Builds the 24 hour Clock in the UTC Time Zone
  var v24HourClock = v24hou + ":" + vMin + ":" + vSec;

  //AM or PM Check
  if (vNoString24hou >= 12) { var vAMPM = "PM"; } else { var vAMPM = "AM"; }

  //Builds the 12 hour clock
  v12HourClock = v12hou + ":" + vMin + ":" + vSec + " " + vAMPM;
  setTimeout(showTime, 1000);
}
showTime()

//Replaces the phrase 'Your Name' with the players name where ever it is used.
var changeText = function (words) {
  text.innerHTML = words.replace("Your Name", player);
};

//This takes the image link and puts it in the proper format and sends it to the html page.
var changeImage = function (img) {
  images.style.backgroundImage = "url(" + img + ")";
};

//This looks at the number of options we have set and creates enough buttons.
function changeButtons(buttonList) {
  buttonBox.innerHTML = "";
  for (var i = 0; i < buttonList.length; i++) {
    buttonBox.innerHTML += `<button class="btn btn-secondary" onClick="${buttonList[i][1]}">${buttonList[i][0]}</button>`;
  };
};

//This is what moves the game along.
var advanceTo = function (s) {
  changeImage(s.image)
  changeText(s.text)
  if (s.buttons) {
    changeButtons(s.buttons)
  }
};

//This is function holds each scenario, the more you add the more options there are.
function setScenarioText() {
  return ({
    one: {
      image: "https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      text: "Hello adventurer, what is your name?\n",
    },
    two: {
      image: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "Hello " + player + ". The story starts with you on holiday inside your campervan by a lake.",
      buttons: [["Let get started.", "advanceTo(scenario.three)"]]
    },
    three: {
      image: "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "You look out the door of the campervan, and the weather is " + gameweather + ". Next, you look at your watch, and the time is " + v12HourClock + ". " + "What do you want to do?",
      buttons: [["Stay in the campervan", "advanceTo(scenario.four)"], ["Go Outside", "advanceTo(scenario.five)"]]
    },
    four: {
      image: "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "You stay in the campervan. You wake up the next morning to a sunny day and continue your holiday. The End.",
      buttons: [["Choose a different path?", "advanceTo(scenario.two)"]]
    },
    five: {
      image: "https://1.bp.blogspot.com/-83pWE4JxQxM/ViiOd_7nGTI/AAAAAAAADUg/yCJ8iAB-gMY/s1600/postapoc5.jpg",
      text: "A wild gang of rabid dogs chase you away from the campervan. Against your better judgement, you enter a creepy house for safety.",
      buttons: [["continue", "advanceTo(scenario.eight)"]]
    },
    six: {
      image: "https://images.pexels.com/photos/4835419/pexels-photo-4835419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Hi " + player +  ", did you forget about the rabid dogs?",
      buttons: [["Choose a different path?", "advanceTo(scenario.two)"]]
    },
    seven: {
      image: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "You have made it back to the campervan safely. You start the engine and leave. The End",
      buttons: [["Choose a different path?", "advanceTo(scenario.two)"]]
    },
    eight: {
      image: "https://images.unsplash.com/photo-1616555670626-09496d2eed9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "The door of the creepy house is boarded up, but one of its windows is missing. What will you do?",
      buttons: [["Go in through the window", "advanceTo(scenario.nine)"], ["Try and return to the campercan", "advanceTo(scenario.six)"]]
    },
    nine: {
      image: "https://images.unsplash.com/photo-1542642859-c1403926a91e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      text: "Inside the house, there are two paths to follow. Which one will you take?",
      buttons: [["Go to the back door", "advanceTo(scenario.twelve)"], ["Go up stairs", "advanceTo(scenario.ten)"]]
    },
    ten: {
      image: "https://images.unsplash.com/photo-1563905463861-7d77975b3a44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "Upstairs, you see a shadowed figure at the end of the hall. What do you do?",
      buttons: [["Go towards the figure.", "advanceTo(scenario.eleven)"], ["Go back the way you came.", "advanceTo(scenario.nine)"]]
    },
    eleven: {
      image: "https://images.pexels.com/photos/4835419/pexels-photo-4835419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      text: "Well, " + player + " wasn't very smart. So, in the words of Ron Perlman from the game Fallout 'Boy, you're stupid and dead.'",
      buttons: [["Choose a different path?", "advanceTo(scenario.two)"]]
    },
    twelve: {
      image: "https://images.unsplash.com/photo-1440549770084-4b381ce9d988?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "You step out of the house, and the dogs have stopped following you. What do you want to do?",
      buttons: [["Try and go back to the campervan.", "advanceTo(scenario.seven)"], ["Go back in to the house", "advanceTo(scenario.nine)"]]
    },
  })
}
var scenario = setScenarioText()

//This call starts the scenerio.
advanceTo(scenario.one);