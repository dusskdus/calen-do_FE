import React from "react";
import * as S from "./styled";

export const AddModal = ({onConfirm, onCancel}) => {
    return (
        <S.ModalOverlay>
            <S.ModalContent>
                <S.Text>
                    추가 메세지
                </S.Text>
                <S.Row>
                <S.Button color="#FFE3E3" onClick={onConfirm}>확인</S.Button>
                </S.Row>
            </S.ModalContent>
        </S.ModalOverlay>
    )
}

export default AddModal