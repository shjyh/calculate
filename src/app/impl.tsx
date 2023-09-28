"use client";

import { Link } from "@chakra-ui/next-js";
import { Button, Center, Icon, Input, VStack } from "@chakra-ui/react";
import { SlCalculator } from "react-icons/sl";
import { TbMathXDivideY } from "react-icons/tb";
import { GiDividedSpiral } from "react-icons/gi";

export default function Home() {
    return (
        <Center height="100vh">
            <VStack direction={"column"}>
                <Button as={Link} href="/basic" colorScheme='teal' leftIcon={<Icon as={SlCalculator} />}>基础练习</Button>
                <Button as={Link} href="/" colorScheme='teal' leftIcon={<Icon as={TbMathXDivideY} />}>分数练习</Button>
                <Button as={Link} href="/" colorScheme='teal' leftIcon={<Icon as={GiDividedSpiral} />}>速算技巧练习</Button>
            </VStack>
        </Center>
    )
}