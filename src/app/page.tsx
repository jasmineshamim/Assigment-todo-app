'use client';
import React, { useState, useEffect } from 'react';
import Footer from '@/component/Footer';
import Confetti from 'react-confetti';
import { MdEdit, MdDeleteForever } from "react-icons/md";

interface Task {
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [celebrationVisible, setCelebrationVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() === '') return;

    if (editing && currentTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex] = { ...updatedTasks[currentTaskIndex], text: task };
      setTasks(updatedTasks);
      setEditing(false);
      setCurrentTaskIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }

    setTask('');
  };

  const handleEdit = (index: number) => {
    setEditing(true);
    setCurrentTaskIndex(index);
    setTask(tasks[index].text);
  };

  const handleDelete = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleContinue = () => {
    setCelebrationVisible(false);
  };

  // Trigger celebration when all tasks are completed
  useEffect(() => {
    if (tasks.length > 0 && tasks.every(task => task.completed)) {
      setCelebrationVisible(true);
    }
  }, [tasks]);

  return (
    <>
      <div className="bg-[#D1A7E5] text-black min-h-screen flex flex-col items-center justify-start pt-12">
        <h1 className="text-3xl font-bold font-[Spartan] text-white pb-3 -mt-4 text-center">
          Assignment by Jasmine Sheikh
        </h1>

        {/* Card Container */}
        <div className="p-4 border-2 border-[#A64D79] rounded-2xl bg-gradient-to-r from-[#1C1C1C]  to-[#7D3C98] shadow-md flex flex-col items-center w-11/12 max-w-md">
          <div className="text-center">
            <h1 className="text-4xl font-[Spartan] font-bold mb-4 text-white">ToDo Application</h1>
            <p className="text-base font-semibold text-white">Great job, keep going!</p>

            {/* Progress Bar */}
            <div className="progressBar mt-4 w-full bg-[#A64D79] rounded-full h-2">
              <div
                className="progress bg-[#D1A7E5] h-full rounded-2xl"
                style={{
                  width: `${Math.min(
                    (tasks.filter(task => task.completed).length / tasks.length) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
          <p className="text-3xl font-bold font-[Spartan] text-white mt-4">
            {tasks.filter(task => task.completed).length}/{tasks.length} 
            {tasks.some(task => task.completed) && ' Completed'}
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-4 w-11/12 max-w-md flex items-center gap-4">
          <input
            type="text"
            placeholder="Write Your Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A64D79]"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#1C1C1C]  to-[#7D3C98] text-white py-2 px-3 rounded-lg font-[Spartan] font-semibold transition-transform duration-200 hover:scale-105"
          >
            {editing ? 'Task Update' : 'Task Add'}
          </button>
        </form>

        {/* Task List */}
        <ul className="task-list mt-4 w-11/12 max-w-md text-left rounded-lg p-4 shadow-md bg-gradient-to-r from-[#1C1C1C]  to-[#7D3C98] text-white mb-4">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-[#D1A7E5] rounded-lg px-4 py-3 mb-2 text-black"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(index)}
                    className="h-4 w-4"
                  />
                  <span
                    className={`${
                      task.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    aria-label="Edit task"
                    className="text-blue-500 hover:scale-110"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    aria-label="Delete task"
                    className="text-red-500 hover:scale-110"
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-white">No tasks yet. Add one!</p>
          )}
        </ul>

        {/* Celebration Section */}
        {celebrationVisible && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <Confetti />
            <div className="bg-gradient-to-r from-[#1C1C1C]  to-[#7D3C98] p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold text-white">🎉 Congratulations! 🎉</h2>
              <p className="text-white mt-2">
                You've completed all your tasks. Keep up the great work!
              </p>
              <button
                onClick={handleContinue}
                className="mt-4 px-6 py-2 bg-[#7D3C98] text-white rounded-lg font-semibold transition-transform duration-200 hover:bg-[#D1A7E5] hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TodoList;


