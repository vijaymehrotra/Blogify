import React, { useState, useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import axios from "axios"

import { useForm } from "react-hook-form"
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // 1 fetch the data
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

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const saveForm = async (data) => {
        setLoading(true);
        try {
            const apiUrl = process.env.REACT_APP_API_ROOT + "/" + params.id;
            const response = await axios.put(apiUrl, data);

            if (response.status === 200) {
                console.log(response)
                navigate("/", {
                    state: "Saved Successfully",
                })
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.response)
        }
    }

    if (loading) {
        return (
            <>
                <Container className="spinner">
                    <Spinner animation="grow" />
                </Container>
            </>
        )
    }

    return (
        <>
            <Container>
                <h1>Edit the Post</h1>
                {apiData && (
                    <form onSubmit={handleSubmit(saveForm)}>
                        <Row>
                            <Col xs="12" className="py-3">
                                <label>Post Title</label>
                                <input defaultValue={apiData.title} className={`${errors.title && "error"}`} placeholder="Please enter title" {...register("title", {
                                    required: { value: true, message: "Title is Required." },
                                    min: { value: 3, message: "Title should be minimum of 3 character." }
                                })} />
                                {errors.title &&
                                    <div className="error">{errors.title.message}</div>}

                            </Col>
                            <Col xs="12" className="py-3">
                                <label>Post Content</label>
                                <input defaultValue={apiData.post} className={`${errors.post && "error"}`} placeholder="Please enter content" {...register("post", {
                                    required: { value: true, message: "Post Content is Required." },
                                })} />
                                {errors.post && (<div className="error">{errors.post.message}</div>)}
                            </Col>
                            <Col>
                                <button type="submit">Save</button>
                            </Col>
                        </Row>
                    </form>
                )}

            </Container>
        </>
    );
    <form onSubmit={handleSubmit(saveForm)}>
        <Row>
            <Col xs="12" className="py-3">
                <label>Post Title</label>
                <input defaultValue={apiData.title} className={`${errors.title && "error"}`} placeholder="Please enter title" {...register("title", {
                    required: { value: true, message: "Title is Required." },
                    min: { value: 3, message: "Title should be minimum of 3 character." }
                })} />
                {errors.title &&
                    <div className="error">{errors.title.message}</div>}

            </Col>
            <Col xs="12" className="py-3">
                <label>Post Content</label>
                <input defaultValue={apiData.post} className={`${errors.post && "error"}`} placeholder="Please enter content" {...register("post", {
                    required: { value: true, message: "Post Content is Required." },
                })} />
                {errors.post && (<div className="error">{errors.post.message}</div>)}
            </Col>
            <Col>
                <button type="submit">Save</button>
            </Col>
        </Row>
    </form>

}

export default Edit