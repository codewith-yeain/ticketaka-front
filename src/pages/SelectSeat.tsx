import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styleb from "../styles/Box.module.css";
import seatImage from "../assets/seat-button.svg";
import trainConvenience from "../assets/train-convenience.svg";
import "../styles/SelectSeat.css";
import styles from "../styles/Button.module.css";
import { updateCurrentSession } from "../utils/session";

interface Seat {
    seatNumber: string;
    isAvailable: boolean;
}

const dummySeats: Seat[] = [
    { seatNumber: "1A", isAvailable: true },
    { seatNumber: "1B", isAvailable: false },
    { seatNumber: "1C", isAvailable: true },
    { seatNumber: "1D", isAvailable: true },
    { seatNumber: "2A", isAvailable: true },
    { seatNumber: "2B", isAvailable: true },
    { seatNumber: "2C", isAvailable: false },
    { seatNumber: "2D", isAvailable: true },
    { seatNumber: "3A", isAvailable: true },
    { seatNumber: "3B", isAvailable: false },
    { seatNumber: "3C", isAvailable: true },
    { seatNumber: "3D", isAvailable: true },
    { seatNumber: "4A", isAvailable: true },
    { seatNumber: "4B", isAvailable: true },
    { seatNumber: "4C", isAvailable: false },
    { seatNumber: "4D", isAvailable: true },
];

const SelectSeat = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { reservationData, trainInfo } = location.state;
    const totalPassengers = reservationData.adultCount + reservationData.seniorCount + reservationData.teenCount;

    const [carriageNumber, setCarriageNumber] = useState<number>(1);
    const [availableSeats, setAvailableSeats] = useState<Seat[]>(dummySeats);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    useEffect(() => {
        updateCurrentSession({
            selectedSeats: {
                carriageNumber,
                availableSeats: selectedSeats.map((seatNumber) => ({ seatNumber, isAvailable: true }))
            }
        });
    }, [selectedSeats, carriageNumber]);

    const toggleSeat = (seatNumber: string) => {
        setSelectedSeats((prevSeats) => {
            if (prevSeats.includes(seatNumber)) {
                return prevSeats.filter((s) => s !== seatNumber);
            } else if (prevSeats.length < totalPassengers) {
                return [...prevSeats, seatNumber];
            } else {
                alert(`최대 ${totalPassengers}개의 좌석만 선택할 수 있습니다.`);
                return prevSeats;
            }
        });
    };

    const handleNext = () => {
        if (selectedSeats.length === 0) {
            alert("좌석을 선택해주세요.");
            return;
        }
        navigate("/reservation/payment", {
            state: {
                reservationData,
                trainInfo,
                selectedSeats,
                carriageNumber,
            },
        });
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <title>Seats</title>
            <div className={styleb.box}>
                <div className="seat-container">
                    <h2 className="page-title">좌석 선택</h2>
                    <hr className="page-title-bar" />

                    <div className="content-container">
                        <div style={{ marginBottom: "16px" }}>
                            <label htmlFor="carriage">호차 선택: </label>
                            <select
                                id="carriage"
                                value={carriageNumber}
                                onChange={(e) => setCarriageNumber(Number(e.target.value))}
                            >
                                <option value={1}>1호차</option>
                                <option value={2}>2호차</option>
                                <option value={3}>3호차</option>
                            </select>
                        </div>

                        <img src={trainConvenience} alt="기차 편의 시설" />

                        <div className="seat-grid">
                            <div className="seat-guide">
                                <div>창측</div>
                                <div>내측</div>
                                <div>내측</div>
                                <div>창측</div>
                            </div>
                            {availableSeats.map(({ seatNumber, isAvailable }) => (
                                <button
                                    key={seatNumber}
                                    className={`seat ${selectedSeats.includes(seatNumber) ? "selected" : ""}`}
                                    onClick={() => isAvailable && toggleSeat(seatNumber)}
                                    disabled={!isAvailable}
                                >
                                    <img
                                        src={seatImage}
                                        alt="Seat"
                                        className={`seat-icon ${!isAvailable ? "disabled" : ""}`}
                                    />
                                    <div className="seat-number">{seatNumber}</div>
                                </button>
                            ))}
                        </div>

                        <div className="selected-seats">
                            <h4>선택한 좌석 ({selectedSeats.length} / {totalPassengers}):</h4>
                            {selectedSeats.length > 0 ? (
                                selectedSeats.map((seat) => (
                                    <span key={seat} className="selected-seat">
                                        {carriageNumber}호차 - {seat}
                                        <button onClick={() => toggleSeat(seat)}>X</button>
                                    </span>
                                ))
                            ) : (
                                <p>선택한 좌석이 없습니다.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="display-button">
                <button className={`${styles.button} select-seat-back`} onClick={handleBack}>
                    이전
                </button>
                <button
                    className={`${styles.button} select-seat-next`}
                    onClick={handleNext}
                    disabled={selectedSeats.length === 0}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default SelectSeat;
