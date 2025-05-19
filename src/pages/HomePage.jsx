import React from "react";
import NavbarComponent from "../components/navbar";

const HomePage = () => {
  return (
    <>
      <NavbarComponent />

      <div className="min-h-screen px-6 py-12 bg-gray-50">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Welcome to PMS
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            PMS (Project Management System) helps you manage tasks, teams, and
            projects effectively. Stay organized, meet your deadlines, and
            collaborate with ease.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              Easy Task Tracking
            </h3>
            <p className="text-gray-600">
              Keep track of your daily tasks and monitor progress with visual
              tools and reminders.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              Team Collaboration
            </h3>
            <p className="text-gray-600">
              Communicate and collaborate with your team in real time to keep
              everyone on the same page.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-500 mb-2">
              Project Insights
            </h3>
            <p className="text-gray-600">
              Analyze performance with dashboards and reports to make informed
              decisions.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Get Started Now
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
