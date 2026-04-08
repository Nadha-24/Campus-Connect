import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { currentUser } = useAuth();

  // ✅ Replace mockData with empty arrays (or later API)
  const [todos, setTodos] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [activeTab, setActiveTab] = useState('notifications');

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const markNotificationAsRead = (id) => {
    setNotificationList(notificationList.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const getNotificationIcon = (type) => {
    const icons = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌'
    };
    return icons[type] || '📢';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const unreadCount = notificationList.filter(n => !n.read).length;
  const completedTodos = todos.filter(t => t.completed).length;

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="mb-6">
        <p><strong>Name:</strong> {currentUser.name}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Notifications ({unreadCount})</h2>
        {notificationList.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notificationList.map(n => (
            <div key={n.id}>
              <span>{getNotificationIcon(n.type)}</span>
              <span>{n.title}</span>
            </div>
          ))
        )}
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">
          Todos ({completedTodos}/{todos.length})
        </h2>

        {todos.length === 0 ? (
          <p>No tasks</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span>{todo.task}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;