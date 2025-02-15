"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Search, Settings, User, Battery, Zap, Cloud, Server, Cpu } from 'lucide-react';
import { useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';

const data = [
  { name: 'Jan', emissions: 400 },
  { name: 'Feb', emissions: 300 },
  { name: 'Mar', emissions: 200 },
  { name: 'Apr', emissions: 278 },
  { name: 'May', emissions: 189 },
  { name: 'Jun', emissions: 239 },
];

const metrics = [
  { name: 'CPU Usage', value: 78, icon: Cpu },
  { name: 'Memory', value: 64, icon: Server },
  { name: 'Network', value: 92, icon: Cloud },
];

const chartConfig = {
  xAxis: {
    stroke: '#9CA3AF',
    tick: { fill: '#9CA3AF' },
    tickLine: { stroke: '#9CA3AF' },
    axisLine: { stroke: '#4B5563' },
  },
  yAxis: {
    stroke: '#9CA3AF',
    tick: { fill: '#9CA3AF' },
    tickLine: { stroke: '#9CA3AF' },
    axisLine: { stroke: '#4B5563' },
  },
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Zap className="h-8 w-8 text-green-500" />
              <span className="ml-2 text-xl font-bold">EcoMetrics</span>
            </div>
            
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Search metrics..."
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <Settings className="h-5 w-5 text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
                <User className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-6">CO2 Emissions per Deployment</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="name"
                    {...chartConfig.xAxis}
                  />
                  <YAxis
                    {...chartConfig.yAxis}
                    tickFormatter={(value) => `${value}kg`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '0.5rem',
                      color: '#fff',
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value) => [`${value}kg`, 'CO2 Emissions']}
                  />
                  <Line
                    type="monotone"
                    dataKey="emissions"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: '#10B981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Metrics Panel */}
          <div className="space-y-8">
            {/* AI Insights */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6">AI Optimization Insights</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Efficiency Score</span>
                  <span className="text-green-500">+24%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Resource Usage</span>
                  <span className="text-green-500">-18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Performance</span>
                  <span className="text-yellow-500">+8%</span>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6">Key Metrics</h2>
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((metric) => (
                  <div key={metric.name} className="flex flex-col items-center">
                    <div className="w-20 h-20 mb-2">
                      <CircularProgressbar
                        value={metric.value}
                        text={`${metric.value}%`}
                        styles={buildStyles({
                          pathColor: `rgba(16, 185, 129, ${metric.value / 100})`,
                          textColor: '#fff',
                          trailColor: '#374151',
                        })}
                      />
                    </div>
                    <span className="text-sm text-gray-400">{metric.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Battery Usage */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Battery Usage</h2>
                <Battery className="h-6 w-6 text-green-500" />
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: '65%' }}
                />
              </div>
              <span className="text-sm text-gray-400">65% Remaining</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}