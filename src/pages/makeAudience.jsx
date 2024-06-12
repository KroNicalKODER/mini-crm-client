import React, { useState } from "react";

const MakeAudience = ({ email }) => {
  const [op1, setOp1] = useState("Or");
  const [op2, setOp2] = useState("Or");
  const [op3, setOp3] = useState("Or");

  const [minTotalSpend, setMinTotalSpend] = useState("");
  const [maxTotalSpend, setMaxTotalSpend] = useState("");
  const [minVisits, setMinVisits] = useState("");
  const [maxVisits, setMaxVisits] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [audienceSize, setAudienceSize] = useState("0");
  const [audience, setAudience] = useState([]);

  const handleClickOp1 = () =>
    setOp1((prevOperator) => (prevOperator === "And" ? "Or" : "And"));
  const handleClickOp2 = () =>
    setOp2((prevOperator) => (prevOperator === "And" ? "Or" : "And"));
  const handleClickOp3 = () =>
    setOp3((prevOperator) => (prevOperator === "And" ? "Or" : "And"));

  const handleExecute = async () => {
    const query = {
      minTotalSpend,
      maxTotalSpend,
      minVisits,
      maxVisits,
      startDate,
      endDate,
      op1,
      op2,
      op3,
    };

    try {
      const response = await fetch(
        "http://localhost:8800/api/customers/filter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(query),
        }
      );
      const data = await response.json();
      console.log(data);
      setAudienceSize(data.data.length);
      setAudience(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleMakeCampaign = async () => {
    const customerData = audience.map(aud => ({
      id: aud._id,
      customer_email: aud.email
    }))

    const obj = {
      customerIds: customerData,
      email: email
    }

    const response = await fetch(
      "http://localhost:8800/api/campaign",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
      }
    );
    const data = await response.json();
    console.log( obj);
  };

  return (
    <div>
      <div className="border d-flex flex-column p-4 my-3">
        <div className="d-flex my-1">
          <input
            type="text"
            placeholder="Enter min total spend"
            className="form-control mx-2"
            value={minTotalSpend}
            onChange={(e) => setMinTotalSpend(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter max total spend"
            className="form-control"
            value={maxTotalSpend}
            onChange={(e) => setMaxTotalSpend(e.target.value)}
          />
        </div>
        <h6
          className="d-flex justify-content-center border user-select-none"
          style={{ cursor: "pointer" }}
          onClick={handleClickOp1}
        >
          {op1}
        </h6>
        <div className="d-flex my-1">
          <input
            type="text"
            placeholder="Enter min visits"
            className="form-control mx-2"
            value={minVisits}
            onChange={(e) => setMinVisits(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter max visits"
            className="form-control"
            value={maxVisits}
            onChange={(e) => setMaxVisits(e.target.value)}
          />
        </div>
        <h6
          className="d-flex justify-content-center border user-select-none"
          style={{ cursor: "pointer" }}
          onClick={handleClickOp2}
        >
          {op2}
        </h6>
        <div className="d-flex my-1 flex-column">
          <div>Visits Between - </div>
          <div className="d-flex">
            <input
              type="date"
              placeholder="Enter start date"
              className="form-control mx-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              placeholder="Enter end date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <h6
          className="d-flex justify-content-center border user-select-none"
          style={{ cursor: "pointer" }}
          onClick={handleClickOp3}
        >
          {op3}
        </h6>
        <div>
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={handleExecute}
          >
            Execute
          </button>
        </div>
      </div>
      <div className="border flex-column d-flex p-4 my-3">
        <div className="d-flex justify-content-between">
          <div>Audience Size: </div>
          <div className=""> {audienceSize} </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-sm btn-outline-primary mt-3"
            onClick={handleMakeCampaign}
          >
            Make Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakeAudience;
