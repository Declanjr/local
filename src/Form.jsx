// MissionForm.js
import React, { useState } from 'react';
import './styles.css';
import './scripts.js';
import Notification from './Notification'; // Import the Notification component

function MissionForm() {
  const [staffId, setStaffId] = useState('');
  const [staffName, setStaffName] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [purpose, setPurpose] = useState('');
  const [expectedResults, setExpectedResults] = useState('');
  const [proposerId, setProposerId] = useState('');
  const [approvedId, setApprovedId] = useState('');
  const [place, setPlace] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [missionDuration, setMissionDuration] = useState('');
  const [transport, setTransport] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [missionAllowance, setMissionAllowance] = useState('');
  const [transportAllowance, setTransportAllowance] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [locations, setLocations] = useState([{ location: '', dateFrom: '', dateTo: '', days: '', nights: '' }]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleAddRow = () => {
    setLocations([...locations, { location: '', dateFrom: '', dateTo: '', days: '', nights: '' }]);
  };

  const handleLocationChange = (index, key, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index][key] = value;
    setLocations(updatedLocations);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!staffId) {
      setNotification({ message: 'Staff ID is required!', type: 'error' });
      return;
    }

    // Simulate successful form submission
    setNotification({ message: 'Mission submitted successfully!', type: 'success' });
  };

  const closeNotification = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <div className="container">
      {/* Notification Pop-up */}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />

      <header>
        <img src="/src/main/resources/Static/Assets/RRA_Logo_home.png" alt="Left" className="Image" />
        <img src="/src/main/resources/Static/Assets/internal.jpg" alt="Right" className="Internal" />
      </header>
      <hr className="separator" />

      <div className="form-container">
        <div className="form-group1">
          <label htmlFor="reference">Reference</label>
          <input type="text" id="reference" className="first" readOnly />
        </div>

        <div className="form-group1">
          <label htmlFor="date">Date: </label>
          <input type="date" id="date" className="first" readOnly />
        </div>
      </div>

      <div className="headercontainer">
        <h1 className="head1">Travel Clearance</h1>
      </div>

      <div className="Labels">
        <label htmlFor="staff-id">Staff ID</label>
        <input
          type="text"
          id="staff-id"
          className="Staff-id"
          placeholder="Staff ID"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
        />
      </div>

      {/* Staff Information */}
      <div className="container1">
        <div className="form-group">
          <label htmlFor="name">Staff Names</label>
          <input
            type="text"
            id="name"
            placeholder="Staff Names"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Staff Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department/Division</label>
          <input
            type="text"
            id="department"
            placeholder="Department/Division"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            readOnly
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="purpose">Purpose of Mission</label>
        <textarea
          id="purpose"
          className="text_area"
          rows="3"
          cols="80"
          placeholder="Write purpose of mission here."
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        ></textarea>
      </div>

      <h2>Attachments</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>File Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mission Support</td>
            <td id="file-name-cell"></td>
            <td>
              <a href="#" id="upload-doc">
                <img
                  src="/src/main/resources/Static/Assets/attach.png"
                  alt="Attach"
                  style={{ width: '20px', height: '20px' }}
                />
              </a>
              <a href="#" id="delete-doc">
                <img
                  src="/src/main/resources/Static/Assets/clear.png"
                  alt="Clear"
                  style={{ width: '20px', height: '20px' }}
                />
              </a>
              <a href="#" id="view-doc">
                <img
                  src="/src/main/resources/Static/Assets/view.png"
                  alt="View"
                  style={{ width: '20px', height: '20px' }}
                />
              </a>
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                accept="application/pdf"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="form-group">
        <label htmlFor="expected-results">Expected Results</label>
        <textarea
          id="expected-results"
          className="text_area"
          rows="3"
          cols="80"
          placeholder="Expected results after mission."
          value={expectedResults}
          onChange={(e) => setExpectedResults(e.target.value)}
        ></textarea>
      </div>

      <div className="Labels">
        <label htmlFor="proposer_id">Who Proposed Mission</label>
        <input
          type="text"
          id="proposer_id"
          className="mission-id"
          placeholder="Search Staff ID or Staff Name"
          value={proposerId}
          onChange={(e) => setProposerId(e.target.value)}
        />
      </div>

      <div className="Labels">
        <label htmlFor="approved_id">Who Approved Mission</label>
        <input
          type="text"
          id="approved_id"
          className="mission-id"
          placeholder="Search Staff ID or Staff Name"
          value={approvedId}
          onChange={(e) => setApprovedId(e.target.value)}
        />
      </div>

      <div className="Labels">
        <label htmlFor="place_id">Place and Date of Departure</label>
        <input
          type="text"
          id="place_id"
          className="mission-place"
          placeholder="Departure"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <input
          type="date"
          id="departure_id"
          className="depart_date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>

      <div className="Labels1">
        <label>Destination</label>
        <table id="missionTable">
          <thead>
            <tr>
              <th rowSpan="2">Location</th>
              <th rowSpan="2">Date From</th>
              <th rowSpan="2">Date To</th>
              <th colSpan="2" className="mission-duration">Mission Duration</th>
            </tr>
            <tr>
              <th>Days</th>
              <th>Nights</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {locations.map((location, index) => (
              <tr key={index}>
                <td>
                  <select
                    className="td_dropdown"
                    name="location"
                    id={`location-${index}`}
                    value={location.location}
                    onChange={(e) => handleLocationChange(index, 'location', e.target.value)}
                  >
                    <option value="">Select Location</option>
                                <option value="GASABO">GASABO</option>
                                <option value="KICUKIRO">KICUKIRO</option>
                                <option value="MUSANZE">MUSANZE</option>
                                <option value="NYABIHU">NYABIHU</option>
                                <option value="NYARUGENGE">NYARUGENGE</option>
                                <option value="RUBAVU">RUBAVU</option>
                                <option value="BUGESERA">BUGESERA</option>
                                <option value="HUYE">HUYE</option>
                                <option value="KARONGI">KARONGI</option>
                                <option value="NYAMASHEKE">NYAMASHEKE</option>
                                <option value="RUSIZI">RUSIZI</option>
                                <option value="GICUMBI">GICUMBI</option>
                                <option value="KAYONZA">KAYONZA</option>
                                <option value="MUHANGA">MUHANGA</option>
                                <option value="NYAGATARE">NYAGATARE</option>
                                <option value="NYAMAGABE">NYAMAGABE</option>
                                <option value="NYANZA">NYANZA</option>
                                <option value="RWAMAGANA">RWAMAGANA</option>
                                <option value="BURERA">BURERA</option>
                                <option value="GAKENKE">GAKENKE</option>
                                <option value="GATSIBO">GATSIBO</option>
                                <option value="GISAGARA">GISAGARA</option>
                                <option value="KAMONYI">KAMONYI</option>
                                <option value="KIREHE">KIREHE</option>
                                <option value="NGOMA">NGOMA</option>
                                <option value="NGORORERO">NGORORERO</option>
                                <option value="RUHANGO">RUHANGO</option>
                                <option value="RULINDO">RULINDO</option>
                                <option value="RUTSIRO">RUTSIRO</option>
                                <option value="NYARUGURU">NYARUGURU</option>
                            
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    id={`dateFrom-${index}`}
                    value={location.dateFrom}
                    onChange={(e) => handleLocationChange(index, 'dateFrom', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id={`dateTo-${index}`}
                    value={location.dateTo}
                    onChange={(e) => handleLocationChange(index, 'dateTo', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id={`days-${index}`}
                    className="form-control"
                    value={location.days}
                    onChange={(e) => handleLocationChange(index, 'days', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id={`nights-${index}`}
                    className="form-control"
                    value={location.nights}
                    onChange={(e) => handleLocationChange(index, 'nights', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-row-btn" onClick={handleAddRow}>
          Add Row
        </button>
      </div>

      <div className="Labels">
        <label htmlFor="return_id">Return Date</label>
        <input
          type="date"
          id="return_id"
          className="return_date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      <div className="Labels">
        <label htmlFor="duration_id">Mission Duration</label>
        <input
          type="text"
          id="duration_id"
          className="mission-duration"
          placeholder="Enter Mission Duration"
          value={missionDuration}
          onChange={(e) => setMissionDuration(e.target.value)}
        />
      </div>

      <div className="Labels">
        <label htmlFor="transport_id">Mode of Transport</label>
        <input
          type="text"
          id="transport_id"
          className="mission-transport"
          placeholder="Enter Mode of Transport"
          value={transport}
          onChange={(e) => setTransport(e.target.value)}
        />
        <input
          type="text"
          id="plate_id"
          className="plate"
          placeholder="Enter Vehicle Plate Number"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        />
      </div>

      <div className="container">
        <table className="table2">
          <thead>
            <tr>
              <th>Mission Allowance (RWF)</th>
              <th>Transport Allowance (RWF)</th>
              <th>Total Amount (RWF)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  id="mission_allowance_id"
                  placeholder="Mission Allowance"
                  value={missionAllowance}
                  onChange={(e) => setMissionAllowance(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="transport_allowance_id"
                  placeholder="Transport Allowance"
                  value={transportAllowance}
                  onChange={(e) => setTransportAllowance(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  id="total_amount_id"
                  placeholder="Total Amount"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="buttons">
        <button id="submit" className="approval-btn" onClick={handleFormSubmit}>
          Submit for Approval
        </button>

        <a href="/src/main/resources/templates/mission.html">
          <button id="cancel" className="cancel-btn">
            Cancel
          </button>
        </a>
      </div>
    </div>
  );
}

export default MissionForm;
