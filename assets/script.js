
function search(){
    console.log("worked")

    //a33fecb2f255c04e008c528cf89286a2

    fetch(
        "https://api.documenu.com/v2/restaurants/zip_code/33756?size=30&key=a33fecb2f255c04e008c528cf89286a2"
        )
        .then(function(response1) {
            return response1.json();
        })
        .then(function(response) {
            console.log(response)

        })
}