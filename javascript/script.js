//PSEUDOCODE///
///1. Get the document ready and initialize tha app called findEventApp in it.
//2. After initializing the app, call the function to getEvent.
///3. User selects the radio button and option from dropdown , and hits submit. Save the selected values in variables and call the getEventApi function now. Hide the header and show the main on submit.
////4..Make the ajax call, with city, classificationName(genres), size(default images to be shown on the screen is 20) and source(eg ticketmaster) as parameters.
//5.Store the data received from the ajax call in displayEvent.
///6.MAke a for loop so as to add more events in future. Append everything on the wrapper class. It will append name of event, image of event, venue of event of date of event ofcourse.
//7. Reset the app and show the header and hide the main


const findEventApp = {};
const genre = [`Sports`,`Music`,`Arts & Theatre`];//Array to select Random Event

//Function to handle click events and call API
findEventApp.getEvent = function() {
    $('#userSelectionForm').on('submit', function(event) {
        event.preventDefault();
        findEventApp.eventCity = $('input[name="city"]:checked').val();
        findEventApp.classificationName = $('#preferredGenre').find(":selected").text();
        //Find a random event if nothing is selected or if Random is selected
        if(findEventApp.classificationName === `Random` || 
        findEventApp.classificationName === `Select`)
        {
            let randomGenre = Math.floor(Math.random() * genre.length);
            findEventApp.classificationName = genre[randomGenre];
        }
        findEventApp.getEventApi(); //Call Ticketmaster API.
        $('.header').hide();
        $('.main').show();
    });

    //Handle Search Again button click. Reset all options
    $('#resetButtonDiv').on('click','a', function(event) {
        $('.header').show();
        $('.main').hide();
        $('.wrapper').empty();
        $('input[name="city"]').prop('checked', false);
        $("#preferredGenre").val($("#preferredGenre option:first").val());
    });
}

//Set up the Base URL & API Key
findEventApp.baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json`;
findEventApp.apiKey = `fWG7RNp1homyItX8mZznhhwWgxC3upVy`;

//Function declaration to call Ticketmaster API
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
        console.log('Error in API Call')
    );
}

//Function to show API results on the UI.
findEventApp.displayEvent = function(result){
    for(i = 0; i < result._embedded.events.length; i++){
        let imgId = `image${i}`;
        let myImage = new Image();
        myImage.src = result._embedded.events[i].images[0].url;
        myImage.alt = `${result._embedded.events[i].name} image`
        myImage.className = `eventsImage`;
        $('.wrapper').append(
        `<div id="eventsContainer${i}">
        <h4 class="name">${result._embedded.events[i].name}</h4>
        <div id ="eventsDescription${i}">
        <p>${result._embedded.events[0]._embedded.venues[0].name}</br>${result._embedded.events[0]._embedded.venues[0].address.line1}</br>${result._embedded.events[0]._embedded.venues[0].city.name}</br>${result._embedded.events[0]._embedded.venues[0].postalCode}</p>
        </div>
        </div>`);
        document.getElementById(`eventsDescription${i}`).appendChild(myImage);
        document.getElementById(`eventsContainer${i}`).className=`eventsContainer`;
        document.getElementById(`eventsDescription${i}`).className=`eventsDescription`;
    }
}

///init function
findEventApp.init = function(){
    findEventApp.getEvent();
}

//document ready
$(document).ready(function(){
    findEventApp.init();
})////document ready ends here