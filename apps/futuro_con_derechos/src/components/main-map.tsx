"use client"
import dynamic from 'next/dynamic'
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGl, {Map} from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl'; 


mapboxgl.accessToken =  process.env.NEXT_PUBLIC_MAPBOX_TOKEN!; 


export type MainMapProps = {

	readonly className ? : string
	readonly showFiscalia : boolean
}


const monterreyLat = 25.67;
const monterreyLng = -100.32;


export  default function MapScreen(props: MainMapProps){ 

	const {className, showFiscalia} = props
    
    const mapContainerRef = useRef<HTMLDivElement | null>(null); 
	

	const [isLoaded, setIsLoaded] = useState(false);


	const mapRef = useRef<Map>()


	const [lng, setLng] = useState(monterreyLng);
	const [lat, setLat] = useState(monterreyLat);
	const [zoom, setZoom] = useState(10.5);

	useEffect( ()=> {

		if(!mapRef.current) return

		if(showFiscalia)
		{

			mapRef.current.addLayer({
				'id': 'feminicidios-fiscalia',
				'type': 'circle',
				
				'source' : 'feminicidios-fiscalia',
				'source-layer' : 'Feminicidios_de_Fiscalia_cent-3rdfpy',
				'maxzoom': 20,
				'minzoom': 7 ,
				'paint': {
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
	
			});	
			return () => {
				mapRef.current?.removeLayer("feminicidios-fiscalia")
			}
		}

		mapRef.current.addLayer({
			'id': 'feminicidios-periodicos',
			'type': 'circle',
			
			'source' : 'feminicidios-periodicos',
			'source-layer' : 'Feminicidios_de_Periodicos_ce-1wv0e9',
			'maxzoom': 20,
			'minzoom': 7 ,
			'paint': {
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
		});

		return () => {
			mapRef.current?.removeLayer("feminicidios-periodicos")
		}



	}, [showFiscalia, isLoaded])

    useEffect(() => { 
        if (mapContainerRef.current) { 

            mapRef.current = new mapboxgl.Map({ 
                container: mapContainerRef.current, 
                style: 'mapbox://styles/stock44/clwwmpmk7003501nm1y6eh0q4', 
				center: [lng, lat],
				maxBounds: [
					[monterreyLng - 2, monterreyLat - 3],
					[monterreyLng + 2, monterreyLat + 3],
				],
				zoom: zoom,
            }); 
            
			const map = mapRef.current

            map.on('load', () => {
                // Add a source

				//Resago social
                map.addSource('resago-social', {
                  type: 'vector',
                  url: 'mapbox://stock44.1sgbxxpi'
                });

				//Area sin cubrimiento
				map.addSource('area-sin-cubrimiento-de-sitio', {
					type: 'vector',
					url: 'mapbox://stock44.2hei66sb'
				  });
				
				map.addSource('feminicidios-periodicos', {
				type: 'vector',
				url: 'mapbox://stock44.19vijq6m'
				});

				map.addSource('feminicidios-fiscalia', {
					type: 'vector',
					url: 'mapbox://stock44.2k4nz34n'
					});
				
				
				setIsLoaded(true);


                // Add a layer
                map.addLayer({
                  'id': 'rezago',
                  'type': 'fill',
                  'source' : 'resago-social',
                  'source-layer' : 'Grado_de_resago_social_nl_1-2k7zy0',
                  'maxzoom': 20,
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
                  },

                });
				
				
                map.addLayer({
					'id': 'area-sin-cubrimiento-de-sitio',
					'type': 'fill',
					'source' : 'area-sin-cubrimiento-de-sitio',
					'source-layer' : 'Area_Sin_Cubrimiento_de_Sitio-3mxqpk',
					'maxzoom': 20,
					'minzoom': 7 ,
					'paint': {
					  'fill-color': "rgba(220, 40, 40, 0.07)",
					  'fill-outline-color': "rgba(255, 117, 117, 0.6)"
					},
  
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
    return <div ref={mapContainerRef} className={className} />; 
}; 
