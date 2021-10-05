import React, {useState, useEffect} from 'react';
import ImageMapper from '../imageMapper/ImageMapper'
import './layout.css'

const Layout = props => {
  const [layoutData, setLayoutData ] = useState();

   useEffect(() => {
      fetch('/visual/get-points').then(res => res.json()).then(data => {
         setLayoutData({name: 'ep6_layout', areas : data['areas']});
      });
   }, []);

   const sensorClickHandler = area =>{
	   console.log("You have clicked on a senor")
	   console.log("Truth Alone Prevails")
	   alert("You clicked the sensor - Send a Request")
   }
  
   /*
   <ImageMapper
				src={URL}
				map={MAP}
				width={500}
				onLoad={() => this.load()}
				onClick={area => this.clicked(area)}
				onMouseEnter={area => this.enterArea(area)}
				onMouseLeave={area => this.leaveArea(area)}
				onMouseMove={(area, _, evt) => this.moveOnArea(area, evt)}
				onImageClick={evt => this.clickedOutside(evt)}
				onImageMouseMove={evt => this.moveOnImage(evt)}
				lineWidth={4}
				strokeColor={"white"}
	/>
   */


  return <div className="layout">
            <ImageMapper src={"/visual/get-layout"} map={layoutData} width={500} onClick={area => sensorClickHandler(area)}/>
         </div>
}

export default Layout;