import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Select, Spinner, TextInput } from "flowbite-react";
import OAuth from "../components/OAuth";

export default function AddUsers() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    address: "",
    phone_number: "",
    age: "",
    username: "",
    email: "",
    password: "",
    role: "", 
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.middle_name ||
      !formData.address ||
      !formData.phone_number ||
      !formData.age ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      // If the selected role is "Manager", set isManager to true
      if (formData.role === "Manager") {
        formData.isManager = true;
        formData.isSupplier = false;
        formData.isFinancer = false;
        formData.isEmployee = false;
    
      } else if (formData.role === "Supplier") {
        formData.isSupplier = true;
        formData.isManager = false;
        formData.isFinance = false;
        formData.isEmployee = false;
       
      } else if (formData.role === "Finance") {
        formData.isFinance = true;
        formData.isManager = false;
        formData.isSupplier = false;
        formData.isEmployee = false;
       
      } else if (formData.role === "Employee") {
        formData.isFinance = false;
        formData.isManager = false;
        formData.isSupplier = false;
        formData.isEmployee = true;
     
      } else {
        formData.isManager = false;
        formData.isSupplier = false;
        formData.isFinance = false;
        formData.isEmployee = false;
        
      }

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        navigate("/dashboard?tab=users");
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1 lg:mb-44">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              MITLTO
            </span>
            ESTIMENTEN
          </Link>
          <p className="text-sm mt-5">
          This is a Diabetes Management System that leverages machine learning to predict diabetes and estimate insulin dosage. You can sign up using your email and password or through Google
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="amen@amen.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your first name" />
              <TextInput
                type="text"
                placeholder="first_name"
                id="first_name"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your last name" />
              <TextInput
                type="text"
                placeholder="last_name"
                id="last_name"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Age" />
              <TextInput
                type="number"
                placeholder="Age"
                id="age"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Phone numbers" />
              <TextInput
                type="number"
                placeholder="Phone numbers"
                id="phone_number"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Address" />
              <TextInput
                type="text"
                placeholder="Address"
                id="address"
                onChange={handleChange}
              />
            </div>
            {/* <Label value="Choose Role" />
            <Select
              id="role"
              className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
              onChange={handleRoleChange}
            >
              <option value="" selected disabled>
                Choose a role
              </option>
              <option value="Manager">isManager</option>
              <option value="Supplier">isSupplier</option>
              <option value="Finance">isFinance</option>
              <option value="Employee">isEmployee</option>
            </Select> */}
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
