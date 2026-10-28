import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('Overview')

  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('learnbetter-tasks')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('learnbetter-tasks', JSON.stringify(tasks))
  }, [tasks])

  const [taskInput, setTaskInput] = useState('')
  const [taskMinutes, setTaskMinutes] = useState(30)
  const [dailyGoal, setDailyGoal] = useState(120)

  const completedTasks = tasks.filter((task) => task.completed).length

  const completedMinutes = tasks
    .filter((task) => task.completed)
    .reduce((total, task) => total + task.minutes, 0)

  const goalProgress = Math.min(
    100,
    Math.round((completedMinutes / dailyGoal) * 100)
  )

  function addTask(event) {
    event.preventDefault()
    if (!taskInput.trim()) return

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskInput.trim(),
        minutes: Number(taskMinutes),
        completed: false,
      },
    ])

    setTaskInput('')
    setTaskMinutes(30)
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const [answer, setAnswer] = useState('')
  const [tutorInput, setTutorInput] = useState('')
  const [tutorMessages, setTutorMessages] = useState([
    {
      role: 'assistant',
      text: 'Hi! I am your LearnBetter Tutor. Ask me about coding, DSA, or mathematics.',
    },
  ])
  const [submitted, setSubmitted] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0)

  const questions = [
    {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyper Transfer Machine Language',
      ],
      correct: 'Hyper Text Markup Language',
    },
    {
      question: 'Which language is commonly used to style web pages?',
      options: ['Python', 'CSS', 'SQL', 'C++'],
      correct: 'CSS',
    },
    {
      question: 'Which data structure follows FIFO?',
      options: ['Stack', 'Tree', 'Queue', 'Graph'],
      correct: 'Queue',
    },
  ]

  const currentQuestion = questions[questionIndex]

  function sendTutorMessage(event) {
    event.preventDefault()
    const question = tutorInput.trim()
    if (!question) return

    setTutorMessages((messages) => [
      ...messages,
      { role: 'user', text: question },
      {
        role: 'assistant',
        text: 'Thanks for your question! This is a demo reply. Connect an AI API to get personalized answers.',
      },
    ])
    setTutorInput('')
  }

  const courses = [
    
  {
    icon: '💻',
    name: 'Web Development',
    detail: 'HTML, CSS & React',
    category: 'Development',
    level: 'Beginner',
    lessons: 24,
    progress: 65,
    color: 'purple',
  },
  {
    icon: '🧠',
    name: 'Data Structures',
    detail: 'DSA & Problem Solving',
    category: 'Programming',
    level: 'Intermediate',
    lessons: 32,
    progress: 40,
    color: 'blue',
  },
  {
    icon: '📐',
    name: 'Mathematics',
    detail: 'Core CS Mathematics',
    category: 'Mathematics',
    level: 'Beginner',
    lessons: 18,
    progress: 75,
    color: 'orange',
  },
]
  
  const [courseSearch, setCourseSearch] = useState('')
const [courseCategory, setCourseCategory] = useState('All')

