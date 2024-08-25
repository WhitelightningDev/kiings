import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function FAQsPage() {
    const faqs = [
        { question: "How do I book a car wash?", answer: "You can book a car wash through our website by selecting your preferred wash type, additional services, date, and time. Simply fill out the form with your details and submit your booking." },
        { question: "What types of car wash services do you offer?", answer: "We offer a variety of services including 'Wash n Go', 'Wash & Vacuum', and 'Wash & Vacuum for Large SUVs & Bakkies'. You can also choose additional services like tire polish, car polish, and engine cleaning." },
        { question: "How much do your car wash services cost?", answer: "Our prices range from ZAR 60 for a basic 'Wash n Go' to ZAR 150 for a 'Wash & Vacuum' for large vehicles. Additional services have their own pricing." },
        { question: "Can I choose a specific time for my car wash?", answer: "Yes, you can select a preferred date and time when making your booking. Available time slots will be shown based on your selected date." },
        { question: "Do you offer any subscription plans?", answer: "Yes, we offer a monthly car wash subscription for ZAR 300. This subscription includes a set number of washes per month and discounts on additional services." },
        { question: "What happens if I need to cancel or reschedule my booking?", answer: "You can cancel or reschedule your booking by contacting us at least 24 hours before your scheduled time. Please note that cancellations or changes within 24 hours may incur a fee." },
        { question: "Do you offer mobile car wash services?", answer: "Currently, we do not offer mobile car wash services. All services are performed at our physical location." },
        { question: "What payment methods do you accept?", answer: "We accept various payment methods including credit/debit cards, mobile payments, and cash. Payment can be made online or in person." },
        { question: "Is there a loyalty program for regular customers?", answer: "Yes, we have a loyalty program that rewards regular customers with discounts and special offers. Please inquire at our location for more details." },
        { question: "How long does a car wash typically take?", answer: "A standard car wash usually takes between 20 to 45 minutes, depending on the service type and any additional services selected." },
        { question: "What should I do if I am not satisfied with the service?", answer: "Your satisfaction is our priority. If you're not satisfied with our service, please contact us immediately, and we'll do our best to resolve the issue." },
        { question: "Are your cleaning products environmentally friendly?", answer: "Yes, we use environmentally friendly products that are safe for both your vehicle and the environment." },
        { question: "Can I drop off my car and pick it up later?", answer: "Yes, you can drop off your car and pick it up at a later time. We will contact you once your vehicle is ready for pickup." },
        { question: "Do I need to be present during the car wash?", answer: "No, you do not need to be present. You can leave your car with us, and we'll take care of the rest. We'll notify you when the car is ready." },
        { question: "What should I do to prepare my car for a wash?", answer: "There’s no special preparation needed. Just ensure that your car is accessible and that any personal items are removed before the wash." }
    ];

    return (
        <div className="container mt-5 mb-5">
            <h1 className="text-center text-warning mb-4">Frequently Asked Questions</h1>
            <Accordion>
                {faqs.map((faq, index) => (
                    <Accordion.Item eventKey={String(index)} key={index}>
                        <Accordion.Header>{faq.question}</Accordion.Header>
                        <Accordion.Body>{faq.answer}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
}

export default FAQsPage;
