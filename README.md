# _Weather App_

***In this project I utilized:***  
1. A real-time [weather API](https://www.weatherapi.com/) to gather data
2. [Papa Parsing](https://www.papaparse.com/) to parse through the csv file
3. SVG (Scalable Vector Graphics) file format to display the weather type


## _Papa Parse use case_

```js
const readCSV = function (condition) {
  fetch("weather_conditions.csv")
    .then((response) => response.text())
    .then((data) => {
      Papa.parse(data, {
        header: true,
        complete: function (results) {
          updateIcon(condition, results.data);
        },
        error: function (error) {
          console.error("Error parsing", error);
        },
      });
    });
};

```



