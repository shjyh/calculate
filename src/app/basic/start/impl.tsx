"use client";

import { Oper, getRandomItem, randomNum } from "@/app/_util";
import { Input } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMemoizedFn } from "ahooks";
import ResultPage from "@/app/_components/ResultPage";
import CalcFormulaPage from "@/app/_components/CalcFormulaPage";

interface CalcInfo {
    num1: number;
    num2: number;
    opt: Oper;
    result: number;
}

function getRandomCalc(twoDigits: boolean, opers: Oper[]): CalcInfo {
    const opt = getRandomItem(opers);

    const isMulDiv = opt === "×" || opt === "÷";
    const startNum = isMulDiv ? 2 : 1

    const num1 = twoDigits ? randomNum(startNum, 99) : randomNum(startNum, 9);

    const num2TwoDigits = (twoDigits && isMulDiv && num1 > 10) ? false : twoDigits;
    const num2 = num2TwoDigits ? randomNum(startNum, 99) : randomNum(startNum, 9);

    switch (opt) {
        case "+":
            return {
                num1,
                num2,
                opt,
                result: num1 + num2
            };
        case "-":
            return {
                num1: num1 + num2,
                num2,
                opt,
                result: num1
            };
        case "×":
            return {
                num1,
                num2,
                opt,
                result: num1 * num2
            }
        case "÷":
            return {
                num1: num1 * num2,
                num2,
                opt,
                result: num1
            }
        default: null;
    }
}

export default function Start({m, t}: {m: boolean, t: boolean}) {
    const calcNum = useRef(0);
    const startTime = useRef(0);
    const [currentCalcInfo, setCurrentInfo] = useState<CalcInfo>(null);
    const [stat, setStat] = useState({time: 0, count: 0});
    const [showResult, setShowResult] = useState(false);

    const opers: Oper[] = useMemo(()=>{
        if(m) return ["+", "-", "×", "÷"];
        return ["+", "-"];
    }, [m]);

    function next() {
        setCurrentInfo(getRandomCalc(t, opers));
        calcNum.current++;
    }

    function start() {
        calcNum.current = 0;
        startTime.current = Date.now();
        setShowResult(false);
        next();
    }

    function stop() {
        setStat({
            time: Date.now() - startTime.current,
            count: calcNum.current
        });
        setShowResult(true);
    }

    useEffect(()=>{
        start();
    }, []);

    const onSuccess = useMemoizedFn(()=>{
        if(calcNum.current >= 30) {
            stop();
        } else {
            next();
        }
    })

    const resultTitle = useMemo(()=>{
        let b = "基础练习";
        if(m) {
            b += "+乘除";
        }
        if(t) {
            b += "+两位数";
        }
        return b;
    }, [m, t]);

    if(showResult){
        return <ResultPage 
            title={resultTitle}
            time={stat.time}
            count={stat.count}
            onAgain={start}
        />
    }

    return !!currentCalcInfo && <CalcItem info={currentCalcInfo} onSuccess={onSuccess} />
}

interface CalcItemProps {
    info: CalcInfo;
    onSuccess(): void;
}

function CalcItem({ info, onSuccess }: CalcItemProps) {

    const [answer, setAnswer] = useState("");

    const onChange = useCallback((e: any) => {
        setAnswer(e.target.value.trim());
    }, []);

    useEffect(()=>{
        if(Number.parseInt(answer, 10) === info.result) {
            onSuccess();
            setAnswer("");
        }
    }, [answer]);

    return <CalcFormulaPage formula={
        <>{info.num1} {info.opt} {info.num2} =&ensp;</>
    } result={
        <Input type="number" value={answer} autoFocus variant='flushed' placeholder='填写答案' size="lg" onChange={onChange}/>
    } />
}