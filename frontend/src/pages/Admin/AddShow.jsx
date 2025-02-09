import { useParams, useNavigate } from "react-router-dom";
import { Form, Select, Input, Button, DatePicker, TimePicker, message } from "antd";
import { addNewShowByMovie } from "../../api/shows";
import dayjs from "dayjs";

const AddShow = () => {
    const { movieId } = useParams(); // Get movie ID from URL
    const navigate = useNavigate();

    const onFinish = async (values) => {
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

            // Add console.log to debug the values being sent
            console.log('Sending values:', formattedValues);

            const response = await addNewShowByMovie(formattedValues.movie, formattedValues);

            if (response.success) {
                message.success("New show added successfully!");
            } else {
                message.error(response.message || "Failed to add show");
            }
        } catch (error) {
            console.error("Error details:", error);
            message.error("Error adding show!");
        }
    };

    console.log('Current movieId:', movieId);

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <h2>Add New Show</h2>
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
                    <DatePicker type="string" style={{ width: "100%" }} />
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
                    <Input type='string' disabled value={movieId} placeholder="Enter the movieID from URL" />
                </Form.Item>
                {/* Ticket Price  */}
                <Form.Item
                    name="ticketPrice"
                    label="Ticket Price"
                    rules={[{ required: true, message: "Ticket price is required!" }]}
                >
                    <Input type="number" placeholder="Enter ticket price" />
                </Form.Item>
                {/* Total Seats  */}
                <Form.Item
                    name="totalSeats"
                    label="Total Seats"
                    rules={[{ required: true, message: "Total seats are required!" }]}
                >
                    <Input type="number" placeholder="Enter total seats" />
                </Form.Item>
                {/* Theatre ID  */}
                <Form.Item
                    name="theatre"
                    label="Theatre ID"
                    rules={[{ required: true, message: "Theatre ID is required!" }]}
                >
                    <Input type="string" placeholder="Enter theatre ID" />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Add Show
                </Button>
                <Button onClick={() => navigate(-1)} style={{ marginLeft: 10 }}>
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default AddShow;
