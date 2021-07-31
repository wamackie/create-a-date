var test
function search() {
    var zip = 32803
    var location = ($("#location-of").val())
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=0JGGR2SJH46d1Ckem69HRE9prsVCVkv1&postalCode="+location+""
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
        console.log(data);
        console.log(date);
        // Make sure to look at the response in the console and read how 404 response is structured.
        test = (data);
        var date = data["_embedded"].events[0].dates.start.localDate
        
        //var zip = 
        
        //var day =
      })
  }

//postalCode, day

//name date address location