$(document).ready(function () {
  // Fetch and display all Pokémon cards on the main page
  fetch("pokedex.json")
      .then((rawData) => rawData.json())
      .then(pokedex => {
          let linkID = 0;
          pokedex.forEach(pokemon => {
             let id = (pokemon["id"] + 1000).toString().slice(1);
              let name = pokemon["name"]["english"];
              let image = pokemon["image"]["hires"];
              let types = pokemon["type"];
              let typesHtml = "";

              // Generate the HTML for Pokémon types
              types.forEach(type => {
                  typesHtml += `<span class="${type.toLowerCase()}">${type}</span>`;
              });

              // Append the Pokémon card to the container
              $('.pokemon-container').append(
                  `<div class="card">
                      <a href="details.html?id=${linkID}"><img src="${image}" alt="${name}"></a>
                      <ul type="none">
                          <li class="pokemon-id">#${id}</li>
                          <li class="pokemon-name">
                              <a href="details.html?id=${linkID++}">${name}</a>
                          </li>
                          <li class="pokemon-type">
                              ${typesHtml}
                          </li>
                      </ul>
                  </div>`
              );
          });
      });

  // Handle Pokémon details page
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id'); // Extract 'id' from the URL

if (pokemonId) {
  // Fetch and display the selected Pokémon's details
  fetch('pokedex.json')
      .then(response => response.json())
      .then(data => {
          // Find the Pokémon data for the given id
          const pokemonData = data[pokemonId];
          if (!pokemonData) {
              console.error('Pokémon not found');
              return;
          }

          // Populate Pokémon information
          const pokemonName = pokemonData['name']['english'];
          const imageURL = pokemonData['image']['hires'];
          const abilities = pokemonData['profile']['ability'];
          const typeList = pokemonData['type'];
          const species = pokemonData['species'];
          const height = pokemonData['profile']['height'];
          const weight = pokemonData['profile']['weight'];
          const baseStats = pokemonData['base'];
          const nationalId = pokemonData['id'];

          // Display basic Pokémon info
          $('#pokemon-page-name').html(pokemonName);
          $('.pokemon-page-national').html(nationalId.toString().padStart(4, '0')); // National number padded to 4 digits
          $('.pokemon-page-image').html(`<img src="${imageURL}" alt="${pokemonName}"/>`);
          $('.pokemon-page-species').html(species);
          $('.pokemon-page-height').html(height);
          $('.pokemon-page-weight').html(weight);
          $('.pokemon-page-description').html(pokemonData['description']);

          // Generate and display abilities HTML
          let abilitiesHtml = '';
          abilities.forEach(ability => {
              let abilityName = ability[0];
              let isHidden = ability[1] === "true";
              abilitiesHtml += `<span class="pokemon-ability ${isHidden ? 'hidden-ability' : ''}">${abilityName}</span>`;
          });
          $('.pokemon-page-abilities').html(abilitiesHtml);

          // Generate and display types HTML
          let typeHtml = '';
          typeList.forEach(type => {
              typeHtml += `<span class="pokemon-type ${type.toLowerCase()}">${type}</span>`;
          });
          $('.pokemon-page-types').html(typeHtml);
          
          // Calculate stat percentages
          let totalStats = baseStats['HP'] + baseStats['Attack'] + baseStats['Defense'] +
              baseStats['Sp. Attack'] + baseStats['Sp. Defense'] + baseStats['Speed'];
              $('.total').html(`<div class="total-value">${totalStats}</div>`); // Display only the total value
          
          let hpPercentage = (baseStats['HP'] / 255) * 100;
          let attackPercentage = (baseStats['Attack'] / 255) * 100;
          let defensePercentage = (baseStats['Defense'] / 255) * 100;
          let spAttackPercentage = (baseStats['Sp. Attack'] / 255) * 100;
          let spDefensePercentage = (baseStats['Sp. Defense'] / 255) * 100;
          let speedPercentage = (baseStats['Speed'] / 255) * 100;
          
          // Populate stat values
          $('.hp-val').html(`<div>${baseStats['HP']}</div>`);
          $('.attack-val').html(`<div>${baseStats['Attack']}</div>`);
          $('.defense-val').html(`<div>${baseStats['Defense']}</div>`);
          $('.sp-attack-val').html(`<div>${baseStats['Sp. Attack']}</div>`);
          $('.sp-defense-val').html(`<div>${baseStats['Sp. Defense']}</div>`);
          $('.speed-val').html(`<div>${baseStats['Speed']}</div>`);
          
          // Animate stats bars based on Pokémon's stats
          $('.hp div').animate({ width: hpPercentage + '%' }); 
          $('.attack div').animate({ width: attackPercentage + '%' }); 
          $('.defense div').animate({ width: defensePercentage + '%' });
          $('.sp-attack div').animate({ width: spAttackPercentage + '%' }); 
          $('.sp-defense div').animate({ width: spDefensePercentage + '%' }); 
          $('.speed div').animate({ width: speedPercentage + '%' }); 
      })
      .catch(error => {
          console.error('Error fetching Pokémon data:', error);
      });
      
  }
});