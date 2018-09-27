// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .

setDaysNum();

$('button#actual-week').click(function() {
  if (typeof $(this).attr('disabled') == 'undefined') {
    callAPI();
  }
});

$('button#next-week').click(function() {
  if (typeof $(this).attr('disabled') == 'undefined') {
    callAPI(true);
  }
});

String.prototype.noAccent = function(){
  var accent = [
    /[\300-\306]/g, /[\340-\346]/g, // A, a
    /[\310-\313]/g, /[\350-\353]/g, // E, e
    /[\314-\317]/g, /[\354-\357]/g, // I, i
    /[\322-\330]/g, /[\362-\370]/g, // O, o
    /[\331-\334]/g, /[\371-\374]/g, // U, u
    /[\321]/g, /[\361]/g, // N, n
    /[\307]/g, /[\347]/g, // C, c
  ];
  var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

  var str = this;
  for(var i = 0; i < accent.length; i++){
    str = str.replace(accent[i], noaccent[i]);
  }

  return str;
}

function findStringBetween(elem, bbTagStart, bbTagClose){
  var tag = bbTagStart;

  function impliedEndTag(tag){
    var impliedEnd = tag.replace(tag.substring(0,1),tag.substring(0,1) + '/');
    return impliedEnd;
  }

  var endTag = bbTagClose || impliedEndTag(tag);
  var divString = $(elem).text().trim();

  if (divString.indexOf(tag) != -1){
    var elemInfo = [];
    elemInfo.imgString = divString.substring(divString.indexOf(tag) + tag.length,divString.indexOf(endTag));
    elemInfo.text = divString.replace(tag + elemInfo.imgString + endTag, '');
    return elemInfo;
  } else {
    return false;
  }
}

function monthString(num, iso_format = false) {
  switch (num) {
    case "01": return iso_format ? "JAN" : "janvier";
    case "02": return iso_format ? "FEB" : "fÃ©vrier";
    case "03": return iso_format ? "MAR" : "mars";
    case "04": return iso_format ? "APR" : "avril";
    case "05": return iso_format ? "MAY" : "mai";
    case "06": return iso_format ? "JUN" : "juin";
    case "07": return iso_format ? "JUL" : "juillet";
    case "08": return iso_format ? "AUG" : "aoÃ»t";
    case "09": return iso_format ? "SEP" : "septembre";
    case "10": return iso_format ? "OCT" : "octobre";
    case "11": return iso_format ? "NOV" : "novembre";
    case "12": return iso_format ? "DEC" : "dÃ©cembre";
  }
}

function dayString(num) {
  switch (num) {
    case 1: return "Lundi";
    case 2: return "Mardi";
    case 3: return "Mercredi";
    case 4: return "Jeudi";
    case 5: return "Vendredi";
    case 6: return "Samedi";
    case 0: return "Dimanche";
  }
}

function setDaysNum(next_week = false) {
  var today = new Date();
  var first = today.getDate() - today.getDay() + 1 + (next_week == true ? 7 : 0) + (today.getDay() == 0 ? -7 : 0);

  for (var i = 0; i < 7; i++) {
    var startDate = new Date(new Date(new Date().setDate(++first)).setHours(0, 0, 0, 0)).toISOString();
    var date = startDate.split("T")[0].split("-");
    var startDay = date[2];
    var startDayWeek = dayString(new Date(monthString(date[1], true) + " " + startDay + ", " + date[0] + " 00:00:00").getDay());

    $("[data-day='" + startDayWeek + "'] .calendar-header .calendar-date").text(startDayWeek + " " + startDay.replace(/^0/, ''));
  }

  if (next_week == false) {
    $('[data-day=' + dayString(new Date().getDay()) + ']').addClass('today');
  }
}

function loadClient() {
  gapi.client.init({
    apiKey: 'AIzaSyBbM6oTr1WTfCyuVvGdn3Ay1EnFamSevEY'
  }).then(function() {
    gapi.auth.authorize({
      client_id: '863781341059-834vcjo0f62ps2ta7pdacd443d0uu4fu.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      immediate: true
    }, function (result) { });

    callAPI();
  });
}

