import React from "react";

const About = () => {
  return (
    <div className="aboutUs text-gray-800 p-6">
      <header className="text-center py-10 text-white border-b border-gray-100">
        <h1 className="text-4xl font-bold ">About Us</h1>
        <p className="mt-2 text-lg">Learn more about our mission and works</p>
      </header>

      <section className=" missions text-white text-center py-10 border-b border-gray-100">
        <h2 className="text-3xl font-semibold font-mono">Our Mission</h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Our mission is to simplify access to valuable LinkedIn insights,
          empowering businesses and professionals with actionable data to drive
          informed decisions and build meaningful connections.
        </p>
      </section>

      <section className="desc text-center text-white py-10 border-b border-gray-100">
        <h2 className="text-3xl font-semibold font-mono">
          Privacy and Security
        </h2>
        <p className="mt-4 max-w-2xl mx-auto">
          We prioritize privacy and security, ensuring that all data is handled
          with the utmost care and in compliance with industry standards to
          protect user information and maintain trust.
        </p>
      </section>

      <section className="tech text-center text-white py-10 border-b border-gray-100">
        <h2 className="text-3xl font-semibold font-mono">Technology Stack</h2>
        <ul className="mt-4 max-w-2xl mx-auto list-disc list-inside">
          <li className="font-medium tracking-wide text-gray-200">
            React.js for the frontend
          </li>
          <li className="font-medium tracking-wide text-gray-200">
            Node.js and Express for the backend
          </li>
          <li className="font-medium tracking-wide text-gray-200">
            puppeteer for data scraping
          </li>
          <li className="font-medium tracking-wide text-gray-200">
            cheerio for parsing HTML
          </li>
          <li className="font-medium tracking-wide text-gray-200">
            jspdf for generating PDFs
          </li>
        </ul>
      </section>

      <section className="works text-center text-white py-10">
        <h2 className="text-3xl font-semibold font-mono">How It Works</h2>
        <ol className="mt-4 max-w-2xl mx-auto list-decimal list-inside">
          <li>The app scans LinkedIn profiles based on your input</li>
          <li>
            Collects key profile details such as name, summary , education, and
            skills respectively
          </li>
          <li>
            Easily download the extracted data in a structured format like pdf
          </li>
          <li>
            Adjust parameters like depth of search and filters for precise
            results
          </li>
        </ol>
      </section>
    </div>
  );
};

export default About;
