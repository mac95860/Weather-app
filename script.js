

//---------------------------------------display all weather info and create city list item --------------------------------------

function displayDate() {

    var date = moment().format('MMMM Do YYYY');
    var aCity = $("#citySearched").val();
    $("h2").text(aCity + " " + date);

}



//--------------------------------------display all weather info-------------------------------------------------------------------
function displayWeatherInfo() {

    $("button").on("click", function (event) {
        event.preventDefault();

        $(".cardHolder").empty();

        var input = $("#citySearched").val();
        var city = $("<li>")
                    .text(input)
                    .addClass("list-group-item")
                    .attr("data-name", input);
        
        $("ul").append(city);
        
        
        var APIKey = "0246ddd8e1c43f29cf72682d14088ce6";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=" + APIKey + "&units=imperial";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var lon = response.city.coord.lon;
            var lat = response.city.coord.lat;

            queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=0246ddd8e1c43f29cf72682d14088ce6&units=imperial";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);

                mainTemp = response.current.temp;
                todayTemp = $(".temp").text(mainTemp);
                windSpeed = $(".wind").text(response.current.wind_speed);
                var indexUV = $(".uvIndex").text(response.current.uvi);

                for (var i = 0; i < 5; i++) {
                    var temp = response.list[i].main.temp;

                    var iconCode = response.daily[i].weather.icon;
                    var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                    var weatherIcon = $("#icon").attr('src', iconUrl);

                    var newDiv = $("<div>").addClass("weatherCard");

                    var weekDay = response.daily[i].dt;
                    var weekDayDiv = $("<h5>").text(weekDay).appendTo(newDiv);

                    var iconDiv = $("<img>").attr('src', iconUrl).appendTo(newDiv);
                    var tempDiv = $("<p>").text(temp).appendTo(newDiv);

                    var weather = newDiv.appendTo(".cardHolder");
                }
            })
        });

    })

    displayDate();
}

displayWeatherInfo()

//------------------------------------------------display weather info for each city clicked on from list------------------------------
$(document).on("click", "data-name", displayWeatherInfo);





























