//remove this variable in the future
var restaurantTest;
var eventTest;

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
const shuffleBtn = document.querySelector(".shuffle-btn")
var restaurantCheckBox;
//currently Movies isnt being used
var eventsCheckBox;




function shuffle(){
    clearContent();
    var randomlySelected = Math.floor(Math.random()*20);
    var controller = true;
    while(controller) {
        if(usedRandomNumbers.indexOf(randomlySelected)==-1){
            controller = false;
            //--display content here 
            var restaurantInfo = $('<div><p>'+restaurantList[0].restaurant_name+'</p></div>')
            var eventInfo = $('<div><p>'+eventList[0].name+'</p></div>')
            $('.restaurant-api').append(restaurantInfo);
            $('.event-api').append(eventInfo);
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
    content = document.querySelector('.ticketmaster-container');
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
    restaurantCheckBox = document.getElementById("Restaurants").checked;
    eventsCheckBox = document.getElementById("Events").checked;
    criteriaPage.classList.add("criteriaActivate");
}

//userInput (date + ZIP) page
createBtn.onclick=()=>{
    var zipcode = $('#zipcode').val();
    
    fetch(
        "https://api.documenu.com/v2/restaurants/zip_code/"+zipcode+"?size=20&key=a33fecb2f255c04e008c528cf89286a2"
        )
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            eventTest = result     // REMOVE ON FINAL PRODUCT - FOR TESTING PURPOSE ONLY
            for(var restaurant in result.data){
                restaurantList[restaurant] = result.data[restaurant];  
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
        .then(function (result){ 
            restaurantTest = result     // REMOVE ON FINAL PRODUCT - FOR TESTING PURPOSE ONLY
            for(var event in result["_embedded"].events){
                eventList[event] = result["_embedded"].events[event];
            }
            //THIS HAS TO BE HERE OR PAGE LOADS BLANK, THEN POPULATES    ---Remove note on final product
            shuffle();
            criteriaPage.classList.remove("criteriaActivate");
            newDatePage.classList.add("newDateActivate");
        })
        .catch(error => console.log('error', error));
}

saveBtn.onclick=()=>{
    location.reload();
}

saveBtn2.onclick=()=>{
    location.reload();
}