'use client';
import Footer from '@/component/Footer';
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { MdEdit, MdDeleteForever } from "react-icons/md";

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number | null>(null);
  const [celebrationVisible, setCelebrationVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() === '') return;

    if (editing && currentTaskIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[currentTaskIndex] = task;
      setTasks(updatedTasks);
      setEditing(false);
      setCurrentTaskIndex(null);
    } else {
      setTasks([...tasks, task]);
    }

    setTask('');
  };

  const handleEdit = (index: number) => {
    setEditing(true);
    setCurrentTaskIndex(index);
    setTask(tasks[index]);
  };

  const handleDelete = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    if (tasks.length === 5) {
      setCelebrationVisible(true);
    }
  }, [tasks.length]);

  const handleContinue = () => {
    setCelebrationVisible(false);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-[#A64D79]  to-[#FFCCEA] text-black h-screen flex flex-col items-center justify-start pt-12">
        <h1 className="text-3xl font-bold font-[Spartan] text-white pb-3 -mt-4 text-center items-center">
          Assignment by Jasmine Sheikh
        </h1>

        {/* Card Container */}
        <div className="p-4 border-2 border-[#A64D79] rounded-2xl bg-gradient-to-r from-[#6A1E55]  to-[#6A1E55] shadow-md flex flex-col items-center w-11/12 max-w-md">
          <div className="details text-center">
            <h1 className="text-4xl font-[Spartan] font-bold mb-4 text-white">ToDo Application</h1>
            <p className="text-base font-semibold text-font-[Spartan] text-white">Great job, keep going!</p>
            {/* Progress Bar */}
            <div className="progressBar mt-4 w-full bg-[#A64D79] rounded-full h-2">
              <div
                className="progress bg-[#FFCCEA] h-full rounded-2xl"
                style={{ width: `${(tasks.length / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="stats-number mt-4">
            <p className="text-3xl font-bold font-[Spartan] text-white">{tasks.length} / 5</p>
          </div>
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
            className="bg-gradient-to-r from-[#3B1C32] via-[#6A1E55] to-[#A64D79] text-white py-2 px-6 rounded-lg font-[Spartan] font-semibold transition-transform duration-200 hover:scale-105"
          >
            {editing ? 'Update Task' : 'Add Task'}
          </button>
        </form>

        {/* Task List */}
        <ul className="task-list mt-4 w-11/12 max-w-md text-left rounded-lg p-4 shadow-md bg-gradient-to-r from-[#6A1E55]  to-[#A64D79] text-white ">
          {tasks.map((task, index) => (
            <li key={index} className="mb-2 p-2 border-b border-[#3B1C32] flex justify-between items-center">
              <span>{task}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:underline"
                >
                  <MdEdit />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:underline"
                >
                  <MdDeleteForever />
                </button>
              </div>
            </li>
          ))}
          {tasks.length === 0 && <p className="text-white">No tasks yet. Add one!</p>}
        </ul>

        {/* Celebration Section */}
        {celebrationVisible && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <Confetti />
            <div className="bg-gradient-to-r from-[#A64D79]  to-[#6A1E55] p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-3xl font-bold text-white">🎉 Congratulations! 🎉</h2>
              <p className="text-white mt-2">Your completed 5 tasks. Keep up the great work!</p>
              <button
                onClick={handleContinue}
                className="mt-4 px-6 py-2 bg-[#6A1E55] text-white rounded-lg font-semibold transition-transform duration-200 hover:bg-[#A64D79] hover:scale-105"
              >
                Stop!
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
