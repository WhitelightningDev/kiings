import React from "react";
import { washTypes, additionalServices } from "../functions/washData";

function PricingPage() {
    console.log(washTypes, additionalServices); // Add this line

    return (
        <div className="container mt-5">
            <h1 className="text-center text-warning mb-4">Pricing Page</h1>
            <div className="row">
                {washTypes.map((wash, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{wash.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">ZAR {wash.price.toFixed(2)}</h6>
                                <p className="card-text">{wash.details}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="text-center text-warning mb-4 mt-5">Additional Services</h2>
            <div className="row">
                {additionalServices.map((service, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{service.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">ZAR {service.price.toFixed(2)}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PricingPage;
