"use client"
import dynamic from 'next/dynamic'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl'; 


mapboxgl.accessToken = 'pk.eyJ1Ijoic3RvY2s0NCIsImEiOiJjbHE0amx3aXEwODQyMmlsb3RnNHk0MDN1In0.qWALc9kC_uuNNBucnTeauw'; 
 
export  default function MapScreen(){ 


    
    const mapContainerRef = useRef<HTMLDivElement | null>(null); 
 
    useEffect(() => { 
        if (mapContainerRef.current) { 

            const map = new mapboxgl.Map({ 
                container: mapContainerRef.current, 
                style: 'mapbox://styles/stock44/clwwmpmk7003501nm1y6eh0q4', 
                center: [-100.31, 25], // starting position [lng, lat] 
                zoom: 8, // starting zoom 
            }); 
            
			
            map.on('load', () => {
                // Add a source

				//Resago social
                map.addSource('resago-social', {
                  type: 'vector',
                  url: 'mapbox://stock44.1sgbxxpi'
                });
				
				
                // Add a layer
                map.addLayer({
                  'id': 'rezago',
                  'type': 'fill',
                  'source' : 'resago-social',
                  'source-layer' : 'Grado_de_resago_social_nl_1-2k7zy0',
                  //'filter': '',
                  //'layout':   ,
                  'maxzoom': 20,
                  //'metadata'   ,
                  'minzoom': 7 ,
                  'paint': {
					'fill-color': [
						"match",
						["get", "GRS NLFiel"],
						["Muy alto"],
						"rgba(224, 0, 0, 0.59)",
						["Alto"],
						"#87401d",
						["Medio"],
						"rgba(154, 133, 40, 0.7)",
						"rgba(0, 0, 0, 0)"
					  ],
                 
                    //'fill' : "#000000",
                    //'circle-radius': 1000,
                    //'circle-color': '#007cbf',    
                    //'line-color': "#FFC0CB"
                  },
                   //'slot':  ,

                });
				
				//Area sin cubrimiento
				map.addSource('area-sin-cubrimiento-de-sitio', {
					type: 'vector',
					url: 'mapbox://stock44.2hei66sb'
				  });

                map.addLayer({
					'id': 'area-sin-cubrimiento-de-sitio',
					'type': 'fill',
					
					'source' : 'area-sin-cubrimiento-de-sitio',
					'source-layer' : 'Area_Sin_Cubrimiento_de_Sitio-3mxqpk',
					//'filter': '',
					//'layout':   ,
					'maxzoom': 20,
					//'metadata'   ,
					'minzoom': 7 ,
					'paint': {
					  'fill-color': "rgba(220, 40, 40, 0.07)",
					  'fill-outline-color': "rgba(255, 117, 117, 0.6)"
					  //'fill' : "#000000",
					  //'circle-radius': 1000,
					  //'circle-color': '#007cbf',    
					  //'line-color': "#FFC0CB"
					},
					 //'slot':  ,
  
				  });

				
				map.addSource('feminicidios-periodicos', {
				type: 'vector',
				url: 'mapbox://stock44.19vijq6m'
				});

                map.addLayer({
					'id': 'feminicidios-periodicos',
					'type': 'circle',
					
					'source' : 'feminicidios-periodicos',
					'source-layer' : 'Feminicidios_de_Periodicos_ce-1wv0e9',
					//'filter': '',
					//'layout':   ,
					'maxzoom': 20,
					//'metadata'   ,
					'minzoom': 7 ,
					'paint': {

						
					  //'fill' : "#000000",
					  'circle-radius': [
						"interpolate",
						["linear"],
						["get", "NUMPOINTS"],
						1,
						5,
						15,
						20
					  ],
					  'circle-color': '#ec5151',  
					  'circle-blur' : 1  
					  
					},
					 //'slot':  ,
  
				});


				map.addSource('feminicidios-fiscalia', {
					type: 'vector',
					url: 'mapbox://stock44.2k4nz34n'
					});
	
					map.addLayer({
						'id': 'feminicidios-fiscalia',
						'type': 'circle',
						
						'source' : 'feminicidios-fiscalia',
						'source-layer' : 'Feminicidios_de_Fiscalia_cent-3rdfpy',
						//'filter': '',
						//'layout':   ,
						'maxzoom': 20,
						//'metadata'   ,
						'minzoom': 7 ,
						'paint': {
	
							
						  //'fill' : "#000000",
						  'circle-radius': [
							"interpolate",
							["linear"],
							["get", "NUMPOINTS"],
							1,
							5,
							15,
							20
						  ],
						  'circle-color': '#ec5151',  
						  'circle-blur' : 1  
						  
						},
						 //'slot':  ,
	  
					});

				

              });


			  

              //https://docs.mapbox.com/style-spec/reference/layers/#minzoom
              //https://docs.mapbox.com/data/tilesets/guides/
              //https://docs.mapbox.com/mapbox-gl-js/api/sources/
              //https://docs.mapbox.com/mapbox-gl-js/api/sources/
              //https://docs.mapbox.com/mapbox-gl-js/example/vector-source/
              //https://docs.mapbox.com/help/glossary/source-layer/
            return () => map.remove(); 
        } 
    }, []); 
    return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />; 
}; 
