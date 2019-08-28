// namespacing object

const findEvent = {};

// cache of DOM elements

const $form = $('#userSelectionForm');
const $userPostalCode = $('#postalCode');
const $userSelectedGenre = $('#preferredGenre');
const $submit = $('#submit');

// init function

findEvent.init = function() {
    findEvent.userInput();
    findEvent.resetInput(); 
};

// form submission listener

findEvent.userInput = function() {
    $form.on('submit', function(event) {
        event.preventDefault();

        $userPostalCode.empty();

        findEvent.getInput();
    });
};


// storing user inputs int o variables, checking the inputs are valid, then passing to ajax request function

findEvent.getInput = function() {
    const userPostalCode = $userPostalCode.val();
    const userSelectedGenre = $userSelectedGenre.val();
    const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    const postalCodeVerifer = regex.test(userPostalCode);
    
    if (!userPostalCode || !userSelectedGenre) {
        alert('Please input your choices!');
    } elseif (postalCodeVerifer === true); {
        findEvent.ajaxRequest(userPostalCode, userSelectedGenre);
    }
};

// ajax call to ticketmaster

findEvent.ajaxRequest = function (userPostalCode, userSelectedGenre) {
    const ajaxQueryUrl = 'https://app.ticketmaster.com/discovery/v2/';
    const apiKey = 'DJATvC5x8MlDZInGGwjbtu7Ad1TIA7YX';

}


//doc ready

$(function(){
    findEvent.init = function() {

    };
});