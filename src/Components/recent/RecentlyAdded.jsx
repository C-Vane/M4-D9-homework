import React, { useEffect, useState } from 'react';
import { Alert, Container, Row, Spinner } from 'react-bootstrap';
import Results from '../homePage/Results';
import { getFunction } from '../CRUDFunctions';

const RecentlyAdded = ({ user, history }) => {
    const [RecentlyAdded, setRecentlyAdded] = useState([])
    const [alert, setAlert] = useState("")
    const [loading, setLoading] = useState(false)
    const getList = async () => {
        const response = await getFunction('media/?year=2018')
        if (response.length > 0) {
            setRecentlyAdded(response)
            setLoading(true)
        } else {
            setLoading(true)
            setAlert("There are no recient movies")
        }
    }
    useEffect(() => {
        getList()
    }, [])
    return <div>
        {alert.length > 0 && <Alert variant="warning"></Alert>}
        <Container>
            <h1 className="text-white-50">Recently Added</h1>
            {loading ? (RecentlyAdded && <div>
                <Results results={RecentlyAdded} history={history} />
            </div>) :
                <Row className="ml-2 d-flex justify-content-center ">
                    <Spinner animation="border" variant="light" size="lg" style={{ height: "100px", width: "100px", marginTop: "20vh", marginBottom: "20vh" }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Row>}
        </Container>

    </div>;
}


export default RecentlyAdded;