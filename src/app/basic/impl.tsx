"use client";

import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Center, Checkbox, Heading, VStack } from "@chakra-ui/react";
import { useLocalStorageState } from "ahooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BaseSetting() {
    const [_mulDiv, setMulDiv] = useLocalStorageState("BASIC_SETTING_MUL_DIV", {defaultValue: false});
    const [_twoDigits, setTwoDigits] = useLocalStorageState("BASIC_SETTING_TWO_DIGITS", {defaultValue: false});

    const [mulDiv, _setMulDiv] = useState(false);
    const [twoDigits, _setTwoDigits] = useState(false);

    useEffect(()=>{
        _setMulDiv(_mulDiv);
        _setTwoDigits(_twoDigits);
    }, [_mulDiv, _twoDigits]);

    const router = useRouter();

    function start() {
        let h = "/basic/start";
        const q = [];
        if (mulDiv) {
            q.push("m=1");
        }
        if (twoDigits) {
            q.push("t=1");
        }
        if (q.length > 0) {
            h += "?" + q.join("&");
        }
        router.push(h);
    }

    return (
        <Center height="100vh">
            <Card maxW="80%">
                <CardHeader textAlign="center"><Heading as="h3">练习设置</Heading></CardHeader>
                <CardBody>
                    <VStack align="start">
                        <Alert status="info">基础运算只出现20以内加减法</Alert>
                        <Checkbox isChecked={mulDiv} onChange={e=>setMulDiv(e.target.checked)}>出现乘除运算</Checkbox>
                        <Checkbox isChecked={twoDigits} onChange={e=>setTwoDigits(e.target.checked)}>出现两位数运算</Checkbox>
                    </VStack>
                </CardBody>
                <CardFooter as={Center}>
                    <Button onClick={start} colorScheme='teal'>开始练习</Button>
                </CardFooter>
            </Card>
        </Center>
    )
}