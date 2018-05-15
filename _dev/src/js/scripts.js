var header = $('.site-header');

$(function() {
    header.headroom({
        "tolerance": 5,
        "offset": 40,
        "classes": {
            "initial": "animated",
            "pinned": "slideDown",
            "unpinned": "slideUp",
            "top": "headroom--top",
            "notTop": "headroom--not-top"
        }
    });
});

// Smooth page scroll to an anchor on the same page
$(function() {
    $('a[href*="#"]:not([href="#"]):not([--toggle="collapse"]):not([data-toggle="dropdown"]):not([data-toggle="reveal"]):not([data-toggle="tooltip"]):not(.quote-link)').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        } else {
          // Link to id on the target page
          window.location.href = this.pathname + this.hash;
        }
    });

    if (window.location.hash) {
      var target = $(window.location.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }

    $('[data-toggle="tooltip"]').tooltip({html: true}).click(function(event) {
      event.preventDefault();
    });
});

$('.dropdown-toggle').dropdown();
$('#about-dropdown .dropdown-item').click(function() {
  $(this).parent().dropdown('toggle');
});

// Animate on scroll
AOS.init({
  offset: 200
});

// animate circle dots image on page scroll
$(window).scroll(function() {
  var theta = $(window).scrollTop() / 75 % Math.PI;
  $('#circle-dots-img').css({ transform: 'rotate(' + theta + 'rad)' });

  var distanceFromTop = $(window).scrollTop();
  if (distanceFromTop >= 1000) {
    $('#backToTop').addClass('show');
  }
  if (distanceFromTop < 1000) {
    $('#backToTop').removeClass('show');
  }
});

// new WOW({
//   mobile: false
// }).init();

$('.custom-select').select2();

var $mcForm = $('#email-form');

$mcForm.ajaxChimp({
  url: $mcForm.attr('action'),
  callback: callbackFunction
});

function callbackFunction (resp) {
    if (resp.result === 'success') {
      // console.log('success');
      $mcForm.fadeOut();
      $('#email-success').fadeIn();
      // set cookie to subscribed
      Cookies.set('newsletterOptin', 'subscribed', { expires: 365 });
    } else if (resp.result === 'error') {
      $('#email-form .form-group').addClass('has-warning');
      if (resp.msg.indexOf("is already subscribed") >= 0) {
        // console.log('already subscribed');
        $('#email-form .form-control-feedback').text("Looks like you're already subscribed.");
      } else if (resp.msg.indexOf("Please enter a value") >= 0) {
        // console.log('no email address');
        $('#email-form .form-control-feedback').text('Please enter an email address.');
      } else if (resp.msg.indexOf("Too many subscribe attempts") >= 0) {
        // console.log('too many attempts');
        $('#email-form .form-control-feedback').text('Please wait 5 mintutes and try again.');
      } else if (resp.msg.indexOf("must contain a single @") >= 0 || resp.msg.indexOf("domain portion of the email address is invalid") >= 0) {
        // console.log('invalid email address');
        $('#email-form .form-control-feedback').text('Please enter a valid email address.');
      } else {
        console.log(resp);
        $('#email-form .form-control-feedback').text('Oops. Not sure what went wrong. Please try again soon.');
      }
    }
}

var $mcFormFooter = $('#email-form-footer');

$mcFormFooter.ajaxChimp({
  url: $mcFormFooter.attr('action'),
  callback: callbackFunctionFooter
});

