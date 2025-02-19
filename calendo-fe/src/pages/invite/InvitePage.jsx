import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import * as S from "./styled";
import InviteModal from "../../components/common/modals/InviteModal";
import ListSearch from "../../components/common/inputs/ListSearch";
import members from "../../constants/mockmembers";
import TitleInput from "../../components/common/inputs/TitleInput";
import backIcon from "../../assets/icons/backbtn.svg";
import addIcon from "../../assets/images/addmember.svg";

function InvitePage() {
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState(""); //검색창 상태관리
    const [searchResults, setSearchResults] = useState(members);
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [selectedUser, setSelectedUser] = useState(null);


    //검색 로직
    const onSearch = (input) => {
        setUserInput(input); // 입력 값 업데이트

        //검색어가 포함된 사용자 필터링
        if (input.trim() === "") {
            setSearchResults(members); // 입력이 없으면 전체 목록 유지
        } else {
            setSearchResults(
                members.filter((user) =>
                    user.username.toLowerCase().includes(input.toLowerCase())
                )
            );
        }
    };


    const handleAddFriendClick = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <S.Container>
            <S.Header>
                <S.BackButton onClick={() => navigate("/")}>
                    <img src={backIcon} alt="Back" width="32" height="32" />
                </S.BackButton>
            </S.Header>
            <S.Nav>
                <TitleInput
                        height={57}
                        placeholder="프로젝트명을 설정해주세요"
                        value={""}
                        onChange={""}
                />
                <ListSearch 
                    userInput={userInput} 
                    setUserInput={setUserInput} 
                    onSearch={onSearch}
                />
            </S.Nav>
            <S.Main>
                {searchResults.length > 0 ? (
                    searchResults.map((user) => (
                        <S.ResultItem key={user.id}>
                            <span>{user.username}</span>
                            <S.AddFriendButton onClick={() => handleAddFriendClick(user)}>
                                <img src={addIcon} alt="add" width="24" height="24" />
                            </S.AddFriendButton>
                        </S.ResultItem>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </S.Main>

            {/* 모달 렌더링 */}
            {isModalOpen && (
                <InviteModal onConfirm={handleAddFriendClick} onCancel={closeModal} />
            )}

        </S.Container>
    );
}

export { InvitePage };
