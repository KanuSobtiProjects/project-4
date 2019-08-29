// namespacing object

const findEvent = {};

// cache of DOM elements

// const $form = $('#userSelectionForm');
// const $userPostalCode = $('#postalCode');
// const $userSelectedGenre = $('#preferredGenre');
// const $submit = $('#submit');

// init function

// findEvent.init = function() {
//     findEvent.userInput();
//     findEvent.resetInput(); 
// };

// form submission listener

// findEvent.userInput = function() {
//     $form.on('submit', function(event) {
//         event.preventDefault();

//         $userPostalCode.empty();

//         findEvent.getInput();
//     });
// };


// storing user inputs int o variables, checking the inputs are valid, then passing to ajax request function


// ajax call to ticketmaster

// findEvent.ajaxRequest = function (userPostalCode, userSelectedGenre) {
//     const ajaxQueryUrl = 'https://app.ticketmaster.com/discovery/v2/';
//     const apiKey = 'fWG7RNp1homyItX8mZznhhwWgxC3upVy';

// }


findEvent.baseUrl = `https://app.ticketmaster.com/discovery/v2/classifications.json`;
findEvent.apiKey = `fWG7RNp1homyItX8mZznhhwWgxC3upVy`;

findEvent.getEvent = function(city){
    $.ajax({
        url : findEvent.baseUrl,
        method : 'GET',
        dataType : 'json',
        data : {
            apikey : findEvent.apiKey,
            city : city,
            source : 'Ticketmaster',
            // city : 'Toronto'
        }
    }).then(function(result){
        findEvent.displayEvent(result);
    })

}
findEvent.displayEvent = function(result){
    
    console.log(result);
}
findEvent.init = function(){
    console.log('you are doing great');
    findEvent.getEvent();

}




$(document).ready(function(){
    findEvent.init();
})////document ready ends here