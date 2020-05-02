// Bar Chart API

//data = the data the chart should work from
//options = an object which has options for the chart
//element = a DOM element or jQuery element that the chart will render into
function drawBarChart(data, options, element) {

  //data is an array of arrays:
  //[1, 2, 3, 4, 5], ['one', 'two', 'three', 'four', 'five']
  let xValues = data[0]; //values
  let xLabels = data[1]; //labels

  //determine max value, then create multiplier to scale
  let chartHeight = Math.max(...xValues);
  let heightXer = window.innerHeight / chartHeight * .8;

  var node = document.createElement("h1");
  node.id = "chartTitle";
  node.style.color = options["titleFontColour"];
  node.style.fontSize = options["titleFontSize"];
  node.innerHTML = options["chartTitle"];
  document.getElementById(element).appendChild(node);


  var node = document.createElement("div");
  node.id = "barChart";
  node.style.display = "flex";
  node.style.flexFlow = "row nowrap";
  node.style.justifyContent = "space-evenly";
  node.style.alignItems = "flex-end";
  node.style.margin = "2em";
  node.style.borderLeft = "dotted";
  node.style.borderBottom = "dotted";
  document.getElementById(element).appendChild(node);

  let barTxtPos;
  if(options["barPosition"] === "top") {
    barTxtPos = "flex-start";
  } else if(options["barPosition"] === "bottom") {
    barTxtPos = "flex-end";
  } else {
    barTxtPos = "center";
  }

  for(let i = 0; i < xValues.length; i++) {
    let barHeight = data[0][i] * heightXer;

    // Create a CONTAINER COLUMN
    // This way there could be multiple bars in a column
    var node = document.createElement("div");
    node.id = "bar" + i + "container";
    node.style.display = "flex";
    node.style.flexDirection = "column";
    node.style.flex = 1;
    node.style.margin = 0;
    node.style.padding = 0;
    document.getElementById("barChart").appendChild(node);

  //LOOP
    // Create each BAR inside
    var node = document.createElement("div");
    node.id = "bar" + i;
    node.style.display = "flex";
    node.style.flexDirection = "row";
    node.style.justifyContent = "space-evenly";
    node.style.alignItems = barTxtPos;
    node.style.background = options["barColor"];
    node.style.height = barHeight + "px";
    node.style.marginRight = options["barSpacing"];
    node.style.color = options["labelColor"];
    document.getElementById("bar" + i + "container").appendChild(node);

    // Create TEXT
    var node = document.createElement("p");
    node.innerHTML = xLabels[i] + " is " + xValues[i];
    document.getElementById("bar" + i).appendChild(node);
  //END LOOP

  }

  //DATA
  //X-axis should show labels for each data value

  //OPTIONS
  //Multiple Value (Stacked) bar charts. Allow the user to pass multiple values for each bar. Think about how you would need to structure this data compared to a single bar chart.
  //This should also support all the features of the single bar chart, including
    //Customizable bar colours, per value
    //Customizable label colours
  //Think about how you would need to structure your data to associate a label to each value
    //Y-axis should show ticks at certain values
}
