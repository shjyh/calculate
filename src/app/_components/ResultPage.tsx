import { Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Center, Heading, Text, VStack } from "@chakra-ui/react";
import { stat } from "fs";
import { useRouter } from "next/navigation";
import { start } from "repl";

interface ResultPageProps {
    title: string;
    /**
     * 答题时间
     */
    time: number;
    /**
     * 答题数
     */
    count: number;
    /**
     * 再来一次
     */
    onAgain(): void;
}

export default function ResultPage(props: ResultPageProps) {
    const router = useRouter();

    function back() {
        router.back();
    }

    function again() {
        props.onAgain();
    }

    return (
        <Center height="100vh">
            <Card maxW="80%">
                <CardHeader textAlign="center"><Heading as="h3">测试成绩({props.title})</Heading></CardHeader>
                <CardBody>
                    <VStack align="start">
                        <Text fontSize='md'>共答<Text as="span" fontSize="lg" color="green.500">{props.count}</Text>题</Text>
                        <Text fontSize='md'>共用时<Text as="span" fontSize="lg" color="green.500">{(props.time / 1000).toFixed(2)}</Text>秒</Text>
                        <Text fontSize='md'>平均每题用时<Text as="span" fontSize="lg" color="green.500">{((props.time / 1000) / props.count).toFixed(2)}</Text>秒</Text>
                    </VStack>
                </CardBody>
                <CardFooter as={Center}>
                    <ButtonGroup>
                        <Button colorScheme='teal' onClick={back}>返回</Button>
                        <Button colorScheme="blue" onClick={again}>再来一次</Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Center>
    )
}