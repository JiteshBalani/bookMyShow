import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const AuthError = () => {

    const navigate = useNavigate();

  return (
    <Result
    status="403"
    title="401"
    subTitle="Sorry, you are not logged in!"
    extra={<Button type="primary" onClick={() => navigate('/login')}>Login</Button>}
  />
  )
}

export default AuthError