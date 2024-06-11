import React, { useEffect, useState } from "react";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://sigvitas-data-projects.vercel.app/api/data/get-data");
                setData(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        let sortableData = [...data];
        if (sortConfig.key !== null) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const setPage = pageNumber => {
        if (pageNumber < 1 || pageNumber > Math.ceil(data.length / itemsPerPage)) {
            return;
        }
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    let startPage, endPage;

    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <div className="wrapper">
                <h3 className="title mt-1">Patent Data Table</h3>

                <div className="wrapper-item-page">
                    <label className="mr-3" style={{ fontSize: "15px", fontWeight: "bold" }}>Items per page : </label>
                    <select onChange={handleItemsPerPageChange} value={itemsPerPage}>
                        <option style={{ color: "white", backgroundColor: "var(--primary)" }} value={10}>10</option>
                        <option style={{ color: "white", backgroundColor: "var(--primary)" }} value={20}>20</option>
                        <option style={{ color: "white", backgroundColor: "var(--primary)" }} value={50}>50</option>
                        <option style={{ color: "white", backgroundColor: "var(--primary)" }} value={100}>100</option>
                    </select>
                </div>

                <table className="table table-primary table-striped table-hover table-wrapper">
                    <thead>
                        <tr>
                        <th scope="col">
                                <div className="d-flex flex-row align-items-center justify-content-evenly">
                                    <div>Document No</div>
                                    <div>
                                        <i onClick={() => handleSort('documentNo')} className={`fas ${sortConfig.key === 'documentNo' && sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="d-flex flex-row align-items-center justify-content-evenly">
                                    <div>App Serial Number</div>
                                    <div>
                                        <i onClick={() => handleSort('appSerialNumber')} className={`fas ${sortConfig.key === 'appSerialNumber' && sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="d-flex flex-row align-items-center justify-content-evenly">
                                    <div>Priority Date</div>
                                    <div>
                                        <i onClick={() => handleSort('priorityDate')} className={`fas ${sortConfig.key === 'priorityDate' && sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="d-flex flex-row align-items-center justify-content-evenly">
                                    <div>File Date</div>
                                    <div>
                                        <i onClick={() => handleSort('fileDate')} className={`fas ${sortConfig.key === 'fileDate' && sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="d-flex flex-row align-items-center justify-content-evenly">
                                    <div>Agent</div>
                                    <div>
                                        <i onClick={() => handleSort('agent')} className={`fas ${sortConfig.key === 'agent' && sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="d-flex flex-row align-items-center justify-content-evenly">
                                    <div>CPC Class (First)</div>
                                    <div>
                                        <i onClick={() => handleSort('cpcClassFirst')} className={`fas ${sortConfig.key === 'cpcClassFirst' && sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="d-flex flex-row align-items-center justify-content-evenly">
                                    <div>Title</div>
                                    <div>
                                        <i onClick={() => handleSort('title')} className={`fas ${sortConfig.key === 'title' && sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">
                                <div className="d-flex flex-row align-items-center justify-content-evenly">
                                    <div>Assignee Ultimate</div>
                                    <div>
                                        <i onClick={() => handleSort('assigneeUltimate')} className={`fas ${sortConfig.key === 'assigneeUltimate' && sortConfig.direction === 'ascending' ? 'fa-sort-up' : 'fa-sort-down'}`}></i>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: "12px" }}>
                        {currentItems.map((item, index) => (
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

                            {pageNumbers.map(page => (
                                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setPage(page)}>{page}</button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setPage(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Home;
