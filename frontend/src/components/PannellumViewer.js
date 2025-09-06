// The final, correct version of PannellumViewer.js
import React, { useEffect, useRef } from 'react';

// 1. Import BOTH the CSS and the JavaScript for the library
import 'pannellum/build/pannellum.css';
import 'pannellum/build/pannellum.js'; // <-- THIS IS THE MISSING LINE

function PannellumViewer({ image }) {
  const panoramaRef = useRef(null);

  useEffect(() => {
    let viewer = null;

    // We check that window.pannellum exists before we try to use it
    if (panoramaRef.current && window.pannellum) {
      viewer = window.pannellum.viewer(panoramaRef.current, {
        type: "equirectangular",
        panorama: image,
        autoLoad: true,
        showZoomCtrl: false,
        pitch: 10,
        yaw: 180,
        hfov: 110,
      });
    }

    // Cleanup function
    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, [image]);

  return <div ref={panoramaRef} style={{ width: '100%', height: '500px' }} />;
}

export default PannellumViewer;