# _Weather App_

**_In this project I utilized:_**

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

- Imported through cloudflare cdn

```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
```
