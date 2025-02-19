import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { FaUser, FaBell, FaCog, FaPlus, FaTrash, FaCheckCircle, FaTimes, FaClock, FaFileAlt } from "react-icons/fa"; 
import "../styles/WholeSchedule.css";
import trashIcon from "../assets/images/trash.svg";
import addMemberIcon from "../assets/images/addmember.svg";
import addProjectIcon from "../assets/images/addproject.svg";
import alertIcon from "../assets/images/alert.svg";
import timeIcon from "../assets/images/time.svg";
import profileIcon from "../assets/images/profile.svg";
import checkIcon from "../assets/images/check.svg";
import googleIcon from "../assets/images/google.svg";
import teammemberIcon from "../assets/images/teammember.svg";
import exitIcon from "../assets/images/x.svg";
import downarrowIcon from "../assets/images/downarrow.svg"


Modal.setAppElement("#root");

const WholeSchedule = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState({});
  const [todoLists, setTodoLists] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [eventType, setEventType] = useState("Schedule");
 
  const [selectedTime, setSelectedTime] = useState("");
  const [repeatOption, setRepeatOption] = useState("none");
  const [alertOption, setAlertOption] = useState("이벤트 당일(오전 9시)");
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, item: null, isTodo: false });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);


  const [selectedColor, setSelectedColor] = useState("#FFCDD2"); // 기본 색상 설정
  const [selectedType, setSelectedType] = useState("일정"); // 기본 일정 유형 설정
  const [selectedRepeat, setSelectedRepeat] = useState("반복 없음"); // 기본 반복 옵션 설정


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projects, setProjects] = useState(["나의 일정"]);
  const [selectedProject, setSelectedProject] = useState("");
  const [nickname, setNickname] = useState("");

  const userId = localStorage.getItem("userId"); // ✅ 사용자 ID 가져오기
  // ✅ 초기 색상 불러오기 (GET 요청)
  useEffect(() => {
    if (!userId) return;

    fetch(`/api/users/${userId}/color`)
      .then(response => response.json())
      .then(data => {
        if (data.color) {
          setSelectedColor(data.color); // 서버에서 저장된 색상 적용
        }
      })
      .catch(error => console.error("메인 테마 색상 불러오기 실패:", error));
  }, [userId]);

  // ✅ 색상 선택 이벤트
const handleColorChange = async (e) => {
  const newColor = e.target.value;
  setSelectedColor(newColor);

  if (!userId) return;

  try {
    // 색상이 처음 선택된 경우 (POST 요청)
    const response = await fetch(`/api/users/${userId}/color`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color: newColor }),
    });

    if (!response.ok) {
      throw new Error("색상 저장 실패");
    }
  } catch (error) {
    console.error("메인 테마 색상 저장 오류:", error);
  }
};

