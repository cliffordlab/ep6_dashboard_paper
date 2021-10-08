svg_h = 600
svg_w = 800
mic_svg = d3.select("body")
        .append("svg")
        .style("width", svg_w+"px")
        .style("height", svg_h+"px");

console.log("Hi")

mics_map("./swarm_regions.json")

var data
var loc_data

async function mics_map(file){
    await fetch(file).then( res => res.json() )
                     .then( json => {objdata = json} )
    console.log(objdata)

    data = [];
    loc_data = [];
    for (var prop in objdata) {
        obj = objdata[prop]
        if (prop >= 13) {prop = parseInt(prop) + 1}
        obj["device"] = prop
        for (let i = 0; i < obj.num_polys; i++) {

            obj["poly"] = obj["polys"][i]
            data.push(Object.assign({},obj))
        }
        loc_data.push(obj)

    }


    // TODO Implement D3 vis here
    var xscale = d3.scaleLinear().domain([-35,35]).range([0,svg_w]);
    var yscale = d3.scaleLinear().domain([-15,25]).range([svg_h,0]);

    // TODO Get a better color space
    var cscale = d3.scaleSequential(["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]).domain([0,40])

    for (let k = 0; k<data.length; k++) {
        poly_coords =  data[k].poly
        path = "M "
        for (let i = 0; i < poly_coords.length; i++) {
            x = xscale(poly_coords[i][0])
            y = yscale(poly_coords[i][1])
            path += x+" "+y+" L "
        }
        path = path.slice(0,-2)+"Z"
        data[k]["path"] = path      
    }


    var regs = mic_svg.selectAll("path")
                  .data(data)
                  .enter()
                  .append('path')
                  .attr('d',(d,i) => {
                      return d.path})
                  .style("fill",(d,i) => {return cscale(i)})
                  .attr("stroke","white")
                  .attr("stroke-width",2)
                  .attr("fill-opacity",0.6)
                  .attr("id",(d,i) => {return "reg_"+d.device})


    
    // Plot the microphones
    var mics = mic_svg.selectAll("circle")
                  .data(loc_data)
                  .enter()
                  .append("circle")
                  .attr("cx", (d,i) => {return xscale(d.state[0])})
                  .attr("cy", (d,i) => {return yscale(d.state[1])})
                  .attr("r", 6)
                  .attr('fill',"yellow")
                  .attr("stroke","black")
                  .attr("stroke-width", 3)
                  .attr("id",(d,i) => {return "dev_"+d.device})
                  .on("mouseover", function(d) {
                      d3.select(this).attr("r",10)
                  })
                  .on("mouseout", function(d) {
                    d3.select(this).attr("r",6)
                })

    // Put the texts
    var nums = mic_svg.selectAll("text")
                  .data(loc_data)
                  .enter()
                  .append("text")
                  .attr("x", (d,i) => {return xscale(d.state[0])})
                  .attr("y", (d,i) => {return yscale(d.state[1])})
                  .text((d,i) => {return d.device})
                  .attr('fill',"black")
                  .attr("stroke","black")
                  .attr("stroke-width", 2)
                  .attr("id",(d,i) => {return "txt_"+d.device})
                  .attr('font-size', 18)
    
    // Add Interactivity
    
    regs.on("mouseover", function(d){
            d3.select(this).attr("fill-opacity",1)
            dev = d.target.id.slice(4)
            d3.select("#dev_"+dev).attr("r",10)
            d3.select("#reg_"+dev).attr("fill-opacity",1)
            d3.select("#txt_"+dev).attr("font-size",30).attr("fill","white")
        })
        .on("mouseout", function(d){
            dev = d.target.id.slice(4)
            d3.select(this).attr("fill-opacity",0.6)
            d3.select("#dev_"+dev).attr("r",6)
            d3.select("#reg_"+dev).attr("fill-opacity",0.6)
            d3.select("#txt_"+dev).attr("font-size",18).attr("fill","black")
        })
        .on("click", function(d) {
            // TODO React Hook
            console.log(this.id)
            // Send commands to Flask to perform queries


        })
}

cam_svg = d3.select("body")
        .append("svg")
        .style("width", svg_w+"px")
        .style("height", svg_h+"px");

cams_map("./swarmunicycle_regions.json")
async function cams_map(file){
    await fetch(file).then( res => res.json() )
                     .then( json => {objdata = json} )
    console.log(objdata)

    data = [];
    loc_data = [];
    for (const prop in objdata) {
        obj = objdata[prop]
        obj["device"] = prop
        for (let i = 0; i < obj.num_polys; i++) {

            obj["poly"] = obj["polys"][i]
            data.push(Object.assign({},obj))
        }
        loc_data.push(obj)

    }


    // TODO Implement D3 vis here
    var xscale = d3.scaleLinear().domain([-35,35]).range([0,svg_w]);
    var yscale = d3.scaleLinear().domain([-15,25]).range([svg_h,0]);

    // TODO Get a better color space
    var cscale = d3.scaleSequential(["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]).domain([0,40])

    for (let k = 0; k<data.length; k++) {
        poly_coords =  data[k].poly
        path = "M "
        for (let i = 0; i < poly_coords.length; i++) {
            x = xscale(poly_coords[i][0])
            y = yscale(poly_coords[i][1])
            path += x+" "+y+" L "
        }
        path = path.slice(0,-2)+"Z"
        data[k]["path"] = path      
    }


    var regs = cam_svg.selectAll("path")
                  .data(data)
                  .enter()
                  .append('path')
                  .attr('d',(d,i) => {
                      return d.path})
                  .style("fill",(d,i) => {return cscale(i)})
                  .attr("stroke","white")
                  .attr("stroke-width",2)
                  .attr("fill-opacity",0.6)
                  .attr("id",(d,i) => {return "reg_"+d.device})


    
    // Plot the cameras
    var cams = cam_svg.selectAll("circle")
                  .data(loc_data)
                  .enter()
                  .append("circle")
                  .attr("cx", (d,i) => {return xscale(d.state[0])})
                  .attr("cy", (d,i) => {return yscale(d.state[1])})
                  .attr("r", 6)
                  .attr('fill',"yellow")
                  .attr("stroke","black")
                  .attr("stroke-width", 3)
                  .attr("id",(d,i) => {return "dev_"+d.device})
                  .on("mouseover", function(d) {
                      d3.select(this).attr("r",10)
                  })
                  .on("mouseout", function(d) {
                    d3.select(this).attr("r",6)
                })


    // Put the texts
    var nums = cam_svg.selectAll("text")
                  .data(loc_data)
                  .enter()
                  .append("text")
                  .attr("x", (d,i) => {return xscale(d.state[0])})
                  .attr("y", (d,i) => {return yscale(d.state[1])})
                  .text((d,i) => {return d.device})
                  .attr('fill',"black")
                  .attr("stroke","black")
                  .attr("stroke-width", 2)
                  .attr("id",(d,i) => {return "txt_"+d.device})
                  .attr('font-size', 18)
    
    // Add Interactivity
    
    regs.on("mouseover", function(d){
            d3.select(this).attr("fill-opacity",1)
            dev = d.target.id.slice(4)
            d3.select("#dev_"+dev).attr("r",10)
            d3.select("#reg_"+dev).attr("fill-opacity",1)
            d3.select("#txt_"+dev).attr("font-size",30).attr("fill","white")
        })
        .on("mouseout", function(d){
            dev = d.target.id.slice(4)
            d3.select(this).attr("fill-opacity",0.6)
            d3.select("#dev_"+dev).attr("r",6)
            d3.select("#reg_"+dev).attr("fill-opacity",0.6)
            d3.select("#txt_"+dev).attr("font-size",18).attr("fill","black")
        })
        .on("click", function(d) {
            // TODO React Hook
            console.log(this.id)
            // Send commands to Flask to perform queries


        })
}
