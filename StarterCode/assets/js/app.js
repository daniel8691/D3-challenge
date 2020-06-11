// @TODO: YOUR CODE HERE!
// Set up chart
var svgWidth = 960;
var svgHeight = 500;
var padding = 50;
// var margin = {
//     top: 60,
//     right: 60,
//     bottom: 60,
//     left: 60
// }

// // define dimensions of the chart area
// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom

// Select body and append SVG area
var svg = d3.select("body")
    .append('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// // Append a group area and set its margins
// var chartGroup = svg.append("g")
//     // translate: input the values you weant to move by
//     .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Load data from the data.csv
d3.csv("assets/data/data.csv").then(function(someData){
    console.log(someData);
    someData.forEach(function(data){
        data.poverty = +data.poverty
        data.healthcare = +data.healthcare
        console.log(data.poverty)
        console.log(data.healthcare)
    });
    
    // CREATE SCALES
    // create the x scale
    var xScale = d3.scaleLinear()
                    .domain([d3.min(someData, a => a.poverty)-1 , d3.max(someData, function(d){
                        return d.poverty
                    })+1])
                    .range([padding, svgWidth - padding])
    // create the y scale
    var yScale = d3.scaleLinear()
                    .domain([d3.min(someData, b => b.healthcare)-1, d3.max(someData, function(d){
                        return d.healthcare
                    })+1])
                    .range([svgHeight - padding, padding])
    // Create the circles on the scatterplot
    var rScale = d3.scaleLinear()
                    .domain([0, d3.max(someData,function(d){
                        return d.healthcare
                    })])
                    .range([5,30])

    // create axis
    var xAxis = d3.axisBottom(xScale)
       
    // use the group element to group shapes 
    svg.append("g")
        .attr('class',"x-axis")
        .attr('transform', `translate(0,${svgHeight - padding})`)
        .call(xAxis)
       

    var yAxis = d3.axisLeft(yScale)
    svg.append("g")
    .attr('class','y-axis')
    .attr('transform',`translate(${padding},0)`)
    .call(yAxis)

    
    // set plotting points
    // create circles
    svg.selectAll('circle')
        // pass in data
        .data(someData)
        .enter()
        // append circle element
        .append('circle')
        // return current value 
        .attr('cx', function(d){
            return xScale(d.poverty)
        })
        .attr('cy', function(d){
            return yScale(d.healthcare)
        })
        // set radius
        .attr('r',"15")
        // function(d){
        //     // set circle size according to the data value
        //     return d.healthcare
        // }
        .attr('fill', '#00bfff')
        // add textbox showing state abbr and poverty/healthcare values on hover
        .append('title')
        .text(function(d){
            return `${d.state} \npoverty: ${d.poverty}\nhealthcare: ${d.healthcare}`
        })


    // create labels
    svg.append('g')
    .attr("class", "labels")
    .selectAll("text")    
    .data(someData)
    .enter()
    .append("text")
    .text(function(d){
        return `${d.abbr}`
    })
    .attr('x', function(d){
        return xScale(d.poverty)
    })
    .attr('y', function(d){
        return yScale(d.healthcare)
    })
    // center text 
    .attr('text-anchor','middle')

    
});

