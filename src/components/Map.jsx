import { useState, useRef, useEffect } from 'react'
import './Map.css'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const INITIAL_CENTER = [-86.8595, 21.1424]
const INITIAL_ZOOM = 10

function Map() {
    const mapRef = useRef(null)
    const mapContainerRef = useRef(null)

    const [center, setCenter] = useState(INITIAL_CENTER)
    const [zoom, setZoom] = useState(INITIAL_ZOOM)

    useEffect(() => {
        if (mapRef.current) return

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/satellite-streets-v12',
            center: INITIAL_CENTER,
            zoom: INITIAL_ZOOM
        })

        mapRef.current.on('move', () => {
            const mapCenter = mapRef.current.getCenter()
            const mapZoom = mapRef.current.getZoom()

            setCenter([mapCenter.lng, mapCenter.lat])
            setZoom(mapZoom)
        })

        new mapboxgl.Marker({ color: '#40E0D0' })
            .setLngLat([-86.8466, 21.0494])
            .addTo(mapRef.current)

        new mapboxgl.Marker({ color: '#FF8000' })
            .setLngLat([-86.9068, 21.1810])
            .addTo(mapRef.current)

        new mapboxgl.Marker({ color: '#008000' })
            .setLngLat([-86.9263, 21.1607])
            .addTo(mapRef.current)

        new mapboxgl.Marker({ color: '#000080' })
            .setLngLat([-86.8347, 21.1384])
            .addTo(mapRef.current)

        new mapboxgl.Marker({ color: '#000000' })
            .setLngLat([-86.8242, 21.2003])
            .addTo(mapRef.current)

        const popup = new mapboxgl.Popup({ offset: 25})
            .setHTML('<div style="color:black"><b>Hola, Soy Juan</b></div>')

        const markerConPopup = new mapboxgl.Marker({ color: '#eeff00' })
            .setLngLat([-86.8476, 21.0483])
            .setPopup(popup)
            .addTo(mapRef.current)

        markerConPopup.togglePopup()

    }, [])

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
    )
}

export default Map