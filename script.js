"use strict";
$(document).ready(function(){

  //toggle ask button
  $('#askIcon').on('click', function(){
    $('.chatBot').toggleClass('hidden');
  });

  // auto scroll
  $('#home').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#homes').offset().top-50}, 2000);
  });

  $('#feature').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#features').offset().top-50}, 2000);
  });

  $('#aboutUs').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#about').offset().top-50}, 2000);
  });

  $('#testimonial').on('click', function(){
    $('html, body').animate({
        scrollTop: $('#testimonials').offset().top-50}, 2000);
  });
//rename
});
