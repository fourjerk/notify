import axios from "axios";
import React, { useEffect, useState } from "react";
import cafe from "./css/noti.module.css";
import cafeteriaimg from "./img/cafeteria.jpg";

let today = new Date();
let year = today.getFullYear(); // 년도
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let date = ("0" + today.getDate()).slice(-2);
let week = new Array("일", "월", "화", "수", "목", "금", "토");
let day = today.getDay(); // 요일
let dayName = week[today.getDay()];

const API_KEY = "eec42ae7144a47898d823c55a82a1729";
const SCHOOL_CODE = "7380292";
const SC_CODE = "F10";
let TODAY = year + month + date;

const URL = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=10&ATPT_OFCDC_SC_CODE=${SC_CODE}&SD_SCHUL_CODE=${SCHOOL_CODE}&MLSV_YMD=20230302`;
const Cafeteria = () => {
  const [eat, setEat] = useState("");
  const [rownum, setRownum] = useState(0);

  useEffect(() => {
    axios
      .get(URL)
      .then((res) => {
        console.log(res.data.mealServiceDietInfo[1].row[rownum].DDISH_NM);
        setEat(res.data.mealServiceDietInfo[1].row[rownum].DDISH_NM);
      })
      .catch((err) => {
        setEat("급식이 없어요");
      });
  }, [rownum]);

  const replaceWithBr = () => {
    return eat.replace(/[0-9,.()]/g, "");
  };

  return (
    <>
      <div className={cafe.container}>
        <img src={cafeteriaimg} alt="날씨" className={cafe.img} />
      </div>

      <div className={cafe.incontainer}>
        <div>
          <p>
            {year}년 {month}월 {date}일
          </p>
          <p className={cafe.day}>{dayName}요일</p>
        </div>

        <div className={cafe.main}>
          <p className={cafe.nowweather}>오늘 급식은</p>
          <hr></hr>
          <button onClick={() => {setRownum(0)}}>조식</button>
          <button onClick={() => {setRownum(1)}}>중식</button>
          <button onClick={() => {setRownum(2)}}>석식</button>
          <p
            style={{ fontSize: "1rem" }}
            dangerouslySetInnerHTML={{ __html: replaceWithBr() }}
          />
        </div>
      </div>
    </>
  );
};

export default Cafeteria;