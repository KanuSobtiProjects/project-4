// namespacing object

const findEvent = {};
let city = ["Toronto", "Vancouver", "Montreal" , "Calgary"]
let classificationName = ["Sports", "Music", "Arts"]


// cache of DOM elements
const $form = $('#userSelectionForm');
const $userSelectedGenre = $('#preferredGenre');
const $submit = $('#submit');

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
$('#userSelectionForm').on('submit', function(event) {
        event.preventDefault();
        findEvent.eventCity = $('input[name="city"]:checked').val();
        console.log(findEvent.eventCity);
       
        findEvent.classificationName = $('#preferredGenre:selected').val();
        console.log(findEvent.classificationName);
        
       

})



// storing user inputs int o variables, checking the inputs are valid, then passing to ajax request function


///ajax call to the listener
findEvent.baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json`;
findEvent.apiKey = `fWG7RNp1homyItX8mZznhhwWgxC3upVy`;

findEvent.getEvent = function(city,genre){
    $.ajax({
        url : findEvent.baseUrl,
        method : 'GET',
        dataType : 'json',
        data : {
            apikey : findEvent.apiKey,
            city : findEvent.eventCity,
            source : findEvent.eventSource,
            classificationName : findEvent.classificationName
            
        }
    }).then(function(result){
        findEvent.displayEvent(result);
    })

}
findEvent.displayEvent = function(result){
    
    console.log(result);
}

///init function
findEvent.init = function(){
    console.log('you are doing great');
    findEvent.getEvent();

}

//document ready
$(document).ready(function(){
    findEvent.init();
})////document ready ends here