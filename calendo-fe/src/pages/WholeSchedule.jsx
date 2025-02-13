import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import { FaUser, FaBell, FaCog, FaPlus, FaTrash, FaCheckCircle, FaTimes } from "react-icons/fa"; 
import "../styles/WholeSchedule.css";

Modal.setAppElement("#root");

const WholeSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [todoLists, setTodoLists] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [eventType, setEventType] = useState("Schedule");
  const [selectedColor, setSelectedColor] = useState("#FFCDD2");
  const [selectedTime, setSelectedTime] = useState("");
  const [repeatOption, setRepeatOption] = useState("none");
  const [alertOption, setAlertOption] = useState("이벤트 당일(오전 9시)");
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, item: null, isTodo: false });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

const [selectedProject, setSelectedProject] = useState('nickname의 일정');
const projects = ['프로젝트 1', '프로젝트 2', '프로젝트 3', '프로젝트 4'];

const projectEvents = {
  '프로젝트 1': {},
  '프로젝트 2': {},
  '프로젝트 3': {},
  '프로젝트 4': {},
};

const projectTodos = {
  '프로젝트 1': {},
  '프로젝트 2': {},
  '프로젝트 3': {},
  '프로젝트 4': {},
};


  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetModalFields();
  };

  const resetModalFields = () => {
    setNewTitle("");
    setEventType("Schedule");
    setSelectedColor("#FFCDD2");
    setSelectedTime("");
    setRepeatOption("none");
    setAlertOption("이벤트 당일(오전 9시)");
  };

  const handleEditEvent = (event, index) => {
    setNewTitle(event.title);
    setEventType(event.type);
    setSelectedColor(event.color);
    setSelectedTime(event.time);
    setRepeatOption(event.repeat);
    setAlertOption(event.alert);
    setEditingIndex(index); // 수정 모드 진입
    setIsModalOpen(true);
};

  

