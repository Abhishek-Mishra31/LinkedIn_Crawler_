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

  const contactMe = async (name , email , message) => {
    const contactUrl = `${host}/contact`;
    const response = await fetch(contactUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const result = await response.json();
    return result;
  };
  return (
    <scrapcontext.Provider value={{ scrapeData , contactMe }}>
      {props.children}
    </scrapcontext.Provider>
  );
};

export default ScrapState;