function callAPI(next_week = false) {
  var searchInput = $('#calendar-search-input');
  $('.calendar-loader').fadeIn(0);
  $('.calendar-element').remove();
  searchInput.attr('disabled', true);
  $('.calendar-col.today').removeClass('today');
  $('button#actual-week').attr('disabled', true);
  $('button#next-week').attr('disabled', true);
  setDaysNum(next_week);

  var today = new Date(new Date().setHours(0, 0, 0, 0));
  var first = today.getDate() - today.getDay() + 1 + (next_week == true ? 7 : 0) + (today.getDay() == 0 ? -7 : 0);
  var last = first + 7;
  gapi.client.load('calendar', 'v3', function () {
    var request = gapi.client.calendar.events.list({
      'calendarId' : 'corp.webedia.fr_u59igp33kth0loa8sthic88k48@group.calendar.google.com',
      'timeZone' : 'Paris',
      'singleEvents': true,
      'timeMin': new Date(new Date(new Date().setDate(first)).setHours(8, 0, 0, 0)).toISOString(),
      'timeMax': new Date(new Date(new Date().setDate(last)).setHours(8, 0, 0, 0)).toISOString(),
      'orderBy': 'startTime'
    });

    request.execute(function (resp) {
      var obj = new Object(),
        events = [],
        event = [],
        prevDayWeek = null,
        counter = 0;

      for (var i = 0; i < resp.items.length; i++) {
        var item = resp.items[i];
        var titre = typeof(item.summary) !== 'undefined' ? item.summary : '?';
        var description = typeof(item.description) !== 'undefined' ? item.description : "";
        var startDate = item.start.dateTime;
        var endDate = item.end.dateTime;
        var dateTime = startDate.split("T");
        var date = dateTime[0].split("-");
        var startDay = date[2];
        var startDayWeek = dayString(new Date(monthString(date[1], true) + " " + startDay + ", " + date[0] + " 00:00:00").getDay());

        var startTime = dateTime[1].split(":");
        var startHour = startTime[0];
        var startMin = startTime[1];

        if (startHour <= 8) {
          startDayWeek = dayString(new Date(monthString(date[1], true) + " " + startDay + ", " + date[0] + " 00:00:00").getDay() - 1);
        }

        if (prevDayWeek !== startDayWeek) {
          if (prevDayWeek != null) {
            obj[prevDayWeek].events = events;
          }

          prevDayWeek = startDayWeek;
          obj[startDayWeek] = new Object();
          events = [];
          obj[startDayWeek].date = startDay + " " + monthString(date[1]);
        }

        event = {};

        var endTime = endDate.split("T")[1].split(":");
        var endHour = endTime[0];
        var endMin = endTime[1];

        var customColorTitle = "NULL";

        if (customColorTitle != "NULL") {
          titre = titre.replace(/<<.*>>/, '');
        }

        var customColor = "NULL";
        findString = findStringBetween(description, "<<", ">>");
        customColor = findString.imgString;
        description = findString.text;

        event.summary = titre;
        event.startHour = startHour + ":" + startMin;
        event.endHour = endHour + ":" + endMin;
        event.description = description;
        event.timestamp_start = new Date(startDate).getTime();
        event.timestamp_end = new Date(endDate).getTime();
        event.color = customColor != false ? customColor : "NULL";
        event.colortitle = customColorTitle != false ? customColorTitle : "NULL";

        events.push(event);

        if (i + 1 == resp.items.length) {
          obj[startDayWeek].events = events;
        }
      }

      var diminutifs = [ [ "CodJordan23", "Trinity", "Zankioh", "Skyyart", "Jiraya", "Gotaga", "Zouloux", "Maxildan", "Broken", "Mickalow" ],
        [ "Yann", "Trin", "Zank", "Sky", "Jiji", "Gota", "Zoul", "Max", "Brok", "Micka" ] ];

      var data = {},
        element = null;
      $.each(obj, function(key) {
        element = $("[data-day='" + key + "'] .calendar-content");

        $.each(obj[key].events, function(key2) {
          data = {};
          $.each(obj[key].events[key2], function(key3, value) {
            data[key3] = value;
          });

          var participants = data["summary"].split(" - ")[1];

          if (typeof participants != 'undefined') {
            for (var i = 0; i < diminutifs[0].length; i++) {
              if (participants.indexOf(diminutifs[0][i]) !== -1 || participants.indexOf(diminutifs[1][i]) === -1)
                continue;

              if (diminutifs[0][i].indexOf(diminutifs[1][i]) === -1) {
                participants = participants + " " + diminutifs[0][i];
              } else {
                participants = participants.replace(diminutifs[1][i], diminutifs[0][i]);
              }
            }
          }

          data["summary"] = data["summary"].split(" - ")[0] + " - " + participants;

          element.append('<div class="calendar-element tooltip" data-demi="0" data-start="' + data["startHour"] + '" data-end="' + data["endHour"] + '" data-summary="' + data["summary"].split(" - ")[0] + '" data-title="' + data["summary"] + '" data-timestamp-start="' + data["timestamp_start"] + '" data-timestamp-end="' + data["timestamp_end"] + '" data-color-title="' + data["colortitle"] + '" data-color="' + data["color"] + '" title="<center>' + data["summary"].split(" - ")[0] + ' de ' + data["startHour"] + ' Ã  ' + data["endHour"] + '</center>' + (typeof data["description"] != 'undefined' ? "<span class='description'>" + data["description"] + "</span>" : "") + '"></div>');
        });
      });

      var lastEndTime = 0;
      var lastElement = null;
      $('.calendar-element').each(function() {
        var startHour = $(this).data("start"),
          endHour = $(this).data("end"),
          startTime = $(this).data("timestamp-start"),
          endTime = $(this).data("timestamp-end"),
          summary = $(this).data("summary"),
          color = $(this).data("color"),
          colortitle = $(this).data("colortitle");

        var splitString = null,
          totalDuration = 0.0,
          number = 0.0;

        startSplit = startHour.split(":");
        endSplit = endHour.split(":");

        number = parseFloat(endSplit[0]) - parseFloat(startSplit[0]);
        if (number < 0.0) {
          number += 24.0;
        }
        number *= 60.0;

        totalDuration += number;

        number = parseFloat(endSplit[1]) - parseFloat(startSplit[1]);

        totalDuration += number;
        totalDuration /= 60.0;

        if (parseFloat(startSplit[0]) <= 8) {
          startSplit[0] = new String((parseFloat(startSplit[0]) + 24.0));
        }

        var totalTop = (100 / 16 * (parseFloat(startSplit[0]) + parseFloat(startSplit[1]) / 60 - 11));
        var totalHeight = (100.0 - (totalDuration / 16.0 * 100.0)) - (totalTop < 0.0 ? totalTop : 0.0);

        if (totalTop < 0.0) {
          totalTop = 0.0;
        }

        if (100.0 - totalHeight > 100.0 - totalTop) {
          totalHeight = totalTop;
        }

        $(this).css("height", "calc(100% - " + totalHeight + "%)");
        $(this).css("top", totalTop + "%");

        if (color != "NULL") {
          $(this).css("background", "#" + color);
        }

        if (colortitle != "NULL") {
          $(this).find("p").css("color", "#" + colortitle);
        }

        $(this).append("<p>" + summary.split(" - ")[0] + "</p>");

        var timestamp = new Date().getTime();
        if (endTime < timestamp) {
          $(this).addClass("done");
        } else if (startTime < timestamp && timestamp < endTime) {
          $(this).addClass("live");
        }

        if (lastElement != null && startTime < lastEndTime) {
          $(this).css("width", "50%");
          lastElement.css("width", "50%");
          if (endTime <= lastEndTime) {
            $(this).css("right", "0");
          }
        }

        lastEndTime = (endTime > lastEndTime ? endTime : lastEndTime);
        lastElement = $(this);
      });

      $(".calendar-loader").fadeOut(150);

      $('.tooltip').tooltipster({
        animation: 'grow',
        delay: 0,
        theme: 'tooltipster-punk',
        trigger: 'custom',
        contentAsHTML: true,
        maxWidth: 330,
        triggerOpen: { click: 0, mouseenter: 1, tap: 1, touchstart: 0 },
        triggerClose: { click: 0, mouseleave: 1, originClick: 0, scroll: 0, tap: 1, touchleave: 0 }
      });

      var searchString = searchInput.val().toLowerCase().noAccent();
      var dataTitle;

      $(".calendar-element").each(function() {
        dataTitle = $(this).data("title").toLowerCase().noAccent();
        $(this).css("opacity", searchString == "" || dataTitle.indexOf(searchString) >= 0 ? (searchString != "" && dataTitle.indexOf(searchString) >= 0 && $(this).hasClass("done") ? 0.5 : '') : 0.15);
        $(this).css("pointer-events", searchString == "" || dataTitle.indexOf(searchString) >= 0 ? '' : 'none');
      });
      searchInput.on('input', function() {
        $(".calendar-element").each(function() {
          searchString = searchInput.val().toLowerCase().noAccent();
          dataTitle = $(this).data("title").toLowerCase().noAccent();
          $(this).css("opacity", searchString == "" || dataTitle.indexOf(searchString) >= 0 ? (searchString != "" && dataTitle.indexOf(searchString) >= 0 && $(this).hasClass("done") ? 0.5 : '') : 0.15);
          $(this).css("pointer-events", searchString == "" || dataTitle.indexOf(searchString) >= 0 ? '' : 'none');
        });
      });
      searchInput.attr('disabled', false);

      if (next_week == false) {
        $('button#actual-week').attr('disabled', true);
        $('button#next-week').attr('disabled', false);
      } else {
        $('button#actual-week').attr('disabled', false);
        $('button#next-week').attr('disabled', true);
      }
    });
  });
}

$(document)
  .ready(function() {

    // fix menu when passed
    $('.masthead')
      .visibility({
        once: false,
        onBottomPassed: function() {
          $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function() {
          $('.fixed.menu').transition('fade out');
        }
      })
    ;

    // create sidebar and attach to menu open
    $('.ui.sidebar')
      .sidebar('attach events', '.toc.item')
    ;

    $('.ui.accordion')
      .accordion()
    ;

    $('.tabular.menu .item')
      .tab()
    ;

  })
;

