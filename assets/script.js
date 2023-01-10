
// Display todays date
const today = new Date();
let title = document.querySelector("#date");
title.textContent = today.toDateString();
