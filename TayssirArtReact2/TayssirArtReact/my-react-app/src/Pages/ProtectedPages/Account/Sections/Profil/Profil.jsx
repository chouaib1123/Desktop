import React, { useState ,useEffect } from "react";
import "./Profil.css"
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

function Profil() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        phoneNumber: "",
        name: "",
        userType: "",
        bio: "",
        studioAddress: ""
      });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    
      const decodedToken = jwtDecode(token);
  
      const userId = decodedToken.userId;

  
    fetch(`http://localhost:8080/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setForm(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;

    fetch(`http://localhost:8080/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
            toast("Failed to update user information");
        }
        else toast("User information updated");
        return response.json();
      })
      
  };
  console.log(form);
  return (
    <div className="Profil">
      
      <form onSubmit={handleSubmit}>
      <div>
          <label>الاسم</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="AlignItems"> 
        {form.userType === "artist" && (
            <div>
          <label>سيرة ذاتية</label>
          <input
            type="text"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            required
          />
        </div>
    )}
        <div>
          <label>البريد الالكتروني</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        {form.userType === "artist" && (

        <div>
          <label>عنوان الاستوديو
          </label>
          <input
            type="text"
            name="studioAddress"
            value={form.studioAddress}
            onChange={handleChange}
            required
          />
        </div>
    )}
        </div>
       
        <div>
          <label>كلمة المرور</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>رقم الهاتف</label>
          <input
            type="tel"
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
       
        
        <button type="submit">تغيير المعلومات</button>
      </form>
    </div>
  );
}

export default Profil;
