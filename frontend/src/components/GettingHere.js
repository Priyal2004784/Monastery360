import React from 'react';
import './GettingHere.css';

function GettingHere() {
    return (
        <div className="getting-here-section">
            <h3 className="section-heading">Getting Here</h3>
            <div className="getting-here-grid">
                <div className="transport-mode">
                    <h4>By Air</h4>
                    <p>The nearest airport is Pakyong Airport (PYG) in Sikkim, with limited connectivity. The major nearby airport is Bagdogra International Airport (IXB) in West Bengal, which is well-connected to major Indian cities.</p>
                </div>
                <div className="transport-mode">
                    <h4>By Rail</h4>
                    <p>The nearest major railway station is New Jalpaiguri (NJP) in Siliguri, West Bengal. From NJP, you can hire taxis or take shared jeeps to various parts of Sikkim.</p>
                </div>
                <div className="transport-mode">
                    <h4>By Road</h4>
                    <p>Sikkim is well-connected by road from Siliguri. National Highway 10 (NH10) is the main artery connecting the state to the rest of the country. Taxis and buses are readily available.</p>
                </div>
                <div className="transport-mode">
                    <h4>Local Transport</h4>
                    <p>Within Sikkim, taxis and shared jeeps are the primary modes of transport for reaching different monasteries. It's advisable to book in advance, especially during peak tourist season.</p>
                </div>
            </div>
        </div>
    );
}

export default GettingHere;