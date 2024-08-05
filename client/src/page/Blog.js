import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Blog = () => {
    const params = useParams()
    const [apiData, setApiData] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;
                const response = await axios.get(apiUrl);

                if (response.status === 200) {
                    if (response?.data.statusText === "Ok") {
                        setApiData(response?.data?.record);
                    }
                }

            } catch (error) {
                console.log(error.response)
            }
        };
        fetchData();
        return () => { };
    }, []);

    console.log(apiData)
  
    return (
        <Container>
            <Row>
                <Col xs="6"><h1>{apiData.title}</h1></Col>
                <Col xs="6"> <img  height="250" src={`${process.env.REACT_APP_API_ROOT}/${apiData.image}`} ></img>
                </Col>
                <Col xs="12"><p >{apiData.post}</p></Col>
            </Row>
        </Container>
    )
}

export default Blog