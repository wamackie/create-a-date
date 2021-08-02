//remove this variable in the future
var test;

var restaurantList = {};
var eventList = {};
var usedRandomNumbers = [];

const newDateBtn = document.querySelector(".new-date-btn")
const savedDateBtn = document.querySelector(".saved-date-btn")
const nextBtn = document.querySelector(".next-btn")
const createBtn = document.querySelector(".create-date-btn")
const saveBtn = document.querySelector(".save-date-btn")
const saveBtn2 = document.querySelector(".save-date-btn2")
const nextBtn2 = document.querySelector(".next-btn2")
const titlePage = document.querySelector(".title-page")
const filterPage = document.querySelector(".filter-page")
const criteriaPage = document.querySelector(".criteria-page")
const newDatePage = document.querySelector(".new-date-page")
const savedDatePage = document.querySelector(".saved-date-page")
var restaurantCheckBox;
//currently Movies isnt being used
var moviesCheckBox;
var eventsCheckBox;


function shuffle(){
    var randomlySelected = Math.floor(Math.random()*20);
    var controller = true;
    while(controller) {
        if(usedRandomNumbers.indexOf(randomlySelected)==-1){
            controller = false;
            console.log(randomlySelected);
        }
        //NEED TO BE DISPLAYED USING MODAL
        else if (usedRandomNumbers.length==20) {
            window.alert("no more to loop through")
            controller = true;
        }

        else {randomlySelected = Math.floor(Math.random()*20)}
        
    }
    usedRandomNumbers.push(randomlySelected);
    console.log(usedRandomNumbers);
}

function reshuffle() {
    clearContent()
    shuffle();
}

function clearContent(){
    var content = document.querySelector('.yelp-container');
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
    var content = document.querySelector('.fandango-container');
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
    var content = document.querySelector('.ticketmaster-container');
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
}

newDateBtn.onclick=()=>{
    filterPage.classList.add("filterActivate");
    titlePage.classList.add("titleDeactivate");
}

savedDateBtn.onclick=()=>{
    titlePage.classList.add("titleDeactivate");
    savedDatePage.classList.add("savedDateActivate");
}

//Filter parameter page 
nextBtn.onclick=()=>{
    usedRandomNumbers = []
    filterPage.classList.remove("filterActivate");
    restaurantCheckBox = document.getElementById("Restuarants").checked;
    moviesCheckBox = document.getElementById("Movies").checked;
    eventsCheckBox = document.getElementById("Events").checked;
    criteriaPage.classList.add("criteriaActivate");
}

//userInput (date + ZIP) page
createBtn.onclick=()=>{
    var zipcode = $('#zipcode').val();
    
    fetch(
        "https://api.documenu.com/v2/restaurants/zip_code/"+zipcode+"?size=20&key=a33fecb2f255c04e008c528cf89286a2"
        )
        .then(function(response1) {
          return response1.json();
        })
        .then(function(response) {
          for(var restaurant in response.data){
                restaurantList[restaurant] = response.data[restaurant];  
          }
        })

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
    fetch(
            "https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=0YgrYBljKlaRBH9BoF0vGgKaPYX1A96k&zip="+String(zipcode), requestOptions
        )
        .then(response => response.json())
        .then(function (data){ 
            for(var event in data["_embedded"].events){
                eventList[event] = data["_embedded"].events[event];
            }
        })
        .catch(error => console.log('error', error));

    criteriaPage.classList.remove("criteriaActivate");
    newDatePage.classList.add("newDateActivate");
}

saveBtn.onclick=()=>{
    location.reload();
}

saveBtn2.onclick=()=>{
    location.reload();
}