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


findEventApp.getEvent = function() {

    $('#userSelectionForm').on('submit', function(event) {
            event.preventDefault();
            findEventApp.eventCity = $('input[name="city"]:checked').val();
            console.log(findEventApp.eventCity);           
            findEventApp.classificationName = $('#preferredGenre').find(":selected").text();
            if(findEventApp.classificationName === `Random` || 
            findEventApp.classificationName === `Select`)
            {
                let randomGenre = Math.floor(Math.random() * genre.length);
                findEventApp.classificationName = genre[randomGenre];
            }
            console.log(findEventApp.classificationName);
            findEventApp.getEventApi();
            $('.header').hide();
            $('.main').show();
    });

    $('#resetButtonDiv').on('click','a', function(event) {
        console.log('I am Reset');
        $('.header').show();
        $('.main').hide();
        $('.wrapper').empty();
        $('input[name="city"]').prop('checked', false);
        $("#preferredGenre").val($("#preferredGenre option:first").val());
    });
  

}

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
    // $('.reset').show();
    for(i = 0; i < result._embedded.events.length; i++){
        // $('.wrapper').append(`<h4 class="name">${result._embedded.events[i].name}`);	
        console.log(result);
        let imgId = `image${i}`;
        console.log(imgId);
        let myImage = new Image();
        myImage.src = result._embedded.events[i].images[0].url;
        myImage.alt = `${result._embedded.events[i].name} image`
        myImage.className = `eventsImage`;
        // $('.wrapper').append(myImage);	
        console.log(result); 
        $('.wrapper').append(
        `<div id="eventsContainer${i}">
        <h4 class="name">${result._embedded.events[i].name}</h4>
        <div id ="eventsDescription${i}"><p>${result._embedded.events[0]._embedded.venues[0].name}</br>${result._embedded.events[0]._embedded.venues[0].address.line1}</br>${result._embedded.events[0]._embedded.venues[0].city.name}</br>${result._embedded.events[0]._embedded.venues[0].postalCode}</p></div>
        </div>`);
        console.log('my Div below');
        console.log(document.getElementById(`eventsContainer${i}`));
        document.getElementById(`eventsDescription${i}`).appendChild(myImage);
        document.getElementById(`eventsContainer${i}`).className=`eventsContainer`;
        document.getElementById(`eventsDescription${i}`).className=`eventsDescription`;
        // $('.wrapper').append(`<p class="dates">${result._embedded.events[i].name}`);	
        // console.log(result);
    }
    // $('.wrapper').append(
    //     `<div class="eventsDescription" id="resetButtonDiv"><a class="resetButton button" id="resetButton">Search again!</a></div>`);

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