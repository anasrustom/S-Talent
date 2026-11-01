'use client';

import { MainLayout } from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Code, Play, CheckCircle2, XCircle, Clock, Award, ArrowLeft, Lightbulb, Terminal, Cpu } from 'lucide-react';
import { Card } from '@/components/ui/common';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const challenge = {
  title: 'Two Sum Problem',
  difficulty: 'Easy',
  description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]',
    },
  ],
  constraints: [
    '2 <= nums.length <= 10⁴',
    '-10⁹ <= nums[i] <= 10⁹',
    '-10⁹ <= target <= 10⁹',
    'Only one valid answer exists.',
  ],
  starter: `function twoSum(nums, target) {
    // Your code here
    
}`,
};

type TestResult = {
  nums: number[];
  target: number;
  input: string;
  expected: string;
  status: null | 'pass' | 'fail';
  got?: string;
  ms?: number;
};

const testCases: TestResult[] = [
  { nums: [2, 7, 11, 15], target: 9, input: '[2, 7, 11, 15], 9', expected: '[0, 1]', status: null },
  { nums: [3, 2, 4], target: 6, input: '[3, 2, 4], 6', expected: '[1, 2]', status: null },
  { nums: [3, 3], target: 6, input: '[3, 3], 6', expected: '[0, 1]', status: null },
];

const RUN_TIMEOUT_MS = 2000;

// Runs inside a throwaway Web Worker so an infinite loop cannot freeze the page.
// The candidate's own code runs only in their own browser.
const workerSource = `
self.onmessage = (event) => {
  const { source, cases } = event.data;
  let twoSum;
  try {
    twoSum = new Function('"use strict";\\n' + source + '\\nreturn typeof twoSum === "function" ? twoSum : undefined;')();
  } catch (err) {
    self.postMessage({ error: 'Syntax error: ' + (err && err.message ? err.message : String(err)) });
    return;
  }
  if (typeof twoSum !== 'function') {
    self.postMessage({ error: 'Define a function named twoSum(nums, target)' });
    return;
  }
  const results = cases.map((c) => {
    const start = performance.now();
    try {
      const value = twoSum(c.nums.slice(), c.target);
      return { got: JSON.stringify(value), value, ms: performance.now() - start };
    } catch (err) {
      return { got: 'Error: ' + (err && err.message ? err.message : String(err)), value: null, ms: performance.now() - start };
    }
  });
  self.postMessage({ results });
};
`;

// Any two distinct indices whose values add up to the target count as correct
function isValidAnswer(value: unknown, nums: number[], target: number): boolean {
  if (!Array.isArray(value) || value.length !== 2) return false;
  const [a, b] = value;
  return Number.isInteger(a) && Number.isInteger(b) && a !== b &&
    a >= 0 && b >= 0 && a < nums.length && b < nums.length &&
    nums[a] + nums[b] === target;
}

type WorkerReply = {
  error?: string;
  results?: { got: string; value: unknown; ms: number }[];
};

function runInWorker(source: string): Promise<WorkerReply> {
  return new Promise(resolve => {
    let worker: Worker;
    let url = '';
    try {
      url = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
      worker = new Worker(url);
    } catch {
      resolve({ error: 'This browser could not start the test runner' });
      return;
    }
    const finish = (reply: WorkerReply) => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(reply);
    };
    const timer = setTimeout(
      () => finish({ error: `Timed out after ${RUN_TIMEOUT_MS / 1000}s (infinite loop?)` }),
      RUN_TIMEOUT_MS
    );
    worker.onmessage = (event: MessageEvent<WorkerReply>) => finish(event.data);
    worker.onerror = (event) => {
      event.preventDefault();
      finish({ error: event.message || 'Your code threw an error' });
    };
    worker.postMessage({ source, cases: testCases.map(({ nums, target }) => ({ nums, target })) });
  });
}

