export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
  remainingTime: number;
  completionTime?: number;
  turnaroundTime?: number;
  waitingTime?: number;
  responseTime?: number;
  startTime?: number;
}

export interface GanttChartItem {
  processId: string;
  processName: string;
  startTime: number;
  endTime: number;
  color: string;
}

export interface SchedulingResult {
  ganttChart: GanttChartItem[];
  processes: Process[];
  averageTurnaroundTime: number;
  averageWaitingTime: number;
  averageResponseTime: number;
  throughput: number;
}

export type SchedulingAlgorithm = 'fcfs' | 'sjf' | 'priority' | 'roundrobin';

export interface AlgorithmInfo {
  id: SchedulingAlgorithm;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  complexity: string;
}