// ✅ 색상 변경 이벤트 (PUT 요청)
const updateColor = async (newColor) => {
  setSelectedColor(newColor);

  if (!userId) return;

  try {
    const response = await fetch(`/api/users/${userId}/color`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color: newColor }),
    });

    if (!response.ok) {
      throw new Error("색상 변경 실패");
    }
  } catch (error) {
    console.error("메인 테마 색상 변경 오류:", error);
  }
};





  useEffect(() => {
    // ✅ `localStorage`에서 닉네임 가져오기
    const storedNickname = localStorage.getItem("nickname") || "unknown";
    setNickname(`${storedNickname}의 일정`);
  }, []);
  
  
  // 프로젝트별 데이터 저장
  const [projectData, setProjectData] = useState({
    "내 일정": { events: {}, todoLists: {} }
  });

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const [projectMembers, setProjectMembers] = useState({
    "내 일정": ["나", "수현"], // 기본 프로젝트의 팀원
  });
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);

  const toggleMemberDropdown = () => {
    setIsMemberDropdownOpen(!isMemberDropdownOpen);
  };
  
  // 현재 선택된 프로젝트의 데이터를 불러옴
  const currentEvents = projectData[selectedProject]?.events || {};
  const currentTodoLists = projectData[selectedProject]?.todoLists || {};

  const handleAddMember = () => {
    const newMember = prompt("추가할 팀원 이름을 입력하세요:");
    if (newMember && newMember.trim() !== "") {
      setProjectMembers((prev) => ({
        ...prev,
        [selectedProject]: [...(prev[selectedProject] || []), newMember],
      }));
    }
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


const openProjectModal = () => {
  setIsProjectModalOpen(true);
};

const closeProjectModal = () => {
  setIsProjectModalOpen(false);
  setNewProjectName("");
};

// 이전 달로 이동
const handlePrevMonth = () => {
  setSelectedDate((prevDate) => {
    const prevMonth = new Date(prevDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    return prevMonth;
  });
};

// 다음 달로 이동
const handleNextMonth = () => {
  setSelectedDate((prevDate) => {
    const nextMonth = new Date(prevDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return nextMonth;
  });
};

// const handleCreateProject = () => {
//   if (newProjectName.trim() !== "") {
//     setProjects((prevProjects) =>
//       prevProjects.includes("내 일정")
//         ? [...prevProjects, newProjectName]
//         : ["내 일정", newProjectName]
//     );
//     setSelectedProject(newProjectName);
//     closeProjectModal();
//   }
// };

 // 새 프로젝트 추가
 const handleCreateProject = () => {
  if (newProjectName.trim() !== "" && !projects.includes(newProjectName)) {
    setProjects([...projects, newProjectName]);
    setProjectData({
      ...projectData,
      [newProjectName]: { events: {}, todoLists: {} }
    });
    setSelectedProject(newProjectName);
    closeProjectModal();
  }
};

// 프로젝트 변경
const handleProjectChange = (project) => {
  setSelectedProject(project);
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
        <div className="app-bar-left" >
          <img src={teammemberIcon} className="icon"  onClick={toggleMemberDropdown} />
        {/* 팀원 목록 드롭다운 */}
  {isMemberDropdownOpen && (
    <div className="member-dropdown">
      {(projectMembers[selectedProject] || []).map((member, index) => (
        <div key={index} className="member-item">{member}</div>
      ))}
      <div className="member-item invite" onClick={handleAddMember}>
        팀원 초대  <img src={addMemberIcon}  className="spaced-icon" />
      </div>
    </div>
  )}
    <div className="dropdown-container">
      <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {selectedProject} {nickname}▼
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
                    }}
                  >
                    {project}
                  </div>
                ))}
              </div>
            )}
          </div>

          
        {/* ✅ 캘린더 색상 선택 버튼 추가 */}
        <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            onBlur={(e) => updateColor(e.target.value)}
            className="color-picker"
          />
        </div>
        
        <div className="app-bar-right">
          <img src={alertIcon} className="icon" />
          <img src={addProjectIcon} className="icon" onClick={openProjectModal} />
          <img src={timeIcon} className="icon" />
          <img src={profileIcon} className="icon" onClick={() => navigate("/mypage")} />
        
        </div>
      </div>

      {/* New Project Modal */}
      <Modal
        isOpen={isProjectModalOpen}
        onRequestClose={closeProjectModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-header">
        <button className="close-btn" onClick={closeProjectModal}> &times; </button>


<button className="save-btn" onClick={handleCreateProject}> ✓ </button>
        </div>
        <input
          type="text"
          placeholder="새 프로젝트 이름"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="modal-input"
        />
      </Modal>


      <div className="schedule-container">
      {/* 상단 날짜 표시 + 네비게이션 역할 */}
      {/* <div className="calendar-header">
        <h2>
        <button className="nav-button" onClick={handlePrevMonth}>◁</button>
          {selectedDate.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          <button className="nav-button" onClick={handleNextMonth}>▷</button>
        </h2>
      </div> */}

      {/* 캘린더 */}
      <div className="calendar-container">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          formatMonthYear={(locale, date) => {
            return `${date.toLocaleString("en-US", {
              month: "long",
            })} ${selectedDate.getDate()} ${date.getFullYear()}`; // ✅ "March 21 2025" 형식
          }}
          formatDay={(locale, date) => date.getDate()} // '일' 제거하고 숫자만 표시
          formatShortWeekday={(locale, date) =>
            date.toLocaleDateString("en-US", { weekday: "short" }) // ✅ Mon, Tue, Wed 형태로 변경
          }
          tileContent={({ date }) => (
            <div className="calendar-event-container">
              {(events[date.toDateString()] || []).slice(0, 2).map((event, idx) => (
                <div key={idx} className="calendar-event" style={{backgroundColor: selectedColor}}>
                  {event.title}
                </div>
              ))}
            </div>
          )}
        />
      </div>
    </div>
          

  {/* Events and To-do List */}
<div className="schedule-content">
  {/* 일정 표시 */}
  <div className="schedule-section">
    <div className="schedule-horizontal">
      <div className="schedule-list">
        {(events[selectedDate.toDateString()] || []).map((event, index) => (
          <div key={index} className="schedule-item"
          onClick={() => handleEditEvent(event, index)} // ✅ 클릭 시 일정 수정 모달 열기
          >
            {/* 시간 + 파란 점 */}
            <div className="schedule-time">
              <span className="event-dot">●</span>
              <span className="event-time">{event.time}</span>
            </div>

            {/* 일정 제목 */}
            <div className="event-box">
              <div className="event-bar"></div>
              <div className="event-title">{event.title}</div>
            </div>

          </div>
        ))}
      </div>
    </div>
  </div>
      

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
                <img src={trashIcon} alt="삭제 아이콘" className="delete-icon" onClick={() => setDeleteConfirm({ show: true, item: todo, isTodo: true })}/>
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
        className="delete-modal"
        overlayClassName="overlay"
      >
        <div className="delete-modal-content">
          <p className="delete-text">
            <strong>‘{deleteConfirm.item.title}’ 일정을</strong> <br />
            삭제하시겠습니까?
          </p>
          <div className="delete-buttons">
            <button className="delete-btn" onClick={() => handleDelete(deleteConfirm.item, deleteConfirm.isTodo)}>예</button>
            <button className="cancel-btn" onClick={() => setDeleteConfirm({ show: false, item: null, isTodo: false })}>
              아니요
            </button>
          </div>
        </div>
      </Modal>
      )}
    </div>
  );
};

export default WholeSchedule;