const handleSave = () => {
  const dateKey = selectedDate.toDateString();

  const newItem = {
    title: newTitle,
    type: eventType,
    color: selectedColor,
    time: selectedTime,
    repeat: repeatOption,
    alert: alertOption,
    completed: false,
  };

  if (eventType === "Schedule") {
      // ✅ 일정(Schedule) 추가 로직
      let updatedEvents = { ...events };

      if (editingIndex !== null) {
          if (!updatedEvents[dateKey]) updatedEvents[dateKey] = [];
          updatedEvents[dateKey][editingIndex] = newItem;
          setEditingIndex(null);
      } else {
          if (!updatedEvents[dateKey]) updatedEvents[dateKey] = [];
          updatedEvents[dateKey].push(newItem);

          // 🔹 반복 일정 추가
          if (repeatOption === "weekly") {
              for (let i = 1; i <= 10; i++) {
                  let nextDate = new Date(selectedDate);
                  nextDate.setDate(nextDate.getDate() + i * 7);
                  const nextDateKey = nextDate.toDateString();
                  if (!updatedEvents[nextDateKey]) updatedEvents[nextDateKey] = [];
                  updatedEvents[nextDateKey].push({ ...newItem });
              }
          }

          if (repeatOption === "monthly") {
              for (let i = 1; i <= 12; i++) {
                  let nextDate = new Date(selectedDate);
                  nextDate.setMonth(nextDate.getMonth() + i);
                  const nextDateKey = nextDate.toDateString();
                  if (!updatedEvents[nextDateKey]) updatedEvents[nextDateKey] = [];
                  updatedEvents[nextDateKey].push({ ...newItem });
              }
          }

          if (repeatOption === "yearly") {
              for (let i = 1; i <= 5; i++) {
                  let nextDate = new Date(selectedDate);
                  nextDate.setFullYear(selectedDate.getFullYear() + i);
                  const nextDateKey = nextDate.toDateString();
                  if (!updatedEvents[nextDateKey]) updatedEvents[nextDateKey] = [];
                  updatedEvents[nextDateKey].push({ ...newItem });
              }
          }
      }

      setEvents(updatedEvents);

  } else if (eventType === "To-do") {
      // ✅ To-do List 추가 로직
      let updatedTodos = { ...todoLists };

      if (!updatedTodos[dateKey]) updatedTodos[dateKey] = [];
      updatedTodos[dateKey].push(newItem);

      setTodoLists(updatedTodos);
  }

  closeModal();
};





  const handleDelete = (item, isTodo) => {
    const dateKey = selectedDate.toDateString();

    if (isTodo) {
      setTodoLists((prev) => ({
        ...prev,
        [dateKey]: prev[dateKey]?.filter((todo) => todo !== item),
      }));
    } else {
      setEvents((prev) => ({
        ...prev,
        [dateKey]: prev[dateKey]?.filter((event) => event !== item),
      }));
    }

    setDeleteConfirm({ show: false, item: null, isTodo: false });
  };

  const toggleTodo = (item) => {
    const dateKey = selectedDate.toDateString();

    setTodoLists((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey]?.map((todo) =>
        todo === item ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  return (
    <div className="schedule-container">
      {/* App Bar */}
      <div className="app-bar">
  <div className="app-bar-left">
    <FaUser className="icon" />
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
        {selectedProject} ▼
      </button>
      {dropdownOpen && (
        <div className="dropdown-menu">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="dropdown-item" 
              onClick={() => {
                setSelectedProject(project);
                setDropdownOpen(false);
                setSelectedDate(new Date());
                setEvents(projectEvents[project] || {});
                setTodoLists(projectTodos[project] || {});
              }}
            >
              {project}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  <div className="app-bar-right">
    <FaBell className="icon" />
    <FaCog className="icon" />
  </div>
</div>


      {/* Calendar */}
      <div className="calendar-container">
        <Calendar
          onChange={handleDayClick}
          value={selectedDate}
          tileContent={({ date }) =>
            (events[date.toDateString()] || []).map((event, idx) => (
              <div
                key={idx}
                className="calendar-event"
                style={{ backgroundColor: event.color }}
              />
            ))
          }
        />
      </div>

      {/* Events and To-do List */}
      <div className="schedule-content">
        {/* 일정 표시 */}
        <div className="schedule-section">
          <h3>일정</h3>
          <div className="schedule-horizontal">
          <div className="schedule-list">
  {(events[selectedDate.toDateString()] || []).map((event, index) => (
    <div
      key={index}
      className="schedule-item"
      onClick={() => handleEditEvent(event, index)} // ✅ 클릭 시 일정 수정 모달 열기
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      <span>{event.title}</span>
      <FaTrash
        className="delete-icon"
        onClick={(e) => {
          e.stopPropagation(); // 삭제 버튼 클릭 시 모달 안 뜨도록 이벤트 버블링 방지
          setDeleteConfirm({ show: true, item: event, isTodo: false });
        }}
        style={{ cursor: "pointer", color: "red" }}
      />
    </div>
  ))}
</div>
          </div>
        </div>

        <hr />

        {/* To-do List 표시 */}
        <div className="schedule-section">
          <h3>To-do List</h3>
          <div className="todo-list">
            {(todoLists[selectedDate.toDateString()] || []).map((todo, idx) => (
              <div key={idx} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                />
                <span className={todo.completed ? "completed" : "todo-text"}>{todo.title}</span>
                <div className="delete-container">
                  <FaTrash
                    className="delete-icon"
                    onClick={() => setDeleteConfirm({ show: true, item: todo, isTodo: true })}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fab" onClick={openModal}>
        <FaPlus />
      </button>

      {/* Add Schedule Modal */}
      <Modal
 isOpen={isModalOpen}
 onRequestClose={closeModal}
 className="modal"
 overlayClassName="overlay"
 style={{
   content: {
     bottom: '0',
     top: 'auto',
     borderRadius: '20px 20px 0 0',
     padding: '20px',
     position: 'fixed',
     width: '100%',
     maxWidth: '500px',
     left: '50%',
     transform: 'translateX(-50%)'
   },
   overlay: {
     backgroundColor: 'rgba(0, 0, 0, 0.5)',
     display: 'flex',
     alignItems: 'flex-end',
     justifyContent: 'center'
   }
 }}
>
        <div className="modal-header">
          <button className="close-btn" onClick={closeModal}> &times; </button>
          <button className="save-btn" onClick={handleSave}> ✓ </button>
        </div>

  <input
    type="text"
    placeholder="일정 제목"
    value={newTitle}
    onChange={(e) => setNewTitle(e.target.value)}
    className="modal-input"
    style={{
      maxWidth: '100%',
      boxSizing: 'border-box',
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '1.5rem',
      padding: '5px 0',
      outline: 'none'
    }}
  />

<div className="selection-row" style={{ display: 'flex', justifyContent: 'space-between', gap: '5px', borderBottom: '2px solid white', paddingBottom: '10px' }}>
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
      색상:
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        style={{ width: '20%' }}
      />
    </label>

    <select
      className="dropdown"
      value={eventType}
      onChange={(e) => setEventType(e.target.value)}
      style={{ width: '20%' }}
    >
      <option value="Schedule">일정</option>
      <option value="To-do">To-do</option>
    </select>
  </div>

  <div className="date-time" style={{ marginTop: '10px', borderBottom: '2px solid white', paddingBottom: '10px' }}>
    <strong>{`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 (${['일', '월', '화', '수', '목', '금', '토'][selectedDate.getDay()]})`}</strong>
    <input
      type="text"
      placeholder="시간 설정 (3:00-4:00PM)"
      value={selectedTime}
      onChange={(e) => setSelectedTime(e.target.value)}
      style={{
        maxWidth: '100%',
        boxSizing: 'border-box',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '0.8rem',
        padding: '5px 0',
        outline: 'none'
      }}
    />
  </div>

  <div style={{ width: '100%', borderBottom: '2px solid white', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
  <div className="repeat-section" style={{ width: '25%' }}>
    <label style={{ marginBottom: '5px'}}>반복:</label>
    <select
      className="dropdown"
      value={repeatOption}
      onChange={(e) => setRepeatOption(e.target.value)}
      style={{ width: '100%' }} // 선택 박스를 부모 크기에 맞춤
    >
      <option value = "none">반복 없음</option>
      <option value="weekly">weekly</option>
      <option value="monthly">monthly</option>
      <option value="yearly">yearly</option>
    </select>
  </div>
  </div>

  <div className="alert-section" style={{ marginTop: '10px', width:'25%' }}>
    <label style={{ marginTop: '10px' }}>알림:</label>
    <select
      className="dropdown"
      value={alertOption}
      onChange={(e) => setAlertOption(e.target.value)}
    >
      <option value="이벤트 당일">이벤트 당일</option>
      <option value="1일 전">1일 전</option>
      <option value="1시간 전">1시간 전</option>
    </select>
  </div>
</Modal>




      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <Modal
          isOpen={deleteConfirm.show}
          onRequestClose={() => setDeleteConfirm({ show: false, item: null, isTodo: false })}
          className="modal"
          overlayClassName="overlay"
        >
          <h3>일정을 삭제하시겠습니까?</h3>
          <p>"{deleteConfirm.item.title}" 일정을 삭제하시겠습니까?</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap' }}>
            <button onClick={() => handleDelete(deleteConfirm.item, deleteConfirm.isTodo)}>예</button>
            <button onClick={() => setDeleteConfirm({ show: false, item: null, isTodo: false })}>
              아니요
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WholeSchedule;
