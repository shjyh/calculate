"use client";

import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Center, Checkbox, Heading, VStack } from "@chakra-ui/react";
import { useLocalStorageState } from "ahooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SettingPage from "../_components/SettingPage";

export default function BaseSetting() {
    const router = useRouter();

    function start(keys: string[]) {
        let h = "/basic/start";
        console.log("aaa")
        const q = [];
        if (keys.includes("BASIC_MUL_DIV")) {
            q.push("m=1");
        }
        if (keys.includes("BASIC_TWO_DIGITS")) {
            q.push("t=1");
        }
        if (q.length > 0) {
            h += "?" + q.join("&");
        }
        router.push(h);
    }

    return (
        <SettingPage 
            title="基础练习"
            info="基础运算只出现20以内加减法"
            options={[
                {label: "出现乘除运算", lsKey: "BASIC_MUL_DIV", defaultValue: false},
                {label: "出现两位数运算", lsKey: "BASIC_TWO_DIGITS", defaultValue: false},
            ]}
            onStart={start}
        />
    )
}