function callbackFunctionFooter (resp) {
    if (resp.result === 'success') {
      // console.log('success');
      $mcFormFooter.fadeOut();
      $('#email-success-footer').fadeIn();
      // set cookie to subscribed
      Cookies.set('newsletterOptin', 'subscribed', { expires: 365 });
    } else if (resp.result === 'error') {
      $('#email-form-footer .form-group').addClass('has-warning');
      if (resp.msg.indexOf("is already subscribed") >= 0) {
        // console.log('already subscribed');
        $('#email-form-footer .form-control-feedback').text("Looks like you're already subscribed.");
      } else if (resp.msg.indexOf("Please enter a value") >= 0) {
        // console.log('no email address');
        $('#email-form-footer .form-control-feedback').text('Please enter an email address.');
      } else if (resp.msg.indexOf("Too many subscribe attempts") >= 0) {
        // console.log('too many attempts');
        $('#email-form-footer .form-control-feedback').text('Please wait 5 mintutes and try again.');
      } else if (resp.msg.indexOf("must contain a single @") >= 0 || resp.msg.indexOf("domain portion of the email address is invalid") >= 0) {
        // console.log('invalid email address');
        $('#email-form-footer .form-control-feedback').text('Please enter a valid email address.');
      } else {
        console.log(resp);
        $('#email-form-footer .form-control-feedback').text('Oops. Not sure what went wrong. Please try again soon.');
      }
    }
}

$(function() {
    var bLazy = new Blazy({
        success: function(element) {
            setTimeout(function() {
                var parent = element.parentNode;
                parent.className = parent.className.replace(/\bloading\b/,'');
            }, 200);
        }
    });

    // Add plus and minus symbols to accordion tabs
    $('#accordion .card-header a').append('<i class="fa fa-plus" aria-hidden="true"></i><i class="fa fa-minus" aria-hidden="true"></i>');
});


$('.toggle-languages').click(function(event) {
  event.preventDefault();
  // $('.language-sidebar').toggleClass('show');
  $('.language-select').toggleClass('show');
});

$('[data-toggle="reveal"]').click(function(event) {
  var container = $('#quickLinks');
  var card = $('#quickLinks .card');
  var target = $(this).attr('href');
  event.preventDefault();
  if ( !card.hasClass('show') ) {
    card.addClass('show').fadeIn();
  }
  $('.reveal').removeClass('show');
  $(target).addClass('show');

  var height = $(target).outerHeight();
  card.css('height', height);

  console.log(height);
});

// Toggle active class for hamburgers
$('.hamburger').click(function() {
    $(this).toggleClass('is-active');
    $('#mobile-nav').toggleClass('visible');
});

