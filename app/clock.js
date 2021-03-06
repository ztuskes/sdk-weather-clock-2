import clock from "clock";
import { preferences } from "user-settings";
import * as util from "../common/utils";

let handleCallback;

export function initialize(granularity, callback) {
  clock.granularity = granularity ? granularity : "minutes";
  handleCallback = callback;
  clock.addEventListener("tick", tick);
}

export function tick(evt) {
  const today = evt ? evt.date : new Date();
  const mins = util.zeroPad(today.getMinutes());
  let hours = today.getHours();

  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }

  if (typeof handleCallback === "function") {
    handleCallback({ time: `${hours}:${mins}` });
  }
}