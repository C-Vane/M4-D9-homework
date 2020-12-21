import React from 'react'
import { Alert, Button, Col, Form, Row, Spinner, Container } from 'react-bootstrap'


class CommentArea extends React.Component {
    state = {
        comment: {
            rate: "1",
            name: "",
            comment: "",
            
        },
        errMessage: "",
        loading:false,
        succMessage:"",
    }

updateComment = (e) => {
    let comment = {...this.state.comment }
    let eachId = e.currentTarget.id

    comment[eachId] = e.currentTarget.value

    this.setState({comment: comment})
}


    submitComment = async(e) => {
        e.preventDefault();
        this.setState({ loading: true })
        try {
            let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/", 
            {
                method: "POST",
                body: JSON.stringify({...this.state.comment,elementId:this.props.book.asin}),
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI2NzAxZTk4MzViMDAwMTc1ODRlZjAiLCJpYXQiOjE2MDU3OTE3NzQsImV4cCI6MTYwNzAwMTM3NH0.-0vWsUEx5v-kF_LhWXdQJ_eFcmASdAyALwPqcgnFYe8"
                })
            })
            if(response.ok) {
               
                this.setState({
                    comment: {
                        rate: "1",
                        name: "",
                        comment: "",
                        elementId:""
                    },
                    errMessage: "",
                    loading: false,
                    succMessage:"",
                })
            } else {
                console.log("error")
                let error = await response.json()
                this.setState({
                    errMessage: error.message,
                    loading: false
                })
            }
        } catch (e) {
            console.log(e)
            this.setState({
                errMessage: e.message,
                loading: false,
            })
        }
        
        this.props.fetchComments(this.props.book.asin)
    }
    render() {
        return (
            <div>
            <Container>
                <Form className="title mb-5 p-5" onSubmit={this.submitComment}>
                <h3 className="mb-4">Leave a Comment</h3>
                    <Row>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label htmlFor="rate">Rate this genre</Form.Label>
                                    <Form.Control
                                    as="select"
                                    name="rate"
                                    id="rate"
                                    value={this.state.comment.rate}
                                    onChange={this.updateComment}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Form.Control>
                                </Form.Group>
                        </Col>
                      
                            <Col md={12}>
                                <Form.Group>
                                    <Form.Label htmlFor="name">Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Your name"
                                        value={this.state.comment.name}
                                        onChange={this.updateComment}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={7}>
                                <Form.Group>
                                    <Form.Label htmlFor="comment">Add your Comment</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="comment"
                                        id="comment"
                                        placeholder="Comment"
                                        required
                                        value={this.state.comment.comment}
                                        onChange={this.updateComment}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="danger" type="submit">Post</Button>
            {
                    this.state.succMessage && (
                        <Alert variant = "success">
                            YEEEEEEEEEETED
                            {this.state.succMessage} 
                        </Alert>
                    )
                }
                {
                    this.state.errMessage && (
                        <Alert variant = "danger">
                            Please fill out all fields! 
                            {this.state.errMessage}
                        </Alert>
                    )
                }
                {
                    this.state.loading && (
                        <div className=" justify-content-center mt-2">
                                posting your comment...
                                <div className="ml-4 mt-3">
                                    <Spinner animation="border" variant="danger" />
                                </div>
                            </div>
                    )
                }
                </Form>
            </Container>
            </div>
            )
        }
    }


export default CommentArea