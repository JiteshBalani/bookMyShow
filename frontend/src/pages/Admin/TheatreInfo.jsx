import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { updateTheatre, deleteTheatre } from "../../api/theatres";


const TheatreInfo = ({theatreInfoOpen, setTheatreInfoOpen, selectedTheatre, onTheatreUpdate}) => {

    const handleOk = () => {
        setTheatreInfoOpen(false);
      };
      const handleCancel = () => {
        setTheatreInfoOpen(false);
      };
    
      const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const handleDelete = () => {
        Modal.confirm({
          title: "Are you sure you want to delete this theatre?",
          content: "This action cannot be undone.",
          okText: "Yes, Delete",
          okType: "danger",
          cancelText: "Cancel",
          onOk: async () => {
            const response = await deleteTheatre(selectedTheatre._id);
            setTheatreInfoOpen(false);
            message.success("Theatre deleted successfully!");
            onTheatreUpdate();
            console.log(response);
          },
        });
      };  
    
      const onFinish = async(values) => {
        console.log(values);
        const response = await updateTheatre(selectedTheatre._id, values);
        setTheatreInfoOpen(false);
        message.success('Changes saved successfully!');
        onTheatreUpdate();
        console.log(response);
      }

  return (
    <Modal id={selectedTheatre?._id} title={selectedTheatre?.name || 'Theatre Details'} open={theatreInfoOpen} width={800} footer={null} onCancel={handleCancel}>
        <Form
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={onFinish}
        initialValues={{
            name: selectedTheatre?.name,
            address: selectedTheatre?.address,
            phone: selectedTheatre?.phone,
            email: selectedTheatre?.email,
            owner: selectedTheatre?.owner,
            isActive: selectedTheatre?.isActive.toString()
        }}
      >
        <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Theatre name is required!" }]}
            >
              <Input
                id="title"
                type="text"
                placeholder="Write the theatre name"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              htmlFor="address"
              name="address"
              className="d-block"
              rules={[{ required: true, message: "Address is required!" }]}
            >
              <TextArea
                id="address"
                rows="4"
                placeholder="Enter the address"
              ></TextArea>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label="Contact no."
                  htmlFor="phone"
                  name="phone"
                  className="d-block"
                  rules={[
                    { required: true, message: "Contact no. is required!" },
                  ]}
                >
                  <Input
                    id="phone"
                    type="phone" maxLength={10}
                    placeholder="Enter the contact no."
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Email ID"
                  htmlFor="email"
                  name="email"
                  className="d-block"
                  rules={[
                    { required: true, message: "Email ID is required!" },
                  ]}
                >
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter the email id"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Owner ID"
                  htmlFor="owner"
                  name="owner"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: "Owner detail is required!",
                    },
                  ]}
                >
                  <Input
                    id="owner"
                    type="text"
                    placeholder="Enter the owner"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label="Select theatre status"
                  htmlFor="isActive"
                  name="isActive"
                  className="d-block"
                  rules={[
                    { required: true, message: "Theatre status is required!" },
                  ]}
                >
                  <Select
                    defaultValue="false"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    options={[
                      { value: "true", label: "true" },
                      { value: "false", label: "false"}
                    ]}
                  />
                </Form.Item>
              </Col>
              
            </Row>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Save the changes
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
          <Button danger type="primary" 
            style={{ fontSize: "1rem", fontWeight: "600" }} 
            className="mt-3" block onClick={handleDelete}>
            Delete this theatre
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TheatreInfo