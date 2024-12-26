import { React, useState, useContext } from "react";
import Landingpage from "./Page";
import { jsPDF } from "jspdf";
import scrapcontext from "../context/scrapeApi/ScrapContext";

const Home = () => {
  const [input, setInput] = useState({ dataUrl: "" });
  const [resp, setResp] = useState(null);
  const [loading, setLoading] = useState(false);
  const context = useContext(scrapcontext);
  const { scrapeData } = context;

  const handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleScrape = async () => {
    try {
      setLoading(true);
      const data = await scrapeData(input.dataUrl);
      setResp(data);
      setInput({ dataUrl: "" });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setResp(null);
    }
  };

  async function getImageAsBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function createPdf(data) {
    const doc = new jsPDF();

    let x = 10;
    let y = 10;
    const pageWidth = doc.internal.pageSize.width;
    const fontSize = 12;
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(fontSize);

    const sanitize = (text) =>
      typeof text === "string" ? text.replace(/[^\w\s.,-]/g, "") : "";
    const name = sanitize(data.name);
    const experience = sanitize(data.experience[0]);
    const education = sanitize(data.education);

    if (data.imageUrl) {
      const base64Image = await getImageAsBase64(data.imageUrl);
      if (base64Image) {
        const imgWidth = 50;
        const imgHeight = 50;
        const x = (pageWidth - imgWidth) / 2;
        doc.addImage(base64Image, "JPEG", x, y, imgHeight, imgWidth);
        y += imgHeight + 10;
      }
    }

    doc.text(`Name: ${name}`, x, y);
    y += 10;

    const experienceLines = doc.splitTextToSize(
      `Experience: ${experience}`,
      180
    );
    doc.text(experienceLines, x, y);
    y += experienceLines.length * 8;

    const educationLines = doc.splitTextToSize(`Education: ${education}`, 180);
    doc.text(educationLines, x, y);
    y += educationLines.length * 8;

    const skillsLines = doc.splitTextToSize(`Skills: ${data.skills}`, 180);
    doc.text(skillsLines, x, y);

    doc.save(`${name}_LinkedIn_Details.pdf`);
  }

  return (
    <>
      <Landingpage />
      <div className="container bg-transparent max-w-full bg-gray-900">
        <div className="mt-10">
          <input
            name="dataUrl"
            value={input.dataUrl}
            onChange={handleChange}
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter LinkedIn URL.."
          />
        </div>

        <div className="btn mt-4">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleScrape();
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : resp ? (
        <section className="body-font bg-gray-900 text-gray-400">
          <div className="container mx-auto flex flex-col items-center justify-center px-5 py-24">
            <img
              className=" myImg mb-10 w-5/6 rounded object-cover object-center 
              md:w-3/6 
              lg:w-2/6"
              alt="Image not available"
              src={resp?.imageUrl}
            />
            <div className="mb-16 flex w-full flex-col items-center text-center md:w-2/3">
              <h1 className="title-font mb-4 text-3xl font-medium text-white sm:text-4xl">
                {resp?.name}
              </h1>
              <br></br>
              <strong>
                <p>Summary: </p>
              </strong>
              <p className="mb-8 leading-relaxed">{resp?.experience[0]}</p>
              <strong>
                <p>Education: </p>
              </strong>
              <p className="mb-8 leading-relaxed">{resp?.education}</p>
              <strong>
                <p>Skills: </p>
              </strong>
              <p className="mb-8 leading-relaxed">{resp?.skills}</p>
            </div>

            <div className="flex">
              <button
                className="ml-auto flex rounded border-0 bg-indigo-800 px-6 py-2 text-white hover:bg-indigo-600 focus:outline-none"
                onClick={() => createPdf(resp)}
              >
                Generate pdf
              </button>
            </div>
          </div>
        </section>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default Home;