// Move navbar contents to different container on mobile
var navbarContents = $('#navContents');
enquire.register("screen and (max-width:991px)", {
    match: function() {
        $(navbarContents).appendTo('#mobile-nav');
    },
    unmatch: function() {
        $(navbarContents).appendTo('#navContainer');
    }
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
/*
$.ajax({
  url: 'https://aayanl.tech/insight-api/status',
  dataType: 'json',
  success: function(data) {
    $('#currentBlock').text(numberWithCommas(data.info.blocks));
    $('#blockLine').fadeIn();
  }
})
*/

if ( document.getElementById("nodeCount") ) {
  $.ajax({
    url: 'https://securenodes.zensystem.io/api/srvstats',
    dataType: 'json',
    success: function(data) {
      var nodeValue = data.global.total;
      if ( $.isNumeric(nodeValue) ) {
        var nodes = numberWithCommas(nodeValue);
        $('#nodeCount').text(nodes);
        $('#secureNodes .stats-data').text(nodes);
      }
    }
  });
}

if ( document.getElementById("circSupply") ) {
  $.ajax({
    url: 'https://explorer.zensystem.io/insight-api-zen/status?q=getTotalSupply',
    dataType: 'json',
    success: function(data) {
      if ( $.isNumeric(data.supply) ) {
        var supply = numberWithCommas( Math.ceil(data.supply) );
        $('#circSupply .stats-data').text(supply);
      }
    }
  });
}

// Update wallet links

if ( window.location.pathname === '/wallets/') {
  $.ajax({
    url: 'https://api.github.com/repos/ZencashOfficial/arizen/releases/latest',
    dataType: 'json',
    success: function(data) {
      var assets = data.assets;
      var downloadLinks = {};
      for (var i = 0; i < assets.length; i++) {
        if ( assets[i].name.indexOf(".exe") > -1 ) {
          downloadLinks.windows = "https://github.com/ZencashOfficial/arizen/releases/download/" + data.name + "/" + assets[i].name;
        } else if ( assets[i].name.indexOf(".dmg") > -1 ) {
          downloadLinks.mac = "https://github.com/ZencashOfficial/arizen/releases/download/" + data.name + "/" + assets[i].name;
        } else if ( assets[i].name.indexOf(".AppImage") > -1 ) {
          downloadLinks.linux = "https://github.com/ZencashOfficial/arizen/releases/download/" + data.name + "/" + assets[i].name;
        }
      }
      $('#arizenWindowsLink').attr('href', downloadLinks.windows);
      $('#arizenMacLink').attr('href', downloadLinks.mac);
      $('#arizenLinuxLink').attr('href', downloadLinks.linux);
    }
  });
  // Starting to look into updating Swing urls as well
  // $.ajax({
  //   url: 'https://api.github.com/repos/ZencashOfficial/zencash-swing-wallet-ui/releases',
  //   dataType: 'json',
  //   success: function(data) {
  //     console.log(data);
  //
  //     for (var i=0; i < data.length; i++) {
  //       if ( data[i].name.indexOf("Windows") > -1 ) {
  //         console.log( data[i].name );
  //       } else if ( data[i].name.indexOf("Linux") > -1 ) {
  //         console.log( data[i].name );
  //       }
  //     }
  //
  //   }
  // });
}



// CORS error
// if ( document.getElementById("currentPrice") ) {
//   $.ajax({
//     url: 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-zen',
//     dataType: 'json',
//     success: function(data) {
//       console.log(data)
//       // if ( $.isNumeric(data.supply) ) {
//       //   var supply = numberWithCommas( Math.ceil(data.supply) );
//       //   $('#circSupply .stats-data').text(supply);
//       // }
//
//       // Get Bitcoin price in USD
//
//     }
//   });
// }
//
// $.ajax({
//   url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
//   dataType: 'json',
//   success: function(data) {
//     console.log('One BTC is worth $' + data.bpi.USD.rate + ' USD')
//     // if ( $.isNumeric(data.supply) ) {
//     //   var supply = numberWithCommas( Math.ceil(data.supply) );
//     //   $('#circSupply .stats-data').text(supply);
//     // }
//   }
// });
//
//
// // CORS error
// $.ajax({
//   url: 'https://miningpoollists.com/zencash/data.php',
//   dataType: 'json',
//   success: function(data) {
//     console.log(data)
//     // if ( $.isNumeric(data.supply) ) {
//     //   var supply = numberWithCommas( Math.ceil(data.supply) );
//     //   $('#circSupply .stats-data').text(supply);
//     // }
//   }
// });







if ( document.getElementById("blogPosts") && document.getElementById("template-blog-post") ) {
  var listTemplate = document.getElementById("template-blog-post");
  var templateHtml = listTemplate.innerHTML;
  var categoryObject;
  var dataObject;

  // get the categories and posts
  $.ajax({
    type: "GET",
    url: "https://blog.zencash.com/wp-json/wp/v2/categories",
    dataType: "json",
    data: {
      per_page: 50
    },
    success: function(dataJSON) {
      categoryObject = dataJSON;
      var cleanCategories = {};
      $.each(categoryObject, function( index, value ) {
        cleanCategories[value.id] = value.name;
      });
      categoryObject = cleanCategories;
      // get the posts
      $.ajax({
        type: "GET",
        url: "https://blog.zencash.com/wp-json/wp/v2/posts",
        dataType: "json",
        data: {
          // categories_include: [1, 33, 39, 48, 56, 57, 63, 72, 73],
          categories_exclude: [52, 66, 67, 89, 95, 119, 120, 121, 122],
          _embed: true
        },
        success: function(dataJSON) {
          dataObject = dataJSON;
          // update categories with the name instead of id
          $.each(dataObject, function( index, value ) {
            var categories = value.categories;
            var cleanCategories = [];
            $.each(categories, function( index, value ) {
              cleanCategories.push( categoryObject[value] );
            })
            dataObject[index].categories = cleanCategories
          });
          // build out the posts
          document.getElementById("blogPosts").innerHTML = listCreateHtml(dataJSON);
        }
      });

    }
  });


}

// Function to generate and returns the HTML.
// Accepts an object as a parameter
function listCreateHtml(dataObject) {
  var listHtml = "";

  for (key in dataObject) {
    var numberOfPosts = 3;
    if (key < numberOfPosts) {
      var visibilityClass = '';
      var date = moment(dataObject[key].date).format('LL');
      var category = '';
      var categoryVisibility = '';
      if ( dataObject[key].categories[0] ) {
        category = dataObject[key].categories[0];
        categoryVisibility = 'visible';
      } else {
        categoryVisibility = 'hidden';
      }
      var featured_image = dataObject[key]['_embedded']['wp:featuredmedia'];
      // test for featured image and hide if there isn't one or is undefined because of forbidden characters used in image file name
      if ( featured_image ) {
        featured_image = dataObject[key]['_embedded']['wp:featuredmedia'][0]['source_url'];
        if ( featured_image ) {
          // visibilityClass = 'visible';
        } else {
          featured_image = '/assets/img/blog-placeholder.jpg';
          // visibilityClass = 'hidden';
        }
      } else {
        featured_image = '/assets/img/blog-placeholder.jpg';
        // visibilityClass = 'hidden';
      }
      listHtml += templateHtml.replace(/{{featured_image}}/g, featured_image)
                              .replace(/{{link}}/g, dataObject[key].link)
                              .replace(/{{title}}/g, dataObject[key].title.rendered)
                              .replace(/{{date}}/g, date)
                              .replace(/{{category_visibility}}/g, categoryVisibility)
                              .replace(/{{category}}/g, category)
                              .replace(/{{excerpt}}/g, dataObject[key].excerpt.rendered);

    } else {

    }
  }

  return listHtml;
}


$('#team-details-modal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget); // Button that triggered the modal
  var group = button.data('group'); // Extract info from data-* attributes
  var name = button.data('name');
  var headshot = button.data('headshot');
  var title = button.data('title');
  var bio = button.data('bio');
  var twitter = button.data('twitter');
  var twitterBase = button.data('twitterbase');
  var linkedin = button.data('linkedin');
  var linkedinBase = button.data('linkedinbase');
  var discord = button.data('discord');
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  // modal.find('.modal-title').text('New message to ' + recipient)
  // modal.find('.modal-body input').val(recipient)
  modal.find('#modal-name').text(name);
  modal.find('#modal-title').text(title);
  modal.find('#modal-bio').html(bio);

  if ( twitter.length > 0 ) {
    var twitterLink = twitterBase + twitter;
    modal.find('.social-links .twitter a').attr('href', twitterLink);
  } else {
    modal.find('.social-links .twitter').css('display', 'none');
  }

  if ( linkedin.length > 0 ) {
    if ( linkedin.startsWith('https://www.linkedin.com/company') ) {
      var linkedinLink = linkedin;
    } else {
      var linkedinLink = linkedinBase + linkedin;
    }
    modal.find('.social-links .linkedin a').attr('href', linkedinLink);
  } else {
    modal.find('.social-links .linkedin').css('display', 'none');
  }

  if ( discord.length > 0 ) {
    var discordHtml = '<img src="/assets/img/icons/team/discord.png" />@' + discord;
    modal.find('.social-links .discord a').html(discordHtml);
  } else {
    modal.find('.social-links .discord').css('display', 'none');
  }

})



// Show newsletter optin if user hasn't subscribed or dismissed it in the last week

// Cookies.remove('newsletterOptin');
var newsletterCookie = Cookies.get('newsletterOptin');
// var host = window.location.host;
//
// if ( newsletterCookie != 'disabled' && newsletterCookie != 'subscribed' || host === 'localhost:4000' ) {
enquire.register("screen and (min-width:992px)", {
    match: function() {
      if ( newsletterCookie != 'disabled' && newsletterCookie != 'subscribed' ) {
        $('#home-header').delay(2800).slideDown( 200, function() {
          // Animation complete.
        });
        window.setTimeout(function(){
          $('#hero').addClass('newsletter-visible');
        }, 2800);
      }
    },
    unmatch: function() {
      $('#home-header').hide();
    }
});

$('#home-header-close').click(function() {
  $('#home-header').slideUp( 200, function() {
    // console.log('set cookie');
    Cookies.set('newsletterOptin', 'disabled', { expires: 7 });
  });
  $('#hero').removeClass('newsletter-visible');
});



// Connection speed test (approx)
var imageAddr = "/assets/img/blog-placeholder.jpg";
var downloadSize = 11548; //bytes

function ShowProgressMessage(msg) {
  if (console) {
    if (typeof msg == "string") {
      console.log(msg);
    } else {
      for (var i = 0; i < msg.length; i++) {
        console.log(msg[i]);
      }
    }
  }

  var oProgress = document.getElementById("progress");
  if (oProgress) {
    var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
    oProgress.innerHTML = actualHTML;
  }
}


// Video background optimization
function InitiateSpeedDetection() {
  // ShowProgressMessage("Loading the image, please wait...");
  window.setTimeout(MeasureConnectionSpeed, 1);
};

if (window.addEventListener) {
  window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
  window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
  var startTime, endTime;
  var download = new Image();
  download.onload = function () {
    endTime = (new Date()).getTime();
    showResults();
  }

  download.onerror = function (err, msg) {
    ShowProgressMessage("Invalid image, or error downloading");
  }

  startTime = (new Date()).getTime();
  var cacheBuster = "?nnn=" + startTime;
  download.src = imageAddr + cacheBuster;

  function showResults() {
    var duration = (endTime - startTime) / 1000;
    var bitsLoaded = downloadSize * 8;
    var speedBps = (bitsLoaded / duration).toFixed(2);
    var speedKbps = (speedBps / 1024).toFixed(2);
    var speedMbps = (speedKbps / 1024).toFixed(2);
    // ShowProgressMessage([
    //     "Your connection speed is:",
    //     speedBps + " bps",
    //     speedKbps + " kbps",
    //     speedMbps + " Mbps"
    // ]);
    initBlazyVid(speedMbps);
  }
}

function initBlazyVid(speedMbps) {
  // If basic speed test looks good
  // Init a new instance of bLazy using a different selector for vids
  var bLazyVid = new Blazy({
    selector: '.b-lazy-vid',
    success: function(element) {
      setTimeout(function() {
        if ($('#bgvid')) {
          videoControl();
        }
        var parent = element.parentNode;
        parent.className = parent.className.replace(/\bloading\b/,'');
      }, 200);
    }
  });

  // if (speedMbps >= 0.5) {
  //   // console.log('should be fast enough');
  //   var bLazyVid = new Blazy({
  //     selector: '.b-lazy-vid',
  //     success: function(element) {
  //       setTimeout(function() {
  //         if ($('#bgvid')) {
  //           videoControl();
  //         }
  //         var parent = element.parentNode;
  //         parent.className = parent.className.replace(/\bloading\b/,'');
  //       }, 200);
  //     }
  //   });
  // } else {
  //   // console.log('not sure');
  //   $('#bgvid video').css('display', 'none');
  // }
}

function videoControl() {
  var $videoContainer = $('#bgvid');
  var $video = $('#bgvid video');
  var videoHeight = $videoContainer.outerHeight();

  $(window).scroll(function(){
    var $x = $(document).scrollTop();
    if ($x > videoHeight) {
      // console.log('pause');
      $video.get(0).pause();
    } else if ($x < videoHeight ) {
      // console.log('play');
      $video.get(0).play();
    }
  });
}
// END Video background optimization
