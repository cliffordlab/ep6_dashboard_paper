d3.select("body").append("p").text("Hello");

console.log("Hi")

main("./swarm_regions.json")

async function main(file){
    await fetch(file).then( res => res.json() )
                     .then( json => {data = json} )
    console.log(data)
}

console.log("Ho")