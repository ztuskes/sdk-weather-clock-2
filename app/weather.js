import document from "document";
import { toFahrenheit } from "../common/utils";
import { units } from "user-settings";
import * as newfile from "./newfile";
import * as clock from "./clock";

const w_icon = document.getElementById("w_icon");
const w_cond = document.getElementById("w_cond");
const w_temp = document.getElementById("w_temp");
const w_loc = document.getElementById("w_loc");

export function init() {
 
  
  newfile.initialize(data => {
    data = units.temperature === "F" ? toFahrenheit(data): data;
    w_icon.href = "weather/" + data.icon;
    w_cond.text = `${data.condition_text}`;
    w_temp.text = `${data.temperature}\u00B0 ${data.unit}`;
    w_loc.text = `${data.location}`;    
        
    clock.tick();
    
  });
  
}