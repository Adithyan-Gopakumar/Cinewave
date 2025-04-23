import React from 'react';
import { Badge, Card, Col, ListGroup, Row, Stack } from 'react-bootstrap';

import { formatCurrency, formatDate, formatTime } from '../common/util';

export default function BookingDetailInfo({ bookingDetail }) {
    const totalSeats =
        bookingDetail.premium_seat_count + bookingDetail.executive_seat_count + bookingDetail.normal_seat_count;

    return (
        <Row>
            <Col>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item variant="secondary">Seats</ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between">
                            <small>Premium</small>
                            <Stack direction="horizontal" gap={2}>
                                <Badge bg="secondary">{bookingDetail.premium_seat_count}</Badge>
                                <Badge bg="secondary">{formatCurrency(bookingDetail.premium_seat_cost)}</Badge>
                            </Stack>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between">
                            <small>Executive</small>
                            <Stack direction="horizontal" gap={2}>
                                <Badge bg="secondary">{bookingDetail.executive_seat_count}</Badge>
                                <Badge bg="secondary">{formatCurrency(bookingDetail.executive_seat_cost)}</Badge>
                            </Stack>
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between">
                            <small>Normal</small>
                            <Stack direction="horizontal" gap={2}>
                                <Badge bg="secondary">{bookingDetail.normal_seat_count}</Badge>
                                <Badge bg="secondary">{formatCurrency(bookingDetail.normal_seat_cost)}</Badge>
                            </Stack>
                        </ListGroup.Item>
                        <ListGroup.Item variant="secondary" className="d-flex justify-content-between">
                            <small>Total</small>
                            <Stack direction="horizontal" gap={2}>
                                <Badge bg="primary">{totalSeats}</Badge>
                                <Badge bg="primary">{formatCurrency(bookingDetail.total_cost)}</Badge>
                            </Stack>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <br />
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <small>Screen</small>
                            <br />
                            {bookingDetail.screen.name}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <small>Show Date</small>
                            <br />
                            {formatDate(bookingDetail.show_timing.date)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <small>Show Time</small>
                            <br />
                            {formatTime(bookingDetail.show_timing.time)}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                <br />
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <small>User</small>
                            <br />
                            {`${bookingDetail.user.first_name} ${bookingDetail.user.last_name}`}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <small>Booking Date</small>
                            <br />
                            {formatDate(bookingDetail.booking_date)}
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}
