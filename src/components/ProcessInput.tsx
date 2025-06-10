import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw } from 'lucide-react';
import { Process, SchedulingAlgorithm } from '../types/scheduling';

interface ProcessInputProps {
  processes: Process[];
  onProcessesChange: (processes: Process[]) => void;
  algorithm: SchedulingAlgorithm;
  quantum: number;
  onQuantumChange: (quantum: number) => void;
}

export function ProcessInput({ 
  processes, 
  onProcessesChange, 
  algorithm, 
  quantum, 
  onQuantumChange 
}: ProcessInputProps) {
  const [newProcess, setNewProcess] = useState({
    name: '',
    arrivalTime: 0,
    burstTime: 1,
    priority: 1
  });

  const addProcess = () => {
    if (newProcess.name.trim() === '') return;
    
    const process: Process = {
      id: Date.now().toString(),
      name: newProcess.name.trim(),
      arrivalTime: newProcess.arrivalTime,
      burstTime: newProcess.burstTime,
      priority: algorithm === 'priority' ? newProcess.priority : undefined,
      remainingTime: newProcess.burstTime
    };

    onProcessesChange([...processes, process]);
    setNewProcess({
      name: '',
      arrivalTime: 0,
      burstTime: 1,
      priority: 1
    });
  };

  const removeProcess = (id: string) => {
    onProcessesChange(processes.filter(p => p.id !== id));
  };

  const loadSampleData = () => {
    const sampleProcesses: Process[] = [
      { id: '1', name: 'P1', arrivalTime: 0, burstTime: 5, priority: 2, remainingTime: 5 },
      { id: '2', name: 'P2', arrivalTime: 1, burstTime: 3, priority: 1, remainingTime: 3 },
      { id: '3', name: 'P3', arrivalTime: 2, burstTime: 8, priority: 3, remainingTime: 8 },
      { id: '4', name: 'P4', arrivalTime: 3, burstTime: 6, priority: 2, remainingTime: 6 }
    ];
    onProcessesChange(sampleProcesses);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addProcess();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Process Configuration</h2>
        <button
          onClick={loadSampleData}
          className="flex items-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Sample Data
        </button>
      </div>

      {algorithm === 'roundrobin' && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <label className="block text-sm font-medium text-blue-900 mb-2">
            Time Quantum
          </label>
          <input
            type="number"
            min="1"
            value={quantum}
            onChange={(e) => onQuantumChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-blue-700 mt-1">
            Each process gets {quantum} time unit{quantum !== 1 ? 's' : ''} per turn
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Process Name
          </label>
          <input
            type="text"
            value={newProcess.name}
            onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
            onKeyPress={handleKeyPress}
            placeholder="P1, Task A, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Arrival Time
          </label>
          <input
            type="number"
            min="0"
            value={newProcess.arrivalTime}
            onChange={(e) => setNewProcess({ ...newProcess, arrivalTime: Math.max(0, parseInt(e.target.value) || 0) })}
            onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Burst Time
          </label>
          <input
            type="number"
            min="1"
            value={newProcess.burstTime}
            onChange={(e) => setNewProcess({ ...newProcess, burstTime: Math.max(1, parseInt(e.target.value) || 1) })}
            onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {algorithm === 'priority' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <input
              type="number"
              min="1"
              value={newProcess.priority}
              onChange={(e) => setNewProcess({ ...newProcess, priority: Math.max(1, parseInt(e.target.value) || 1) })}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Lower = Higher Priority</p>
          </div>
        )}

        <div className="flex items-end">
          <button
            onClick={addProcess}
            disabled={newProcess.name.trim() === ''}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Process
          </button>
        </div>
      </div>

      {processes.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Process</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Arrival</th>
                <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Burst</th>
                {algorithm === 'priority' && (
                  <th className="border border-gray-200 px-4 py-2 text-left font-medium text-gray-700">Priority</th>
                )}
                <th className="border border-gray-200 px-4 py-2 text-center font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => (
                <tr key={process.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 font-medium">{process.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{process.arrivalTime}</td>
                  <td className="border border-gray-200 px-4 py-2">{process.burstTime}</td>
                  {algorithm === 'priority' && (
                    <td className="border border-gray-200 px-4 py-2">{process.priority}</td>
                  )}
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <button
                      onClick={() => removeProcess(process.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}