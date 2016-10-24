'use strict';

//An array of objects representing a couple of music tracks
var songs = [{
    name: "Bohemian Rhapsody - Remastered 2011",
    album_image: "https://i.scdn.co/image/622b72a639157786783cffaccfcea7b306051225",
    preview_url: "https://p.scdn.co/mp3-preview/d5bc71c0bdc98b547a39aeba9538a7c6d33fc342",    
  }, {
    name: "Starman - 2012 Remastered Version",
    album_image: "https://i.scdn.co/image/9598d123dc969fc75835eba82b45b86748e58cbe",
    preview_url: "https://p.scdn.co/mp3-preview/61bef2960dfceea5c37dcb8d4d3e5ef77cb4e533",
  }, {
    name: "Nasty",
    album_image: "https://i.scdn.co/image/821ce8b515a40320fbfccd3c4ab31374327eaaac",
    preview_url: "https://p.scdn.co/mp3-preview/8f1e48f29b418c274ce96fd6ae0f6b5002aefe02",
  }];

var nowPlaying = new Audio();

/**
 * This function takes in an object representing a SINGLE music track
 * and displays it on the page.
 */
function renderTrack(track){

  //select the `.records` section that will contain the records
  //you could also do this before the function declaration
  var records = document.querySelector('.records');

  //create a new `img` element to visually represent the track
  var record = document.createElement('img');

  //set the image's `src` to be the track's `album_image`
  record.setAttribute('src',track.album.images[0].url);

  //always give images `alt` attributes! The `name` of the track will work fine
  record.setAttribute('alt',track.name);

  //attach the image element to the `.records` section
  records.appendChild(record);

  //add an event listener so that when the track is clicked on,
  //it starts to spin! (add the Font-Awesome utility class `fa-spin`)
  //
  //IMPORTANT: use the callback's `event` parameter and get the `target`
  //to change the element that was clicked on!
  //
  //Bonus: can you make the track stop spinning when clicked again?
  record.addEventListener('click', function(event){
    var whichRecord = event.target;

    //clicked the current song
    if(nowPlaying.src === track.preview_url){
      if(nowPlaying.paused){
        nowPlaying.play();
      } else {
        nowPlaying.pause();
      }
    }
    else { //something different
      nowPlaying.pause();
      nowPlaying = new Audio(track.preview_url);
      nowPlaying.play();
    }
    whichRecord.classList.toggle('fa-spin');
  })
} //end method

//call this function `forEach` element in the `songs` array!
//songs.forEach(renderTrack);

var form = document.querySelector('form');
var input = document.querySelector('#searchQuery');
form.addEventListener('submit', function(event){
  event.preventDefault();

  console.log("Submitted!");

  //do my thing
  var userInput = input.value;
  var url = 'https://api.spotify.com/v1/search?type=track&q='+userInput;
  console.log("fetching from", url);

  fetch(url)
    .then(function(response){
     var newPromise = response.json();
     return newPromise;
    })
    .then(function(data){
      console.log(data);
      data.tracks.items.forEach(renderTrack);
    })

  console.log('after fetch');

  return false;
});

