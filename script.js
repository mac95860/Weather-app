//-------------On click function----------------------
$("button").on("click", function (event) {
    event.preventDefault(event)
    var input = $("#citySearched").val();
    addToList(input);
    displayWeatherInfo(input);
    displayDate(input);
});

//-------------function displaying the date------------------------
function displayDate(input) {
    var date = moment().format('MMMM Do YYYY');
    $("h2").text(`${input} ${date}`);
};

function addToList(input) {
    var city = $("<li>")
    .text(input)
    .addClass("list-group-item")
    .attr("data-name", input);

    $(".list-group").append(city);
}

//-------------add city to list, call ajax to get------------------
function displayWeatherInfo(input) {

    $(".cardHolder").empty();

    var APIKey = "da856e33c208e368aea27f2610799369";
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${APIKey}units=imperial`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var mainTemp = response.current.temp;
        var todayTemp = $(".temp").text(mainTemp);
        var windSpeed = $(".wind").text(response.current.wind_speed);

        uvIndex(response.city.coord.lon, response.city.coord.lat);
        fiveDayForecatst(input);
    });
};

//--------------------------get five day forecast---------------------------------------------------

function fiveDayForecatst(input) {
    var APIKey = "da856e33c208e368aea27f2610799369";
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${APIKey}units=imperial`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 5; i < response.list.length; i += 6) {
            //---------------creates a card that will hold daily forecast info------------------
            var newDiv = $("<div>").addClass("weatherCard").appendTo(".cardHolder");

            //---------------creates a div to hold the weather image then retrieves the image--------
            var iconDiv = $("<img>").attr('src', iconUrl).appendTo(newDiv);
            var iconCode = response.daily[i].weather.icon;
            var iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

            //---------------creates a heading to hold the day of the week then retrieves date from API------------
            var weekDayDiv = $("<h5>").text(weekDay).appendTo(newDiv);
            var weekDay = response.daily[i].dt;

            //---------------creates a <p> that holds the temp then retrieves temp---------------------    
            var tempDiv = $("<p>").text(temp).appendTo(newDiv);
            var temp = `${response.list[i].main.temp}&deg;F`;
        };
    });
};

//----------------------------------get uv index------------------------------------------
function uvIndex(lon, lat) {

    queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0246ddd8e1c43f29cf72682d14088ce6&units=imperial`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var uv = $(".uvIndex").val(response.city.coord.value);
    });
}

//------------------------------------------------display weather info for each city clicked on from list------------------------------
$(".list-group").on("click", "li", function() {
    displayWeatherInfo($(this).text());
    displayDate($(this).text());
});




