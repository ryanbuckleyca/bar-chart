# BAR CHART

## About
BarChart allows developers to generate bar charts on their web pages using HTML, CSS and JavaScript. BarChart will display a list of values, horizontally as a bar chart. Numerical values will be displayed inside of the bar.

The signature of the API is as follows:

`drawBarChart(data, options, element);`
The `data` parameter will be the data the chart should work from Start with just an Array of numbers
e.g. `[1, 2, 3, 4, 5]`

The `options` parameter should be an object which has customizable options for the chart. Bar sizes will be dependent on the data that gets passed in. Bar width is dependent on the total amount of values passed, and bar height is dependent on the values of the data. The customizable properties are are follows:
```javascript
{
  "chartTitle": "", //title can be set and shown dynamically
  "barColor": ["turquoise", "pink"], //single value or array
  "barPosition": "bottom", //top, center, or bottom
  "barSpacing": "15px",
  "labelColor": ["navy", "maroon"], //single value or array
  "titleFontColour": "black",
  "titleFontSize": "18px",
  "yAxis": "Y Values",
  "xAxis": "X Values",
  "width": "700px",
  "height": "500px"
}
```

The element `parameter` should be a DOM element or jQuery element that the chart will get rendered into.

A complete example of a two-bar chart of the API code could be:
```javascript
drawBarChart(
  //data
  [[20, 10, 210, 150, 60],
    ['tom', 'jim', 'said', 'mustafa', 'xenix'],
    [100, 40, 80, 50, 10],
    ['jenny', 'sana', 'noelle', 'rhonda', 'iyabo']],
  //options
  {"chartTitle":"",
    "barColor": ["turquoise", "pink"],
    "barPosition": "bottom",
    "barSpacing": "15px",
    "labelColor": ["navy", "maroon"],
    "titleFontColour": "black",
    "titleFontSize": "18px",
    "yAxis": "Y Values",
    "xAxis": "X Values",
    "width": "700px",
    "height": "500px"},
  //element
  "graph1"
);
```
where the `element` would be a section of the HTML page such as:
```html
<section id="graph1">
  <!-- placeholder -->
</section>
```

Example of single bar chart:
![Single Bar Chart](/images/1barchart.png)

Example of double bar chart:
![Double Bar Chart](/images/2barchart.png)

Example of tripple bar chart:
![Tripple Bar Chart](/images/3barchart.png)

## Known Issues / Bugs

There's currently no checks in place to make sure labels and data have the same amount of values.

## Features on roadmap

Would be great to have animations

## External resources

* http://www.w3schools.com/
* https://guides.github.com/features/mastering-markdown/
* http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf
* https://css-tricks.com/snippets/css/a-guide-to-flexbox/
* https://www.qhmit.com/css/flexbox/tutorial/nested_flex_containers.cfm
* https://stackoverflow.com/questions/43520932/make-flex-grow-expand-items-based-on-their-original-size

## Acknowledgements

Thank you to Lighthouse Labs for the stretch activities and the opportunity to practice!
