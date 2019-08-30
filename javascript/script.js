// namespacing object

const findEventApp = {};
// let preferredGenre = Sports;//Default value
let city = ["Toronto", "Vancouver", "Montreal" , "Calgary"]
let classificationName = ["Sports", "Music", "Arts"]


// cache of DOM elements
// const $form = $('#userSelectionForm');
// const $userSelectedGenre = $('#preferredGenre');
// const $submit = $('#submit');

// init function

// findEventApp.init = function() {
//     findEventApp.userInput();
//     findEventApp.resetInput(); 
// };

// form submission listener

// findEventApp.userInput = function() {
//     $form.on('submit', function(event) {
//         event.preventDefault();

//         $userPostalCode.empty();

//         findEventApp.getInput();
//     });
// };
findEventApp.getEvent = function() {

    $('#userSelectionForm').on('submit', function(event) {
            event.preventDefault();
            findEventApp.eventCity = $('input[name="city"]:checked').val();
            console.log(findEventApp.eventCity);           
            findEventApp.classificationName = $('#preferredGenre').find(":selected").text();
            console.log(findEventApp.classificationName);
            findEventApp.getEventApi();
            $('.header').hide();
            $('.main').show();
            
    })
}


//Name
//Image
//Venue
//dates

// storing user inputs int o variables, checking the inputs are valid, then passing to ajax request function


///ajax call to the listener
findEventApp.baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json`;
findEventApp.apiKey = `fWG7RNp1homyItX8mZznhhwWgxC3upVy`;

findEventApp.getEventApi = function(){
    $.ajax({
        url : findEventApp.baseUrl,
        method : 'GET',
        dataType : 'json',
        data : {
            apikey : findEventApp.apiKey,
            city : findEventApp.eventCity,
            source : findEventApp.eventSource,
            classificationName : findEventApp.classificationName,
            size : 4
            
        }
    }).then(function(result){
        findEventApp.displayEvent(result);
    })

}
findEventApp.displayEvent = function(result){
    for(i = 0; i < result._embedded.events.length; i++){
        $('.wrapper').append(`<h4 class="name">${result._embedded.events[i].name}`);	
        console.log(result);
        let imgId = `image${i}`;
        console.log(imgId);
        let myImage = new Image();
        myImage.src = result._embedded.events[i].images[0].url;
        myImage.alt = `${result._embedded.events[i].name} image`
        $('.wrapper').append(myImage);	
        console.log(result); 
        $('.wrapper').append(`<p class="venues">
        ${result._embedded.events[0]._embedded.venues[0].name} 
        ${result._embedded.events[0]._embedded.venues[0].address.line1} 
        ${result._embedded.events[0]._embedded.venues[0].city.name} 
        ${result._embedded.events[0]._embedded.venues[0].postalCode}`);

    }

    }

///init function
findEventApp.init = function(){
    console.log('you are doing great');
    findEventApp.getEvent();

}

//document ready
$(document).ready(function(){
    findEventApp.init();
})////document ready ends here