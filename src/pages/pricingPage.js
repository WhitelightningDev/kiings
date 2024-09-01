import React from "react";
import { Grid, Card, CardContent, Typography, Container } from "@mui/material";
import { washTypes, additionalServices } from "../functions/washData";

function PricingPage() {
    console.log(washTypes, additionalServices); // Log wash types and additional services

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" component="h1" align="center" color="warning.main" gutterBottom>
                Pricing Page
            </Typography>
            <Grid container spacing={4}>
                {washTypes.map((wash, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {wash.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    ZAR {wash.price.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {wash.details}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h5" component="h2" align="center" color="warning.main" gutterBottom sx={{ mt: 5 }}>
                Additional Services
            </Typography>
            <Grid container spacing={4}>
                {additionalServices.map((service, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    {service.name}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
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
