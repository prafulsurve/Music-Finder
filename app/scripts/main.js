(function(window) {
  var year = [1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2017];
  var genre = ['Blues', 'Rock', 'Jazz', 'Electronic', 'Punk', 'Metal', 'Pop', '"Hip Hop"', 'Folk', 'R&B/soul'];

  var g  = "Rock"
  var y = 1970

  $(document).ready(function() {
    $('.labelyear').text('Year: ' + y);
    $('.labelgenre').text('Genre: ' + g);
    queryChanges(y, g);
  });

  $("#slider1").roundSlider({
      radius: 200,
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
      radius: 200,
      width: 2,
      value: "1,40",
      circleShape: "half-right",
      handleSize: "+16",
      handleShape: "dot",
      showTooltip: false,
      min: 0,
      max: 9,
      value: 1
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
    var querystring = 'https://api.spotify.com/v1/search?q=genre:'+ genre +'%20year:' + year + '-' + (year+9) + '&offset=0&limit=50&type=track';
    $.ajax({
        url: querystring,
        success: onRetrieval,
    });
  }

  function setDivImage(u) {
    $('.rs-inner').css('background-image', "url(" + u + ")");
  }

  function onRetrieval(json) {
    console.log(json);
    json.tracks.items.forEach(function (data) {
      //$('.jsondata').text($('.jsondata').text() + ' ' + data.name);
    });
    setDivImage(json.tracks.items[Math.round(Math.random() * json.tracks.items.length)].album.images[0].url);
  }

})(window);
