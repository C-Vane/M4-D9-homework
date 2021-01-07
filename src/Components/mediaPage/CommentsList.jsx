import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import PropTypes from 'prop-types';
import { Card, ListGroup, Button, Spinner, Container, Form, Row } from 'react-bootstrap';
import { getFunction, deleteFunction, putFunction } from '../CRUDFunctions';


class CommentsList extends React.Component {
    state = {
        loading: false,
        reviews: [],
        status: false,
        reload: false,
        currentReview: {},
        showEdit: false
    }
    book_review = []
    users = []
    componentDidMount = () => {
        const { id } = this.props;
        this.fetchComments(id);
        this.setState({ reload: this.props.refreshList })
    }
    componentDidUpdate = (p, state) => {
        if (state !== this.state) this.users = []
        if (p !== this.props) this.setState({ reload: this.props.refreshList })
    }
    fetchComments = async (id) => {
        this.setState({ loading: true })
        const reviews = await getFunction("reviews/" + id)
        if (reviews) {
            this.setState({ reviews: reviews, loading: false, status: true })
        } else {
            this.setState({ loading: false, status: true })
        }
    }
    deleteComment = async (e) => {
        const id = e.currentTarget.id;
        this.setState({
            loading: true,
        })
        const response = await deleteFunction(`reviews/${this.props.id}/${id}`)
        if (response) {
            this.setState({
                loading: false,
            })
            this.fetchComments(this.props.id);
        }

    }

    renderComments = () => {

        const { reviews } = this.state;
        return (reviews.length > 0 ? <Card className="m-0 p-0 card-dark">
            <Card.Header>Reviews</Card.Header>
            <Card.Body>{reviews.map((review, key) => {

                return this.reviewItem(review, key)
            })}</Card.Body>
        </Card> : <div class="alert alert-warning" role="alert">
                No Reviews yet, be the first one to Review!
                  </div>)

    }

    /*getUser = async (id) => {
        const user = await getFunction("user/" + id)
        if (user) {
            console.log(this.users)
            this.users.push(user.name + " " + user.surname)
        }

    }*/
    editModal = (review) => this.setState({ currentReview: review, showEdit: !this.state.showEdit })
    editComment = async (e) => {

        e.preventDefault()
        const result = await putFunction("reviews/" + this.state.currentReview._id, this.state.currentReview)

        if (result) {
            this.editModal([])
            this.fetchComments(this.props.id)
        }
    }
    reviewItem = (review) => {
        const { userId, _id, key, comment, rate, createdAt } = review
        return <ListGroup.Item key={key + createdAt} className="d-flex flex-column justify-content-between p-1 pb-0">

            <div className="d-flex justify-content-between">
                <small></small>
                {userId === this.props.userId && <div>
                    <Button className="px-2 py-0 mr-1" variant="outline-danger" id={_id} onClick={this.deleteComment}> X </Button>
                    <Button className="px-2 py-0 mr-1" variant="outline-dark" id={_id} onClick={() => this.editModal(review)}> <span className="fa fa-pen fa-sm" aria-hidden="true"></span> </Button>
                </div>}
            </div>

            <div className="d-flex justify-content-between pr-4"><p>{comment}</p> <p>{[...Array(parseInt(rate))].map((e, i) => (<span className="text-warning font-weight-bold" key={i}>☆</span>))}</p></div>
            <small className="text-muted mr-1 d-flex justify-content-between"><Moment format="D MMM YYYY" date={createdAt} /> <Moment format="HH:mm">{createdAt}</Moment></small>

        </ListGroup.Item >
    }
    searchResults = () => {
        return <input type="search" className="form-control w-50 h-25 p-1 mb-2" name="search" id="search" placeholder="Search..." onChange={this.searchComments} />
    }

    searchComments = (event) => {
        const search_key = event.target.value;
        let { reviews } = this.state;

        reviews = reviews.filter((review) => review.comment.toLowerCase().includes(search_key.toLowerCase()) || review.author.toLowerCase().includes(search_key.toLowerCase()));

        this.setState({ reviews: (search_key.length > 2) ? reviews : this.book_review, });

    }
    componentDidUpdate = (prevProp) => {
        if (prevProp.refreshList !== this.props.refreshList) {
            this.fetchComments(this.props.id);
        }
    }
    render() {

        const { currentReview, showEdit } = this.state
        return <>
            <div>
                <h6>Find in Reviews</h6>
                {this.searchResults()}
            </div>
            {showEdit && <Container className="position-absolute register m-2 p-3" style={{ zIndex: 5, backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
                <Form onSubmit={this.editComment}>
                    <Form.Group >
                        <Form.Label>
                            Comment
                        </Form.Label>
                        <Form.Control type="text" value={currentReview.comment} onChange={(e) => this.setState({ currentReview: { ...this.state.currentReview, comment: e.target.value } })} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Rate
                        </Form.Label>
                        <Form.Control as="select" className="m-0" value={currentReview.rate} onChange={(e) => this.setState({ currentReview: { ...this.state.currentReview, rate: e.target.value } })} >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Row className="w-50">
                        <Button className="rounded-0 m-2 col w-50" onClick={() => this.editModal([])} variant="outline-dark">Close</Button>
                        <Button className="rounded-0 m-2 col w-50" type="submit" variant="outline-light">Edit</Button>
                    </Row>
                </Form>
            </Container>
            }
            { this.renderComments()}
            {
                this.state.loading && (

                    <div className="ml-2 d-flex justify-content-center my-5">
                        <Spinner animation="border" variant="success" />
                    </div>

                )
            }
        </>

    }
}

CommentsList.propTypes = { id: PropTypes.string.isRequired, refreshList: PropTypes.bool.isRequired };
// #endregion

export default CommentsList;