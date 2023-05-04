import React from "react";
import { TbMessages } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import "./Tags.css";
import { useLocation } from "react-router-dom";
import useFetchContributor from "../Tags/UseFetchContributor";

const TagsDescriptionHeader = ({ data }) => {
  const location = useLocation();
  const tagId = location.pathname.split("/")[2];
  const tagUrl = `${process.env.REACT_APP_QUESTION_SERVICE_ENDPOINT}/questionservice/tag/topContributor/${tagId}/v1`;
  const { tagData } = useFetchContributor(tagUrl);

 
 
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="row col-8">
            <p className="lead fw-bold">{data && data.tagText ?capitalizeWords(data.tagText): ''}</p>
            <p>{data && data.description}</p>
            <div className="gap-4 d-flex">
              <div className="bg-light p-1 text-dark" style={{fontSize :"12px"}}>
                <TbMessages className="icon"/> {data && data.questionCount} Questions
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-0 d-flex flex-column ">
          <div className="row">
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body  p-0">
                  <h5 className="card-title p-1">Top Contributors</h5>
                  <ul className="card-text overflow-auto bg-light p-1 text-dark">
                    <li className="list-group-item border-0  p-0 bg-light text-dark">
                    {tagData.length > 0 ?(tagData && tagData.map(post => <p>{ capitalizeWords(post.firstName) + ' '+capitalizeWords(post.lastName)} </p>)) : <p>{"No top Contributors"}</p>}
                    
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsDescriptionHeader;
