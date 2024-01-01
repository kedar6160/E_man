import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import AddEventPage from "./components/AddEventPage";
import AllEventsPage from "./components/AllEventsPage";
// import EventDetailsPage from "./components/EventDetailsPage";

function App() {
  return (
    <div className="main px-2 py-4">
      <Routes>
        <Route path="/" element={<AddEventPage />} />
        <Route path="/all-events" element={<AllEventsPage />} />
        {/* <Route path="/event-details/:eventId" element={<EventDetailsPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;