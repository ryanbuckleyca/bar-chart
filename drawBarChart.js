// Bar Chart API


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

  function editTitle() {
    let titleSet = prompt('Enter a new title for this graph:');
    if(titleSet === "") { titleSet = "<title class=\"pending\">Click here to add title</title>" }
    document.getElementById(element + '-chartTitle').innerHTML = titleSet;
    document.getElementById(element + '-chartTitle').removeAttribute(className);
  }

  let node = document.createElement("div");
  node.id = element + "-graphContainer";
  node.style.display = "table";
  node.style.margin = "auto";
  document.getElementById(element).appendChild(node);

  if(options["width"])
    document.getElementById(element + "-graphContainer").style.width = options["width"];

  if(options["height"])
    document.getElementById(element + "-graphContainer").style.height = options["height"];

  node = document.createElement("header");
  node.id = element + "-chartTitle";
  node.style.color = options["titleFontColour"];
  node.style.fontSize = options["titleFontSize"];
  node.onclick = editTitle;
  if(options["chartTitle"])
    node.innerHTML = options["chartTitle"];
  else
    node.innerHTML = "<title class=\"pending\">Click here to add title</title>";

  document.getElementById(element + "-graphContainer").appendChild(node);

  node = document.createElement("section");
  node.id = element + "-chartSection";
  document.getElementById(element + "-graphContainer").appendChild(node);

  node = document.createElement("figurecaption");
  node.id = element + "-yaxis";
  document.getElementById(element + "-chartSection").appendChild(node);

  //add 0th Y ticks
  node = document.createElement("div");
  node.id = element + "-y0";
  node.style.display = "flex";
  node.style.flexGrow = 0;
  node.innerHTML = "<p style=\"margin: 0;\">&nbsp;</p>";
  document.getElementById(element + "-yaxis").appendChild(node);

  node = document.createElement("figure");
  node.id = element + "-barChart";
  document.getElementById(element + "-chartSection").appendChild(node);

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
    //data is an array of arrays. first set is values, followed by labels -- i.e. [1, 2, 3, 4, 5], ['one', 'two', 'three', 'four', 'five']
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
        node.id = element + "-bar" + i + "container";
        node.className = "barContainer";
        document.getElementById(element + "-barChart").appendChild(node);

        //Create LABEL ELEMENT in X-Axis
        node = document.createElement("aside");
        node.id = element + "-bar" + i + "label";
        node.className = "barLabel";
        node.style.marginRight = options["barSpacing"];
        document.getElementById(element + "-bar" + i + "container").appendChild(node);
      }

      //on the last go-round, add Y ticks
      if(j === (data.length - 2)) {
        node = document.createElement("div");
        node.id = element + "-y" + (i + 1);
        node.style.display = "flex";
        node.style.flexGrow = 1;
        node.innerHTML = "<p style=\"margin: 0; white-space: nowrap;\">" + Math.round(maxBarHeight(data) / (xValues.length+1) * (i+1)) + " &mdash; </p>";
        document.getElementById(element + "-yaxis").appendChild(node);
      }

      Array.isArray(options["barColor"]) ? barColor = options["barColor"][j/2] : barColor = options["barColor"];
      Array.isArray(options["labelColor"]) ? labelColor = options["labelColor"][j/2] : labelColor = options["labelColor"];

      // Create each BAR inside
      node = document.createElement("div");
      node.id = element + "-bar" + i + j;
      node.className = "bar";
      node.style.alignItems = barTxtPos;
      node.style.background = barColor;
      node.style.height = barHeight + "px";
      node.style.color = labelColor;
      node.style.marginRight = options["barSpacing"];
      document.getElementById(element + "-bar" + i + "container").appendChild(node);

      // Create TEXT inside of BAR
      node = document.createElement("p");
      node.style.margin = "0px";
      node.innerHTML = xValues[i];
      document.getElementById(element + "-bar" + i + j).appendChild(node);

      // Create TEXT inside of X-label
      node = document.createElement("p");
      node.style.margin = "0px";
      node.innerHTML = xLabels[i];
      document.getElementById(element + "-bar" + i + "label").appendChild(node);
    }
  }
}
