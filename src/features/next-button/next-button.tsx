import { Button, Flex } from "antd";
import { useFormState } from "entities/model/store";

export const NextButton = () => {
    const nextPage = useFormState(state => state.nextPage);
    const prevPage = useFormState(state => state.prevPage);
    const prevQuestion = useFormState(state => state.prevQuestion)
    const isActiveRadio = useFormState(state => state.isActiveRadio)

    const showNextQuestion = () => {
        if (isActiveRadio) {
            nextPage()
        }
    }
    const showPrevQuestion = () => {
        const elem = prevQuestion.pop();
        if (elem) {
            prevPage(elem);
        }
    }

    return (
        <Flex justify="space-around" data-testid="btn">

            <Button
                type="primary"
                size='large'
                onClick={showPrevQuestion}
            >
                Prev Question
            </Button>
            <Button
                type="primary"
                size='large'
                onClick={showNextQuestion}>
                Next Question
            </Button>

        </Flex>
    )
}