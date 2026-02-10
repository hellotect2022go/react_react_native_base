import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <h1>Vite + React WebView 앱</h1>
        <p className="subtitle">Expo WebView로 표시되는 웹 애플리케이션</p>
      </header>

      <main className="main">
        <section className="counter-section">
          <h2>카운터</h2>
          <div className="card">
            <button className="counter-btn" onClick={() => setCount((count) => count + 1)}>
              클릭 횟수: {count}
            </button>
          </div>
        </section>

        <section className="todo-section">
          <h2>할 일 목록</h2>
          <div className="todo-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="할 일을 입력하세요..."
              className="todo-input"
            />
            <button onClick={addTodo} className="add-btn">추가</button>
          </div>
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">삭제</button>
              </li>
            ))}
          </ul>
          {todos.length === 0 && (
            <p className="empty-message">할 일이 없습니다. 추가해보세요! 🎉</p>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>🚀 Vite + React로 만든 웹앱 | 📱 Expo WebView에서 실행 중</p>
      </footer>
    </div>
  )
}

export default App
