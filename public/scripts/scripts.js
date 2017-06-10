$(document).ready(() => {
  let height = $("#height").text();
  let feet = Math.floor(height/12);
  let inches = height % 12;
  $('#height').text(`${ feet }' ${ inches }"`);
});