'use strict';

// This function does one thing, and returns a promise
var firstAJAX = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "js/prodCategories.json",
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

var secondAJAX = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "js/prodTypes.json"
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

var thirdAJAX = function() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: "js/prodDetails.json"
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

var $selectBox = $('<select/>').attr('id', 'selectBox').css('display', 'block'),
		$selectDisabled = $('<option/>'),
		$selOption = $('<option/>'),
		$selOption2 = $('<option/>');

		$selectDisabled.attr('disabled', 'true').attr('selected', 'true').text('Select firework type');
		$selOption.text('Fireworks');
		$selOption2.text('Demolition');

		$selectBox.append($selectDisabled);
		$selectBox.append($selOption);
		$selectBox.append($selOption2);
   
		$('#heading').append($selectBox);



$('#selectBox').on('change', function (event) {
  var arr = [];
    firstAJAX()
      .then(function (data1){
        // console.log(data1);
        arr.push(data1);
        return secondAJAX(data1);
      })
      .then(function (data2) {
        // console.log(data2);
        arr.push(data2);
        return thirdAJAX(data2);
      })
      .then(function (data3) {
        arr.push(data3);
        // console.log(data3);
        populatePage(arr, event);
      });
});

function populatePage (data, event) {
  console.log("test", data, event);
  let selectValue = event.target.value.toLowerCase(),
      category = data[0].categories,
      type = data[1].types,
      productArr = data[2].products,
      htmlString = '',
      $output = $('#output');

  $output.empty();
  if (selectValue === 'fireworks') {
    for (let i = 0, j = productArr.length; i < j; i++) {
      let product = productArr[i];
      if (product.type === 0) {
      htmlString += `<div class="col-xs-4">
                      <h3>${product.name}</h3>
                      <p>${product.description}</p>
                      <p class="info">Category: ${category[0].name}</p>
                      <p class="info">Type: ${type[0].name}</p>
                      <p class="info">${type[0].description}</p>
                     </div>`;
      }
    }
  }
  if (selectValue === 'demolition') {
    for (let i = 0, j = productArr.length; i < j; i++) {
      let product = productArr[i];
      if (product.type === 1) {
      htmlString += `<div class="col-xs-4">
                      <h3>${product.name}</h3>
                      <p>${product.description}</p>
                      <p class="info">Category: ${category[1].name}</p>
                      <p class="info">Type: ${type[1].name}</p>
                      <p class="info">${type[1].description}</p>
                     </div>`;
      }
    }
  }
  $output.append(htmlString);
}










