import React, { useState } from "react";
import crypto from "crypto-js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    bio: "",
    studioAddress: "",
    userType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        userType: isClient ? "client" : "artist",
      }),
    });

    if (response.ok) {
      toast.success("لقد تسجلت بنجاح");
      window.location.reload();
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="form sign-up">
      <h2>أنشئ حسابك</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>الاسم</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>البريد الإلكتروني</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>كلمة المرور</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>رقم الهاتف</span>
          <input
            type="text"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
          />
        </label>
        <div className="RegisterChoice">
          <span
            className={isClient ? "ischoised" : ""}
            onClick={() => setIsClient(true)}
          >
            عميل
          </span>
          <span
            className={!isClient ? "ischoised" : ""}
            onClick={() => setIsClient(false)}
          >
            فنان
          </span>
        </div>
        {!isClient && (
          <div>
            <label>
              <span>السيرة الذاتية</span>
              <input
                type="text"
                name="bio"
                value={form.bio}
                onChange={handleChange}
              />
            </label>
            <label>
              <span>عنوان الاستوديو</span>
              <input
                type="text"
                name="studioAddress"
                value={form.studioAddress}
                onChange={handleChange}
              />
            </label>
          </div>
        )}
        <button type="submit" className="submit">
          التسجيل
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
