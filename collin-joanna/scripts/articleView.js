'use strict';

let articleView = {};



// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// We cannot refactor the functions that contain contextual "this" with arow functions, because the arrow functions do not 
//create their own context. Instead, they refer to the parent context.Therefore, we only refactored the functions that did 
//not contain the references to the contextual "this."

articleView.populateFilters = () => {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      let val = $(this).find('address a').text();
      let optionTag = `<option value="${val}">${val}</option>`;

      if ($(`#author-filter option[value="${val}"]`).length === 0) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if ($(`#category-filter option[value="${val}"]`).length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = () => {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = () => {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = () => {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

$(document).ready(() => {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
