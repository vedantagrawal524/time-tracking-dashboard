const myData = {
     items: [],
};

const getData = async () => {
     const response = await fetch("/data.json", {
          method: "GET",
          headers: {
               Accept: "application/json"
          }
     });
     const jsonResponse = await response.json();
     myData.items = jsonResponse;
};
getData();

const trackOption = document.querySelector(".menu");

const sections = [
     document.querySelector(".work"),
     document.querySelector(".play"),
     document.querySelector(".study"),
     document.querySelector(".exercise"),
     document.querySelector(".social"),
     document.querySelector(".care"),
];

const timeElements = sections.map(section => {
     return {
          section: section,
          current: section.querySelector(".current-time"),
          previous: section.querySelector(".previous-time")
     };
});

function formatHours(hours) {
     return hours === 1 ? "1hr" : `${hours}hrs`;
}

const previousText = {
     daily: "Yesterday - ",
     weekly: "Last Week - ",
     monthly: "Last Month - "
}

trackOption.addEventListener('click', (event) => {
     if (!event.target.matches("p")) return;

     document.querySelectorAll(".menu p").forEach((item) =>
          item.classList.remove("active")
     );

     event.target.classList.add("active");

     const timeframe = event.target.classList[0];

     for (let i = 0; i < timeElements.length; i++) {
          timeElements[i].current.textContent = formatHours(myData.items[i].timeframes[timeframe].current);
          timeElements[i].previous.textContent = previousText[timeframe] + formatHours(myData.items[i].timeframes[timeframe].previous);
     }
});