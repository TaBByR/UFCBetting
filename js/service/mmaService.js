const API_KEY = "f58b1ef2a192b9b0a2bedddb9ee62cf2";
const url = "https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/";


const sportKey = 'upcoming' // use the sport_key from the /sports endpoint below, or use 'upcoming' to see the next 8 games across all sports

const regions = 'us' // uk | us | eu | au. Multiple can be specified if comma delimited

const markets = 'h2h' // h2h | spreads | totals. Multiple can be specified if comma delimited

const oddsFormat = 'decimal' // decimal | american

const dateFormat = 'iso' // iso | unix

const ATHLETE_INFO_API_URL = "https://www.thesportsdb.com/api/v1/json/3/";

const UFC_SPORTS_DATA_API_URL = "https://api.sportsdata.io/v3/mma/scores/json/";
const UFC_SPORTS_DATA_API_KEY = "25e16fc952a0411caae7459dac28ca47";

async function getFights() {
    const response = await fetch(`${url}odds?regions=${regions}&markets=${markets}&oddsFormat=${oddsFormat}&apiKey=${API_KEY}`, {
        headers: {
            'Accept': 'application/json',
        }
    });

    if (!response.ok) {
        console.log("fodeu");
    }

    return response.json();
}

export async function getFighterByName(name) {
    const response = await fetch(`${ATHLETE_INFO_API_URL}searchplayers.php?p=${name}` , {
        mode: 'cors',
    });

    if(!response.ok) {
        console.log("fodeu");
    }

    return response.json();
}

export async function getEvents(season) {
    
    console.log(`${UFC_SPORTS_DATA_API_URL}Schedule/UFC/${season}?Key=${UFC_SPORTS_DATA_API_KEY}`);
    
    const response = await fetch(`${UFC_SPORTS_DATA_API_URL}Schedule/UFC/${season}?key=${UFC_SPORTS_DATA_API_KEY}` , {
        mode: 'cors',
        headers : {
            "Ocp-Apim-Subscription-Key" : UFC_SPORTS_DATA_API_KEY
        }
    });

    


    if(!response.ok) {
        console.log("fodeu");
    }

    return response.json();
} 

export default { getFights, getEvents };
