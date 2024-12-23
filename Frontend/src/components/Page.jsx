import React from "react";

const Page = () => {
  return (
    <section className="body-font text-gray-400 bg-slate-950">
      <div className="container mx-auto flex flex-col items-center flex-wrap px-5 py-24">
        <div className="-m-4 flex flex-wrap items-center">
          <div
            className="flex flex-col items-center rounded-lg border-2 border-gray-800 p-8 sm:flex-row 
                   animate-fade-in-up-infinite"
          >
            <div className="mb-4 inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-indigo-400 sm:mb-0 sm:mr-8">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-8 w-8"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>

            <div className="flex-grow">
              <h2 className="title-font mb-3 text-lg font-medium text-white">
                Unleash the Power of LinkedIn Data for Smarter Decision
              </h2>
              <p className="text-base leading-relaxed">
                Effortlessly extract, organize, and analyze LinkedIn profiles
                for valuable insights with Summary, Skills, and Education. Turn
                raw data into actionable insights to boost your hiring,
                networking, or sales strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
