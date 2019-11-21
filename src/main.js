import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { TheCocktailDBSearch } from './../src/thecocktaildb-service.js';
import { TheCocktailDBSpirits } from './../src/thecocktaildb-service.js';

$(document).ready(function() {
  // This is where the recipe pulls up
    $('#getDrinkButton').click(function() {

      $("ul#drinkDetails").children().remove();
      $("tbody.ingredient-list").children().remove();
      $("#drinkResults").fadeIn(1000);



      const drinkName = $('#drinkName').val();
      $('#drinkName').val("");

      (async () => {
        let theCocktailDB = new TheCocktailDBSearch();
        let response = await theCocktailDB.getCocktailByName(drinkName);
        getElements(response);
      })();

      function getElements(response) {
        let keys = Object.keys(response.drinks[0]);
        let values = Object.values(response.drinks[0]);

        // DISPLAY DRINK IMAGE
        if (response.drinks[0].strDrinkThumb != null) {
          $("ul#drinkDetails").prepend("<HR><img src="+response.drinks[0].strDrinkThumb+" width='300px'>");
        }

        // APPEND DRINK INFO
        for(let i = 1; i < (values.length-32); i++) {
          if(values[i] != null && values[i] != "" && keys[i] != "strInstructionsDE" && keys[i] != "strInstructionsES" && keys[i] != "strInstructionsFR" && keys[i] != "strInstructionsZH-HANS" && keys[i] != "strInstructionsZH-HANT" && keys[i] != "strDrinkThumb") {
            $("ul#drinkDetails").append("<li><span class='key'> " + (keys[i]).slice(3) + ":</span> " + values[i] +" </li>");
          }
        }

        // APPEND INGREDIENT TABLE
        for(let i = 21; i <(values.length-17); i++) {
          if(values[i] != null && values[i] != "") {
            $(".ingredient-list").append("<tr><th scope='row'>" + (i-20) + "</th><td>" + (values[i]) + "</td><td>" + (values[(i+15)]) + "</td></tr>");
          }
        }
      }
    });



  $("#spiritName").on("change",function() {
    let spiritName = this.value;
    // if (spiritName=="") {
    //   return;
    // } else {
    $("select#drinkList").children().remove();
    $("select#drinkList").append('<option value="" selected></option>');

    // let spiritName = "rum";
    // let spiritName = this.value;
    // $('#spiritName').val("");

    (async () => {
      let theCocktailDB2 = new TheCocktailDBSpirits();
      let response2 = await theCocktailDB2.getCocktailBySpirit(spiritName);
      getElements2(response2);
    })();

    function getElements2(response2) {
      // let keys2 = Object.keys(response2.drinks[0]);
      let values2 = Object.values(response2.drinks);
      // console.log("2nd API: ",values2);

      for(let i = 0; i <(values2.length); i++) {
        $("select#drinkList").append("<option value='"+values2[i].strDrink+"'>"+values2[i].strDrink+"</option>");
      }
    }

    // }

  });

  // This is where the recipe displays on select

  $('#drinkList').on("change",function() {
    let drinkName = this.value;
    $("#drinkResults").fadeIn(1000);

    $("ul#drinkDetails").children().remove();
    $("tbody.ingredient-list").children().remove();


    // const drinkName = $('#drinkName').val();
    // $('#drinkName').val("");

    (async () => {
      let theCocktailDB = new TheCocktailDBSearch();
      let response = await theCocktailDB.getCocktailByName(drinkName);
      getElements(response);
    })();

    function getElements(response) {
      let keys = Object.keys(response.drinks[0]);
      let values = Object.values(response.drinks[0]);

      // DISPLAY DRINK IMAGE
      if (response.drinks[0].strDrinkThumb != null) {
        $("ul#drinkDetails").prepend("<HR><img src="+response.drinks[0].strDrinkThumb+" width='300px'>");
      }

      // APPEND DRINK INFO
      for(let i = 1; i < (values.length-32); i++) {
        if(values[i] != null && values[i] != "" && keys[i] != "strInstructionsDE" && keys[i] != "strInstructionsES" && keys[i] != "strInstructionsFR" && keys[i] != "strInstructionsZH-HANS" && keys[i] != "strInstructionsZH-HANT" && keys[i] != "strDrinkThumb") {
          $("ul#drinkDetails").append("<li><span class='key'> " + (keys[i]).slice(3) + ":</span> " + values[i] +" </li>");
        }
      }

      // APPEND INGREDIENT TABLE
      for(let i = 21; i <(values.length-17); i++) {
        if(values[i] != null && values[i] != "") {
          $(".ingredient-list").append("<tr><th scope='row'>" + (i-20) + "</th><td>" + (values[i]) + "</td><td>" + (values[(i+15)]) + "</td></tr>");
        }
      }
    }
  });
















});
