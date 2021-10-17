import React, {useState, useEffect, useRef} from 'react'
import {select, scaleLinear, scaleSequential} from 'd3';

import swarm_data from './swarm_regions.json'; 
import './rpimap.css'

<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />


export default function RpiMap(props) {

    const mapClickHandler = (region_id) => {
        console.log(region_id)     
        props.onclick({region_id : region_id, showMap : true});
    }


    const svg_h = props.height
    const svg_w = props.width

    const ref = useRef()

    useEffect( () => {
        select(".RpiMap").selectAll("*").remove()

        const mic_svg = select(".RpiMap").append("svg").style("width", svg_w+"px").style("height", svg_h+"px");

        mics_map(swarm_data)

        async function mics_map(objdata){

            let data = [];
            let loc_data = [];
            
            for (var prop in objdata) {
                let obj = objdata[prop]
                if (prop >= 13) {prop = parseInt(prop) + 1}
                obj["device"] = prop
                for (let i = 0; i < obj.num_polys; i++) {

                    obj["poly"] = obj["polys"][i]
                    data.push(Object.assign({},obj))
                }
                loc_data.push(obj)

            }

            // TODO Implement D3 vis here
            var xscale = scaleLinear().domain([-35,35]).range([0,svg_w]);
            var yscale = scaleLinear().domain([-15,25]).range([svg_h,0]);

            // TODO Get a better color space
            var cscale = scaleSequential(["#4e79a7","#f28e2c","#e15759","#76b7b2","#59a14f","#edc949","#af7aa1","#ff9da7","#9c755f","#bab0ab"]).domain([0,40])


            for (let k = 0; k<data.length; k++) {
                var poly_coords =  data[k].poly
                path = "M "
                for (let i = 0; i < poly_coords.length; i++) {
                    var x = xscale(poly_coords[i][0])
                    var y = yscale(poly_coords[i][1])
                    path += x+" "+y+" L "
                }
                var path = path.slice(0,-2)+"Z"
                data[k]["path"] = path      
            }

            // Plotting Regions
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
                            select(this).attr("r",10)
                        })
                        .on("mouseout", function(d) {
                            select(this).attr("r",6)
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
                    select(this).attr("fill-opacity",1)
                    var dev = d.target.id.slice(4)
                    select("#dev_"+dev).attr("fill", "blue")
                    select("#reg_"+dev).attr("fill-opacity",1)
                    select("#txt_"+dev).attr("font-size",30).attr("fill","white")
                })
                .on("mouseout", function(d){
                    var dev = d.target.id.slice(4)
                    select(this).attr("fill-opacity",0.6)
                    select("#dev_"+dev).attr("fill","green")
                    select("#reg_"+dev).attr("fill-opacity",0.6)
                    select("#txt_"+dev).attr("font-size",18).attr("fill","black")
                })
                .on("click", function(d) {
                    // TODO React Hook
                    console.log(this.id)
                    mapClickHandler(this.id);
                    // Send commands to Flask to perform queries


                })
                console.log("Hey Gatech")
        }
    
    }, [])



    return (
        <div className="RpiMap">
        </div>
    )
}