const filteredCourses = courses.filter((course) => {
  const matchesSearch =
    course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
    course.detail.toLowerCase().includes(courseSearch.toLowerCase())

  const matchesCategory =
    courseCategory === 'All' || course.category === courseCategory

  return matchesSearch && matchesCategory
})
  const tabs = ['Overview', 'My Courses', 'Quizzes', 'Study Planner', 'AI Tutor']

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">✦ LearnBetter</h2>
        <p className="menu-label">LEARNING SPACE</p>

        {tabs.map((tab) => (
          <button
            key={tab}
            className={`nav-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}

        <div className="sidebar-bottom">
          <div className="avatar">S</div>
          <div>
            <strong>Student</strong>
            <p>Keep learning!</p>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span>My Learning / {activeTab}</span>
          <span className="status">● Your learning journey</span>
        </header>

        <section className="welcome-banner">
          <div className="welcome-copy">
            <p className="banner-eyebrow">✦ YOUR PERSONAL LEARNING SPACE</p>
            <h1>{activeTab === 'Overview' ? 'Learn something great today.' : activeTab}</h1>
            <p className="banner-description">
              Small steps every day lead to big achievements. Keep learning, keep growing.
            </p>
            <button
              className="welcome-cta"
              onClick={() => setActiveTab('Study Planner')}
            >
              Plan your study <span>→</span>
            </button>
          </div>

          <div className="banner-decoration" aria-hidden="true">
            <div className="banner-orbit">
              <span>✦</span>
              <div className="banner-book">📚</div>
              <span>✧</span>
            </div>
          </div>
        </section>

        {activeTab === 'Study Planner' && (
          <section className="planner">
            <div className="planner-header">
              <div>
                <p className="eyebrow">BUILD A CONSISTENT HABIT</p>
                <h2>Your daily study plan</h2>
                <p>Plan your work. Focus on one task at a time.</p>
              </div>
              <div className="goal-badge">🎯 Daily goal</div>
            </div>

            <div className="goal-panel">
              <label htmlFor="dailyGoal">Daily study goal (minutes)</label>
              <div className="goal-controls">
                <input
                  id="dailyGoal"
                  type="number"
                  min="1"
                  max="1440"
                  value={dailyGoal}
                  onChange={(event) =>
                    setDailyGoal(Math.min(1440, Math.max(1, Number(event.target.value) || 1)))
                  }
                />
                <span>{Math.floor(dailyGoal / 60)}h {dailyGoal % 60}m target</span>
              </div>

              <div className="goal-progress">
                <div style={{ width: `${goalProgress}%` }} />
              </div>
              <p>{completedMinutes} of {dailyGoal} minutes completed ({goalProgress}%)</p>
            </div>

            <form className="task-form" onSubmit={addTask}>
              <h3>Add a study task</h3>
              <label htmlFor="taskName">What do you want to study?</label>
              <input
                id="taskName"
                type="text"
                placeholder="e.g. Practice 5 JavaScript problems"
                value={taskInput}
                onChange={(event) => setTaskInput(event.target.value)}
                required
              />

              <label htmlFor="taskMinutes">Planned study time</label>
              <select
                id="taskMinutes"
                value={taskMinutes}
                onChange={(event) => setTaskMinutes(Number(event.target.value))}
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>

              <button className="planner-add" type="submit">+ Add task</button>
            </form>

            <div className="task-list">
              <div className="task-list-heading">
                <h3>Today's tasks</h3>
                <span>{completedTasks}/{tasks.length} completed</span>
              </div>

              {tasks.length === 0 ? (
                <div className="empty-tasks">
                  <span>📚</span>
                  <h3>No tasks yet</h3>
                  <p>Add your first study task to get started.</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div className="task-item" key={task.id}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      aria-label={`Mark ${task.title} complete`}
                    />
                    <div className="task-details">
                      <p className={task.completed ? 'task-done' : ''}>{task.title}</p>
                      <span>{task.minutes} minutes</span>
                    </div>
                    <button
                      className="task-delete"
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      aria-label={`Delete ${task.title}`}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === 'AI Tutor' && (
          <section className="tutor-card">
            <p className="eyebrow">YOUR PERSONAL STUDY ASSISTANT</p>
            <h2>Ask your AI Tutor 🤖</h2>
            <p>Ask questions about programming, DSA, web development, or maths.</p>

            <div className="tutor-messages">
              {tutorMessages.map((message, index) => (
                <div key={index} className={`tutor-message ${message.role}`}>
                  <strong>{message.role === 'user' ? 'You' : 'LearnBetter Tutor'}</strong>
                  <p>{message.text}</p>
                </div>
              ))}
            </div>

            <form className="tutor-form" onSubmit={sendTutorMessage}>
              <input
                type="text"
                placeholder="Ask your question..."
                value={tutorInput}
                onChange={(event) => setTutorInput(event.target.value)}
                required
              />
              <button type="submit">Send ↑</button>
            </form>
          </section>
        )}

        {activeTab === 'Quizzes' && (
          <section className="quiz-card">
            <p className="eyebrow">QUESTION {questionIndex + 1} OF {questions.length}</p>
            <h2>{currentQuestion.question}</h2>

            <div className="quiz-options">
              {currentQuestion.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`quiz-option ${answer === option ? 'selected' : ''}`}
                  onClick={() => {
                    if (!submitted) setAnswer(option)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {submitted && (
              <p className="quiz-feedback">
                {answer === currentQuestion.correct
                  ? 'Correct! Great work!'
                  : `Not quite. Correct answer: ${currentQuestion.correct}`}
              </p>
            )}

            <button
              type="button"
              className="quiz-submit"
              disabled={!answer}
              onClick={() => {
                if (!submitted) {
                  setSubmitted(true)
                } else {
                  setQuestionIndex((questionIndex + 1) % questions.length)
                  setAnswer('')
                  setSubmitted(false)
                }
              }}
            >
              {!submitted
                ? 'Check answer'
                : questionIndex === questions.length - 1
                  ? 'Restart quiz'
                  : 'Next question'}
            </button>
          </section>
        )}

        {(activeTab === 'Overview' || activeTab === 'My Courses') && (
          <>
            <section className="stats">
              <div className="stat-card">
                <span>Active courses</span>
                <h2>03</h2>
                <p>Keep up the momentum</p>
              </div>
              <div className="stat-card">
                <span>Study time</span>
                <h2>12.5 hrs</h2>
                <p>This week</p>
              </div>
              <div className="stat-card">
                <span>Learning streak</span>
                <h2>🔥 5 days</h2>
                <p>You're building a habit</p>
              </div>
            </section>

            <div className="section-heading">
              <div>
                <h2>{activeTab === 'Overview' ? 'Your courses' : 'All courses'}</h2>
                <p>Pick up where you left off.</p>
              </div>
              {activeTab === 'Overview' && (
                <button className="text-button" onClick={() => setActiveTab('My Courses')}>
                  View all →
                </button>
              )}
            </div>

            <section className="courses">
              {courses.map((course) => (
                <article className="course-card" key={course.name}>
                  <div className="course-icon">{course.icon}</div>
                  <h3>{course.name}</h3>
                  <p>{course.detail}</p>
                  <div className="progress-label">
                    <span>Progress</span>
                    <strong>{course.progress}%</strong>
                  </div>
                  <div className="progress-track">
                    <div style={{ width: `${course.progress}%` }} />
                  </div>
                  <button
                    className="continue-button"
                    onClick={() => setActiveTab('My Courses')}
                  >
                    Continue learning →
                  </button>
                </article>
              ))}
            </section>

            <section className="study-card">
              <div>
                <p className="eyebrow">YOUR NEXT STEP</p>
                <h2>Make today count.</h2>
                <p>Choose one topic, focus for 25 minutes, and take a short break.</p>
              </div>
              <button onClick={() => setActiveTab('Study Planner')}>
                Open study planner →
              </button>
            </section>
          </>
        )}

        <footer>LearnBetter · Built for curious minds.</footer>
      </main>
    </div>
  )
}

export default App
