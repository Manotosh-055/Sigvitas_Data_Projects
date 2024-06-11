import axios from "axios";
import React, { useState } from "react";


export const Search = () => {
  const [searchData, setsearchData] = useState([]);
  const [search, setSearch] = useState("");

  //console.log(searchData);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      const { data } = await axios.get(`https://sigvitas-data-projects.vercel.app/api/data/search-data?search=${search}`);
      setsearchData(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);


  const setPage = pageNumber => {
    if (pageNumber < 1 || pageNumber > Math.ceil(searchData?.length / itemsPerPage)) {
      return;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="search-wrapper">
        <div className="add-page">
          <div className="container">
            <div className="add-content">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Search data here..."
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {
          search?.length === 0 ? <div className="centered-text">
            <h1>Start typing in the search field above to quickly find the data</h1>
          </div> : (
            <>
              {
                search?.length !== 0 && currentItems?.length === 0 ? <div style={{ textAlign: "center", fontSize: "40px" }}><h1>No Records Found !!</h1></div> : (
                  <>
                    <table className="table table-primary table-striped table-hover table-wrapper">
                      <thead>
                        <tr>
                          <th scope="col">Document No</th>
                          <th scope="col">App Serial Number</th>
                          <th scope="col">Priority Date</th>
                          <th scope="col">File Date</th>
                          <th scope="col">Agent</th>
                          <th scope="col">CPC Class (First)</th>
                          <th scope="col">Title</th>
                          <th scope="col">Assignee Ultimate</th>
                        </tr>
                      </thead>
                      <tbody style={{ fontSize: "12px" }}>
                        {currentItems?.map((item, index) => (
                          <tr key={index}>
                            <td>{item.documentNo}</td>
                            <td>{item.appSerialNumber}</td>
                            <td>{item.priorityDate}</td>
                            <td>{item.fileDate}</td>
                            <td>{item.agent}</td>
                            <td>{item.cpcClassFirst}</td>
                            <td>{item.title}</td>
                            <td>{item.assigneeUltimate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <nav>
                      <div className="page">
                        <ul className="pagination justify-content-center">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(currentPage - 1)}>Previous</button>
                          </li>

                          <li className={`page-item active`}>
                            <button className="page-link">{currentPage}</button>
                          </li>
                          <li className={`page-item ${currentPage === Math.ceil(searchData?.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(currentPage + 1)}>{currentPage + 1}</button>
                          </li>
                          <li className={`page-item ${currentPage === Math.ceil(searchData?.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPage(currentPage + 1)}>Next</button>
                          </li>
                        </ul>
                      </div>

                    </nav>
                  </>
                )
              }




            </>
          )
        }

      </div>


    </>


  );
};
