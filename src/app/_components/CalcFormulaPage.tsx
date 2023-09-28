import { Box, Center, Container, Text } from "@chakra-ui/react";
import { ReactNode } from "react";


interface CalcFormulaPageProps {
    formula: ReactNode;
    result: ReactNode;
}

export default function CalcFormulaPage(props: CalcFormulaPageProps) {
    return (
        <Container height="100vh">
            <Center height="30vh">
                <Text fontSize="xl">{props.formula}</Text>
                <Box width="5em">
                   {props.result} 
                </Box>
            </Center>
        </Container>
    )
}