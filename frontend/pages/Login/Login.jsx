import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';


function Login() {
 return (
 <header className="App-header">
   <main className="main-area mw-500 text-center px-3">
     <section className="left-section">
       <h1>
         Login to BookMyShow
       </h1>
     </section>
     <section className="right-section">
       <Form
         layout='vertical'
       >
         <Form.Item
           label="Email"
           htmlFor="email"
           name="email"
           className="d-block" rules={[{ required: true, message: "Email is required" }]}
         >
           <Input
             id="email"
             type="text"
             placeholder="Enter your Email"
           ></Input>
         </Form.Item>
         <Form.Item
           label="Password"
           htmlFor="password"
           name="password"
           className="d-block"
           rules={[{ required: true, message: "Password is required" }]}
         >
           <Input
             id="password"
             type="password"
             placeholder="Enter your Password"


           ></Input>
         </Form.Item>
         <Form.Item className="d-block">
           <Button
             type="primary"
             block
             htmlType="submit"
             style={{ fontSize: "1rem", fontWeight: "600" }}
           >
             Login
           </Button>
         </Form.Item>
       </Form>
     </section>
   </main>
   </header>
 )
}




export default Login;