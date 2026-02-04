import { useState, useRef, useEffect } from 'react'
import './Map.css';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

const INITIAL_CENTER = [
    -86.8466,
    21.0494
]

const INITIAL_ZOOM = 16

function Map() {
    const mapRef = useRef()
    const mapContainerRef = useRef()

    const [center, setCenter] = useState(INITIAL_CENTER)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)

    useEffect(() => {
        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: center,
            zoom: zoom
        });


        mapRef.current.on('move', () => {
            const mapCenter = mapRef.current.getCenter()
            const mapZoom = mapRef.current.getZoom()

            setCenter([mapCenter.lng, mapCenter.lat])
            setZoom(mapZoom)
        })


        return () => {
            mapRef.current.remove()
        }
    }, []);


    const handleButtonClick = () => {
        mapRef.current.flyTo({
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM
        })
    }

    return (
        <div className="map-wrapper">
            
            <div className='silebar'>
                Lng: {center[0].toFixed(4)} | Lat: {center[1].toFixed(4)} | Z: {zoom.toFixed(2)}
            </div>
            
            <button className='reset-button' onClick={handleButtonClick}>
                Reset
            </button>
            
            <div ref={mapContainerRef} className="map-container" />
        </div>
    );
}

export default Map