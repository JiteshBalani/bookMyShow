import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { addTheatre } from "../../api/theatres";

const TheatreForm = ({modalOpen, setModalOpen, onTheatreUpdate}) => {
        
        const handleCancel = () => {
            setModalOpen(false);
        };
    
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };
    
        const onFinish = async(values) => {
            console.log(values);
            const response = await addTheatre(values);
            onTheatreUpdate();
            setModalOpen(false);
            message.success('New theatre added!');
            console.log(response);
        };

  return (
    <Modal open={modalOpen} width={800} footer={null} onCancel={handleCancel}>
        <Form
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={onFinish}
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
            Add new theatre
          </Button>
          <Button className="mt-3" block onClick={handleCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TheatreForm