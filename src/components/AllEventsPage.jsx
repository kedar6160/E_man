import "../custom.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AllEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [editingEventId, setEditingEventId] = useState(null); 
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    date: "",
    eventName: "",
  });

  useEffect(() => {
    // Fetch events from localStorage or your database
    const storedEvents = Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
    setEvents(storedEvents);
    setFilteredEvents(storedEvents);
  }, []);

  const handleEdit = (eventId) => {
    setEditingEventId(eventId);
  };

  const handleDelete = (eventId) => {
    // Implement logic to delete the event from localStorage
    localStorage.removeItem(eventId);
   
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    setFilteredEvents((prevFilteredEvents) => prevFilteredEvents.filter((event) => event.id !== eventId));
    alert("Event deleted successfully");
  };

  const handleSearch = () => {
    // Filter events based on the search criteria when the search button is clicked
    const filteredEvents = events.filter((event) => {
      const dateMatch = event.eventDate.includes(searchCriteria.date);
      const eventNameMatch = event.eventName.toLowerCase().includes(searchCriteria.eventName.toLowerCase());

      return dateMatch && eventNameMatch;
    });

    // Update the state with the filtered events
    setFilteredEvents(filteredEvents);
  };


  return (
    <div className="container container-2 bg-white shadow-1">
      <h3 className="text-left text-dark m-2 p-2">All Events</h3>
      <div className="d-flex align-items-center search">
          <div className=" width-30 m-2 p-2">

          <div className="col">
          <input
            type="text"
            name="date"
            value={searchCriteria.date}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, date: e.target.value })}
            placeholder="Search by date"
            className="form-control mr-2"
          />
          </div>
          </div>
          <div className=" width-30 m-2 p-2">

          <div className="col">
          <input
            type="text"
            name="eventName"
            value={searchCriteria.eventName}
            onChange={(e) => setSearchCriteria({ ...searchCriteria, eventName: e.target.value })}
            placeholder="Search by event name"
            className="form-control"
          /></div>
          </div>
          <div className=" width-30 m-2 p-2">
          <button className="btn btn-primary" onClick={handleSearch }>
            Search
          </button>
          </div>
            
        </div>
      {/* Event List */}
      <div className="d-flex flex-row flex-wrap p-2">
      {filteredEvents.map((event) => (
        <div key={event.id} className="card card-1 width-30 m-2 p-2">
          {event.eventType === "image" ? (
              <img width="100%" height="160px"
                className="card-img-top"
                src={event.eventFilePath ? event.eventFilePath : 'https://dummyimage.com/600x400/000/fff'}
                alt={event.eventName}
              />
            ) : event.eventType === "video" ? (
              <video width="100%" height="160px" controls>
                <source src={event.eventFilePath ? event.eventFilePath : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Unsupported event type</p>
            )}
          <div className="card-body-1"  >
            <h4 className="card-title">{event.eventName}</h4>
            <p className="card-subtitle mb-2 text-body-secondary">Event Date: {event.eventDate}</p>
            <p className="card-text">{event.eventType}</p>
          </div>

          <div>
            <button className="text-decor mx-2 btn btn-link" onClick={() => handleEdit(event.id)}>
              Edit
            </button>
            <button className="text-decor mx-2 btn btn-link" onClick={() => handleDelete(event.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}

    

      
      </div>
      <div className="m-2 p-2" >
      <Link to="/" className="btn btn-dark">
        Add Event
      </Link>
      </div>
    </div>
  );
};

export default AllEventsPage;
