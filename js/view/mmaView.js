
import { getFighterByName } from "../service/mmaService.js";

function render(fights) {


    const container = document.querySelector('#container');
    container.innerHTML = '<br>'; //removes the previous elements
    const list = document.createElement('div');

    let counter = 0;

    fights.forEach(async ({ away_team, bookmakers, commence_time, home_team, id, sport_key, sport_title }) => {
        counter++;

        if (counter > 10) {
            return;
        }

        const card = document.createElement('div');
        card.style = "display: inline-block";
        card.style.border = "1px solid black";

        const title = document.createElement("h5");
        title.textContent = `${home_team} VS ${away_team}`;

        const text = document.createElement("p");


        if (hasBookmakers(bookmakers)) {

            const fighters = getFighters(home_team, away_team, bookmakers[0].markets[0].outcomes[0].name, bookmakers[0].markets[0].outcomes[1].name);

            text.textContent =
                `
                ${fighters.fighterOne}: ${bookmakers[0].markets[0].outcomes[0].price} 
                ${fighters.fightTwo}: ${bookmakers[0].markets[0].outcomes[1].price} 
            `;

        } else {
            text.textContent = "No odds";
        }

        const splitName = home_team.split(" ");
        const joinedName = splitName.join("_");

        let fighter = await getFighterByName(joinedName);

        const imagem = document.createElement("img");

       if (fighter.player[0].strThumb !== null) {

            imagem.src = fighter.player[0].strThumb;
        } 





        card.appendChild(title);
        card.appendChild(text);
        card.appendChild(imagem);

        list.appendChild(card);
    });

    container.appendChild(list);
};


function hasBookmakers(bookmakers) {
    return bookmakers.length > 0;
}

function getFighters(home_team, away_team, oddOne, oddTwo) {
    return {
        fighterOne: home_team === oddOne ? home_team : away_team,
        fightTwo: away_team === oddTwo ? away_team : home_team
    }
}


export default { render };

