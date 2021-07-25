import document from "document";
import * as clock from "./clock";
import * as wth from "./weather";

const time = document.getElementById("time");

clock.initialize("minutes", data => {
  time.text = data.time;
});

wth.init();
