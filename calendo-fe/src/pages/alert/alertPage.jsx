import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./styled"
import backIcon from "../../assets/icons/backbtn.svg";
import AlertItem from "../../components/common/list/alertItem"
import NotiModal from "../../components/common/modals/notifiModal"

function AlertPage() {

    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const [selectedAlert, setSelectedAlert] = useState(null);

    // 알림 클릭 시 모달 열기
    const handleAlertClick = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Mock 데이터 (API 연동 가능)
    const mockAlerts = [
        { id: 1, content: "알림 테스트 메시지입니다." },
        { id: 2, content: "알림 테스트 메시지입니다." }
    ];


    return(
        <S.Container>
                    <S.Header>
                        <S.BackButton onClick={()=>navigate(-1)}>
                        <img src={backIcon} alt="Back" width="32" height="32" />
                        </S.BackButton>
                        <S.Title>알림</S.Title>
                    </S.Header>
                    <S.Nav>
                        <S.SubTitle>{mockAlerts.length}개의 안 읽은 알림</S.SubTitle>
                    </S.Nav>
                    <S.Main>
                    {mockAlerts.length > 0 ? (
                        mockAlerts.map((alert) => (
                            <AlertItem 
                                key={alert.id} 
                                post={alert} 
                                onClick={() => handleAlertClick(alert)}/>
                        ))
                    ) : (
                        <p>알림이 없습니다.</p>
                    )}
                    </S.Main>

                    {isModalOpen && (
                        <NotiModal onConfirm={handleAlertClick} onCancel={closeModal} />
                    )}
        </S.Container>
    );
}

export default AlertPage;