import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Google from "../../assets/Google.svg";
import Bookmark from "../../assets/Bookmark.svg";
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

export const JobsListSecond = () => {


    const [data, setData] = useState({
        getData: []
    })

    useEffect(() => {
        if (sessionStorage.getItem("job") === "") {
            axios.post("http://localhost:3001/findAllJobPos", {
                "jobInfo.location": sessionStorage.getItem("location"),
              })
              .then((response) => {
                setData({
                  getData: response.data.data.jobs,
                });
                console.log(response.data.data.jobs);
              })
              .catch((err) => {
                console.log(err);
              });
        }
        else if (sessionStorage.getItem("location") === "") {
            axios.post("http://localhost:3001/findAllJobPos", {
                "jobInfo.title": sessionStorage.getItem("job"),
              })
              .then((response) => {
                setData({
                  getData: response.data.data.jobs,
                });
                console.log(response.data.data.jobs);
              })
              .catch((err) => {
                console.log(err);
              });
        }
        else{
            axios.post("http://localhost:3001/findAllJobPos", {
                "jobInfo.title": sessionStorage.getItem("job"),
                "jobInfo.location": sessionStorage.getItem("location"),
              })
              .then((response) => {
                setData({
                  getData: response.data.data.jobs,
                });
                console.log(response.data.data.jobs);
              })
              .catch((err) => {
                console.log(err);
              });
        }

    }, []);

    return (
        <>
            {
                data.getData.map((job) => {
                    return (
                      <Link to="/AboutCompany" state={{ job }}>
                        <div class="w-full py-4 bg-white mb-10">
                          <div class="grid grid-cols-6 gap-4">
                            <div>
                              <img
                                src={job.compInfo.logoUrl}
                                alt="pic"
                                className="pt-3 pl-10 h-24"
                              />
                            </div>
                            <div class="col-start-2 col-span-4">
                              <h2 className="text-2xl font-semibold mt-3">
                                {job.jobInfo.title}
                              </h2>
                              <h3 className="text-lg font-semibold">
                                {job.compInfo.name}
                              </h3>
                              <div className="flex flex-row flex-wrap">
                                <div className="flex flex-row flex-wrap mr-5 mt-2">
                                  <CurrencyRupeeRoundedIcon></CurrencyRupeeRoundedIcon>
                                  <h3 className="">{job.jobInfo.salary}</h3>
                                </div>
                                <div className="flex flex-row flex-wrap mr-5 mt-2">
                                  <AccessibleForwardOutlinedIcon></AccessibleForwardOutlinedIcon>
                                  <h3 className="">
                                    {job.jobInfo.disabilityType}
                                  </h3>
                                </div>
                                <div className="flex flex-row flex-wrap mt-2">
                                  <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
                                  <h3 className="">{job.jobInfo.location}</h3>
                                </div>
                              </div>
                              <h2 className="mt-3 text-lg">
                                {job.jobDescp.abtRole}
                              </h2>
                              <button className="bg-violet-200 text-indigo-600 font-bold rounded mr-2 mt-7 py-2 px-8">
                                2 Days ago
                              </button>
                              <button className="bg-violet-200 text-indigo-600 font-bold rounded mt-7 py-2 px-10">
                                Apply Now
                              </button>
                            </div>
                            <div>
                              <img
                                src={Bookmark}
                                alt="pic"
                                className="pt-3 pl-10 h-12"
                              />
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                })
            }
        </>
    );
};
