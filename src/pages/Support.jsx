import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import useScrolltoTop from "../hooks/useScrollToTop";
import { Collapse } from 'antd';
import {MdOutlineMessage} from "react-icons/md";
import { Button,Divider } from 'antd';
const Support = () => {
  useScrolltoTop();
  const { Panel } = Collapse;
  return (
    <div>
      <p
        className="lead fw-bold mb-0"
        style={{ color: "var(--clr-light-blue)" }} >
        Help & Support{" "}
      </p>
      <div className="lead fw-bold" style={{ fontSize: "14px" }}>
        {" "}
        Let's take a step a head and help you better
      </div>
      <div className="card" style={{ width: "60rem" }}>
        <div className="card-body">
        <div className="d-flex align-items-start">
        <div className="row">

        <div className="col-4">
        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical" 
   style={{
    backgroundColor: "var(--clr-dark-blue)",
    color: "var(--clr-black)"
  }}>
    <button className="nav-link active" id="v-pills-faqs-tab" data-bs-toggle="pill" data-bs-target="#v-pills-faqs" type="button" role="tab" aria-controls="v-pills-faqs" aria-selected="true" > FAQ's</button>
    <button className="nav-link" id="v-pills-questions-tab" data-bs-toggle="pill" data-bs-target="#v-pills-questions" type="button" role="tab" aria-controls="v-pills-questions" aria-selected="false">Questions</button>
    <button className="nav-link" id="v-pills-answers-tab" data-bs-toggle="pill" data-bs-target="#v-pills-answers" type="button" role="tab" aria-controls="v-pills-answers" aria-selected="false">Answers</button>
    <button className="nav-link" id="v-pills-previlages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-previlages" type="button" role="tab" aria-controls="v-pills-previlages" aria-selected="false">Previlages</button>
    
  </div>
  <br></br>
  <br></br>
  <br></br>
  <br></br>
  <Divider className="mb-0 mt-0" />
  <div className ="feedback bg-light text-dark mb-2" style={{ marginTop:'50px !important' }}>
  <MdOutlineMessage/> Have a Feedback?
  <p style={{ fontSize: "14px" }}>
  if you are facing any issues or having any suggestions that can improve the overall experience, please feel free to write us.
  </p>
  <div className='p-2'>
  <Button  type="primary">write feedback</Button>
  <br></br>
  <br></br>
  </div>
</div>

        </div>
        <div className="col-8">
        <div className="tab-content" id="v-pills-tabContent">
    <div className="tab-pane fade show active" id="v-pills-faqs" role="tabpanel" aria-labelledby="v-pills-faqs-tab">
    <p
        className="lead fw-bold mb-0"
        style={{ color: "var(--clr-light-blue)" ,fontSize: "14px"}}>FAQ'S</p>

<Collapse bordered expandIconPosition="end" defaultActiveKey={['1']}>
    <Panel expandIconPosition="end" header="what are the tags and how to show  them?" key="1" style={{backgroundColor:'white'}}>
    A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
    </Panel>
    <Panel expandIconPosition="end" header="How do i ask a question?" key="2" style={{backgroundColor:'white'}}>
     From a ask a question button on header we can redirect to the ask question page where we can post the queation.
    </Panel>
    <Panel expandIconPosition="end" header="What does it means if question marked as sloved?" key="3" style={{backgroundColor:'white'}}>
    It means the questions posted is sloved with answers which is having it.
    </Panel>
    <Panel expandIconPosition="end" header="The no of bades i had were reduced, why is that?" key="4" style={{backgroundColor:'white'}}>
    It means you have contact your cheif for detilss
    </Panel>
    <Panel expandIconPosition="end" header="what are the tags and how to show  them?" key="5" style={{backgroundColor:'white'}}>
    A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
    </Panel>
    <Panel  expandIconPosition="end"header="What does it means if question marked as sloved?" key="6" style={{backgroundColor:'white'}}>
    It means the questions posted is sloved with answers which is having it.
    </Panel>
  </Collapse>
    </div>
    <div className="tab-pane fade" id="v-pills-questions" role="tabpanel" aria-labelledby="v-pills-questions-tab">
    <p
        className="lead fw-bold mb-0"
        style={{ color: "var(--clr-light-blue)" ,fontSize: "14px"}}>Questions</p>
        <Collapse bordered expandIconPosition="end" defaultActiveKey={['1']}>
    <Panel expandIconPosition="end" header="what are the tags and how to show  them?" key="1" style={{backgroundColor:'white'}}>
    A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
    </Panel>
    <Panel expandIconPosition="end" header="How do i ask a question?" key="2" style={{backgroundColor:'white'}}>
     From a ask a question button on header we can redirect to the ask question page where we can post the queation.
    </Panel>
    <Panel expandIconPosition="end" header="What does it means if question marked as sloved?" key="3" style={{backgroundColor:'white'}}>
    It means the questions posted is sloved with answers which is having it.
    </Panel>
    <Panel expandIconPosition="end" header="The no of bades i had were reduced, why is that?" key="4" style={{backgroundColor:'white'}}>
    It means you have contact your cheif for detilss
    </Panel>
  </Collapse>
    </div>
  </div>
        </div>




          
        </div>
        </div>
        </div>
        </div>
    </div>
  );
};

export default Support;
