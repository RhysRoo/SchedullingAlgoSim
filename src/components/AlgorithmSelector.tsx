import React from 'react';
import { Clock, Zap, Star, RotateCcw } from 'lucide-react';
import { SchedulingAlgorithm } from '../types/scheduling';
import { algorithms } from '../data/algorithms';

interface AlgorithmSelectorProps {
  selectedAlgorithm: SchedulingAlgorithm;
  onAlgorithmChange: (algorithm: SchedulingAlgorithm) => void;
}

const algorithmIcons = {
  fcfs: Clock,
  sjf: Zap,
  priority: Star,
  roundrobin: RotateCcw
};

export function AlgorithmSelector({ selectedAlgorithm, onAlgorithmChange }: AlgorithmSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {algorithms.map((algorithm) => {
        const Icon = algorithmIcons[algorithm.id];
        const isSelected = selectedAlgorithm === algorithm.id;
        
        return (
          <button
            key={algorithm.id}
            onClick={() => onAlgorithmChange(algorithm.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-lg ${
              isSelected
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center mb-2">
              <Icon className={`w-5 h-5 mr-2 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
              <h3 className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                {algorithm.name}
              </h3>
            </div>
            <p className={`text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
              {algorithm.description}
            </p>
            <div className="mt-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                isSelected ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {algorithm.complexity}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}