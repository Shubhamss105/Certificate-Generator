import React, { useEffect, useState } from "react";
import axios from "axios";

const CsvTable = () => {
  const [certificates, setCertificates] = useState([]);

  const handleClick = (certificate) => {
    console.log("Clicked row:", certificate);
    // Do something with the selected certificate
  };

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await axios.get("/api/csvdata");
        setCertificates(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCertificates();
  }, []);

  return (
    <div>
      <h1>Certificates Data</h1>
      <table className="border border-info">
        <thead border='1'>
          <tr>
            <th border={1}>Id</th>
            <th>Name</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody border={2}>
          {certificates.map((certificate, index) => (
            <tr key={index}>
              <td>{certificate._id}</td>
              <td>{certificate.name}</td>
              <td>{certificate.title}</td>
              <td>
                <button onClick={() => handleClick(certificate)}>
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CsvTable;
