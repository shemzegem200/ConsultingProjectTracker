import React from 'react'
import './DashboardPage.css';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";


// const colors = [
//     "linear-gradient(to right, rgb(255, 231, 231), rgb(249, 213, 255))",
//     "linear-gradient(to right, rgb(249, 213, 255), rgb(215, 195, 254))",
//     "linear-gradient(to right, rgb(215, 195, 254), rgb(183, 179, 255))"
// ];
const colors = [
    "linear-gradient(to right, rgb(164, 159, 255), rgb(225, 174, 255))",
    "linear-gradient(to right, rgb(236, 174, 255), rgb(252, 202, 255))",
    "linear-gradient(to right, rgb(249, 213, 255), rgb(255, 208, 208))",
];

//for bar graph
const customColors = ["rgb(164, 159, 255)", "rgb(225, 174, 255)", "rgb(236, 174, 255)", "rgb(252, 202, 255)", "rgb(249, 213, 255)", "rgb(255, 208, 208)"];

const data = [
    { name: "Jan", value: 40, fill: customColors[0] },
    { name: "Feb", value: 60, fill: customColors[1] },
    { name: "Mar", value: 75, fill: customColors[2] },
    { name: "Apr", value: 50, fill: customColors[3] },
    { name: "May", value: 90, fill: customColors[4] },
    { name: "Jun", value: 65, fill: customColors[5] },
];



const DashboardPage = () => {
  return (
    <div>
      <div className="top-title">Dashboard</div>

      <div className="lower-body">
        <div className="top-cards">
            <div className="dashboard-card" style={{ "--card-gradient":colors[0]}}>
                <p>NEW PROJECTS</p>
                <h1><span>^</span> 5</h1>
            </div>
            
            <div className="dashboard-card" style={{ "--card-gradient":colors[1]}}>
                <p>MY PROJECTS</p>
                <h1><span>^</span> 5</h1>
            </div>
            
            <div className="dashboard-card" style={{ "--card-gradient":colors[2]}}>
                <p>BALANCE PAYMENT</p>
                <h1><span>+</span> ₹12500</h1>
            </div>
        </div>

        <div className="graphs">
            <div className="graph1">
            <ResponsiveContainer width="100%" height="90%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={customColors[0]} />
                    <stop offset="50%" stopColor={customColors[2]} />
                    <stop offset="100%" stopColor={customColors[5]} />
                </linearGradient>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={customColors[0]} />
                    <stop offset="65%" stopColor={customColors[2]} />
                    <stop offset="100%" stopColor={customColors[5]} />
                </linearGradient>
                </defs>

                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />

                <Area
                type="monotone"
                dataKey="value"
                stroke="url(#lineGradient)"
                strokeWidth={2.5}
                fill="url(#areaGradient)"
                />
            </AreaChart>
            </ResponsiveContainer>
            </div>
                
            <div className="graph1">
            <ResponsiveContainer width="100%" height="90%">
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>  
  )
}

export default DashboardPage
