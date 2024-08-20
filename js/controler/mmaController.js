import mmaService from "../service/mmaService.js";
import mmaView from "../view/mmaView.js";

export async function init() {
   console.log(await mmaService.getEvents(2024));
   mmaView.render(await mmaService.getFights()); 
}   