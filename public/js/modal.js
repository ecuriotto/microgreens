function openModal(modalNames) {
  for (var i = 0; i < modalNames.length; i++) {
    const btns = document.getElementsByClassName(modalNames[i] + 'Btn');
    if (btns && btns.length > 0) {
      let btn = btns[0];
      let modal = document.getElementById(modalNames[i] + 'Modal');
      let span = modal.getElementsByClassName('close')[0];

      // create a closure around the modal variable
      btn.onclick = (function (modal) {
        return function () {
          modal.style.display = 'block';
          window.addEventListener('click', function (event) {
            if (event.target == modal) {
              modal.style.display = 'none';
            }
          });
        };
      })(modal);

      span.onclick = function () {
        modal.style.display = 'none';
      };
    }
  }
}

async function getPlantData(id) {
  try {
    const response = await fetch('../data/microVitamins.json');
    const data = await response.json();
    let obj = data[id];
    obj['Name'] = id;
    return obj;
  } catch (error) {
    console.error(error);
  }
}

function openModalPlant(modalNames) {
  // Loop through the array of modal names
  for (var i = 0; i < modalNames.length; i++) {
    // Get the buttons that open the modal
    var btns = document.getElementsByClassName(modalNames[i] + 'Btn');

    // Get the modal
    var modal = document.getElementById(modalNames[i] + 'Modal');

    // Loop through the buttons and attach the onclick event listener to each
    for (var j = 0; j < btns.length; j++) {
      // When the user clicks the button, render the modal with data
      btns[j].onclick = async function (event) {
        event.preventDefault();
        const id = this.getAttribute('id');
        const plantData = await getPlantData(id);
        // Render the modal with the data
        const template = ejs.render(
          `
          <div class="modal-content">
            <span class="close" id="spanPlant">&times;</span>
            <div class="containerModal">
              <div class="modal-plant-header">
                <h2><%= plant.Name %></h2>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="modal-img-box-plant">
                    <img src="images/<%= plant.Image %>" alt="<%= plant.Name %>">
                  </div>                
                </div>
              </div>
              <div class="row">
                <div class="col-md-1 modal-vitamins-box-plant">
                  <table>
                    <tr>
                      <td>Vitamin C:</td>
                      <td><%= plant.VitaminC %></td>
                    </tr>
                    <tr>
                      <td>Vitamin K:</td>
                      <td><%= plant.VitaminK %></td>
                    </tr>
                    <tr>
                      <td>Vitamin E:</td>
                      <td><%= plant.VitaminE %></td>
                    </tr>
                    <tr>
                      <td>Beta Carotene</td>
                      <td><%= plant.BetaCarotene %></td>
                    </tr>
                    <tr>
                      <td>Lutein</td>
                      <td><%= plant.Lutein %></td>
                    </tr>
                    <tr>
                      <td>Violaxanthin</td>
                      <td><%= plant.Violaxanthin %></td>
                    </tr>
                    <tr>
                      <td>Total Carotenoids</td>
                      <td><%= plant.TotalCarotenoids %></td>
                    </tr>                                                            
                  </table>                
                </div>
                <div class="col-md-11">
                  <div class="modal-img-box-plant-comp">
                    <img class="responsive-image" src="images/<%= plant.VitCompImage %>" alt="<%= plant.Name %>">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-1 modal-vitamins-box-plant">
                  <table>
                    <tr>
                      <td>Calcium:</td>
                      <td><%= plant.Ca %></td>
                    </tr>
                    <tr>
                      <td>Magnesium</td>
                      <td><%= plant.Mg %></td>
                    </tr>
                    <tr>
                      <td>Phosphorus:</td>
                      <td><%= plant.P %></td>
                    </tr>
                    <tr>
                      <td>Potassium</td>
                      <td><%= plant.K %></td>
                    </tr>
                    <tr>
                      <td>Sodium</td>
                      <td><%= plant.Na %></td>
                    </tr>
                    <tr>
                      <td>Iron</td>
                      <td><%= plant.Fe %></td>
                    </tr>
                    <tr>
                      <td>Zinc</td>
                      <td><%= plant.Zn %></td>
                    </tr>
                    <tr>
                      <td>Manganese</td>
                      <td><%= plant.Mn %></td>
                    </tr>                                                        
                  </table>
                  <br>
                  <p class='trans' id='plantModalDescription'>(*) Quantities expressed in milligrams over 100g of product</p>               
                </div>
                <div class="col-md-11">
                  <div class="modal-img-box-plant-comp">
                    <img class="responsive-image" src="images/<%= plant.MinCompImage %>" alt="<%= plant.Name %>">
                  </div>
                </div>
              </div>
            </div>            
          </div>

        `,
          { plant: plantData }
        );
        modal.innerHTML = template;
        modal.style.display = 'block';

        // When the user clicks anywhere outside of the modal, close it
        window.addEventListener('click', function (event) {
          if (event.target == modal) {
            modal.style.display = 'none';
          }
        });
        // When the user clicks on <span> (x), close the modal
        let span = document.getElementById('spanPlant');
        span.onclick = function () {
          modal.style.display = 'none';
        };
      };
    }
  }
}
