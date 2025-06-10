import { Process, GanttChartItem, SchedulingResult } from '../types/scheduling';

const processColors = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B',
  '#EF4444', '#06B6D4', '#84CC16', '#F97316'
];

export function fcfsScheduling(processes: Process[]): SchedulingResult {
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const ganttChart: GanttChartItem[] = [];
  let currentTime = 0;

  sortedProcesses.forEach((process, index) => {
    const startTime = Math.max(currentTime, process.arrivalTime);
    const endTime = startTime + process.burstTime;
    
    process.startTime = startTime;
    process.completionTime = endTime;
    process.turnaroundTime = endTime - process.arrivalTime;
    process.waitingTime = startTime - process.arrivalTime;
    process.responseTime = startTime - process.arrivalTime;

    ganttChart.push({
      processId: process.id,
      processName: process.name,
      startTime,
      endTime,
      color: processColors[index % processColors.length]
    });

    currentTime = endTime;
  });

  return calculateResults(sortedProcesses, ganttChart);
}

export function sjfScheduling(processes: Process[]): SchedulingResult {
  const remainingProcesses = processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  const completedProcesses: Process[] = [];
  const ganttChart: GanttChartItem[] = [];
  let currentTime = 0;

  while (remainingProcesses.length > 0) {
    const availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    
    if (availableProcesses.length === 0) {
      currentTime = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      continue;
    }

    const shortestJob = availableProcesses.reduce((min, process) => 
      process.burstTime < min.burstTime ? process : min
    );

    const processIndex = processes.findIndex(p => p.id === shortestJob.id);
    const startTime = currentTime;
    const endTime = currentTime + shortestJob.burstTime;

    shortestJob.startTime = startTime;
    shortestJob.completionTime = endTime;
    shortestJob.turnaroundTime = endTime - shortestJob.arrivalTime;
    shortestJob.waitingTime = startTime - shortestJob.arrivalTime;
    shortestJob.responseTime = startTime - shortestJob.arrivalTime;

    ganttChart.push({
      processId: shortestJob.id,
      processName: shortestJob.name,
      startTime,
      endTime,
      color: processColors[processIndex % processColors.length]
    });

    completedProcesses.push(shortestJob);
    remainingProcesses.splice(remainingProcesses.indexOf(shortestJob), 1);
    currentTime = endTime;
  }

  return calculateResults(completedProcesses, ganttChart);
}

export function priorityScheduling(processes: Process[]): SchedulingResult {
  const sortedProcesses = [...processes].sort((a, b) => {
    if (a.arrivalTime === b.arrivalTime) {
      return (a.priority || 0) - (b.priority || 0); // Lower number = higher priority
    }
    return a.arrivalTime - b.arrivalTime;
  });

  const ganttChart: GanttChartItem[] = [];
  const readyQueue: Process[] = [];
  const completedProcesses: Process[] = [];
  let currentTime = 0;
  let processIndex = 0;

  while (completedProcesses.length < processes.length) {
    // Add arrived processes to ready queue
    while (processIndex < sortedProcesses.length && 
           sortedProcesses[processIndex].arrivalTime <= currentTime) {
      readyQueue.push(sortedProcesses[processIndex]);
      processIndex++;
    }

    if (readyQueue.length === 0) {
      if (processIndex < sortedProcesses.length) {
        currentTime = sortedProcesses[processIndex].arrivalTime;
      }
      continue;
    }

    // Select highest priority process (lowest priority number)
    const highestPriorityProcess = readyQueue.reduce((min, process) => 
      (process.priority || 0) < (min.priority || 0) ? process : min
    );

    const originalIndex = processes.findIndex(p => p.id === highestPriorityProcess.id);
    const startTime = currentTime;
    const endTime = currentTime + highestPriorityProcess.burstTime;

    highestPriorityProcess.startTime = startTime;
    highestPriorityProcess.completionTime = endTime;
    highestPriorityProcess.turnaroundTime = endTime - highestPriorityProcess.arrivalTime;
    highestPriorityProcess.waitingTime = startTime - highestPriorityProcess.arrivalTime;
    highestPriorityProcess.responseTime = startTime - highestPriorityProcess.arrivalTime;

    ganttChart.push({
      processId: highestPriorityProcess.id,
      processName: highestPriorityProcess.name,
      startTime,
      endTime,
      color: processColors[originalIndex % processColors.length]
    });

    completedProcesses.push(highestPriorityProcess);
    readyQueue.splice(readyQueue.indexOf(highestPriorityProcess), 1);
    currentTime = endTime;
  }

  return calculateResults(completedProcesses, ganttChart);
}

export function roundRobinScheduling(processes: Process[], quantum: number = 2): SchedulingResult {
  const processQueue = processes.map(p => ({ 
    ...p, 
    remainingTime: p.burstTime,
    hasStarted: false 
  }));
  const ganttChart: GanttChartItem[] = [];
  const readyQueue: (Process & { remainingTime: number; hasStarted: boolean })[] = [];
  let currentTime = 0;
  let processIndex = 0;

  while (processQueue.some(p => p.remainingTime > 0)) {
    // Add arrived processes to ready queue
    while (processIndex < processQueue.length && 
           processQueue[processIndex].arrivalTime <= currentTime) {
      if (processQueue[processIndex].remainingTime > 0) {
        readyQueue.push(processQueue[processIndex]);
      }
      processIndex++;
    }

    if (readyQueue.length === 0) {
      if (processIndex < processQueue.length) {
        currentTime = processQueue[processIndex].arrivalTime;
      }
      continue;
    }

    const currentProcess = readyQueue.shift()!;
    const originalIndex = processes.findIndex(p => p.id === currentProcess.id);
    const startTime = currentTime;
    const executionTime = Math.min(quantum, currentProcess.remainingTime);
    const endTime = startTime + executionTime;

    if (!currentProcess.hasStarted) {
      currentProcess.startTime = startTime;
      currentProcess.responseTime = startTime - currentProcess.arrivalTime;
      currentProcess.hasStarted = true;
    }

    ganttChart.push({
      processId: currentProcess.id,
      processName: currentProcess.name,
      startTime,
      endTime,
      color: processColors[originalIndex % processColors.length]
    });

    currentProcess.remainingTime -= executionTime;
    currentTime = endTime;

    if (currentProcess.remainingTime === 0) {
      currentProcess.completionTime = endTime;
      currentProcess.turnaroundTime = endTime - currentProcess.arrivalTime;
      currentProcess.waitingTime = currentProcess.turnaroundTime - currentProcess.burstTime;
    } else {
      // Add new arrivals before re-queueing current process
      while (processIndex < processQueue.length && 
             processQueue[processIndex].arrivalTime <= currentTime) {
        if (processQueue[processIndex].remainingTime > 0) {
          readyQueue.push(processQueue[processIndex]);
        }
        processIndex++;
      }
      readyQueue.push(currentProcess);
    }
  }

  return calculateResults(processQueue, ganttChart);
}

function calculateResults(processes: Process[], ganttChart: GanttChartItem[]): SchedulingResult {
  const totalTurnaroundTime = processes.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0);
  const totalWaitingTime = processes.reduce((sum, p) => sum + (p.waitingTime || 0), 0);
  const totalResponseTime = processes.reduce((sum, p) => sum + (p.responseTime || 0), 0);
  const totalTime = Math.max(...ganttChart.map(g => g.endTime));

  return {
    ganttChart,
    processes,
    averageTurnaroundTime: totalTurnaroundTime / processes.length,
    averageWaitingTime: totalWaitingTime / processes.length,
    averageResponseTime: totalResponseTime / processes.length,
    throughput: processes.length / totalTime
  };
}