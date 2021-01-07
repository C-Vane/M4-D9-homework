import React, { useEffect, useState } from 'react';
import { Alert, Container, Row, Spinner } from 'react-bootstrap';
import { getFunction } from '../CRUDFunctions';
import Results from '../homePage/Results';

const MyList = ({ user, history }) => {
    const [myList, setMyList] = useState([])
    const [alert, setAlert] = useState("")
    const [loading, setLoading] = useState(false)

    const getList = async () => {
        const response = await getFunction(`user/${user._id}/myList`)
        if (response.length > 0) {
            let list = []
            for (let i = 0; i < response.length; i++) {
                const resp = await getFunction('media/' + response[i])
                resp && list.push(resp)
            }
            setMyList(list)
            setLoading(true)
        }
        else {
            setLoading(true)
            setAlert("There are no movies in your list")
        }
    }
    useEffect(() => {
        getList()
    }, [])
    //const removeFromList = async () => { }
    return <div>
        {alert && <Alert variant="warning">{alert}</Alert>}
        <Container>
            <h1 className="text-white-50">My List</h1>
            {loading ? (myList && <div>
                <Results results={myList} history={history} />
            </div>) :
                <Row className="ml-2 d-flex justify-content-center ">
                    <Spinner animation="border" variant="light" size="lg" style={{ height: "100px", width: "100px", marginTop: "20vh", marginBottom: "20vh" }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Row>}
        </Container>

    </div>;
}


export default MyList;