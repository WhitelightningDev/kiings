import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid, Card, CardContent, CardActions, Checkbox, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel, Select, MenuItem, InputLabel, CircularProgress, Paper, Box, Divider, List, ListItem, ListItemText, CardMedia } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavLogo from '../assets/kings-logo.png';
import { washTypes, additionalServices } from '../functions/washData';
import '../styles/css/homepage.css';

function HomePage() {
  const [selectedWash, setSelectedWash] = useState(null);
  const [additionalSelections, setAdditionalSelections] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState(false);
  const [serviceLocation, setServiceLocation] = useState('come');
  const [address, setAddress] = useState('');

  const handleWashChange = (event) => {
    const selectedWashType = washTypes.find((wash) => wash.name === event.target.value);
    setSelectedWash(selectedWashType);
  };

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAdditionalSelections((prev) => [...prev, value]);
    } else {
      setAdditionalSelections((prev) => prev.filter((service) => service !== value));
    }
  };

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (date) {
        try {
          const response = await axios.get(`http://localhost:3030/api/available-slots?date=${date}`);
          setAvailableSlots(response.data);
          setTime('');
        } catch (error) {
          console.error('Error fetching available slots:', error);
        }
      } else {
        setAvailableSlots([]);
      }
    };

    fetchAvailableSlots();
  }, [date]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = selectedWash ? selectedWash.price : 0;
      additionalSelections.forEach((service) => {
        const serviceData = additionalServices.find((s) => s.name === service);
        if (serviceData) {
          total += serviceData.price;
        }
      });
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [selectedWash, additionalSelections]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const bookingData = {
      firstName,
      lastName,
      carModel,
      washType: selectedWash ? { name: selectedWash.name, price: selectedWash.price, details: selectedWash.details } : {},
      additionalServices: additionalSelections.map((service) => {
        const serviceData = additionalServices.find((s) => s.name === service);
        return {
          name: service,
          price: serviceData ? serviceData.price : 0,
        };
      }),
      date,
      time,
      email,
      subscription: subscription ? 'Monthly Subscription - R300' : 'No Subscription',
      serviceLocation,
      address: serviceLocation === 'come' ? address : '',
    };

    try {
      await axios.post('http://localhost:3030/api/bookings', bookingData);
      toast.success('Booking confirmed!', {
        position: "top-center",
        autoClose: 5000,
      });

      setSelectedWash(null);
      setAdditionalSelections([]);
      setDate('');
      setTime('');
      setFirstName('');
      setLastName('');
      setCarModel('');
      setEmail('');
      setSubscription(false);
      setServiceLocation('come');
      setAddress('');
      setAvailableSlots([]);
    } catch (error) {
      console.error('There was an error making the booking!', error);
      toast.error('Booking failed. Please try again.', {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <ToastContainer />
      
      {/* Card for the title, description, and logo */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <CardMedia
            component="img"
            sx={{ maxWidth: 100, mx: 'auto' }}
            image={NavLogo}
            alt="Logo"
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Book Your Car Wash
          </Typography>
          <Typography variant="subtitle1">
            Fill in the form below to schedule your car wash. Choose your preferred date and time.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Car Wash Details
              </Typography>
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="carModel"
                      label="Car Model"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel id="washType-label">Type of Wash</InputLabel>
                      <Select
                        labelId="washType-label"
                        id="washType"
                        value={selectedWash ? selectedWash.name : ''}
                        label="Type of Wash"
                        onChange={handleWashChange}
                      >
                        <MenuItem value="">
                          <em>Choose...</em>
                        </MenuItem>
                        {washTypes.map((wash) => (
                          <MenuItem key={wash.name} value={wash.name}>
                            {wash.name} - ZAR {wash.price.toFixed(2)}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  {selectedWash && (
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        <strong>Details:</strong> {selectedWash.details}
                      </Typography>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <FormLabel component="legend">Additional Services</FormLabel>
                    {additionalServices.map((service) => (
                      <FormControlLabel
                        key={service.name}
                        control={
                          <Checkbox
                            checked={additionalSelections.includes(service.name)}
                            onChange={handleServiceChange}
                            value={service.name}
                          />
                        }
                        label={`${service.name} - ZAR ${service.price.toFixed(2)}`}
                      />
                    ))}
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="date"
                      label="Preferred Date"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                      <InputLabel id="time-label">Preferred Time</InputLabel>
                      <Select
                        labelId="time-label"
                        id="time"
                        value={time}
                        label="Preferred Time"
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>Choose...</em>
                        </MenuItem>
                        {availableSlots.map((slot) => (
                          <MenuItem key={slot} value={slot}>
                            {slot}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <FormLabel>Service Location</FormLabel>
                      <RadioGroup
                        value={serviceLocation}
                        onChange={(e) => setServiceLocation(e.target.value)}
                      >
                        <FormControlLabel value="come" control={<Radio />} label="Come to Us" />
                        <FormControlLabel value="home" control={<Radio />} label="Home Service" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  {serviceLocation === 'come' && (
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="address"
                        label="Service Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        helperText="(For Home Service only)"
                      />
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={subscription}
                          onChange={(e) => setSubscription(e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Monthly Subscription - ZAR 300"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h6">Total Price: ZAR {totalPrice.toFixed(2)}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Book Now'}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Booking Summary
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={`${firstName} ${lastName}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Car Model" secondary={carModel} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Wash Type" secondary={selectedWash ? selectedWash.name : 'Not Selected'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Additional Services" secondary={additionalSelections.join(', ') || 'None'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Preferred Date" secondary={date || 'Not Selected'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Preferred Time" secondary={time || 'Not Selected'} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Service Location" secondary={serviceLocation === 'come' ? 'Come to Us' : 'Home Service'} />
              </ListItem>
              {serviceLocation === 'come' && (
                <ListItem>
                  <ListItemText primary="Service Address" secondary={address || 'Not Provided'} />
                </ListItem>
              )}
              <ListItem>
                <ListItemText primary="Total Price" secondary={`ZAR ${totalPrice.toFixed(2)}`} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
