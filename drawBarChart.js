// Bar Chart API

//TO-DO
//The following instruction:
//"Allow the user to pass multiple values for each bar."
//Makes me think each bar should be its own array
//i.e. ['label', 23, 12, 4, 21]
//['x value 2', 44, 2, 232, 77]
//['Undergrad debt', 23, 42, 58, 65, 23]
//['PhD debt', 89, 87, 66, 90, 102]
// This would also allow for variable array lengths
//If they were single values, it would still work
//...but the code has to be restructured


function editTitle() {
  document.getElementById('chartTitle').innerHTML = prompt('Enter a new title for this graph:');
}

//find combined maximum value at each column
let maxBarHeight = function(data){
  let valueStack = [];
  for (each of data[0]) { valueStack.push(0); }
  //add the x-values at each index for each data value array
  for(let y = 0; y < data.length; y++) {
    if(y % 2 === 0) {
      for(let x = 0; x < valueStack.length; x++) { valueStack[x] += data[y][x]; }
    }
  } return Math.max(...valueStack);
}

function createHTML(options, element) {

  let node = document.createElement("div");
  node.id = "graphContainer";
  node.style.display = "table";
  node.style.margin = "auto";
  document.getElementById(element).appendChild(node);

  if(options["width"])
    document.getElementById("graphContainer").style.width = options["width"];

  if(options["height"])
    document.getElementById("graphContainer").style.height = options["height"];

  node = document.createElement("header");
  node.id = "chartTitle";
  node.style.color = options["titleFontColour"];
  node.onclick = editTitle;
  node.style.fontSize = options["titleFontSize"];
  node.style.textAlign = "center";
  if(options["chartTitle"])
    node.innerHTML = options["chartTitle"];
  else
    node.innerHTML = "<em style=\"opacity: 0.5;\">Click here to add title</em>";

  document.getElementById("graphContainer").appendChild(node);

  node = document.createElement("section");
  node.id = "chartSection";
  node.style.display = "flex";
  node.style.flex = "1 1 0%";
  node.style.margin = "2em";
  node.style.fontSize = "1vw";
  node.style.flexFlow = "row nowrap";
  node.style.placeContent = "stretch flex-start";
  node.style.alignItems = "stretch";
  document.getElementById("graphContainer").appendChild(node);

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
    let heightXer;
    if(options["height"] == "auto" || null)
      heightXer = window.innerHeight / maxBarHeight(data) * .8;
    else
      heightXer = parseInt(options["height"], 10) / maxBarHeight(data) * .8;

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

      //on the last go-round, add Y ticks
      if(j === (data.length - 2)) {
        node = document.createElement("div");
        node.id = "y" + (i + 1);
        node.style.display = "flex";
        node.style.flexGrow = 1;
        node.innerHTML = "<p style=\"margin: 0; white-space: nowrap;\">" + Math.round(maxBarHeight(data) / (xValues.length+1) * (i+1)) + " &mdash; </p>";
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
}
