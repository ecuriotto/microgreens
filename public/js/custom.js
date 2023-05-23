// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  let dispYear = document.querySelector('#displayYear');
  if(dispYear){
    dispYear.innerHTML = currentYear;
  }
}

$(document).ready(function () {
  // Initialize isotope grid
  var $grid = $('.grid').isotope({
    itemSelector: '.all',
    percentPosition: false,
    masonry: {
      columnWidth: '.all',
    },
  });

  $('.filters_menu li').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
      if ($(this).data('filter') !== '*') {
        $('.filters_menu li[data-filter="*"]').removeClass('active');
      }
      else{
        $('.filters_menu li').removeClass('active');
        $(this).addClass('active');      
      }
    }
  });
  // Listen to button clicks
$('#filter-button').click(function () {
  // Get the selected nutrients
  var $selectedNutrients = $('.filters_menu li.active');

  // Create an array of the selected nutrient classes
  var selectedNutrientClasses = [];
  $selectedNutrients.each(function () {
    selectedNutrientClasses.push($(this).attr('data-filter').substr(1));
  });

  // Check if the selectedNutrientClasses contains '*'
  if (selectedNutrientClasses.includes('*') || selectedNutrientClasses.includes('')) {
    // If it does, show all elements in the grid
    var selectedMicrogreenSelector = ' *';
    $grid.isotope({ filter: selectedMicrogreenSelector });
  } else {
    // If not, call the findBestMicrogreens function to get a list of microgreens
    findBestMicrogreens(selectedNutrientClasses, 6).then(function (selectedMicrogreens) {
      // Filter the grid based on the selected microgreens
      var selectedMicrogreenSelector = '';
      for (var i = 0; i < selectedMicrogreens.length; i++) {
        selectedMicrogreenSelector += '.' + selectedMicrogreens[i];
        if (i < selectedMicrogreens.length - 1) {
          selectedMicrogreenSelector += ', ';
        }
      }
      $grid.isotope({ filter: selectedMicrogreenSelector });
    });
  }
});

});

// nice select
$(document).ready(function () {
  //$('select').niceSelect()
  // Get the language code (e.g. "en" or "it")

  $('.dropdown-toggle').dropdown();

  let lang = getBrowserLanguage().split('-')[0];

  // Check if the language is one of the available options
  let langOption = $('.dropdown-menu a[data-value="' + lang + '"]');
  if (!langOption.length) {
    // If language is not in the available options, default to "en"
    lang = 'en';
    langOption = $('.dropdown-menu a[data-value="en"]');
  }

  // Load translations for the selected language
  loadTranslations(lang);
  
  // Set the selected flag in the dropdown
  var selectedFlag = langOption.find('i').clone();
  $('.selected-flag').html(selectedFlag);

  // Update the hidden select element
  $('#language-select').val(lang);

  // Add click event listeners to the dropdown menu items
  $('.dropdown-flag a').click(function () {
    // Update the selected flag
    var selectedFlag = $(this).find('i').clone();
    $('.selected-flag').html(selectedFlag);

    // Update the hidden select element
    $('#language-select').val($(this).data('value'));

    // Close the dropdown menu
    $('.dropdown-flag').dropdown('toggle');

    // Load translations for the selected language
    const lang = $(this).data('value');
    loadTranslations(lang);
    applyLangAttribute(lang);

    return false;
  });

  // Add click event listeners to the dropdown menu items
  $('.dropdown-health li a').on('click', function (event) {
    // Close the dropdown menu
    $('.dropdown-health').removeClass('show');
    event.stopPropagation();
  });

  var modalNames = ['5Reasons', 'simpleGrow'];
  openModal(modalNames);
  openModalPlant(['singlePlant']);

  $(document).click(function () {
    $('.dropdown-menu').removeClass('show');
  });

});

$(function () {
  // Add click event listener to each menu tab
  $('.nav-link').click(function () {
    // Get the target section ID
    var target = $(this).data('target');

    // Hide all sections except the target section
    //$('section').not(target).hide();

    // Scroll to the target section if offset is defined
    var offset = $(target).offset();
    if (offset) {
      $('html, body').animate(
        {
          scrollTop: offset.top,
        },
        1000
      );
    }
    else{
      console.warn('offset is undefined');
    }  
  });
});


// client section owl carousel
$('.client_owl-carousel').owlCarousel({
  loop: true,
  margin: 0,
  dots: false,
  nav: true,
  navText: [],
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    '<i class="fa fa-angle-right" aria-hidden="true"></i>',
  ],
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1000: {
      items: 2,
    },
  },
});

/** google_map js **/
function myMap() {
  var mapProp = {
    center: new google.maps.LatLng(40.712775, -74.005973),
    zoom: 18,
  };
  var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
}

function applyLangAttribute(language){
      if (language === 'en') {
        document.documentElement.lang = 'en';
        document.documentElement.setAttribute('country', 'US');
      } else if (language === 'fr') {
        document.documentElement.lang = 'fr';
        document.documentElement.setAttribute('country', 'FR');
      } else if (language === 'it') {
        document.documentElement.lang = 'it';
        document.documentElement.setAttribute('country', 'IT');
      } else if (language === 'es') {
        document.documentElement.lang = 'es';
        document.documentElement.setAttribute('country', 'ES');
      }
}
