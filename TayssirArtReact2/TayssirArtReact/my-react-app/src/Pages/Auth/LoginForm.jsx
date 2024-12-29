import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("فشل تسجيل الدخول");
      }

      const token = await response.text(); // Read response as text
      toast.success("لقد دخلت بنجاح");
      // Assuming token is received as plain text, store it in localStorage
      localStorage.setItem("token", token.trim()); // trim() to remove any extra whitespace

      // Redirect or navigate to the home page
      navigate("/");
    } catch (error) {
      console.error("خطأ في تسجيل الدخول:", error.message);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="form sign-in">
      <h2>مرحبا</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>البريد الإلكتروني</span>
          <input
            type="email"
            value={form.email}
            name="email"
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <span>كلمة المرور</span>
          <input
            type="password"
            value={form.password}
            name="password"
            onChange={handleChange}
            required
          />
        </label>
        <p className="forgot-pass">نسيت كلمة المرور؟</p>
        <button type="submit" className="submit">
          الدخول
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
