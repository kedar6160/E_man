import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "../custom.css";
import upload from "../image/upload.png";

const AddEventPage = () => {
  const [eventData, setEventData] = useState({
    id: uuidv4(),
    eventName: "",
    eventDate: "",
    eventType: "",
    eventFile: null,
    attendeesFile: null,
    eventWebLink: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const eventFileInputRef = useRef(null);
  const attendeesFileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      setEventData({
        ...eventData,
        [e.target.name]: selectedFile,
      });
    }
  };

  const handleSelectEventFileClick = () => {
    eventFileInputRef.current.click();
  };

  const handleSelectAttendeesFileClick = () => {
    attendeesFileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Handling submit...");
    const validationErrors = validateForm();
    console.log(validationErrors.length);

    try {
      const key = eventData.id;

      localStorage.setItem(key, JSON.stringify(eventData));
      console.log("Form submitted:", eventData);

      // Display alert
      alert("Form submitted successfully");

      setEventData({
        id: "",
        eventName: "",
        eventDate: "",
        eventType: "",
        eventFile: null,
        attendeesFile: null,
        eventWebLink: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const validateForm = () => {
    const errors = {};

    // Validate each field
    if (!eventData.eventName.trim()) {
      errors.eventName = "Event Name is required";
    }
    if (!eventData.eventDate) {
      errors.eventDate = "Event Date is required";
    }

    if (!eventData.eventType) {
      errors.eventType = "Event Type is required";
    }

    if (!eventData.eventFile) {
      errors.eventFile = "Event File is required";
    }

    if (!eventData.attendeesFile) {
      errors.attendeesFile = "Attendees File is required";
    }

    if (!eventData.eventWebLink.trim()) {
      errors.eventWebLink = "Event Web Link is required";
    } else if (!isValidURL(eventData.eventWebLink)) {
      errors.eventWebLink = "Invalid URL format";
    }

    return errors;
  };
  const isValidURL = (url) => {
    // Simple URL validation using a regular expression
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  };
  return (
    <div className="container container-1 bg-white shadow-1">
      <form className="mt-2 mx-2 px-5 py-4" onSubmit={handleSubmit}>
        <h3 className="text-left text-dark py-1">Add an Event</h3>
        <div className="mb-2 ">
          <label htmlFor="eventName" className="col  ">
            Event Name
          </label>
          <div className="col">
            <input
              className=""
              type="text"
              name="eventName"
              value={eventData.eventName}
              onChange={handleChange}
              placeholder="Enter event name"
              required
            />
          </div>
        </div>
        <div className="mb-2 ">
          <label htmlFor="eventDate" className="col  ">
            Event Date
          </label>
          <div className="col">
            <input
              className=""
              type="date"
              name="eventDate"
              value={eventData.eventDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-2 ">
          <label className="col  ">Event Type</label>
          <div className="col pad-1 d-flex">
            <div className="d-flex mr-2">
              <input
                className="mx-2"
                type="radio"
                name="eventType"
                value="image"
                checked={eventData.eventType === "image"}
                onChange={handleChange}
                required
              />
              <label className="">Image</label>
            </div>
            <div className="d-flex">
              <input
                className="mx-2"
                type="radio"
                name="eventType"
                value="video"
                checked={eventData.eventType === "video"}
                onChange={handleChange}
                required
              />
              <label className="">Video</label>
            </div>
          </div>
        </div>
        <label htmlFor="eventFile" className="col">
          Event File Type
        </label>
        <div className="my-2 drop-zone">
          <div className="col d-flex flex-column align-items-center">
            <input
              ref={eventFileInputRef}
              className="drop-zone__input"
              type="file"
              name="eventFile"
              onChange={handleFileChange}
              accept={eventData.eventType === "image" ? "image/*" : "video/*"}
              required
            />
            <img
              className="img-fluid width-24"
              src={upload}
              alt="upload img"
            ></img>
            <span className="drop-zone__prompt">Upload Event File here</span>
            <div>
              <button
                onClick={handleSelectEventFileClick}
                className="btn btn-dark m-2"
                type="button"
              >
                Select File
              </button>
            </div>
          </div>
        </div>

        <label htmlFor="attendeesFile" className="col">
          Upload Attendee Excel sheet
        </label>
        <div className="my-2 drop-zone">
          <div className="col d-flex flex-column align-items-center">
            <input
              ref={attendeesFileInputRef}
              className="drop-zone__input"
              type="file"
              name="attendeesFile"
              onChange={handleSelectAttendeesFileClick}
              accept=".xlsx, .csv"
              required
            />
            <img
              className="img-fluid width-24"
              src={upload}
              alt="upload img"
            ></img>
            <span className="drop-zone__prompt">
              Upload Attendee Excel sheet
            </span>
            <div>
              <button
                onClick={handleSelectAttendeesFileClick}
                className="btn btn-dark m-2"
                type="button"
              >
                Select File
              </button>
            </div>
          </div>
        </div>

        <div className="mb-2 ">
          <label htmlFor="eventWebLink" className="col  ">
            Event Web Link
          </label>
          <div className="col">
            <input
              className=""
              type="url"
              name="eventWebLink"
              value={eventData.eventWebLink}
              onChange={handleChange}
              placeholder="Enter event web link"
              required
            />
          </div>
        </div>

        <div className="text-center d-flex flex-column  ">
          <div>
            <button className="btn btn-dark m-2 w-25 btn-lg" type="submit">
              
              Submit
            </button>
          </div>
          <a className=" text-center text-decor" href="/all-events">
    
            See All Events
          </a>
        </div>
      </form>
    </div>
  );
};
export default AddEventPage;
