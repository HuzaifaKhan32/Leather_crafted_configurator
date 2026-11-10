import React, { useState } from 'react';
// ============================================================================

// 1. MEN'S SIZE GUIDE COMPONENT

// ============================================================================

function MenSizeGuide({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('body');
  const [unit, setUnit] = useState('in');

  if (!isOpen) return null;

  const bodyDataIn = [
    { size: 'XS', chest: '37 - 38' },
    { size: 'S', chest: '39 - 40' },
    { size: 'M', chest: '41 - 42' },
    { size: 'L', chest: '43 - 44' },
    { size: 'XL', chest: '45 - 46' },
    { size: 'XXL', chest: '47 - 48' },
    { size: 'XXXL', chest: '49 - 50' },
  ];

  const bodyDataCm = [
    { size: 'XS', chest: '94 - 96.5' },
    { size: 'S', chest: '99 - 101.5' },
    { size: 'M', chest: '104 - 106.5' },
    { size: 'L', chest: '109 - 112' },
    { size: 'XL', chest: '114.5 - 117' },
    { size: 'XXL', chest: '119.5 - 122' },
    { size: 'XXXL', chest: '124.5 - 127' },
  ];

  const jacketDataIn = [
    { size: 'XS', chest: '42', shoulder: '18.75', sleeve: '26' },
    { size: 'S', chest: '44', shoulder: '19.25', sleeve: '26.25' },
    { size: 'M', chest: '46', shoulder: '19.75', sleeve: '26.5' },
    { size: 'L', chest: '48', shoulder: '20.25', sleeve: '26.75' },
    { size: 'XL', chest: '52', shoulder: '21', sleeve: '27' },
    { size: 'XXL', chest: '54', shoulder: '21.5', sleeve: '27.25' },
    { size: 'XXXL', chest: '56', shoulder: '22', sleeve: '27.5' },
  ];

  const jacketDataCm = [
    { size: 'XS', chest: '106.7', shoulder: '47.6', sleeve: '66' },
    { size: 'S', chest: '111.8', shoulder: '48.9', sleeve: '66.7' },
    { size: 'M', chest: '116.8', shoulder: '50.2', sleeve: '67.3' },
    { size: 'L', chest: '121.9', shoulder: '51.4', sleeve: '68' },
    { size: 'XL', chest: '132.1', shoulder: '53.3', sleeve: '68.6' },
    { size: 'XXL', chest: '137.2', shoulder: '54.6', sleeve: '69.2' },
    { size: 'XXXL', chest: '142.2', shoulder: '55.9', sleeve: '69.9' },
  ];

  return (
    <div className="sg-overlay" onClick={onClose}>
      <div className="sg-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sg-header">
          <h2>Size Guide</h2>
          <button className="sg-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="sg-body">
          <div className="sg-unit-row">
            <span className="sg-unit-label">Switch to</span>
            <div className="sg-unit-toggle">
              <button className={`sg-unit-btn ${unit === 'cm' ? 'active' : ''}`} onClick={() => setUnit('cm')}>CM</button>
              <button className={`sg-unit-btn ${unit === 'in' ? 'active' : ''}`} onClick={() => setUnit('in')}>IN</button>
            </div>
          </div>

          <div className="sg-tabs">
            <button className={`sg-tab ${activeTab === 'body' ? 'active' : ''}`} onClick={() => setActiveTab('body')}>BODY MEASUREMENT</button>
            <button className={`sg-tab ${activeTab === 'jacket' ? 'active' : ''}`} onClick={() => setActiveTab('jacket')}>JACKET MEASUREMENTS</button>
          </div>

          {activeTab === 'body' && (
            <div className="sg-category-banner">BODY MEASUREMENT: MEN'S OUTERWEAR</div>
          )}

          <div className="sg-table-container">
            <table className="sg-table">
              <thead>
                <tr>
                  <th>SIZE</th>
                  {activeTab === 'body' ? (
                    <th>CHEST ({unit.toUpperCase()})</th>
                  ) : (
                    <>
                      <th>CHEST ({unit.toUpperCase()})</th>
                      <th>SHOULDER ({unit.toUpperCase()})</th>
                      <th>SLEEVE ({unit.toUpperCase()})</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeTab === 'body'
                  ? (unit === 'in' ? bodyDataIn : bodyDataCm).map((row) => (
                      <tr key={row.size}>
                        <td><strong>{row.size}</strong></td>
                        <td>{row.chest}</td>
                      </tr>
                    ))
                  : (unit === 'in' ? jacketDataIn : jacketDataCm).map((row) => (
                      <tr key={row.size}>
                        <td><strong>{row.size}</strong></td>
                        <td>{row.chest}</td>
                        <td>{row.shoulder}</td>
                        <td>{row.sleeve}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {activeTab === 'body' && (
            <div className="sg-tip-box">
              <h4>WHAT SIZE SHOULD I PICK?</h4>
              <div className="sg-tip-group">
                <strong>Body Chest Measurement</strong>
                <p>Take a tape measure and wrap it under your armpits at the fullest part of your chest.</p>
              </div>
              <div className="sg-tip-group">
                <strong>Size Selection Tip</strong>
                <p>If your body chest is 41"-42", your jacket chest will be 46".</p>
              </div>
              <div className="sg-tip-group">
                <strong>Contact Us</strong>
                <p>For further information on size advice or customization, please drop us a message.</p>
              </div>
            </div>
          )}

          <div className="sg-diagram-container">

            <img

              src={activeTab === 'body' ? '/bodyMeasurement-Men.png' : '/Jacketmesurement-Men.png'}

              alt="Men Measurement Diagram"

              className="sg-diagram-img"

            />

          </div>

        </div>

      </div>

    </div>

  );

}

function MenShearlingSizeGuide({ isOpen, onClose }) {

  const [activeTab, setActiveTab] = useState('body');

  const [unit, setUnit] = useState('in');



  if (!isOpen) return null;



  const bodyDataIn = [
    { size: 'XS', chest: '37 - 38' },
    { size: 'S', chest: '39 - 40' },
    { size: 'M', chest: '41 - 42' },
    { size: 'L', chest: '43 - 44' },
    { size: 'XL', chest: '45 - 46' },
    { size: 'XXL', chest: '47 - 48' },
    { size: 'XXXL', chest: '49 - 50' },
  ];



  const bodyDataCm = [

    { size: 'XS', chest: '94 - 96.5' },

    { size: 'S', chest: '99 - 101.5' },

    { size: 'M', chest: '104 - 106.5' },

    { size: 'L', chest: '109 - 112' },

    { size: 'XL', chest: '114.5 - 117' },

    { size: 'XXL', chest: '119.5 - 122' },

    { size: 'XXXL', chest: '124.5 - 127' },

  ];



  const jacketDataIn = [
    { size: 'XS', chest: '44', shoulder: '18.75', sleeve: '26' },
    { size: 'S', chest: '46', shoulder: '19.25', sleeve: '26.25' },
    { size: 'M', chest: '48', shoulder: '19.75', sleeve: '26.5' },
    { size: 'L', chest: '52', shoulder: '20.25', sleeve: '26.75' },
    { size: 'XL', chest: '54', shoulder: '21', sleeve: '27' },
    { size: 'XXL', chest: '56', shoulder: '21.5', sleeve: '27.25' },
    { size: 'XXXL', chest: '58', shoulder: '22', sleeve: '27.5' },
  ];

  const jacketDataCm = [
    { size: 'XS', chest: '111.8', shoulder: '47.6', sleeve: '66' },
    { size: 'S', chest: '116.8', shoulder: '48.9', sleeve: '66.7' },
    { size: 'M', chest: '121.9', shoulder: '50.2', sleeve: '67.3' },
    { size: 'L', chest: '132.1', shoulder: '51.4', sleeve: '68' },
    { size: 'XL', chest: '137.2', shoulder: '53.3', sleeve: '68.6' },
    { size: 'XXL', chest: '142.2', shoulder: '54.6', sleeve: '69.2' },
    { size: 'XXXL', chest: '147.3', shoulder: '55.9', sleeve: '69.9' },
  ];



  return (

    <div className="sg-overlay" onClick={onClose}>

      <div className="sg-modal" onClick={(e) => e.stopPropagation()}>

        <div className="sg-header">

          <h2>Size Guide</h2>

          <button className="sg-close-btn" onClick={onClose}>✕</button>

        </div>



        <div className="sg-body">

          <div className="sg-unit-row">

            <span className="sg-unit-label">Switch to</span>

            <div className="sg-unit-toggle">

              <button className={`sg-unit-btn ${unit === 'cm' ? 'active' : ''}`} onClick={() => setUnit('cm')}>CM</button>

              <button className={`sg-unit-btn ${unit === 'in' ? 'active' : ''}`} onClick={() => setUnit('in')}>IN</button>

            </div>

          </div>



          <div className="sg-tabs">

            <button className={`sg-tab ${activeTab === 'body' ? 'active' : ''}`} onClick={() => setActiveTab('body')}>BODY MEASUREMENT</button>

            <button className={`sg-tab ${activeTab === 'jacket' ? 'active' : ''}`} onClick={() => setActiveTab('jacket')}>JACKET MEASUREMENTS</button>

          </div>



          {activeTab === 'body' && (

            <div className="sg-category-banner">BODY MEASUREMENT: MEN'S OUTERWEAR</div>

          )}



          <div className="sg-table-container">

            <table className="sg-table">

              <thead>

                <tr>

                  <th>SIZE</th>

                  {activeTab === 'body' ? (

                    <th>CHEST ({unit.toUpperCase()})</th>

                  ) : (

                    <>

                      <th>CHEST ({unit.toUpperCase()})</th>

                      <th>SHOULDER ({unit.toUpperCase()})</th>

                      <th>SLEEVE ({unit.toUpperCase()})</th>

                    </>

                  )}

                </tr>

              </thead>

              <tbody>

                {activeTab === 'body'

                  ? (unit === 'in' ? bodyDataIn : bodyDataCm).map((row) => (

                      <tr key={row.size}>

                        <td><strong>{row.size}</strong></td>

                        <td>{row.chest}</td>

                      </tr>

                    ))

                  : (unit === 'in' ? jacketDataIn : jacketDataCm).map((row) => (

                      <tr key={row.size}>

                        <td><strong>{row.size}</strong></td>

                        <td>{row.chest}</td>

                        <td>{row.shoulder}</td>

                        <td>{row.sleeve}</td>

                      </tr>

                    ))}

              </tbody>

            </table>

          </div>



          {activeTab === 'body' && (

            <div className="sg-tip-box">

              <h4>WHAT SIZE SHOULD I PICK?</h4>

              <div className="sg-tip-group">

                <strong>Body Chest Measurement</strong>

                <p>Take a tape measure and wrap it under your armpits at the fullest part of your chest.</p>

              </div>

              <div className="sg-tip-group">

                <strong>Size Selection Tip</strong>

                <p>If your body chest is 41"-42", your jacket chest will be 48".</p>

              </div>

              <div className="sg-tip-group">

                <strong>Contact Us</strong>

                <p>For further information on size advice or customization, please drop us a message.</p>

              </div>

            </div>

          )}



          <div className="sg-diagram-container">

            <img

              src={activeTab === 'body' ? '/bodyMeasurement-Men.png' : '/Jacketmesurement-Men.png'}

              alt="Men Measurement Diagram"

              className="sg-diagram-img"

            />

          </div>

        </div>

      </div>

    </div>

  );

}
// ============================================================================
// 1. WOMEN SIZE GUIDE COMPONENT
// ============================================================================
function WomenSizeGuide({ isOpen, onClose }) {

  const [activeTab, setActiveTab] = useState('body');

  const [unit, setUnit] = useState('in');



  if (!isOpen) return null;



  const bodyDataIn = [

    { size: 'XS', bust: '33 - 34', waist: '27 - 28', hip: '37 - 38' },

    { size: 'S', bust: '35 - 36', waist: '29 - 30', hip: '39 - 40' },

    { size: 'M', bust: '37 - 38', waist: '31 - 32', hip: '41 - 42' },

    { size: 'L', bust: '39 - 40', waist: '33 - 34', hip: '43 - 44' },

    { size: 'XL', bust: '41 - 43', waist: '35 - 37', hip: '45 - 47' },

    { size: 'XXL', bust: '44 - 46', waist: '38 - 39', hip: '48 - 49' },

    { size: 'XXXL', bust: '47 - 49', waist: '40 - 42', hip: '50 - 52' },

  ];



  const bodyDataCm = [

    { size: 'XS', bust: '84 - 86.5', waist: '68.5 - 71', hip: '94 - 96.5' },

    { size: 'S', bust: '89 - 91.5', waist: '73.5 - 76', hip: '99 - 101.5' },

    { size: 'M', bust: '94 - 96.5', waist: '78.5 - 81', hip: '104 - 106.5' },

    { size: 'L', bust: '99 - 101.5', waist: '84 - 86.5', hip: '109 - 111.8' },

    { size: 'XL', bust: '104 - 109', waist: '89 - 94', hip: '114.3 - 119.4' },

    { size: 'XXL', bust: '111.8 - 116.8', waist: '96.5 - 99', hip: '121.9 - 124.5' },

    { size: 'XXXL', bust: '119.4 - 124.5', waist: '101.6 - 106.7', hip: '127 - 132.1' },

  ];



  const jacketDataIn = [

    { size: 'XS', bust: '40', waist: '36', shoulder: '15.75', sleeve: '23.75' },

    { size: 'S', bust: '42', waist: '38', shoulder: '16.25', sleeve: '24' },

    { size: 'M', bust: '44', waist: '40', shoulder: '16.75', sleeve: '24.25' },

    { size: 'L', bust: '46', waist: '42', shoulder: '17.25', sleeve: '24.5' },

    { size: 'XL', bust: '49', waist: '45', shoulder: '18', sleeve: '24.75' },

    { size: 'XXL', bust: '52', waist: '48', shoulder: '18.75', sleeve: '25' },

    { size: 'XXXL', bust: '55', waist: '51', shoulder: '19.5', sleeve: '25.25' },

  ];



  const jacketDataCm = [

    { size: 'XS', bust: '101.6', waist: '91.4', shoulder: '40.0', sleeve: '60.3' },

    { size: 'S', bust: '106.7', waist: '96.5', shoulder: '41.3', sleeve: '61.0' },

    { size: 'M', bust: '111.8', waist: '101.6', shoulder: '42.5', sleeve: '61.6' },

    { size: 'L', bust: '116.8', waist: '106.7', shoulder: '43.8', sleeve: '62.2' },

    { size: 'XL', bust: '124.5', waist: '114.3', shoulder: '45.7', sleeve: '62.9' },

    { size: 'XXL', bust: '132.1', waist: '121.9', shoulder: '47.6', sleeve: '63.5' },

    { size: 'XXXL', bust: '139.7', waist: '129.5', shoulder: '49.5', sleeve: '64.1' },

  ];



  return (

    <div className="sg-overlay" onClick={onClose}>

      <div className="sg-modal" onClick={(e) => e.stopPropagation()}>

        <div className="sg-header">

          <h2>Size Guide</h2>

          <button className="sg-close-btn" onClick={onClose}>✕</button>

        </div>



        <div className="sg-body">

          <div className="sg-unit-row">

            <span className="sg-unit-label">Switch to</span>

            <div className="sg-unit-toggle">

              <button className={`sg-unit-btn ${unit === 'cm' ? 'active' : ''}`} onClick={() => setUnit('cm')}>CM</button>

              <button className={`sg-unit-btn ${unit === 'in' ? 'active' : ''}`} onClick={() => setUnit('in')}>IN</button>

            </div>

          </div>



          <div className="sg-tabs">

            <button className={`sg-tab ${activeTab === 'body' ? 'active' : ''}`} onClick={() => setActiveTab('body')}>BODY MEASUREMENT</button>

            <button className={`sg-tab ${activeTab === 'jacket' ? 'active' : ''}`} onClick={() => setActiveTab('jacket')}>JACKET MEASUREMENTS</button>

          </div>



          {activeTab === 'body' && (

            <div className="sg-category-banner">BODY MEASUREMENT: WOMEN'S OUTERWEAR</div>

          )}



          <div className="sg-table-container">

            <table className="sg-table">

              <thead>

                <tr>

                  <th>SIZE</th>

                  {activeTab === 'body' ? (

                    <>

                      <th>BUST ({unit.toUpperCase()})</th>

                      <th>WAIST ({unit.toUpperCase()})</th>

                      <th>HIP ({unit.toUpperCase()})</th>

                    </>

                  ) : (

                    <>

                      <th>BUST ({unit.toUpperCase()})</th>

                      <th>WAIST ({unit.toUpperCase()})</th>

                      <th>SHOULDER ({unit.toUpperCase()})</th>

                      <th>SLEEVE ({unit.toUpperCase()})</th>

                    </>

                  )}

                </tr>

              </thead>

              <tbody>

                {activeTab === 'body'

                  ? (unit === 'in' ? bodyDataIn : bodyDataCm).map((row) => (

                      <tr key={row.size}>

                        <td><strong>{row.size}</strong></td>

                        <td>{row.bust}</td>

                        <td>{row.waist}</td>

                        <td>{row.hip}</td>

                      </tr>

                    ))

                  : (unit === 'in' ? jacketDataIn : jacketDataCm).map((row) => (

                      <tr key={row.size}>

                        <td><strong>{row.size}</strong></td>

                        <td>{row.bust}</td>

                        <td>{row.waist}</td>

                        <td>{row.shoulder}</td>

                        <td>{row.sleeve}</td>

                      </tr>

                    ))}

              </tbody>

            </table>

          </div>



          {activeTab === 'body' && (

            <div className="sg-tip-box">

              <h4>WHAT SIZE SHOULD I PICK?</h4>

              <div className="sg-tip-group">

                <strong>Body Bust Measurement</strong>

                <p>Take a tape measure and wrap it under your armpits at the fullest part of your bust.</p>

              </div>

              <div className="sg-tip-group">

                <strong>Size Selection Tip</strong>

                <p>If your body bust is 37"-38", your jacket chest will be 44".</p>

              </div>

              <div className="sg-tip-group">

                <strong>Contact Us</strong>

                <p>For further information on size advice or customization, please drop us a message.</p>

              </div>

            </div>

          )}



          <div className="sg-diagram-container">

            <img

              src={activeTab === 'body' ? '/bodyMeasurement-Women.png' : '/Jacketmesurement-Women.png'}

              alt="Women Measurement Diagram"

              className="sg-diagram-img"

            />

          </div>

        </div>

      </div>

    </div>

  );

}


function WomenShearlingSizeGuide({ isOpen, onClose }) {

  const [activeTab, setActiveTab] = useState('body');

  const [unit, setUnit] = useState('in');



  if (!isOpen) return null;



  const bodyDataIn = [

    { size: 'XS', bust: '33 - 34', waist: '27 - 28', hip: '37 - 38' },

    { size: 'S', bust: '35 - 36', waist: '29 - 30', hip: '39 - 40' },

    { size: 'M', bust: '37 - 38', waist: '31 - 32', hip: '41 - 42' },

    { size: 'L', bust: '39 - 40', waist: '33 - 34', hip: '43 - 44' },

    { size: 'XL', bust: '41 - 43', waist: '35 - 37', hip: '45 - 47' },

    { size: 'XXL', bust: '44 - 46', waist: '38 - 39', hip: '48 - 49' },

    { size: 'XXXL', bust: '47 - 49', waist: '40 - 42', hip: '50 - 52' },

  ];



  const bodyDataCm = [

    { size: 'XS', bust: '84 - 86.5', waist: '68.5 - 71', hip: '94 - 96.5' },

    { size: 'S', bust: '89 - 91.5', waist: '73.5 - 76', hip: '99 - 101.5' },

    { size: 'M', bust: '94 - 96.5', waist: '78.5 - 81', hip: '104 - 106.5' },

    { size: 'L', bust: '99 - 101.5', waist: '84 - 86.5', hip: '109 - 111.8' },

    { size: 'XL', bust: '104 - 109', waist: '89 - 94', hip: '114.3 - 119.4' },

    { size: 'XXL', bust: '111.8 - 116.8', waist: '96.5 - 99', hip: '121.9 - 124.5' },

    { size: 'XXXL', bust: '119.4 - 124.5', waist: '101.6 - 106.7', hip: '127 - 132.1' },

  ];



  const jacketDataIn = [

    { size: 'XS', bust: '40', waist: '36', shoulder: '15.75', sleeve: '23.75' },

    { size: 'S', bust: '42', waist: '38', shoulder: '16.25', sleeve: '24' },

    { size: 'M', bust: '44', waist: '40', shoulder: '16.75', sleeve: '24.25' },

    { size: 'L', bust: '46', waist: '42', shoulder: '17.25', sleeve: '24.5' },

    { size: 'XL', bust: '49', waist: '45', shoulder: '18', sleeve: '24.75' },

    { size: 'XXL', bust: '52', waist: '48', shoulder: '18.75', sleeve: '25' },

    { size: 'XXXL', bust: '55', waist: '51', shoulder: '19.5', sleeve: '25.25' },

  ];



  const jacketDataCm = [

    { size: 'XS', bust: '101.6', waist: '91.4', shoulder: '40.0', sleeve: '60.3' },

    { size: 'S', bust: '106.7', waist: '96.5', shoulder: '41.3', sleeve: '61.0' },

    { size: 'M', bust: '111.8', waist: '101.6', shoulder: '42.5', sleeve: '61.6' },

    { size: 'L', bust: '116.8', waist: '106.7', shoulder: '43.8', sleeve: '62.2' },

    { size: 'XL', bust: '124.5', waist: '114.3', shoulder: '45.7', sleeve: '62.9' },

    { size: 'XXL', bust: '132.1', waist: '121.9', shoulder: '47.6', sleeve: '63.5' },

    { size: 'XXXL', bust: '139.7', waist: '129.5', shoulder: '49.5', sleeve: '64.1' },

  ];



  return (

    <div className="sg-overlay" onClick={onClose}>

      <div className="sg-modal" onClick={(e) => e.stopPropagation()}>

        <div className="sg-header">

          <h2>Size Guide</h2>

          <button className="sg-close-btn" onClick={onClose}>✕</button>

        </div>



        <div className="sg-body">

          <div className="sg-unit-row">

            <span className="sg-unit-label">Switch to</span>

            <div className="sg-unit-toggle">

              <button className={`sg-unit-btn ${unit === 'cm' ? 'active' : ''}`} onClick={() => setUnit('cm')}>CM</button>

              <button className={`sg-unit-btn ${unit === 'in' ? 'active' : ''}`} onClick={() => setUnit('in')}>IN</button>

            </div>

          </div>



          <div className="sg-tabs">

            <button className={`sg-tab ${activeTab === 'body' ? 'active' : ''}`} onClick={() => setActiveTab('body')}>BODY MEASUREMENT</button>

            <button className={`sg-tab ${activeTab === 'jacket' ? 'active' : ''}`} onClick={() => setActiveTab('jacket')}>JACKET MEASUREMENTS</button>

          </div>



          {activeTab === 'body' && (

            <div className="sg-category-banner">BODY MEASUREMENT: WOMEN'S OUTERWEAR</div>

          )}



          <div className="sg-table-container">

            <table className="sg-table">

              <thead>

                <tr>

                  <th>SIZE</th>

                  {activeTab === 'body' ? (

                    <>

                      <th>BUST ({unit.toUpperCase()})</th>

                      <th>WAIST ({unit.toUpperCase()})</th>

                      <th>HIP ({unit.toUpperCase()})</th>

                    </>

                  ) : (

                    <>

                      <th>BUST ({unit.toUpperCase()})</th>

                      <th>WAIST ({unit.toUpperCase()})</th>

                      <th>SHOULDER ({unit.toUpperCase()})</th>

                      <th>SLEEVE ({unit.toUpperCase()})</th>

                    </>

                  )}

                </tr>

              </thead>

              <tbody>

                {activeTab === 'body'

                  ? (unit === 'in' ? bodyDataIn : bodyDataCm).map((row) => (

                      <tr key={row.size}>

                        <td><strong>{row.size}</strong></td>

                        <td>{row.bust}</td>

                        <td>{row.waist}</td>

                        <td>{row.hip}</td>

                      </tr>

                    ))

                  : (unit === 'in' ? jacketDataIn : jacketDataCm).map((row) => (

                      <tr key={row.size}>

                        <td><strong>{row.size}</strong></td>

                        <td>{row.bust}</td>

                        <td>{row.waist}</td>

                        <td>{row.shoulder}</td>

                        <td>{row.sleeve}</td>

                      </tr>

                    ))}

              </tbody>

            </table>

          </div>



          {activeTab === 'body' && (

            <div className="sg-tip-box">

              <h4>WHAT SIZE SHOULD I PICK?</h4>

              <div className="sg-tip-group">

                <strong>Body Bust Measurement</strong>

                <p>Take a tape measure and wrap it under your armpits at the fullest part of your bust.</p>

              </div>

              <div className="sg-tip-group">

                <strong>Size Selection Tip</strong>

                <p>If your body bust is 37"-38", your jacket chest will be 44".</p>

              </div>

              <div className="sg-tip-group">

                <strong>Contact Us</strong>

                <p>For further information on size advice or customization, please drop us a message.</p>

              </div>

            </div>

          )}



          <div className="sg-diagram-container">

            <img

              src={activeTab === 'body' ? '/bodyMeasurement-Women.png' : '/Jacketmesurement-Women.png'}

              alt="Women Measurement Diagram"

              className="sg-diagram-img"

            />

          </div>

        </div>

      </div>

    </div>

  );

}

// ============================================================================
// 3. MAIN DYNAMIC ROUTER COMPONENT
// ============================================================================
export default function SizeGuideDrawer({ isOpen, onClose, modelName = '' }) {
  if (!isOpen) return null;

  // Convert incoming GLB path/string to lower case
  const currentPath = String(modelName || '').toLowerCase();
  console.log(currentPath, 'Current Model Path in SizeGuideDrawer');

  // Checks for gender & material type
  const isWomen = currentPath.includes('women') || currentPath.includes('woman');
  const isShearling = currentPath.includes('shearling');

  console.log('Active Path:', currentPath, '| isWomen:', isWomen, '| isShearling:', isShearling);

  // Dynamic Routing Logic
  return (
    <>
      {isWomen ? (
        isShearling ? (
          <WomenShearlingSizeGuide isOpen={isOpen} onClose={onClose} />
        ) : (
          <WomenSizeGuide isOpen={isOpen} onClose={onClose} />
        )
      ) : (
        isShearling ? (
          <MenShearlingSizeGuide isOpen={isOpen} onClose={onClose} />
        ) : (
          <MenSizeGuide isOpen={isOpen} onClose={onClose} />
        )
      )}

      {/* STYLES */}
       <style>{`

        .sg-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
          overflow: hidden;
          animation: overlayFadeIn 0.25s ease;
        }

        .sg-modal {
          background: #ffffff;
          border-radius: 20px;
          width: 100%;
          max-width: 440px;
          max-height: 85vh;
          overflow-y: auto;
          overflow-x: hidden;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(0, 0, 0, 0.08);
          animation: modalPopIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPopIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }



        .sg-header {

          display: flex;

          justify-content: space-between;

          align-items: center;

          padding: 16px 20px;

          border-bottom: 1px solid #f0f0f0;

        }



        .sg-header h2 {

          margin: 0;

          font-size: 18px;

          font-weight: 700;

          color: #111827;

        }



        .sg-close-btn {

          background: #f3f4f6;

          border: none;

          width: 28px;

          height: 28px;

          border-radius: 50%;

          cursor: pointer;

          font-size: 12px;

          color: #6b7280;

          display: flex;

          align-items: center;

          justify-content: center;

        }



        .sg-body {

          padding: 16px 20px;

        }



        .sg-unit-row {

          display: flex;

          justify-content: space-between;

          align-items: center;

          margin-bottom: 16px;

        }



        .sg-unit-label {

          font-size: 12px;

          color: #6b7280;

        }



        .sg-unit-toggle {

          display: flex;

          background: #f3f4f6;

          padding: 2px;

          border-radius: 20px;

        }



        .sg-unit-btn {

          border: none;

          background: transparent;

          padding: 4px 16px;

          font-size: 11px;

          font-weight: 700;

          border-radius: 16px;

          cursor: pointer;

          color: #4b5563;

        }



        .sg-unit-btn.active {

          background: #7a3e12;

          color: #ffffff;

        }



        .sg-tabs {

          display: flex;

          border-bottom: 1px solid #e5e7eb;

          margin-bottom: 16px;

        }



        .sg-tab {

          border: none;

          background: transparent;

          padding: 8px 12px 8px 0;

          margin-right: 16px;

          font-size: 11px;

          font-weight: 700;

          color: #9ca3af;

          cursor: pointer;

          position: relative;

        }



        .sg-tab.active {

          color: #7a3e12;

          border-bottom: 2px solid #7a3e12;

        }



        .sg-category-banner {

          border: 1px solid #7a3e12;

          background: #ffffff;

          color: #7a3e12;

          text-align: center;

          font-weight: 700;

          font-size: 11px;

          padding: 8px;

          border-radius: 4px;

          margin-bottom: 16px;

          letter-spacing: 0.3px;

        }



        .sg-table-container {

          margin-bottom: 16px;

        }



        .sg-table {

          width: 100%;

          border-collapse: collapse;

          font-size: 12px;

          text-align: center;

        }



        .sg-table th {

          background: #7a3e12;

          color: #ffffff;

          padding: 8px 6px;

          font-size: 10px;

          font-weight: 700;

        }



        .sg-table td {

          padding: 8px 6px;

          border-bottom: 1px solid #f3f4f6;

          color: #374151;

        }



        .sg-table tbody tr:nth-child(even) {

          background-color: #f9fafb;

        }



        .sg-tip-box {

          border: 1px dashed #7a3e12;

          background: #ffffff;

          padding: 12px;

          border-radius: 4px;

          margin-bottom: 16px;

        }



        .sg-tip-box h4 {

          margin: 0 0 8px 0;

          font-size: 11px;

          font-weight: 800;

          color: #111827;

        }



        .sg-tip-group {

          margin-bottom: 6px;

        }



        .sg-tip-group:last-child {

          margin-bottom: 0;

        }



        .sg-tip-group strong {

          display: block;

          font-size: 10px;

          color: #7a3e12;

        }



        .sg-tip-group p {

          margin: 0;

          font-size: 10px;

          color: #4b5563;

          line-height: 1.3;

        }



        .sg-diagram-container {

          width: 100%;

          display: flex;

          justify-content: center;

          align-items: center;

          margin-top: 12px;

        }



        .sg-diagram-img {

          width: 100%;

          max-width: 360px;

          height: auto;

          object-fit: contain;

        }

      `}</style>
    </>
  );
}