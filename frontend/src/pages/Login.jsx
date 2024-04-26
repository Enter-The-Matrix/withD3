import imgLogin from "../assets/loginPage.png";
import dashLogo from "../assets/dashboardLogo.png";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
function Login() {

  const {loading, login}= useLogin()

  const onFinish = async (values) => {
     await login(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex">
      <div className="w-3/5  h-screen flex flex-col p-2">
        <div className="p-4 w-[200px]">
          <img src={dashLogo} alt="" />
        </div>
        <div className="flex justify-center items-center h-screen">
          <img src={imgLogin} alt="" className="h-full" />
        </div>
      </div>
      <div className="w-2/5 flex flex-col justify-center ">
        <h1 className="text-3xl font-semibold "> Welcome to Insights App</h1>
        <p className="opacity-70 mt-2">Please sign-in to your account</p>
        <Form
          name="login"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
          className="mt-8"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" className="w-full font-semibold" disabled={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <h1>New on our platform ?  <Link to={'/register'} className="text-blue-500 hover:cursor-pointer">Create an account </Link> </h1>
      </div>
    </div>
  );
}

export default Login;
