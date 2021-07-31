//remove this variable in the future
var test;

var restaurantList = {};
var eventList = {};
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
    filterPage.classList.remove("filterActivate");
    criteriaPage.classList.add("criteriaActivate");
}

//userInput (date + ZIP) page
createBtn.onclick=()=>{
    var zipcode = $('#zipcode').val();
    fetch(
        "https://api.documenu.com/v2/restaurants/zip_code/"+zipcode+"?size=30&key=a33fecb2f255c04e008c528cf89286a2"
        )
        .then(function(response1) {
          return response1.json();
        })
        .then(function(response) {
          for(var restaurant in response.data){
              // console.log(test.data[restaurant])
              restaurantList[restaurant] = response.data[restaurant];  
          }
        })

    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=0JGGR2SJH46d1Ckem69HRE9prsVCVkv1&postalCode="+zipcode+""
    fetch(apiUrl)
      .then(function (response) {
        console.log(response.status);
        //  Conditional for the the response.status.
        if (response.status !== 200) {
        // Place the response.status on the page.
        console.log(response.status)
        }
        return response.json();
      })
        .then(function (data) {
        // Make sure to look at the response in the console and read how 404 response is structured.
        for(var event in data["_embedded"].events){
          eventList[event] = data["_embedded"].events[event];
        }
      })

    criteriaPage.classList.remove("criteriaActivate");
    newDatePage.classList.add("newDateActivate");
}

saveBtn.onclick=()=>{
    location.reload();
}

saveBtn2.onclick=()=>{
    location.reload();
}












