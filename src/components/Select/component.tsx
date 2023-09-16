import React, {FC, useEffect, useState} from 'react';
import './styles.css';
import {Response, ResponseData} from "./types";

const Select: FC = () => {
  const [users, setUsers] = useState<Array<ResponseData> | []>([]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<ResponseData>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fetching, setFetching] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    if (fetching) {
      fetch(`https://alanbase-front-bt2of.ondigitalocean.app/api/users?page=${currentPage}&limit=50`)
        .then((res) => res.json())
        .then((d: Response) => {
          setUsers([...users, ...d.data]);
          setCurrentPage(prevState => prevState + 1);
          setTotalCount(d.meta.total);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  const handleSelect = (option: ResponseData): void => {
    setSelectedUser(option);
    setIsActive(!isActive);
  };

  // @ts-ignore
  const scrollHandler = (e): void => {
    if ((e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100)
      && users.length <= totalCount) {
      setFetching(true);
    }
  };

  return (
    <div className="dropdown">
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className="dropdown-btn"
        style={isActive ? {border: "1px solid #4971ff"} : {border: "1px solid #ddd"}}
      >
        {selectedUser ?
                      `${selectedUser.last_name + " " + selectedUser.first_name + "," + selectedUser.job}`
                      : 'LastName FirstName, jobTitle'}
        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.21173 5.92865C5.01902 6.04743 4.76317 6.02329 4.59612 5.85624L0.353478 1.6136C0.158216 1.41834 0.158216 1.10176 0.353478 0.906495C0.54874 0.711233 0.865323 0.711234 1.06058 0.906495L4.94969 4.7956L8.83883 0.906449C9.0341 0.711187 9.35068 0.711187 9.54594 0.906449C9.7412 1.10171 9.7412 1.41829 9.54594 1.61356L5.3033 5.8562C5.27507 5.88443 5.2443 5.90858 5.21173 5.92865Z" fill="#3F4254"/>
        </svg>
      </div>
      <div
        className="dropdown-content"
        style={{ display: isActive ? "block" : "none" }}
      >
        {Array.isArray(users) && users.map((option: ResponseData) => {
          return (
            <div
              onClick={() => handleSelect((option))}
              className={`item ${selectedUser?.id === option.id && 'item-selected'}`}
              key={option.id}
            >
              <div className="content-container">
                <div className="dot">{option.last_name.charAt(0)}</div> {option.last_name} {option.first_name},{option.job}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );

};

export default Select;