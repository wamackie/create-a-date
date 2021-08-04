//remove this variable in the future
var restaurantTest;
var eventTest;

var restaurantList = {};
var eventList = {};
var usedRandomNumbersRestaurant = [];
var usedRandomNumbersEvent = [];


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
var openModalButtons = document.querySelectorAll("[data-modal-target]");
var closeModalButtons = document.querySelector("data-close-button");
var overlay = document.getElementById("overlay");




Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };

function shuffle(){
    clearContent();


    var restaurantSize = Object.size(restaurantList);
    var eventSize = Object.size(eventList);

    var randomlySelectedRestaurant = Math.floor(Math.random()*restaurantSize);
    var randomlySelectedEvent = Math.floor(Math.random()*eventSize);
    console.log(restaurantSize + "  vs   " +randomlySelectedRestaurant);
    console.log(eventSize + "  vs   "+ randomlySelectedEvent);
    var controller1 = true;
    var controller2 = true;
    while(controller1) {
        console.log('loop1')
        if(usedRandomNumbersRestaurant.indexOf(randomlySelectedRestaurant)==-1 && restaurantSize != 0){
            controller1 = false;
            //--data pulling from Yelp api includes restaurant name, address, phone, and hours of operations
            var restaurantInfo = $('<div><p>' + restaurantList[randomlySelectedRestaurant].restaurant_name + '</p></div>');
            var restaurantAddress = $('<div><p>' + restaurantList[randomlySelectedRestaurant].address.formatted + '</p></div>');
            var restaurantPhone = $('<div><p>'+ restaurantList[randomlySelectedRestaurant].restaurant_phone + '</p></div>');
            var storeHours = (restaurantList[randomlySelectedRestaurant].hours);
            var restaurantHours = $('<div><p>'+ storeHours +'</p></div>');

            // append restaurant info to restaurant api
            $('.restaurant-api').append(restaurantInfo);
            $('.restaurant-api').append(restaurantAddress);
            $('.restaurant-api').append(restaurantPhone);
            if (storeHours != ""){
                $('.restaurant-api').append(restaurantHours);
            }
            
        }
        else if (restaurantSize == 0){
            controller1 = false;
        }
        else if (usedRandomNumbersRestaurant.length==restaurantSize) {
            window.alert("no more to loop through")
            controller1 = true;
        }
        else {randomlySelectedRestaurant = Math.floor(Math.random()*restaurantSize)}
    }
    while(controller2) {
        console.log('loop2')
        if(usedRandomNumbersEvent.indexOf(randomlySelectedEvent)==-1 && eventSize != 0){
            controller2 = false;
            //--data pulling from Ticketmaster api includes event name, type of event, venue name, address, price of tickets and information about ticket limits
            var eventInfo = $('<div><p>'+ eventList[randomlySelectedEvent].name + '</p></div>');
            var eventType = $('<div><p>'+ eventList[randomlySelectedEvent].classifications['indexOf', 0].segment.name + ' ' + eventList[randomlySelectedEvent].classifications['indexOf', 0].subGenre.name + '</p></div>');
            var eventDates = $('<div><p>' + eventList[randomlySelectedEvent].dates.start.localDate + '</p></div>');
            var eventVenue = $('<div><p>' + eventList[randomlySelectedEvent]._embedded.venues['indexOf', 0].name + '</p></div>');
            var eventVenueAddress = $('<div><p>' + eventList[randomlySelectedEvent]._embedded.venues['indexOf', 0].address.line1 + ', ' + eventList[randomlySelectedEvent]._embedded.venues['indexOf', 0].city.name + ', ' + eventList[randomlySelectedEvent]._embedded.venues['indexOf', 0].state.name + '</p></div>');
            var eventPrice = $('<div><p> $' + eventList[randomlySelectedEvent].priceRanges['indexOf', 0].min + ' each to $' + eventList[randomlySelectedEvent].priceRanges['indexOf', 0].max + ' each</p></div>');
            


            // append event info to event api
            $('.event-api').append(eventInfo);
            $('.event-api').append(eventType);
            $('.event-api').append(eventDates);
            $('.event-api').append(eventVenue);
            $('.event-api').append(eventVenueAddress);
            $('.event-api').append(eventPrice);
        }
        else if(eventSize == 0){
            console.log("no events")
            controller2 = false;
        }
        else if (usedRandomNumbersEvent.length==eventSize) {
            window.alert("no more to loop through")
            controller2 = true;
        }
        else {randomlySelectedEvent = Math.floor(Math.random()*eventSize)}
    }
        //NEED TO BE DISPLAYED USING MODAL

    
    usedRandomNumbersRestaurant.push(randomlySelectedRestaurant);
    usedRandomNumbersEvent.push(randomlySelectedEvent);
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
    var city = $('#city').val();
    
    fetch("https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=fa0e2d502955fffde3147fb635a2c723&q="+city)
    .then(response => response.json())
    .then(function (result){
        eventTest = result
        var lat = result['coord'].lat;
        var lon =  result['coord'].lon;

        fetch(
            "https://api.documenu.com/v2/restaurants/search/geo?lat="+lat+"&lon="+lon+"&distance=20&key=a33fecb2f255c04e008c528cf89286a2&size=20"
            )
            .then(function(response) {
                return response.json();
            })
            .then(function(result) {
                for(var restaurant in result.data){
                    restaurantList[restaurant] = result.data[restaurant];  
              }
                var requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
            };
            fetch(
                    "https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=0YgrYBljKlaRBH9BoF0vGgKaPYX1A96k&latlong="+lat+","+lon+"", requestOptions
                )
                .then(response => response.json())
                .then(function (result){ 
                    if (result.page.totalElements != 0 ){
                        for(var event in result["_embedded"].events){
                            eventList[event] = result["_embedded"].events[event];
                        }
                    }
                    shuffle();
                    criteriaPage.classList.remove("criteriaActivate");
                    newDatePage.classList.add("newDateActivate");
                })
                .catch(error => console.log('error', error));
                })
    })
    
}

openModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        var modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

overlay.addEventListener("click", () => {
    var modals = document.querySelectorAll(".modal.active");
    modals.forEach(modal => {
        closeModal(modal);
    });
});

closeModalButtons.forEach(button => {
    button.addEventListener("click", () => {
        var modal = button.closest(".modal");
        closeModal(modal);
     });
});

function openModal(modal) {
    if(modal == null) 
    return;
    modal.classList.add("active");
    overlay.classList.add("active");
}

function closeModal(modal) {
    if (modal == null)
    return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

saveBtn.onclick=()=>{
    location.reload();
}