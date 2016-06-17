var country;
var city;
ip = "http://ip-api.com/json";
weather_url = "//api.openweathermap.org/data/2.5/weather?q=";
APPID = "&APPID=b09b50cdbcc229223ca2e0bee16b6289&units=metric";
F = false;
var tempC = 0;
var tempF = 0;
var getWeather = function(weatherRequest) {
  $.ajax({
    url: weatherRequest,
    type: 'GET',
    success: function(json) {
      weather = json.weather[0].main;
      id = json.weather[0].id;
      tempC = json.main.temp;
      tempF = tempC * 9 / 5 + 32;

      $("#tempC").html(tempC + "°C");
      $("#tempF").html(tempF + "°F");

      $("#weather").html(weather);
      $("#location").html(city + ", " + country);
      switch (weather) {
        case "Mist":
          $(".card__image").addClass("bgMist");
          break;
        case "Clear":
          $(".card__image").addClass("bgClear");
          break;
        case "Rain":
          $(".card__image").addClass("bgRain");
          break;
        case "Thunderstorm":
          $(".card__image").addClass("bgThunder");
          break;
        case "Drizzle":
          $(".card__image").addClass("bgDrizzle");
          break;
        case "Snow":
          $(".card__image").addClass("bgSnow");
          break;
        case "Atmosphere":
          $(".card__image").addClass("bgFog");
          break;
        case "Clouds":
          $(".card__image").addClass("bgClouds");
          break;
        case "Extreme":
          if (id >= 900 && id < 903) {
            $(".card__image").addClass("bgTornado");
          } else if (id === 903) {
            $(".card__image").addClass("bgSnowflake");
          } else if (id === 904) {
            $(".card__image").addClass("bgHeat");;
          } else if (id === 905) {
            $(".card__image").addClass("bgBigWind");
          } else {
            $(".card__image").addClass("bgHail");
          }
          break;
        case "Additional":
          $(".card__image").addClass("bgSun");
          break;
      }

    },
    error: function(err) {
      console.log("Request failed 2, error= " + err);
    }
  });

}
var getInfo = function(ipUrl, weatherUrl) {
  $.ajax({
    url: ipUrl,
    type: 'GET',
    success: function(json) {
      city = json.city;
      country = json.country;
      url2 = weatherUrl + city + APPID;
      getWeather(url2);
    },
    error: function(err) {
      console.log("Request failed 1, error= " + err);
    }
  });
}

getInfo(ip, weather_url);

function changeFormat(weatherRequest) {
  $.ajax({
    url: weatherRequest,
    type: 'GET',
    success: function(json) {
      F = !F;
      tempC = json.main.temp;
      tempF = tempC * 9 / 5 + 32;

      if (F === true) {
        $("#temp").html(tempF + "°F");
      } else if (F === false) {
        $("#temp").html(tempC + "°C");
      }
    }
  })
};

$(document).ready(function() {

  $(".showC").hide();
  $("#tempF").hide();
  $(".showF").click(function() {
    $("#tempC").hide();
    $(".showF").hide();
    $("#tempF").show();
    $(".showC").show();
  });
  $(".showC").click(function() {
    $("#tempF").hide();
    $(".showC").hide();
    $("#tempC").show();
    $(".showF").show();
  });
});