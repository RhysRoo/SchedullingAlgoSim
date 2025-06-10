import React from 'react';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { AlgorithmInfo as AlgorithmInfoType } from '../types/scheduling';

interface AlgorithmInfoProps {
  algorithm: AlgorithmInfoType;
}

export function AlgorithmInfo({ algorithm }: AlgorithmInfoProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
        <Info className="w-5 h-5 mr-2 text-blue-600" />
        {algorithm.name} - Algorithm Details
      </h2>
      
      <p className="text-gray-700 mb-4">{algorithm.description}</p>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-green-800 mb-2 flex items-center">
            <CheckCircle className="w-4 h-4 mr-1" />
            Advantages
          </h3>
          <ul className="space-y-1">
            {algorithm.pros.map((pro, index) => (
              <li key={index} className="text-green-700 text-sm flex items-start">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-red-800 mb-2 flex items-center">
            <XCircle className="w-4 h-4 mr-1" />
            Disadvantages
          </h3>
          <ul className="space-y-1">
            {algorithm.cons.map((con, index) => (
              <li key={index} className="text-red-700 text-sm flex items-start">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <span className="text-sm text-gray-600">
          <strong>Time Complexity:</strong> {algorithm.complexity}
        </span>
      </div>
    </div>
  );
}