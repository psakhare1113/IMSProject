import React from "react";
import {
  FaStar,
  FaEllipsisV,
} from "react-icons/fa";
import bed1 from "../images/bed1.png";
import bed2 from "../images/bed2.png";
import bed3 from "../images/bed3.png";
import '../css/Dashboardli.css';

export default function Dashboardli() {
  return (
    <div className="admin packages-container">
      <div className="content-wrapper">
              <div style={{display: 'flex', alignItems: 'center', marginBottom: '20px'}}>
                <h3 style={{fontSize: '14px'}}>Sales Activity (in quantity)</h3>
                <h3 style={{marginLeft: '60%', fontSize: '14px'}}>Inventory Summary</h3>
              </div>
              <div className="cards-row">
                <div className="card">
                  <p style={{fontSize: '14px'}}><strong>Confirmed</strong></p>
                  <div className="card-icons">
                    <FaStar />
                    <FaEllipsisV />
                  </div>
                  <h3 style={{fontSize: '37px', fontWeight: 'bold'}}>34</h3>
                </div>
                <div className="card">
                  <p style={{fontSize: '14px'}}><strong>To be shipped</strong></p>
                  <div className="card-icons">
                    <FaStar />
                    <FaEllipsisV />
                  </div>
                  <h3 style={{fontSize: '37px', fontWeight: 'bold'}}>45</h3>
                </div>
                <div className="card">
                  <p style={{fontSize: '14px'}}><strong>To be delivered</strong></p>
                  <div className="card-icons">
                    <FaStar />
                    <FaEllipsisV />
                  </div>
                  <h3 style={{fontSize: '37px', fontWeight: 'bold'}}>39</h3>
                </div>
                <div className="card">
                  <p style={{fontSize: '14px'}}><strong>To be invoiced</strong></p>
                  <div className="card-icons">
                    <FaStar />
                    <FaEllipsisV />
                  </div>
                  <h3 style={{fontSize: '37px', fontWeight: 'bold'}}>21</h3>
                </div>
                <div className="card">
                  <div className="card-icons">
                    <FaStar />
                    <FaEllipsisV />
                  </div>
                  <div className="inventory-item" style={{borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', marginBottom: '8px', fontSize: '12px'}}>
                    <span>Quantity on hand</span>
                    <span>567</span>
                  </div>
                  <div className="inventory-item" style={{fontSize: '12px'}}>
                    <span>Quantity to be received</span>
                    <span>135</span>
                  </div>
                </div>
              </div>

              <div className="content-sections">
                <div className="section">
                  <h3 className="section-title">Product Details</h3>
                  <div className="section-box product-details-card">
                    <div className="card-icons">
                      <FaStar />
                      <FaEllipsisV />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div className="product-stats">
                        <div className="product-item" style={{marginBottom: '15px', display: 'flex', justifyContent: 'space-between', width: '200px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px'}}>
                          <span style={{color: '#ff6b35', fontWeight: 'bold'}}>Low Stock variants</span>
                          <span style={{color: '#ff6b35', fontWeight: '600'}}>67</span>
                        </div>
                        <div className="product-item" style={{marginBottom: '15px', display: 'flex', justifyContent: 'space-between', width: '200px', borderBottom: '1px solid #e5e7eb', paddingBottom: '10px'}}>
                          <span style={{color: '#666', fontWeight: 'bold'}}>All Items</span>
                          <span style={{fontWeight: '600', color: '#333'}}>90</span>
                        </div>
                        <div className="product-item" style={{display: 'flex', justifyContent: 'space-between', width: '200px'}}>
                          <span style={{color: '#666', fontWeight: 'bold'}}>All Variants</span>
                          <span style={{fontWeight: '600', color: '#333'}}>120</span>
                        </div>
                      </div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '50px', marginLeft: '40px'}}>
                        <div>
                          <div style={{fontSize: '16px', color: '#666', fontWeight: 'bold'}}>Active Variants</div>
                          <div style={{fontSize: '32px', fontWeight: 'bold', color: '#333'}}>60%</div>
                        </div>
                        <div style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          background: 'conic-gradient(#4ade80 0deg 216deg, #d1fae5 216deg 360deg)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            background: '#fff'
                          }}>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="section">
                  <h3 className="section-title">Top Selling Variants</h3>
                  <div className="section-box" style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                      <h4 style={{ fontSize: '14px', color: '#666', margin: 0 }}>This Month</h4>
                      <div className="card-icons">
                        <FaStar />
                        <FaEllipsisV />
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      justifyContent: 'space-around',
                      alignItems: 'center'
                    }}>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '15px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        minWidth: '120px'
                      }}>
                        <img src={bed1} alt="HP OMEN 15" style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '8px',
                          marginBottom: '5px',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }} />
                        <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '5px'}}>HP OMEN 15</div>
                        <div style={{fontSize: '12px', color: '#666'}}><strong>34 Qty</strong></div>
                      </div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '15px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        minWidth: '120px'
                      }}>
                        <img src={bed2} alt="ASUS VivoBook 15" style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '8px',
                          marginBottom: '5px',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }} />
                        <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '5px'}}>ASUS VivoBook 15</div>
                        <div style={{fontSize: '12px', color: '#666'}}><strong>12 Qty</strong></div>
                      </div>
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '15px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        minWidth: '120px'
                      }}>
                        <img src={bed3} alt="DELL Inspiron" style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '8px',
                          marginBottom: '5px',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }} />
                        <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '5px'}}>DELL Inspiron</div>
                        <div style={{fontSize: '12px', color: '#666'}}><strong>22 Qty</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-sections" style={{gap: '12px'}}>
                <div className="section">
                  <h3 className="section-title">Lowest Turnover Items</h3>
                  <div className="section-box small-card">
                    <div className="card-icons">
                      <FaEllipsisV />
                    </div>
                    <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '14px'}}>
                      <thead>
                        <tr>
                          <th style={{textAlign: 'left', color: '#6b7280', fontWeight: '600', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', fontSize: '16px'}}>SKU</th>
                          <th style={{textAlign: 'right', color: '#6b7280', fontWeight: '600', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', fontSize: '16px'}}></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{padding: '12px 0', borderBottom: '1px solid #f3f4f6', color: '#111827', fontSize: '14px'}}>27889</td>
                          <td style={{padding: '12px 0', borderBottom: '1px solid #f3f4f6', color: '#111827', textAlign: 'right', fontSize: '14px'}}>0</td>
                        </tr>
                        <tr>
                          <td style={{padding: '12px 0', borderBottom: '1px solid #f3f4f6', color: '#111827', fontSize: '14px'}}>19037</td>
                          <td style={{padding: '12px 0', borderBottom: '1px solid #f3f4f6', color: '#111827', textAlign: 'right', fontSize: '14px'}}>0</td>
                        </tr>
                        <tr>
                          <td style={{padding: '12px 0', color: '#111827', fontSize: '14px'}}>04675-9361</td>
                          <td style={{padding: '12px 0', color: '#111827', textAlign: 'right', fontSize: '14px'}}>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="section">
                  <h3 className="section-title">Low Stock Report</h3>
                  <div className="section-box small-card">
                    <div className="card-icons">
                      <FaEllipsisV />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                      <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'conic-gradient(#3b82f6 0deg 180deg, #10b981 180deg 360deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <div style={{
                          width: '70px',
                          height: '70px',
                          borderRadius: '50%',
                          background: '#fff'
                        }}>
                        </div>
                      </div>
                      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6'}}></div>
                          <span style={{fontSize: '16px', color: '#374151', fontWeight: 'bold'}}>Depleted</span>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#10b981'}}></div>
                          <span style={{fontSize: '16px', color: '#374151', fontWeight: 'bold'}}>10% Extremely Low</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      </div>
    </div>
  );
}