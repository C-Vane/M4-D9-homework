import React, { useState } from 'react';
import { Alert, Container, Row, Spinner } from 'react-bootstrap';

const Movies = ({ user }) => {
    const { Movies, setMovies } = useState()
    const { alert, setAlert } = useState()
    const { loading, setLoading } = useState(true)
    const getList = async () => { }
    return <div>
        {alert && <Alert variant="warning"></Alert>}
        <Container>
            <h1 className="text-white-50">Movies</h1>
            {loading ? <div></div> :
                <Row className="ml-2 d-flex justify-content-center ">
                    <Spinner animation="border" variant="light" size="lg" style={{ height: "100px", width: "100px", marginTop: "20vh", marginBottom: "20vh" }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Row>}
        </Container>

    </div>;
}


export default Movies;