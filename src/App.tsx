import React, { useState, useMemo } from 'react';
import { Cpu, BookOpen, Play } from 'lucide-react';
import { Process, SchedulingAlgorithm, SchedulingResult } from './types/scheduling';
import { algorithms } from './data/algorithms';
import { AlgorithmSelector } from './components/AlgorithmSelector';
import { ProcessInput } from './components/ProcessInput';
import { GanttChart } from './components/GanttChart';
import { ResultsTable } from './components/ResultsTable';
import { AlgorithmInfo } from './components/AlgorithmInfo';
import { 
  fcfsScheduling, 
  sjfScheduling, 
  priorityScheduling, 
  roundRobinScheduling 
} from './utils/schedulingAlgorithms';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SchedulingAlgorithm>('fcfs');
  const [processes, setProcesses] = useState<Process[]>([]);
  const [quantum, setQuantum] = useState(2);
  const [showResults, setShowResults] = useState(false);

  const schedulingResult = useMemo<SchedulingResult | null>(() => {
    if (processes.length === 0) return null;

    try {
      switch (selectedAlgorithm) {
        case 'fcfs':
          return fcfsScheduling(processes);
        case 'sjf':
          return sjfScheduling(processes);
        case 'priority':
          return priorityScheduling(processes);
        case 'roundrobin':
          return roundRobinScheduling(processes, quantum);
        default:
          return null;
      }
    } catch (error) {
      console.error('Scheduling error:', error);
      return null;
    }
  }, [processes, selectedAlgorithm, quantum]);

  const runSimulation = () => {
    if (processes.length > 0) {
      setShowResults(true);
    }
  };

  const selectedAlgorithmInfo = algorithms.find(alg => alg.id === selectedAlgorithm)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Cpu className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CPU Scheduling Simulator</h1>
                <p className="text-sm text-gray-600">Interactive learning platform for scheduling algorithms</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-600">Learn by doing</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Algorithm Selection */}
        <AlgorithmSelector 
          selectedAlgorithm={selectedAlgorithm}
          onAlgorithmChange={setSelectedAlgorithm}
        />

        {/* Algorithm Information */}
        <AlgorithmInfo algorithm={selectedAlgorithmInfo} />

        {/* Process Input */}
        <ProcessInput
          processes={processes}
          onProcessesChange={setProcesses}
          algorithm={selectedAlgorithm}
          quantum={quantum}
          onQuantumChange={setQuantum}
        />

        {/* Run Simulation Button */}
        {processes.length > 0 && (
          <div className="text-center mb-6">
            <button
              onClick={runSimulation}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Play className="w-5 h-5 mr-2" />
              Run Simulation
            </button>
          </div>
        )}

        {/* Results */}
        {showResults && schedulingResult && (
          <>
            <GanttChart ganttChart={schedulingResult.ganttChart} />
            <ResultsTable result={schedulingResult} />
          </>
        )}

        {/* Empty State */}
        {processes.length === 0 && (
          <div className="text-center py-12">
            <Cpu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to simulate?</h3>
            <p className="text-gray-600 mb-4">
              Add some processes above to see how the {selectedAlgorithmInfo.name} algorithm works.
            </p>
            <p className="text-sm text-gray-500">
              Try clicking "Sample Data" for a quick start!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;