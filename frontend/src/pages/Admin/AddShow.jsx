import { useParams, useNavigate } from "react-router-dom";
import { Form, Select, Input, Button, DatePicker, TimePicker, message } from "antd";
import { addNewShowByMovie } from "../../api/shows";
import dayjs from "dayjs";
import { getAllTheatres } from "../../api/theatres";
import { useEffect, useState } from "react";

const AddShow = () => {
    const { movieId, movieName } = useParams(); // Get movie ID and movie name from URL
    const decodedMovieName = decodeURIComponent(movieName);
    const navigate = useNavigate();
    const [theatres, setTheatres] = useState([]);

    const theatresList = async() => {
        const response = await getAllTheatres();
        setTheatres(response.data);
        console.log(response.data);
    }

    const onFinish = async (values) => {
            const selectedTheatre = theatres.find(theatre => theatre._id === values.theatre);
    
            if (!selectedTheatre || !selectedTheatre.isActive) {
                message.error('Theatre not active! Please try again later.');
                return;
            } 
        try {
            // Create the formatted values object
            const formattedValues = {
                name: values.name,
                date: values.date.format("YYYY-MM-DD"),
                time: values.time.format("hh:mm A"),
                movie: movieId,  // Ensure movieId is being passed
                ticketPrice: Number(values.ticketPrice),
                totalSeats: Number(values.totalSeats),
                bookedSeats: [],
                theatre: values.theatre
            };
                console.log('Sending values:', formattedValues);

                const response = await addNewShowByMovie(formattedValues.movie, formattedValues);

                if (response.success) {
                    message.success("New show added successfully!");
                } else {
                    message.error(response.message || "Failed to add show. Ensure you are adding the show to active theatres.");
                }           
            // Add console.log to debug the values being sent
            
        } catch (error) {
            console.error("Error details:", error);
            message.error("Error adding show!");
        }
    };

    useEffect(() => {
        theatresList();
    },[]);

    useEffect(() => {
        document.title = `${decodedMovieName} - Add Show`;
    }, [decodedMovieName]);
    

    console.log('Current movieId:', movieId);

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <h1 style={{color: "#1677FF"}}>{decodedMovieName}</h1>
            <Form layout="vertical" onFinish={onFinish}>

                {/* Name  */}
                <Form.Item
                    name="name"
                    label="Show Name"
                    rules={[{ required: true, message: "Show name is required!" }]}
                >
                    <Select
                        style={{ width: "100%" }}
                        // onChange={handleChange}
                        options={[
                            { value: "Morning", label: "Morning" },
                            { value: "Afternoon", label: "Afternoon" },
                            { value: "Evening", label: "Evening" },
                            { value: "Night", label: "Night" }
                        ]}
                    />
                </Form.Item>
                {/* Date  */}
                <Form.Item
                    name="date"
                    label="Show Date"
                    rules={[{ required: true, message: "Show date is required!" }]}
                >
                    <DatePicker type="string" style={{ width: "100%" }}
                    disabledDate={(current) => current && current < dayjs().startOf("day")} />
                </Form.Item>
                {/* Time  */}
                <Form.Item
                    name="time" type='string'
                    label="Show Time"
                    rules={[{ required: true, message: "Show time is required!" }]}
                >
                    <TimePicker use12Hours format="hh:mm A" style={{ width: "100%" }} />
                </Form.Item>
                {/* Movie ID  */}
                <Form.Item
                    label="Movie ID" name="movie"
                >
                    <Input type='string' readOnly value={movieId} placeholder="Enter the movieID from URL" />
                </Form.Item>
                {/* Ticket Price  */}
                <Form.Item
                    name="ticketPrice"
                    label="Ticket Price"
                    rules={[{ required: true, message: "Ticket price is required!" }]}
                >
                    <Input type="text" placeholder="Enter ticket price"
                        inputMode="numeric"
                        pattern="\d*" />
                </Form.Item>
                {/* Total Seats  */}
                <Form.Item
                    name="totalSeats"
                    label="Total Seats"
                    rules={[{ required: true, message: "Total seats are required!" }]}
                >
                    <Input type="text" placeholder="Enter total seats"
                        inputMode="numeric"
                        pattern="\d*" />
                </Form.Item>
                {/* Theatre ID  */}
                <Form.Item
                    name="theatre"
                    label="Theatre"
                    initialValue="Select a theatre"
                    rules={[{ required: true, message: "Theatre ID is required!" }]}
                >
                    <Select>
                    {theatres.map(theatre => (
                            <Select.Option key={theatre._id} value={theatre._id}>
                                {theatre.name} : {theatre.address}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Button block type="primary" htmlType="submit" style={{fontWeight: 600}}>
                    Add Show
                </Button>
            </Form>
        </div>
    );
};

export default AddShow;
