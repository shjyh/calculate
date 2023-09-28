import { Center, Card, CardHeader, Heading, CardBody, VStack, Alert, Checkbox, CardFooter, Button } from "@chakra-ui/react";
import { useLocalStorageState } from "ahooks";
import { useEffect, useState } from "react";
import { start } from "repl";

interface SettingPageProps {
    title: string;
    info?: string;
    options: {
        label: string;
        /**
         * localStorageKey,即是唯一值，也是localStorage的key
         */
        lsKey: string;
        defaultValue: boolean;
    }[];
    onStart(selectLsKeys: string[]): void;
}

export default function SettingPage(props: SettingPageProps) {
    const [lsKeys, setLsKeys] = useState<string[]>([]);

    function changeLsKeys(lsKey: string, checked: boolean) {
        setLsKeys(lsKeys=>{
            if(checked) {
                if(lsKeys.includes(lsKey)) return lsKeys;
                return [...lsKeys, lsKey];
            } else {
                return lsKeys.filter(k=>k !== lsKey);
            }
        })
    }

    function start() {
        props.onStart(lsKeys);
    }

    return (
        <Center height="100vh">
            <Card maxW="80%">
                <CardHeader textAlign="center"><Heading as="h3">练习设置({props.title})</Heading></CardHeader>
                <CardBody>
                    <VStack align="start">
                        {props.info && <Alert status="info">{props.info}</Alert>}
                        {
                        props.options.map(o=>(
                            <SettingCheckbox 
                                key={o.lsKey}
                                lsKey={o.lsKey} label={o.label} defaultValue={o.defaultValue} 
                                onChange={changeLsKeys}
                            />
                        ))
                        }
                    </VStack>
                </CardBody>
                <CardFooter as={Center}>
                    <Button onClick={start} colorScheme='teal'>开始练习</Button>
                </CardFooter>
            </Card>
        </Center>
    )
}

interface SettingCheckboxProps {
    lsKey: string;
    label: string;
    defaultValue: boolean;
    onChange(lsKey: string, checked: boolean): void
}

function SettingCheckbox(props: SettingCheckboxProps) {
    const [_c, setC] = useLocalStorageState("SETTING_" + props.lsKey, {defaultValue: props.defaultValue});
    const [c, _setC] = useState(false);

    useEffect(()=>{
        _setC(_c);
        props.onChange(props.lsKey, _c);
    }, [_c]);

    return (
        <Checkbox isChecked={c} onChange={e=>setC(e.target.checked)}>{props.label}</Checkbox>
    )
}