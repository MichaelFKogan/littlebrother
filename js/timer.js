var clock;
var stamp1;
var stamp2;
var clockIn;
var clockOut;
var totalTime;
clockedIn = false;
var formattedDate1;
var formattedDate2;
var formattedTime;

$(document).ready(function() {
    // var scrollorama = $.scrollorama({ blocks:'.scrollblock' });

    clock = $('.clock').FlipClock({
      clockFace: 'HourlyCounter',
      autoStart: false,
      callbacks: {
        start: function() {
          $('.message').html('The clock has started!');
        },
        stop: function() {
          $('.message').html('The clock has stopped!');
        }
      }
    });

    $('.clockIn').click(function(e) {
      if (clockedIn == false) {
      clock.start();
      stamp1 = (moment()._d);
      clockIn = moment().format('X');
      var unixTimeStamp = (clockIn);
      var timestampInMilliSeconds = unixTimeStamp*1000;
      var date = new Date(timestampInMilliSeconds);
      var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
      var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);        var year = date.getFullYear();
      var hours = ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12);
      var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      var meridiem = (date.getHours() >= 12) ? 'pm' : 'am';
      formattedDate1 = day + '-' + month + '-' + year + ' at ' + hours + ':' + minutes + ' ' + meridiem;
      $('#punchin >tbody').append("<tr><td>" + stamp1 + "</td></tr>");
      $('#total').hide();
      clockedIn = true;
      // database.ref().push({
      //            clockIn: formattedDate1,  
      //            clockOut: formattedDate2,
      //            totalTime: formattedTime
      //           });
      } else {
        $('.message').html("You're already clocked in!");
      }
    });

    $('.clockOut').click(function(e) {
      if (clockedIn == true) {
      clock.stop();
      stamp2 = (moment()._d);
      clockOut = moment().format('X');
      var unixTimeStamp = (clockOut);
      var timestampInMilliSeconds = unixTimeStamp*1000;
      var date = new Date(timestampInMilliSeconds);
      var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
      var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);        var year = date.getFullYear();
      var hours2 = ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12);
      var minutes2 = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
      var meridiem = (date.getHours() >= 12) ? 'pm' : 'am';
      formattedDate2 = day + '-' + month + '-' + year + ' at ' + hours2 + ':' + minutes2 + ' ' + meridiem;
      $('#punchout >tbody').append("<tr><td>" + stamp2 + "</td></tr>");
      var totalSeconds = clock.getTime().time;
      //console.log("total seconds: " + totalSeconds);
      
      hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      minutes = Math.floor(totalSeconds / 60);
      seconds = totalSeconds % 60;
      formattedTime = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
      // var formattedTime = hours + ':' + minutes + ':' + seconds;
      //console.log(formattedTime);
      //$('#total').show().text(formattedTime);
      clockedIn = false;
      //may need to be added to other people's code
           		// database.ref('userInfo').set({
             //     name: name,
             //     address: address,
             //     clockIn: formattedDate1,  
             //     clockOut: formattedDate2,
             //     totalTime: formattedTime,
             //     positionLat: pos.lat,
             //     positionLng: pos.lng
             //    });


      } else {
        $('.message').html("You're not clocked in!");
      }
    });
    
    

});