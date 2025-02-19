import styles from "./ListSearch.module.css";
import Magnifier from "../../../assets/icons/magnifier.svg";


const ListSearch = ({onSearch, userInput}) => {

    const handleInputChange = (event) => {
         const term = event.target.value; // term은 입력하는 글자
         onSearch(term);   // 검색하는 글자(term)로 실시간으로 상태를 업데이트
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleInputChange(event);
        }
    };


    return (
        <div className={styles["list-search-container"]}>
            <div className={styles["list-search-img-container"]}>
                <img src={Magnifier} alt="돋보기" />
                <input 
                className={styles["list-search-input-container"]}   
                placeholder="검색어를 입력해 주세요." 
                maxLength={20} 
                value={userInput} 
                onChange={handleInputChange} 
                />
            </div>
            <div className={styles["list-search-button-container"]}>
                <button>Search</button>
            </div>
        </div>
    );
};

export default ListSearch;