import scrapcontext from "./ScrapContext";

const ScrapState = (props) => {
  const host = "http://localhost:5000";

  const scrapeData = async (profileUrl) => {
    const scrapeUrl = `${host}/scrape`;
    const response = await fetch(scrapeUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ profileUrl }),
    });
    const result = await response.json();
    return result;
  };
  return (
    <scrapcontext.Provider value={{ scrapeData }}>
      {props.children}
    </scrapcontext.Provider>
  );
};

export default ScrapState;
