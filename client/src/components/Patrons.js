import { useState,useEffect } from "react";  

const Patrons=({state})=>{
    const [patrons,setPatrons]=useState([]);
    
    const {contract} = state; 
    useEffect(()=>{
        const patronsMessage= async ()=>{
            const patrons = await contract.patronLogs();
            setPatrons(patrons);
        };
        contract&&patronsMessage();
    },[contract]);

    return (
        <>
          <p style={{ textAlign: "center", marginTop: "20px" }}>Messages</p>
          {patrons.map((patron) => {
            return (
              <div
                className="container-fluid"
                style={{ width: "100%" }}
                key={Math.random()}
              >
                <table
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          backgroundColor: "#96D4D4",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "100px",
                        }}
                      >
                        {patron.name}
                      </td>
                      <td
                        style={{
                          backgroundColor: "#96D4D4",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "800px",
                        }}
                      >
                        {new Date(patron.timestamp * 1000).toLocaleString()}
                      </td>
                      <td
                        style={{
                          backgroundColor: "#96D4D4",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "300px",
                        }}
                      >
                        {patron.message}
                      </td>
                      <td
                        style={{
                          backgroundColor: "#96D4D4",
                          border: "1px solid white",
                          borderCollapse: "collapse",
                          padding: "7px",
                          width: "400px",
                        }}
                      >
                        {patron.from}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </>
      );
    };
export default Patrons;  