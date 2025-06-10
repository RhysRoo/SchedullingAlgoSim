import { AlgorithmInfo } from '../types/scheduling';

export const algorithms: AlgorithmInfo[] = [
  {
    id: 'fcfs',
    name: 'First Come First Serve',
    description: 'Processes are executed in the order they arrive. Simple and fair, but can lead to convoy effect.',
    pros: [
      'Simple to understand and implement',
      'Fair - no process gets preference',
      'No starvation occurs'
    ],
    cons: [
      'Poor average waiting time',
      'Convoy effect with long processes',
      'Not suitable for interactive systems'
    ],
    complexity: 'O(n)'
  },
  {
    id: 'sjf',
    name: 'Shortest Job First',
    description: 'Processes with shortest burst time are executed first. Optimal for minimizing average waiting time.',
    pros: [
      'Optimal average waiting time',
      'Good for batch systems',
      'Efficient resource utilization'
    ],
    cons: [
      'Requires knowledge of burst time',
      'Can cause starvation of long processes',
      'Not practical for interactive systems'
    ],
    complexity: 'O(n log n)'
  },
  {
    id: 'priority',
    name: 'Priority Scheduling',
    description: 'Processes are executed based on priority levels. Higher priority processes run first.',
    pros: [
      'Important processes get preference',
      'Flexible priority assignment',
      'Good for real-time systems'
    ],
    cons: [
      'Can cause starvation of low priority processes',
      'Priority inversion problems',
      'Complex priority management'
    ],
    complexity: 'O(n log n)'
  },
  {
    id: 'roundrobin',
    name: 'Round Robin',
    description: 'Each process gets a fixed time quantum. Processes are executed in circular order.',
    pros: [
      'Fair time sharing',
      'Good response time',
      'No starvation occurs'
    ],
    cons: [
      'Higher context switching overhead',
      'Performance depends on time quantum',
      'Higher average turnaround time'
    ],
    complexity: 'O(n)'
  }
];