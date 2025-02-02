import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-modal";
import { FaUser, FaBell, FaCog, FaPlus, FaTrash, FaCheckCircle } from "react-icons/fa";
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
      setEvents((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newItem],
      }));
    } else {
      setTodoLists((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newItem],
      }));
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
      <div className="app-bar">
        <div className="app-bar-left">
          <FaUser className="icon" />
          <span>nickname의 일정</span>
        </div>
        <div className="app-bar-right">
          <FaBell className="icon" />
          <FaCog className="icon" />
        </div>
      </div>

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

      <div className="schedule-content">
        <div className="schedule-section">
          <h3>일정</h3>
          {(events[selectedDate.toDateString()] || []).map((event, idx) => (
            <div key={idx} className="schedule-item">
              <FaCheckCircle className="event-icon" />
              <div>
                <p className="event-title">{event.title}</p>
                <p className="event-time">{event.time}</p>
              </div>
              <FaTrash
                className="delete-icon"
                onClick={() => setDeleteConfirm({ show: true, item: event, isTodo: false })}
              />
            </div>
          ))}
        </div>

        <hr />

        <div className="schedule-section">
          <h3>To-do List</h3>
          {(todoLists[selectedDate.toDateString()] || []).map((todo, idx) => (
            <div key={idx} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
              />
              <span className={todo.completed ? "completed" : ""}>{todo.title}</span>
              <FaTrash
                className="delete-icon"
                onClick={() => setDeleteConfirm({ show: true, item: todo, isTodo: true })}
              />
            </div>
          ))}
        </div>
      </div>

      <button className="fab" onClick={openModal}>
        <FaPlus />
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
          <button className="close-btn" onClick={closeModal}>
            &times;
          </button>
          <h2>일정 추가</h2>
          <button className="save-btn" onClick={handleSave}>
            ✓
          </button>
        </div>

        <input
          type="text"
          placeholder="일정 제목"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="modal-input"
        />

        <div className="selection-row">
          <label>
            색상:
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            />
          </label>

          <label>
            일정:
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="Schedule">일정</option>
              <option value="To-do">To-do</option>
            </select>
          </label>
        </div>

        <div className="date-time">
          <strong>{`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 (${['일', '월', '화', '수', '목', '금', '토'][selectedDate.getDay()]})`}</strong>
          <input
            type="text"
            placeholder="시간 입력 (예: 12:30 - 1:30 PM)"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        <label>
          반복:
          <select
            value={repeatOption}
            onChange={(e) => setRepeatOption(e.target.value)}
          >
            <option value="none">반복 없음</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        <label>
          알림:
          <select
            value={alertOption}
            onChange={(e) => setAlertOption(e.target.value)}
          >
            <option value="이벤트 당일(오전 9시)">이벤트 당일(오전 9시)</option>
            <option value="1일 전(오전 9시)">1일 전(오전 9시)</option>
            <option value="1시간 전">1시간 전</option>
          </select>
        </label>
      </Modal>

      {deleteConfirm.show && (
        <Modal
          isOpen={deleteConfirm.show}
          onRequestClose={() => setDeleteConfirm({ show: false, item: null, isTodo: false })}
          className="modal"
          overlayClassName="overlay"
        >
          <h3>일정을 삭제하시겠습니까?</h3>
          <p>"{deleteConfirm.item.title}" 일정을 삭제하시겠습니까?</p>
          <button onClick={() => handleDelete(deleteConfirm.item, deleteConfirm.isTodo)}>예</button>
          <button onClick={() => setDeleteConfirm({ show: false, item: null, isTodo: false })}>
            아니요
          </button>
        </Modal>
      )}
    </div>
  );
};

export default WholeSchedule;
