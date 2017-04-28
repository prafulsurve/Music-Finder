(function(window) {
  var year = [1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2017];
  var genre = ['Rock', 'Blues', 'Jazz', 'Electronic', 'Punk', 'Indie', 'Pop', 'Hip Hop', 'Folk', 'Dance'];
  var g  = "Punk"
  var y = 1970

  $("#slider1").roundSlider({
      radius: 130,
      width: 2,
      circleShape: "half-left",
      handleSize: "+16",
      handleShape: "dot",
      showTooltip: false,
      min: 0,
      max: 9,
      value: 4,
  });

  $("#slider2").roundSlider({
      radius: 130,
      width: 2,
      circleShape: "half-right",
      handleSize: "+16",
      handleShape: "dot",
      showTooltip: false,
      min: 0,
      max: 9,
      value: 4
  });

  $('#slider1').on('change', function (e) {
    y = year[e.value];
    $('.labelyear').text('Year: ' + y);
    console.log(g,y);
    queryChanges(y, g);
  });

  $('#slider2').on('change', function (e) {
    g = genre[e.value];
    $('.labelgenre').text('Genre: ' + g);
    console.log(g,y);
    queryChanges(y, g);
  });

  function queryChanges(year, genre) {
    var querystring = 'https://api.spotify.com/v1/search?q=genre:'+ genre +'%20year:' + year + '&offset=0&limit=50&type=track';
    $.ajax({
        url: querystring,
        success: onRetrieval,
    });
  }

  function onRetrieval(json) {
    console.log(json);
    json.tracks.items.forEach(function (data) {
      $('.jsondata').text($('.jsondata').text() + ' ' + data.name);
    });
  }

})(window);
