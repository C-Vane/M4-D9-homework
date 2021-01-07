import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, ToggleButtonGroup, ToggleButton, Spinner } from 'react-bootstrap';
import CommentsList from './CommentsList';
import "./Comments.css"
import { postFunction } from '../CRUDFunctions';


class Comments extends React.Component {
    state = {
        errMessage: '',
        loading: false,
        refreshList: false,
        review: {
            comment: '',
            rate: "0",
            elementID: "",
            userId: this.props.userId
        },
    }

    addComment = async (event) => {
        event.preventDefault()
        this.setState({ loading: true })
        const { review } = this.state;
        const response = await postFunction("reviews", review)
        if (response) {

            this.props.rated()
            this.setState({
                review: {
                    comment: '',
                    rate: "0",
                    elementID: "",
                    userId: this.props.userId
                },
                errMessage: '',
                loading: false,
                refreshList: true,
            })
        } else {
            console.log('an error occurred')
            //let error = response.json()
            this.setState({
                loading: false,
            })
        }

    }

    commentSection = () => {
        const { rate, comment } = this.state;
        return (
            <Form onSubmit={this.addComment} className="col col-12 m-0 ">
                <h4>Your Review</h4>
                <Col>
                    <Form.Group >
                        <Form.Control
                            className="commentBox"
                            as="textarea"
                            rows="3"
                            name="comment"
                            placeholder="Write your comment..."
                            value={comment}
                            onChange={this.updateReviewField}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Form.Group id="rate" className="d-flex">
                                <ToggleButtonGroup type="checkbox" name="rate" value={rate} onChange={this.handelRate}>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={1}>☆</ToggleButton>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={2}>☆</ToggleButton>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={3}>☆</ToggleButton>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={4}>☆</ToggleButton>
                                    <ToggleButton variant="outline-warning font-weight-bold" value={5}>☆</ToggleButton>
                                </ToggleButtonGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <Button type="submit" variant="primary">Submit</Button>
            </Form>
        );
    }
    handelRate = (val) => {
        const review = { ...this.state.review };
        review.rate = val.length.toString();
        this.setState({ review });
    };
    updateReviewField = (event) => {
        const { id } = this.props;
        const review = { ...this.state.review }
        const name = event.currentTarget.name;
        review.elementID = id;
        review[name] = event.currentTarget.value
        this.setState({ review });
    }

    render() {
        const { id, onHide, rate, userId } = this.props;

        return (
            <Container
                size="lg"
                aria-labelledby="movieComments"
            >
                <div key={id} onClick={onHide}>

                    <Row>


                        {rate && <Col className="m-1">
                            {this.commentSection()}
                            {
                                this.state.loading && (
                                    <div className="d-flex justify-content-center my-5">
                                        Saving comment, please wait
                                        <div className="ml-2">
                                            <Spinner animation="border" variant="success" />
                                        </div>
                                    </div>
                                )
                            }
                        </Col>
                        }


                        <Col>
                            <CommentsList id={id} userId={userId} refreshList={this.state.refreshList} />
                        </Col>



                    </Row>
                </div>
            </Container>
        );
    }
}


Comments.propTypes = { id: PropTypes.string, onHide: PropTypes.func, show: PropTypes.bool };


export default Comments;