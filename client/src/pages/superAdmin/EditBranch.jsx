import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Axios from "../../Axios";
import { DISTRICT } from "../../Consts";

function EditBranch() {
  const initialState = {
    branchName: "",
    place: "",
    postOffice: "",
    district: "",
    state: "",
    pinCode: "",
    phone: "",
    username: "",
    password: "",
  };

  const [inputData, setInputData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getBranch = async () => {
    let { data } = await Axios.get("/branch/" + id);
    console.log(data);
    setInputData(data);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await Axios.post("/branch/" + id, inputData);
      if (res.status === 200) {
        setLoading(false);
        setInputData(initialState);
        toast.success("Branch Edited Successfully", {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        });
        navigate("/all-branches");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong", {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.response);
    }
  };
  useEffect(() => {
    getBranch();
  }, []);
  return (
    <div className="w-3/4 ml-6">
      <section className="bg-white p-6">
        <div className="max-w-screen-xl mx-auto">
          <h3 className="text-4xl font-bold text-sky-900 uppercase my-4">
            Edit Branch
          </h3>

          <form className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Centre Name
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  onChange={(e) => onChange(e)}
                  required
                  placeholder="Branch Name"
                  name="branchName"
                  value={inputData.branchName}
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Phone Number
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  id="username"
                  type="text"
                  required
                  value={inputData.phone}
                  onChange={(e) => onChange(e)}
                  placeholder="Phone No:"
                  name="phone"
                />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Place
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  required
                  value={inputData.place}
                  onChange={(e) => onChange(e)}
                  placeholder="Place"
                  name="place"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <label
                className="block  text-sm font-bold mb-2"
                htmlFor="username"
              >
                District
              </label>

              <select
                name="district"
                onChange={(e) => onChange(e)}
                id=""
                value={inputData.district}
                className="bg-gray-50 border border-gray-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option hidden>Select YOUR DISTRICT </option>
                {DISTRICT.map((district, index) => (
                  <>
                    <option key={index} value={district}>
                      {district}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Post Office
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  required
                  value={inputData.postOffice}
                  onChange={(e) => onChange(e)}
                  placeholder="Post Office"
                  name="postOffice"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Pin Code
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  value={inputData.pinCode}
                  required
                  onChange={(e) => onChange(e)}
                  placeholder="Pin Code"
                  name="pinCode"
                />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="px-4 sm:px-0">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  State
                </label>
                <input
                  className="focus:ring-indigo-500 focus:border-indigo-500 shadow appearance-none border rounded w-full py-4 px-3  leading-tight focus:outline-none focus:shadow-outline uppercase"
                  type="text"
                  value={inputData.state}
                  required
                  onChange={(e) => onChange(e)}
                  placeholder="State"
                  name="state"
                />
              </div>
            </div>
          </form>
          <div className="lg:col-span-1 mt-4">
            <div className="px-4 sm:px-0">
              {!loading ? (
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="w-full lg:w-1/2 bg-sky-900 hover:bg-sky-900 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase"
                >
                  Edit
                </button>
              ) : (
                <h1 className="text-white text-center w-full lg:w-1/2 bg-sky-900 hover:bg-sky-900  font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline uppercase">
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

export default EditBranch;
