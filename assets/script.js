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
            //--data pulling from Yelp api includes restaurant name, address, phone, and hours of operations
            var restaurantInfo = $('<div><p>' + restaurantList[randomlySelected].restaurant_name + '</p></div>');
            var restaurantAddress = $('<div><p>' + restaurantList[randomlySelected].address.formatted + '</p></div>');
            var restaurantPhone = $('<div><p>'+ restaurantList[randomlySelected].restaurant_phone + '</p></div>');
            var storeHours = (restaurantList[randomlySelected].hours);
            var restaurantHours = $('<div><p>'+ storeHours +'</p></div>');
            
            
            //--data pulling from Ticketmaster api includes event name, type of event, venue name, address, price of tickets and information about ticket limits
            var eventInfo = $('<div><p>'+ eventList[randomlySelected].name + '</p></div>');
            var eventType = $('<div><p>'+ eventList[randomlySelected].classifications['indexOf', 0].segment.name + ' ' + eventList[randomlySelected].classifications['indexOf', 0].subGenre.name + '</p></div>');
            var eventDates = $('<div><p>' + eventList[randomlySelected].dates.start.localDate + '</p></div>');
            var eventVenue = $('<div><p>' + eventList[randomlySelected]._embedded.venues['indexOf', 0].name + '</p></div>');
            var eventVenueAddress = $('<div><p>' + eventList[randomlySelected]._embedded.venues['indexOf', 0].address.line1 + ', ' + eventList[randomlySelected]._embedded.venues['indexOf', 0].city.name + ', ' + eventList[randomlySelected]._embedded.venues['indexOf', 0].state.name + '</p></div>');
            var eventPrice = $('<div><p> $' + eventList[randomlySelected].priceRanges['indexOf', 0].min + ' each to $' + eventList[randomlySelected].priceRanges['indexOf', 0].max + ' each</p></div>');
            var eventTicketInfo = $('<div><p>' + eventList[randomlySelected].ticketLimit.info + '</p></div>');
            
            // append restaurant info to restaurant api
            $('.restaurant-api').append(restaurantInfo);
            $('.restaurant-api').append(restaurantAddress);
            $('.restaurant-api').append(restaurantPhone);
            if (storeHours != ""){
                $('.restaurant-api').append(restaurantHours);
            }

            // append event info to event api
            $('.event-api').append(eventInfo);
            $('.event-api').append(eventType);
            $('.event-api').append(eventDates);
            $('.event-api').append(eventVenue);
            $('.event-api').append(eventVenueAddress);
            $('.event-api').append(eventPrice);
            $('.event-api').append(eventTicketInfo);
            
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

function clearContent(){
    var content = document.querySelector('.restaurant-api');
    while(content.firstChild){
        content.removeChild(content.firstChild);
    }
    content = document.querySelector('.event-api');
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

shuffleBtn.onclick=()=>{
    shuffle();
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
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
        };
        fetch(
                "https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=0YgrYBljKlaRBH9BoF0vGgKaPYX1A96k&zip="+String(zipcode), requestOptions
            )
            .then(response => response.json())
            .then(function (result){ 
                for(var event in result["_embedded"].events){
                    eventList[event] = result["_embedded"].events[event];
                }
                shuffle();
                criteriaPage.classList.remove("criteriaActivate");
                newDatePage.classList.add("newDateActivate");
            })
            .catch(error => console.log('error', error));
            })
}

saveBtn.onclick=()=>{
    location.reload();
}