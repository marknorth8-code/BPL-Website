
// Basic placeholder for carousel logic
// Expand to multiple cards as content grows
fetch("../header.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });
