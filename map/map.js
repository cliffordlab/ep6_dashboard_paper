svg_h = 600
svg_w = 800
svg = d3.select("body")
        .append("svg")
        .style("width", svg_w+"px")
        .style("height", svg_h+"px");

console.log("Hi")

main("./swarm_regions.json")

var data
var loc_data

async function main(file){
    await fetch(file).then( res => res.json() )
                     .then( json => {objdata = json} )
    console.log(objdata)

    data = [];
    loc_data = [];
    for (const prop in objdata) {
        obj = objdata[prop]
        obj["device"] = prop
        console.log(obj.num_polys)
        for (let i = 0; i < obj.num_polys; i++) {

            obj["poly"] = obj["polys"][i]
            data.push(Object.assign({},obj))
        }
        loc_data.push(obj)

    }


    // TODO Implement D3 vis here
    var xscale = d3.scaleLinear().domain([-35,35]).range([0,svg_w]);
    var yscale = d3.scaleLinear().domain([-15,25]).range([svg_h,0]);
    

    for (let k = 0; k<data.length; k++) {
        poly_coords =  data[k].poly
        path = "M "
        console.log(poly_coords.length)
        for (let i = 0; i < poly_coords.length; i++) {
            x = xscale(poly_coords[i][0])
            y = yscale(poly_coords[i][1])
            path += x+" "+y+" L "
        }
        path = path.slice(0,-2)+"Z"
        data[k]["path"] = path      
    }


    
    
    // Plot the microphones
    var mics = svg.selectAll("circle")
                  .data(loc_data)
                  .enter()
                  .append("circle")
                  .attr("cx", (d,i) => {return xscale(d.state[0])})
                  .attr("cy", (d,i) => {return yscale(d.state[1])})
                  .attr("r", 6)
                  .attr('fill',"yellow")
                  .attr("stroke","black")
                  .attr("stroke-width", 3)

    // Put the texts
    var nums = svg.selectAll("text")
                  .data(loc_data)
                  .enter()
                  .append("text")
                  .attr("x", (d,i) => {return xscale(d.state[0])})
                  .attr("y", (d,i) => {return yscale(d.state[1])})
                  .text((d,i) => {return d.device})
                  .attr('fill',"white")
                  .attr("stroke","grey")
                  .attr("stroke-width", 2)
                  .attr('font-size', 25)
    
}

console.log("Ho")