import React from "react";
import * as S from "./styled";

export const InviteModal = ({onConfirm, onCancel}) => {
    return (
        <S.ModalOverlay>
            <S.ModalContent>
                <S.Text>
                    초대하시겠습니까?
                </S.Text>
                <S.Row>
                <S.Button color="#FFE3E3" onClick={onConfirm}>초대</S.Button>
                <S.Button color="#EEEEEE" onClick={onCancel}>취소</S.Button>
                </S.Row>
            </S.ModalContent>
        </S.ModalOverlay>
    )
}

export default InviteModal