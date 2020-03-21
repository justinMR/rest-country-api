//Assuming we're limited to the provided HTML, dynamically add our own tags

//Created Tags and attributes/values
const script = document.createElement("script");
script.src =
  "https://www.sfchronicle.com/external/weather/weather.json?callback=hdnWeatherJsonpCallback";
const dropdown = document.createElement("select");
dropdown.id = "menu";
document.body.appendChild(script);

//Easy Selectors
const current = document.getElementById("current");
const weeklyForecast = document.getElementById("forecast");
const content = document.getElementById("content");

//Empty variable to be reassigned at a later time
let menuChoice;

//Default Choice, assigned here for easier change later if needed
let defaultCity = "Palo Alto";

//Date Information
const date = new Date();
const month = date.toLocaleString("default", { month: "short" });
const today = `${month} ${date.getDate()}`;
content.insertAdjacentElement("afterbegin", dropdown);
dropdown.insertAdjacentHTML(
  "afterend",
  `<div><buttion id='toggle-dark'>Toggle Day/Night Mode</button></div>`
);

let hdnWeatherJsonpCallback = function(data) {
  //Load all cities available into dropdown selection
  //Defaults to defaulted choice (in this case, Palo Alto)

  //Refresh data after 10 minutes
  setTimeout(function() {
    conjureCity(data.cities[9]);
  }, 600000);
  for (let city of data.cities) {
    dropdown.insertAdjacentHTML(
      "beforeend",
      `${city.geoloc.city}` === `${defaultCity}`
        ? `<option selected="${defaultCity}" value="${defaultCity}">${defaultCity}</option>`
        : `<option value="${city.geoloc.city}">${city.geoloc.city}</option>`
    );
    if (city.geoloc.city === defaultCity) {
      conjureCity(city);
    }
  }

  dropdown.onchange = function() {
    weeklyForecast.innerHTML = "";
    let menuChoice = dropdown.value;
    for (let city of data.cities) {
      if (city.geoloc.city === menuChoice) {
        conjureCity(city);
      }
    }
  };
};

//Separated function for cleaner code and modularity
function conjureCity(input) {
  input.weekly.map(dayOfTheWeek => {
    if (dayOfTheWeek.date === today) {
      current.innerText = `
          ${dayOfTheWeek.day} ${dayOfTheWeek.date}
          City: ${input.geoloc.city} \n 
          Temperature: High ${dayOfTheWeek.high} ° F Low ${dayOfTheWeek.low} ° F \n  
          Condition(day): ${dayOfTheWeek.daycondition}`;
    }
    if (dayOfTheWeek.date > today) {
      weeklyForecast.insertAdjacentHTML(
        "beforeend",
        ` <div class='mini-card'>
            <h2><u>${dayOfTheWeek.day} ${dayOfTheWeek.date}</u></h2>
            <p><strong>Day Condition:</strong> ${dayOfTheWeek.daycondition}</p>
            <p><strong>Night Condition:</strong> ${dayOfTheWeek.nightcondition}</p>
        </div>
        `
      );
    }
  });
}

//Dark mode functionality
if (date.getHours() < 8 || date.getHours() > 20)
  document.body.className = "dark-mode";

document.getElementById("toggle-dark").addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");
});
