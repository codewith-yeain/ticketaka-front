import React from "react";
import { useNavigate } from "react-router-dom";
import styleb from "../styles/Box.module.css";
import styles from "../styles/Button.module.css";
import "../styles/History.css";

const HistoryNone = () => {
    const navigate = useNavigate();

    return (
        <div className="ticket-container none">
            <div className="no-reservation-section">
                <img
                    src="/src/assets/failed-button.svg"
                    alt="no-reservation"
                    className="no-reservation-image"
                />
                <p className="no-reservation-text">
                    해당 조회기간에는
                    <br />
                    예매 내역이 없습니다.
                </p>
            </div>
            <button
                className={styles.button}
                onClick={() => navigate("/")}
            >
                메인 화면으로
            </button>
        </div>
    );
};

export default HistoryNone;
