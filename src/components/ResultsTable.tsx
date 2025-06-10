import React from 'react';
import { SchedulingResult } from '../types/scheduling';

interface ResultsTableProps {
  result: SchedulingResult;
}

export function ResultsTable({ result }: ResultsTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Results</h2>
      
      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-700 mb-1">Avg Turnaround Time</h3>
          <p className="text-2xl font-bold text-blue-900">{result.averageTurnaroundTime.toFixed(2)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-700 mb-1">Avg Waiting Time</h3>
          <p className="text-2xl font-bold text-green-900">{result.averageWaitingTime.toFixed(2)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-700 mb-1">Avg Response Time</h3>
          <p className="text-2xl font-bold text-purple-900">{result.averageResponseTime.toFixed(2)}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-amber-700 mb-1">Throughput</h3>
          <p className="text-2xl font-bold text-amber-900">{result.throughput.toFixed(3)}</p>
        </div>
      </div>
      
      {/* Process Details Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Process</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Arrival</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Burst</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Start</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Completion</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Turnaround</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Waiting</th>
              <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Response</th>
            </tr>
          </thead>
          <tbody>
            {result.processes.map((process) => (
              <tr key={process.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2 font-medium">{process.name}</td>
                <td className="border border-gray-200 px-4 py-2">{process.arrivalTime}</td>
                <td className="border border-gray-200 px-4 py-2">{process.burstTime}</td>
                <td className="border border-gray-200 px-4 py-2">{process.startTime}</td>
                <td className="border border-gray-200 px-4 py-2">{process.completionTime}</td>
                <td className="border border-gray-200 px-4 py-2">{process.turnaroundTime}</td>
                <td className="border border-gray-200 px-4 py-2">{process.waitingTime}</td>
                <td className="border border-gray-200 px-4 py-2">{process.responseTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}