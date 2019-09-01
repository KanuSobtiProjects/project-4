//PSEUDOCODE///
///1. Get the document ready and initialize tha app called findEventApp in it.
//2. After initializing the app, call the function to getEvent.
///3. User selects the radio button and option from dropdown , and hits submit. Save the selected values in variables and call the getEventApi function now. Hide the header and show the main on submit.
////4..Make the ajax call, with city, classificationName(genres), size(default images to be shown on the screen is 20) and source(eg ticketmaster) as parameters.
//5.Store the data received from the ajax call in displayEvent.
///6.MAke a for loop so as to add more events in future. Append everything on the wrapper class. It will append name of event, image of event, venue of event of date of event ofcourse.
//7. Reset the app and show the header and hide the main


const findEventApp = {};
// let preferredGenre = Sports;//Default value
// let city = ["Toronto", "Vancouver", "Montreal" , "Calgary"]
// let classificationName = ["Sports", "Music", "Arts"]


// init function

// findEventApp.init = function() {
//     findEventApp.userInput();
//     findEventApp.resetInput(); 
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
    }).fail(
        console.log('sorry')
    );

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
        $('.wrapper').append(
        `<p class="venues">${result._embedded.events[0]._embedded.venues[0].name}</p>
        <p>${result._embedded.events[0]._embedded.venues[0].address.line1}</p>
        <p>${result._embedded.events[0]._embedded.venues[0].city.name}</p>
        <p>${result._embedded.events[0]._embedded.venues[0].postalCode}</p>`);
        // $('.wrapper').append(`<p class="dates">${result._embedded.events[i].name}`);	
        // console.log(result);


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