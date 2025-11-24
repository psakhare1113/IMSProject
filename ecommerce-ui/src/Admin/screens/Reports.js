import React, { useState } from "react";
import { FaStar, FaEllipsisV, FaSearch } from "react-icons/fa";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "../css/AReportsc.css";

const reportCards = [
  { label: "Packages", value: 159, trend: "up", note: "This Month" },
  { label: "Shipments", value: 217, trend: "down", note: "This Month" },
  { label: "Delivering", value: "34%", trend: "down", note: "This Month" },
  { label: "Shipments not shipped", value: 102, trend: "up", note: "This Month" },
];

const profitData = [
  { date: "21 Jun", Delivered: 120, Received: 80 },
  { date: "22 Jun", Delivered: 90, Received: 70 },
  { date: "23 Jun", Delivered: 130, Received: 90 },
  { date: "24 Jun", Delivered: 70, Received: 50 },
  { date: "25 Jun", Delivered: 50, Received: 40 },
  { date: "26 Jun", Delivered: 100, Received: 110 },
  { date: "27 Jun", Delivered: 80, Received: 60 },
];

const carriers = [
  { name: "FedEx", value: 238 },
  { name: "DPD UK", value: 125 },
  { name: "LaserShip", value: 110 },
  { name: "Fastway", value: 98 },
  { name: "GCO", value: 86 },
  { name: "IMEX", value: 79 }
];

function ReportCard({label, value, trend, note}) {
  return (
    <div className="report-card">
      <div className="card-header">
        <div>
          <div className="report-label">{label}</div>
          <span className="report-note">{note}</span>
        </div>
        <div className="card-icons">
          <FaStar />
          <FaEllipsisV />
        </div>
      </div>
      <div className="report-value">{value}</div>
      <span className={`trend ${trend}`}>{trend === "up" ? "▲" : "▼"}</span>
    </div>
  );
}

function ProfitChart() {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <div>
          <div className="chart-title">Profit</div>
          <span className="chart-note">This Week</span>
        </div>
        <div className="card-icons">
          <FaStar />
          <FaEllipsisV />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={profitData} barGap={6}>
          <CartesianGrid strokeDasharray="5 5" stroke="#f0f0f0" strokeWidth={2} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 150]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Delivered" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Received" fill="#22C55E" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function CarriersList() {
  return (
    <div className="carriers-container">
      <div className="carriers-header">
        <div className="carriers-title">Most Used Shipment Carriers</div>
        <div className="card-icons">
          <FaStar />
          <FaEllipsisV />
        </div>
      </div>
      <ul className="carriers-list">
        {carriers.map(c => (
          <li key={c.name}>
            <span>{c.name}</span>
            <span className="carrier-value">{c.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Reports() {
  const [viewMode, setViewMode] = useState('grid');
  
  return (
    <div className="reports-container">
      <div className="content-wrapper">
        <div className="filter-section">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search reports..."
            />
          </div>
          
          <div className="filter-right">
            <div className="view-icons-top">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <GridViewIcon fontSize="medium" />
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <ViewListIcon fontSize="medium" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="cards-row">
          {reportCards.map(card =>
            <ReportCard key={card.label} {...card} />
          )}
        </div>
        <div className="dashboard-body">
          <ProfitChart />
          <CarriersList />
        </div>
      </div>
    </div>
  );
}