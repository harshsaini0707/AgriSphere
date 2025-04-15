import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, CheckCircle, Plus, X, AlertCircle, Circle } from 'lucide-react';
import Dashboard from '../components/Dashboard';
import axios from 'axios';
import { useNavigate } from 'react-router';
import useValidation from '../hooks/useValidation';

const Task = () => {
  useValidation();
  const navigate = useNavigate();
  const [myTask, setMyTask] = useState([]);
  const [addTaskk, setAddTask] = useState('');
  const [editTASK, setEditTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const getTask = async () => {
    try {
      if(myTask.length>0){
        setLoading(false);
        return;
      }
      
      const response = await axios.get(import.meta.env.VITE_BASE_URL+'/tasks', { withCredentials: true });
    //  console.log(response?.data?.data);
      setMyTask(response?.data?.data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      showError('Failed to fetch tasks');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const addTask = async () => {
    if (!addTaskk.trim()) {
      showError("Please enter a task!");
      return;
    }

    try {
      setLoading(false);
      const response = await axios.post(import.meta.env.VITE_BASE_URL+'/addTask', 
        { text: addTaskk }, 
        { withCredentials: true }
      );
      console.log(response?.data?.data);
      setMyTask((prevTasks) => [...prevTasks, response.data.data]);
      setAddTask('');
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      showError('Failed to add task');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (taskId) => {
    if (!editTASK.trim()) {
      showError("Task cannot be empty!");
      return;
    }

    try {
      setLoading(false);
      await axios.patch(
        import.meta.env.VITE_BASE_URL+`/editTask/${taskId}`,
        { text: editTASK },
        { withCredentials: true }
      );

      setMyTask((prevTasks) =>
        prevTasks.map((task) => (task._id === taskId ? { ...task, text: editTASK } : task))
      );

      setEditTask('');
      setEditingId(null);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      showError('Failed to edit task');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleCompleteTask = async (taskId) => {
    try {
      setLoading(false);
      await axios.patch(
        import.meta.env.VITE_BASE_URL+`/complete/${taskId}`,
        {},
        { withCredentials: true }
      );

      setMyTask((prevTasks) =>
        prevTasks.map((task) => 
          task._id === taskId ? { ...task, status: !task.status } : task
        )
      );
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      showError('Failed to update task status');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
  
    try {
      setLoading(false);
      await axios.delete(
        import.meta.env.VITE_BASE_URL+`/delete/${taskId}`,
        { withCredentials: true }
      );

      setMyTask((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      if (error.response?.status === 401) {
        navigate('/login');
      }
      showError('Failed to delete task');
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };
  const filteredTask = myTask.filter((task) => !task.deleted);

  return (
    <div className="flex min-h-screen bg-[#2c2c2c]">
      <Dashboard />
      <div className="flex-1 p-8 flex justify-center">
        <div className="w-full max-w-2xl space-y-4">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 shadow-md">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

        { loading ? (
       <div className="flex flex-col mt-14 h-fit w-[650px] animate-pulse bg-[#c8e6c9]/70 rounded-2xl shadow-xl border p-4 gap-4">
       <div className="w-full h-16 bg-gray-400 rounded-lg"></div>
     
       <div className="w-full h-10 bg-gray-300 rounded-md"></div>
       <div className="w-full h-10 bg-gray-300 rounded-md"></div>
       <div className="w-full h-10 bg-gray-300 rounded-md"></div>
       <div className="w-full h-10 bg-gray-300 rounded-md"></div>
     
       <div className="flex justify-center">
         <div className="h-16 w-16 border-t-4 mb-10 border-white rounded-full animate-spin"></div>
       </div>
     </div>
     
       
        ) : (<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl mt-10 p-8 space-y-6 border border-purple-100">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#0f766e] via-[#22c55e] to-[#4ade80] text-transparent bg-clip-text">Task Manager</h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter new task..."
                value={addTaskk}
                onChange={(e) => setAddTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                className="flex-1 px-6 py-4 bg-white border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200 placeholder-purple-300 text-purple-600"
              />
              <button
                onClick={addTask}
                className="flex font-semibold items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#19b4a7] via-[#27c963] to-[#4ade80] text-white rounded-xl  transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plus strokeWidth={3} className="h-7 w-5" />
                Add Task
              </button>
            </div>

            <div className="space-y-4">
              {filteredTask.length > 0 ? (
                filteredTask.map((task) => (
                  <div
                    key={task._id}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${
                      task.status 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' 
                        : 'bg-white border-purple-100'
                    } shadow-sm hover:shadow-md transition-all duration-200`}
                  >
                    <button
                      onClick={() => toggleCompleteTask(task._id)}
                      className="p-2 rounded-lg hover:bg-white/50 transition-all duration-200"
                    >
                      {task.status ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-purple-400" />
                      )}
                    </button>

                    {editingId === task._id ? (
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={editTASK}
                          onChange={(e) => setEditTask(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && editTask(task._id)}
                          className="flex-1 px-4 py-2 bg-white border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                        />
                        <button
                          onClick={() => editTask(task._id)}
                          className="px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg hover:from-green-500 hover:to-emerald-600 transition-all duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditTask('');
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <p className={`flex-1 text-lg ${
                        task.status 
                          ? 'line-through text-green-600' 
                          : 'text-purple-800'
                      }`}>
                        {task.text}
                      </p>
                    )}

                    {!editingId && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setEditingId(task._id); setEditTask(task.text); }} 
                          className="p-2 text-purple-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => deleteTask(task._id)} 
                          className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center  py-12 text-purple-700">
                  <p className="text-xl font-semibold">No Tasks Available</p>
                  <p className="text-sm  mt-2">Add your first task to get started!</p>
                </div>
              )}
            </div>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Task;