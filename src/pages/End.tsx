import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoMain from "../assets/lolgo_main.svg";
import styles from "../styles/Button.module.css";
import { markSessionCompleted, updateReservationLogSession, addReservationLog } from "../utils/session";

const End = () => {
    const navigate = useNavigate();

    const sessionId = (() => {
        try {
            return JSON.parse(localStorage.getItem("currentReservationLogSession") || "null")?.sessionId;
        } catch {
            return null;
        }
    })();

    const logClick = (target_id: string, text: string, tag = "button") => {
        if (!sessionId) return;
        addReservationLog({
            sessionId,
            page: "End",
            event: "click",
            target_id,
            tag,
            text,
        });
    };

    useEffect(() => {
        if (sessionId) {
            updateReservationLogSession({ current_page: "End" });
            // addReservationLog({
            //     sessionId,
            //     page: "End",
            //     event: "navigate",
            //     target_id: "page-load",
            //     tag: "system",
            //     text: "End 페이지 도착",
            // });
            // 없앨까 말까
        }
    }, [sessionId]);

    const handleConfirm = () => {
        logClick("end-to-home", "확인 클릭 후 메인으로 이동");
        markSessionCompleted();
        navigate("/");
    };

    return (
        <div>
            <title>End</title>
            <div className="logo">
                <img src={logoMain} alt="main-logo" />
            </div>
            <div className="button-container">
                <button
                    className={`${styles.button} reservation`}
                    onClick={handleConfirm}
                    id="end-to-home"
                >
                    확인
                </button>
                <div style={{ textAlign: "center" }}>
                    이용해 주셔서 감사합니다.
                </div>
            </div>
        </div>
    );
};

export default End;
