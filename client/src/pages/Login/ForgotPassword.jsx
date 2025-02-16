import { Button, Flex, Form, Input, message } from 'antd';
import { ResetPasswordRequest } from '../../api/users'; // API call
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png'

const ForgotPassword = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await ResetPasswordRequest(values);
      if (response.success) {
        message.success("Password changed successfully! Redirecting to login.");
        setTimeout(() => navigate('/login'), 2000);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Flex vertical justify='center' align='center' gap='small'>
      <img src={Logo} width="60px"></img>
        <h2>Reset password</h2>
        </Flex>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}>
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item name="newPassword" label="New password" rules={[{ required: true, message: "Please enter your new password" }]}>
          <Input type="password" placeholder="Enter your new password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
