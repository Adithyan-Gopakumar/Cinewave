import React from 'react';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Button, Card, Form } from 'react-bootstrap';

export default function PaymentCard({ createBooking }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async event => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: window.location.href
            },
            redirect: 'if_required'
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.error(result.error.message);
        } else if (result.paymentIntent.id) {
            createBooking(result.paymentIntent);
        }
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit}>
                <Card.Body>
                    <PaymentElement />
                </Card.Body>
                <Card.Footer>
                    <Button type={'submit'} variant={'primary'}>
                        Pay & Book
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    );
}
