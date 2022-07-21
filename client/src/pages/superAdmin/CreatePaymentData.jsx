import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";

function CreatePaymentData() {
  const navigate = useNavigate();

  const initialState = {
    paymentName: "",
    amount: 0,
    deadLine: Date.now(),
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  console.log(formData);
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/payment", formData);
      if (res.status === 200) {
        setLoading(false);
        setFormData(initialState);
        toast.success("Payment Added Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate("/all-payments");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };

  return (
    <div className="w-2/4 mx-auto">
      <section className="bg-white p-6">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-4xl font-bold text-teal-700 uppercase my-4">
            Create Payment
          </h3>

          <form className="lg:grid lg:grid-cols-1 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  PAYMENT NAME
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="text"
                  required
                  value={formData.paymentName}
                  onChange={(e) => onChange(e)}
                  placeholder="PAYMENT NAME "
                  name="paymentName"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  AMOUNT 
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => onChange(e)}
                  placeholder="Amount "
                  name="amount"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  DEADLINE  
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="date"
                  required
                  value={formData.deadLine}
                  onChange={(e) => onChange(e)}
                  placeholder="Amount "
                  name="deadLine"
                />
              </div>
            </div>
          </form>
          <div className="lg:col-span-1 mt-4">
            <div className="px-4 sm:px-0">
              {!loading ? (
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="w-full lg:w-1/2 bg-teal-500 hover:bg-teal-800 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase transition"
                >
                  Add Payment 
                </button>
              ) : (
                <h1 className="text-white text-center w-full lg:w-1/2 bg-violet-500 hover:bg-violet-500  font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase">
                  Processing..
                </h1>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreatePaymentData;
