import React, {useState, useEffect} from 'react';
import ImageMapper from '../imageMapper/ImageMapper'
import './layout.css'

const Layout = props => {
  var URL = "https://c1.staticflickr.com/4/4052/4503898393_303cfbc9fd_b.jpg" ;
  const [layoutData, setLayoutData ] = useState();

   useEffect(() => {
      fetch('/visual/get-points').then(res => res.json()).then(data => {
         setLayoutData({name: 'my-name', areas : data['areas']});
      });
   }, []);

  
  return <div className="layout">
            <ImageMapper src={"/visual/get-layout"} map={layoutData} width={500} />
         </div>
}

export default Layout;