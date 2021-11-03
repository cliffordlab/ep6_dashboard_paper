import React, {useState, useEffect, useRef} from 'react'
import {select, scaleLinear, scaleSequential} from 'd3';

import swarm_unicycle_regions from './swarmunicycle_regions.json'
import './cameramap.css'

import { theme } from "../../theme/Themes";
import { ThemeContext } from "../../theme/ThemeProvider";

export default function CameraMap(props) {

    
    const mapClickHandler = (region_id) => {
        console.log(region_id)     
        props.onclick({region_id : region_id, showMap : true});
    }

    const { mode } = React.useContext(ThemeContext);
    const styles = cameramapStyles(mode);

    const svg_h = props.height
    const svg_w = props.width

    useEffect( () => {
        console.log("Hi")

        select(".cameraMap").selectAll("*").remove()
        
        const cam_svg = select(".cameraMap").append("svg").style("width", svg_w+"px").style("height", svg_h+"px");


        cams_map(swarm_unicycle_regions)
        async function cams_map(objdata){
            console.log(objdata)

            let data = [];
            let loc_data = [];
            for (const prop in objdata) {
                var obj = objdata[prop]
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


            var regs = cam_svg.selectAll("path")
                        .data(data)
                        .enter()
                        .append('path')
                        .attr('d',(d,i) => {
                            return d.path})
                        .style("fill",(d,i) => {return cscale(i)})
                        .attr("stroke", theme[mode].color)
                        .attr("stroke-width",2)
                        .attr("fill-opacity",0.5)
                        .attr("id",(d,i) => {return "reg_"+d.device})


            
            // Plot the cameras
            var cams = cam_svg.selectAll("circle")
                        .data(loc_data)
                        .enter()
                        .append("circle")
                        .attr("cx", (d,i) => {return xscale(d.state[0])})
                        .attr("cy", (d,i) => {return yscale(d.state[1])})
                        .attr("r", 5)
                        .attr('fill',"yellow")
                        .attr("stroke", theme[mode].color)
                        .attr("stroke-width", 1)
                        .attr("id",(d,i) => {return "dev_"+d.device})
                        .on("mouseover", function(d) {
                            select(this).attr("r",10)
                        })
                        .on("mouseout", function(d) {
                            select(this).attr("r",6)
                        })


            // Put the texts
            var nums = cam_svg.selectAll("text")
                        .data(loc_data)
                        .enter()
                        .append("text")
                        .attr("x", (d,i) => {return xscale(d.state[0])})
                        .attr("y", (d,i) => {return yscale(d.state[1])})
                        .text((d,i) => {return d.device})
                        .attr('fill', theme[mode].color)
                        .attr("stroke", theme[mode].color)
                        .attr("stroke-width", 0.5)
                        .attr("id",(d,i) => {return "txt_"+d.device})
                        .attr('font-size', 18)
            

            // Add Interactivity
                regs.on("mouseover", function(d){
                    select(this).attr("fill-opacity",1)
                    var dev = d.target.id.slice(4)
                    select("#dev_"+dev).attr("r",10).attr("fill", "red")
                    select("#reg_"+dev).attr("fill-opacity",1)
                    select("#txt_"+dev).attr("font-size",30).attr("fill","white")
                })
                .on("mouseout", function(d){
                    var dev = d.target.id.slice(4)
                    select(this).attr("fill-opacity",0.6)
                    select("#dev_"+dev).attr("r",6).attr("fill", "yellow")
                    select("#reg_"+dev).attr("fill-opacity",0.6)
                    select("#txt_"+dev).attr("font-size",18).attr("fill","black")
                })
                .on("click", function(d) {
                    // TODO React Hook
                    console.log(this.id)
                    mapClickHandler(this.id)
                    // Send commands to Flask to perform queries
                })
            }
    }, [])



    return (
        <div className="cameraMap">            
        </div>
    )
}

const cameramapStyles = (mode) => ({
    cameramap: {
        flex: 4,
        backgroundColor: theme[mode].backgroundColor,
        color: theme[mode].color
    },
 
    cameramapchartWrapper: {
        height: "50vh",
        width: "95%",
        marginRight: "15px",
    },
 });