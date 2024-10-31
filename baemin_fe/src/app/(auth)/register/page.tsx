"use client";
import { authServices } from "@/services";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();

  const onFinish = async (data: any) => {
    console.log(data);

    try {
      const res = await authServices.register(data);
      router.push("login");
    } catch (error) {
      console.error("Error :", error);
    }
  };
  return (
    <>
      <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
        <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
          Đăng Kí
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng!" },
            ]}
          >
            <div className="flex flex-col w-full gap-3">
              <Input placeholder="Tên đăng nhập" className="h-[40px]" />
            </div>
          </Form.Item>
          <Form.Item
            name="phone_number"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại của bạn!",
              },
              { len: 10, message: "Số phải có ít nhất 10 ký tự!" },
              {
                pattern: /^[0-9]+$/,
                message: "Số điện thoại chỉ bao gồm các chữ số từ 0 đến 9!",
              },
            ]}
          >
            <div className="flex flex-col w-full gap-3">
              <Input placeholder="Số điện thoại" className="h-[40px]" />
            </div>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập Email!" },
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập đúng định dạng E-mail!",
              },
            ]}
          >
            <div className="flex flex-col w-full gap-3">
              <Input placeholder="Email" className="h-[40px]" />
            </div>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
            ]}
          >
            <div className="flex flex-col w-full ">
              <Input.Password
                placeholder="Mật khẩu"
                className="h-[40px]"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </Form.Item>
          <Form.Item
            name="confirm_password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận lại mật khẩu của bạn!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <div className="flex flex-col w-full ">
              <Input.Password
                placeholder="Nhập lại mật khẩu"
                className="h-[40px]"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="flex flex-col w-full">
              <button
                type="submit"
                className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
              >
                Đăng Ký
              </button>
            </div>
          </Form.Item>
        </Form>
        <div className="flex items-center justify-center gap-1">
          <span className="text-gray-600">Bạn đã có tài khoản?</span>
          <Link className="text-beamin cursor-pointer" href={"/login"}>
            {" "}
            Đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
};
export default Page;
