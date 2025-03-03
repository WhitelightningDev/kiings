import React from "react";
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";
import { washTypes, additionalServices } from "../functions/washData";

function PricingPage() {
    return (
        <Container maxWidth="lg" sx={{ mt: 5, pb: 5 }}>
            <Typography variant="h4" component="h1" align="center" color="warning.main" gutterBottom fontWeight="bold">
                Pricing Page
            </Typography>

            {/* Wash Types */}
            <Grid container spacing={4}>
                {washTypes.map((wash, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                height: '100%',
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                "&:hover": { 
                                    transform: "scale(1.05)", 
                                    boxShadow: 6 
                                },
                                background: "linear-gradient(135deg, #ffcc80 30%, #ffb74d 90%)",
                                color: "#fff"
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" component="h2" fontWeight="bold">
                                    {wash.name}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", fontWeight: "medium" }}>
                                    ZAR {wash.price.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    {wash.details}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Additional Services */}
            <Typography 
                variant="h5" 
                component="h2" 
                align="center" 
                color="warning.main" 
                gutterBottom 
                sx={{ mt: 6, fontWeight: "bold" }}
            >
                Additional Services
            </Typography>

            <Grid container spacing={4}>
                {additionalServices.map((service, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card 
                            variant="outlined" 
                            sx={{ 
                                height: '100%',
                                borderRadius: 3,
                                boxShadow: 3,
                                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                                "&:hover": { 
                                    transform: "scale(1.05)", 
                                    boxShadow: 6 
                                },
                                background: "linear-gradient(135deg, #90caf9 30%, #42a5f5 90%)",
                                color: "#fff"
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" component="h2" fontWeight="bold">
                                    {service.name}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ fontSize: "1.2rem", fontWeight: "medium" }}>
                                    ZAR {service.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default PricingPage;
