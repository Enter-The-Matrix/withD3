import imgRegister from "../assets/registerPage.png";
import dashLogo from "../assets/dashboardLogo.png";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import  { Toaster } from "react-hot-toast";
import useRegister from "../hooks/useRegister";

function Register() {

    const {loading,register} = useRegister()
    const [form] = Form.useForm()

    const onFinish = async(values) => {
    //   console.log("Success:", values);

     await register(values)
      form.resetFields();    
   
  };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    // const validatePassword = (_, value) => {
    //     if (value && value.length < 6) {
    //       return Promise.reject('Password should be at least 6 characters long');
    //     }
    //     return Promise.resolve();
    //   };
    return (
      <div className="flex">
        <Toaster/>
        <div className="w-3/5  h-screen flex flex-col p-2">
          <div className="p-4 w-[200px]">
            <img src={dashLogo} alt="no pic" />
          </div>
          <div className="flex justify-center items-center h-screen">
            <img src={imgRegister} alt="no pic" className="h-full" />
          </div>
        </div>
        <div className="w-2/5 flex flex-col justify-center  ">
          <h1 className="text-3xl font-semibold "> Adventure starts here 🚀</h1>
          <p className="opacity-70 mt-2">Create your dashboard account</p>
          <Form
            form={form} 
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
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
                {
                    min:6,
                    message: "Password should be atleast 6 characters long",
                },
                // { validator: validatePassword }, 

              ]}
            >
              <Input.Password />
            </Form.Item>
  
            {/* <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
  
            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" className="w-full font-semibold" disabled={loading}>
                Register
              </Button>
            </Form.Item>
          </Form>
          
          <h1 className="">Already have an account?  <Link to={'/login'} className="text-blue-500 hover:cursor-pointer">Sign in instead </Link> </h1>
        </div>
      </div>
    );
  }
  

export default Register