export default function EngineeringChallengePage() {
  const [code, setCode] = useState(challenge.starter);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>(testCases);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const passedTests = testResults.filter(t => t.status === 'pass').length;
  const allPassed = passedTests === testResults.length && hasRun;

  // Challenge timer: ticks every second until every test passes
  useEffect(() => {
    if (allPassed) return;
    const interval = setInterval(() => setTimeElapsed(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [allPassed]);

  const handleRun = async () => {
    setIsRunning(true);
    const reply = await runInWorker(code);

    if (reply.error || !reply.results) {
      setRunError(reply.error ?? 'Unknown error');
      setTestResults(testCases.map(test => ({ ...test, status: 'fail' })));
    } else {
      const results = reply.results;
      setRunError(null);
      setTestResults(testCases.map((test, i) => ({
        ...test,
        status: isValidAnswer(results[i].value, test.nums, test.target) ? 'pass' : 'fail',
        got: results[i].got,
        ms: results[i].ms,
      })));
    }

    setHasRun(true);
    setIsRunning(false);
  };

  return (
    <MainLayout>
      <div className="h-[calc(100vh-64px)] flex flex-col bg-background">
        {/* Header */}
        <div className="border-b border-default bg-secondary/50 px-6 py-4">
          <div className="max-w-[1800px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/skillproof">
                <button className="btn btn-ghost btn-sm">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold text-primary">{challenge.title}</h1>
                  <span className="badge badge-success text-xs">{challenge.difficulty}</span>
                </div>
                <p className="text-sm text-muted">Engineering SkillProof Challenge</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-muted" />
                <span className="text-muted">{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}</span>
              </div>
              <button 
                className={`btn ${allPassed ? 'btn-success' : 'btn-primary'}`}
                onClick={handleRun}
                disabled={isRunning}
              >
                {isRunning ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Running...
                  </>
                ) : allPassed ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Completed
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Run Tests
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          <div className="max-w-[1800px] mx-auto w-full flex gap-0">
            {/* Left Panel - Problem Description */}
            <div className="w-[45%] border-r border-default overflow-y-auto">
              <div className="p-6 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="p-6">
                    <h2 className="text-lg font-bold text-primary mb-4">Description</h2>
                    <p className="text-secondary leading-relaxed">
                      {challenge.description}
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-6">
                    <h2 className="text-lg font-bold text-primary mb-4">Examples</h2>
                    <div className="space-y-4">
                      {challenge.examples.map((example, i) => (
                        <div key={i} className="p-4 rounded-lg bg-secondary">
                          <p className="text-sm font-mono text-primary mb-2">
                            <strong>Input:</strong> {example.input}
                          </p>
                          <p className="text-sm font-mono text-primary mb-2">
                            <strong>Output:</strong> {example.output}
                          </p>
                          {example.explanation && (
                            <p className="text-sm text-muted">
                              <strong>Explanation:</strong> {example.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6">
                    <h2 className="text-lg font-bold text-primary mb-4">Constraints</h2>
                    <ul className="space-y-2">
                      {challenge.constraints.map((constraint, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-secondary">
                          <span className="text-info mt-1">•</span>
                          <span className="font-mono">{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-info/5 to-transparent border-info/20">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-info flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-primary mb-2">Hint</h3>
                        <p className="text-sm text-secondary">
                          Try using a hash map to store numbers you&apos;ve seen and their indices. 
                          This allows you to check if the complement (target - current number) exists in O(1) time.
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>

            {/* Right Panel - Code Editor & Output */}
            <div className="w-[55%] flex flex-col">
              {/* Code Editor */}
              <div className="flex-1 flex flex-col border-b border-default">
                <div className="px-6 py-3 border-b border-default bg-secondary/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-muted" />
                    <span className="text-sm font-semibold text-primary">Code Editor</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-tertiary text-muted">JavaScript</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted">
                    <Cpu className="w-3 h-3" />
                    <span>Runs in your browser</span>
                  </div>
                </div>
                <div className="flex-1 p-6 bg-[#1e1e1e] overflow-auto">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full bg-transparent text-[#d4d4d4] font-mono text-sm resize-none outline-none"
                    style={{ 
                      fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                      lineHeight: '1.6',
                      tabSize: 4,
                    }}
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Output Panel */}
              <div className="h-[40%] flex flex-col bg-secondary/30">
                <div className="px-6 py-3 border-b border-default bg-secondary/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-muted" />
                    <span className="text-sm font-semibold text-primary">Test Results</span>
                  </div>
                  {hasRun && (
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${allPassed ? 'text-success' : 'text-warning'}`}>
                        {passedTests}/{testResults.length} Passed
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 overflow-auto">
                  {!hasRun ? (
                    <div className="h-full flex items-center justify-center text-muted">
                      <div className="text-center">
                        <Terminal className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm">Run your code to see test results</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 space-y-3">
                      {runError && (
                        <div className="p-4 rounded-lg border-2 bg-error/5 border-error/30">
                          <p className="text-sm font-mono text-error">{runError}</p>
                        </div>
                      )}
                      {testResults.map((test, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`p-4 rounded-lg border-2 ${
                            test.status === 'pass' 
                              ? 'bg-success/5 border-success/30' 
                              : 'bg-error/5 border-error/30'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                {test.status === 'pass' ? (
                                  <CheckCircle2 className="w-5 h-5 text-success" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-error" />
                                )}
                                <span className={`font-bold ${test.status === 'pass' ? 'text-success' : 'text-error'}`}>
                                  Test Case {i + 1}
                                </span>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-mono text-secondary">
                                  <span className="text-muted">Input:</span> {test.input}
                                </p>
                                <p className="text-sm font-mono text-secondary">
                                  <span className="text-muted">Expected:</span> {test.expected}
                                </p>
                                {test.status === 'fail' && test.got !== undefined && (
                                  <p className="text-sm font-mono text-secondary">
                                    <span className="text-muted">Got:</span> {test.got}
                                  </p>
                                )}
                              </div>
                            </div>
                            {test.status === 'pass' && test.ms !== undefined && (
                              <div className="text-xs text-success bg-success/10 px-2 py-1 rounded">
                                {test.ms.toFixed(2)}ms
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}

                      {allPassed && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Card className="p-6 bg-gradient-to-br from-success/10 to-transparent border-success/30">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                                <Award className="w-6 h-6 text-success" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-success text-lg mb-1">Congratulations!</h3>
                                <p className="text-sm text-secondary">
                                  All test cases passed in {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}. Your solution is correct!
                                </p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
