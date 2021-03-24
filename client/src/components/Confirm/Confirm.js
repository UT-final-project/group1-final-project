import React, { useState } from 'react';
import './Confirm.css';
import styled, { css } from 'styled-components';
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = styled.h1`
    font-size: 56px;
    font-family:Georgia, 'Times New Roman', Times, serif;
    text-align: center;

    ${props =>
        props.primary &&
        css`
        text-align: left;
        font-size: 32px;
    `}
`

const SubHeader = styled.h2`
    font-size: 24px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: 800;
    ${props =>
        props.light &&
        css`
        font-size: 20px;
        font-weight: 200;
    `}
`

const ResumeContent = styled.p`
    font-size: 18px;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
`

function Confirm(props) {
    const [redirect, setRedirect] = useState(false)

    function handleRedirect(e) {
        e.preventDefault();

        setRedirect(true);
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <div className="container">
            {redirect ? <Redirect push to="/userhome" /> : <></>}

            {/* Modal starts here */}

            <div className="modal fade" id="submitModal" tabIndex="-1" aria-labelledby="submitModal" aria-hidden="true" onClick={handleRedirect}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Resume Submitted</h5>
                            <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close"><span className="fa-icon"><FontAwesomeIcon icon={faTimes} /></span></button>
                        </div>
                        <div className="modal-body">
                            <p>You can veiw and edit your resume from your home page.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn userhomebtn" data-bs-dismiss="modal">Ok</button>
                            {/* <button type="button" class="btn btn-primary">Ok</button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal ends here */}

            <br />
            <Header>{capitalize(props.user.firstname)} {capitalize(props.user.lastname)}</Header>
            {!props.summary.length && !props.skillList.length && !props.employment.length
                && !props.eduHistory.length && !props.certHistory.length ? (
                    <h3 id="noContent">No Resume content to display yet!</h3>
                ) : (<div />)}
            <Header primary>Summary</Header>
            <hr />
            {props.summary.length ? (
                <ResumeContent>{props.summary}</ResumeContent>
            ) : (<div />)}
            <br />
            <Header primary>Education</Header>
            <hr />
            {props.eduHistory.length ? (
                props.eduHistory.map(school => {
                    return (
                        <section>
                            <SubHeader>{school.school}</SubHeader>
                            <SubHeader light>{school.degree}</SubHeader>
                            <SubHeader light>{school.startYear} - {school.endYear}</SubHeader>
                        </section>
                    )
                })
            ) : (<div />)}
            <br />
            <Header primary>Experience</Header>
            <hr />
            {props.employment.length ? (
                props.employment.map((jobs) => {
                    return (
                        <section>
                            <SubHeader>{jobs.jobTitle} at {jobs.prevEmployer}</SubHeader>
                            <SubHeader light>{jobs.startDateMonth} {jobs.startDateYear} - {jobs.endDateMonth} {jobs.endDateYear}</SubHeader>
                            <SubHeader light>{jobs.jobDescription}</SubHeader>
                        </section>
                    )
                })
            ) : (<div />)}
            <br />
            <Header primary>Skills</Header>
            <hr />
            {props.skillList.length ? (
                props.skillList.map((skill) => {
                    return (
                        <section>
                            <SubHeader light>{skill}</SubHeader>
                        </section>
                    )
                })
            ) : (<div />)}
            <br />
            <Header primary>Certifications</Header>
            <hr />
            {props.certHistory.length ? (
                props.certHistory.map((cert) => {
                    return (
                        <section>
                            <SubHeader>{cert.certificate}</SubHeader>
                            <SubHeader light>Awarded By: {cert.awardedBy}</SubHeader>
                        </section>
                    )
                })
            ) : (<div />)}
            <br />
            <button type="button" className="btn back-btn" onClick={props.prevStep}>Back</button>
            <button type="button" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#submitModal" onClick={props.submitResume}>Submit</button>
        </div>
    );
};

export default Confirm;