import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Send Message
            </h2>

            <form className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Message
                </label>
                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full border rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5">
              <div className="bg-blue-100 p-4 rounded-full">
                <FaPhoneAlt className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Phone</h3>
                <p className="text-gray-600">+92 3208424803</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5">
              <div className="bg-green-100 p-4 rounded-full">
                <FaEnvelope className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Email</h3>
                <p className="text-gray-600">modudmasood143@gmail.com</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5">
              <div className="bg-red-100 p-4 rounded-full">
                <FaMapMarkerAlt className="text-red-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Address</h3>
                <p className="text-gray-600">
                  Main Boulevard, Lahore, Pakistan
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5">
              <div className="bg-yellow-100 p-4 rounded-full">
                <FaClock className="text-yellow-600 text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Working Hours</h3>
                <p className="text-gray-600">
                  Monday – Saturday
                </p>
                <p className="text-gray-600">
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
                width="100%"
                height="300"
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;