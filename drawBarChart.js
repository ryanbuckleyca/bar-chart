// Bar Chart API

function createHTML(options, element) {
  let node = document.createElement("header");
  node.id = "chartTitle";
  node.style.color = options["titleFontColour"];
  node.style.fontSize = options["titleFontSize"];
  node.style.textAlign = "center";
  node.innerHTML = options["chartTitle"];
  document.getElementById(element).appendChild(node);

  node = document.createElement("section");
  node.id = "chartSection";
  node.style.display = "flex";
  node.style.flex = "1 1 0%";
  node.style.margin = "2em";
  node.style.flexFlow = "row nowrap";
  node.style.placeContent = "stretch flex-start";
  node.style.alignItems = "stretch";
  document.getElementById(element).appendChild(node);

  node = document.createElement("figurecaption");
  node.id = "y-axis";
  node.style.display = "flex";
  node.style.justifyContent = "space-evenly";
  node.style.flexDirection = "column-reverse";
  node.style.alignItems = "flex-end";
  document.getElementById("chartSection").appendChild(node);

  //add 0th Y ticks
  node = document.createElement("div");
  node.id = "y0";
  node.style.display = "flex";
  node.style.flexGrow = 0;
  node.innerHTML = "<p style=\"margin: 0;\">&nbsp;</p>";
  document.getElementById("y-axis").appendChild(node);

  node = document.createElement("figure");
  node.id = "barChart";
  node.style.display = "flex";
  node.style.flexFlow = "row nowrap";
  node.style.flexGrow = 1;
  node.style.margin = 0;
  node.style.justifyContent = "space-evenly";
  node.style.alignItems = "flex-end";
  document.getElementById("chartSection").appendChild(node);

}

//data = the data the chart should work from
//options = an object which has options for the chart
//element = a DOM element or jQuery element that the chart will render into
function drawBarChart(data, options, element) {

  //create the HTML elements into which the graph data will go
  createHTML(options, element);

  let maxValue = 0;
  let labelColor;
  let barColor;
  //for each Chart in Stack:
  for(let j = 0; j < data.length; j += 2) {

    //data is an array of arrays
    //first set is values, followed by labels
    //i.e. [1, 2, 3, 4, 5], ['one', 'two', 'three', 'four', 'five']
    let xValues = data[j]; //values
    let xLabels = data[j+1]; //labels

    //determine the chart's max value, then create multiplier to scale
    let chartHeight = Math.max(...xValues);
    maxValue += chartHeight;
    let heightXer = window.innerHeight / chartHeight * .8;

    let barTxtPos;
    if(options["barPosition"] === "top") {
      barTxtPos = "flex-start";
    } else if(options["barPosition"] === "bottom") {
      barTxtPos = "flex-end";
    } else {
      barTxtPos = "center";
    }

    //for each X-Value, do something:
    for(let i = 0; i < xValues.length; i++) {
      let barHeight = data[j][i] * heightXer;

      if(j === 0) {
        // Create a CONTAINER COLUMN
        // This way there could be multiple bars in a column
        node = document.createElement("div");
        node.id = "bar" + i + "container";
        node.style.display = "flex";
        node.style.flexDirection = "column-reverse";
        node.style.flex = 1;
        node.style.margin = 0;
        node.style.padding = 0;
        document.getElementById("barChart").appendChild(node);

        //Create LABEL ELEMENT in X-Axis
        node = document.createElement("aside");
        node.id = "bar" + i + "label";
        node.style.display = "flex";
        node.style.flexDirection = "column-reverse";
        node.style.marginRight = options["barSpacing"];
        node.style.justifyContent = "space-evenly";
        node.style.alignItems = "center";
        document.getElementById("bar" + i + "container").appendChild(node);
      }

      //on the first go-round, add Y ticks
      if(j === (data.length - 2)) {
        node = document.createElement("div");
        node.id = "y" + (i + 1);
        node.style.display = "flex";
        node.style.flexGrow = 1;
        node.innerHTML = "<p style=\"margin: 0;\">" + Math.round(maxValue / (xValues.length+1) * (i+1)) + " &mdash; </p>";
        document.getElementById("y-axis").appendChild(node);
      }

      Array.isArray(options["barColor"]) ? barColor = options["barColor"][j/2] : barColor = options["barColor"];
      Array.isArray(options["labelColor"]) ? labelColor = options["labelColor"][j/2] : labelColor = options["labelColor"];

      // Create each BAR inside
      node = document.createElement("div");
      node.id = "bar" + i + j;
      node.style.display = "flex";
      node.style.flexDirection = "row";
      node.style.justifyContent = "space-evenly";
      node.style.alignItems = barTxtPos;
      node.style.background = barColor;
      node.style.height = barHeight + "px";
      node.style.marginRight = options["barSpacing"];
      node.style.color = labelColor;
      document.getElementById("bar" + i + "container").appendChild(node);

      // Create TEXT inside of BAR
      node = document.createElement("p");
      node.style.margin = "0px";
      node.innerHTML = xValues[i];
      document.getElementById("bar" + i + j).appendChild(node);

      // Create TEXT inside of X-label
      node = document.createElement("p");
      node.style.margin = "0px";
      node.innerHTML = xLabels[i];
      document.getElementById("bar" + i + "label").appendChild(node);
    }
  }

  //OPTIONS
  //Multiple Value (Stacked) bar charts. Allow the user to pass multiple values for each bar. Think about how you would need to structure this data compared to a single bar chart.
  //This should also support all the features of the single bar chart, including
    //Customizable bar colours, per value
    //Customizable label colours
  //Think about how you would need to structure your data to associate a label to each value
    //Y-axis should show ticks at certain values
}
