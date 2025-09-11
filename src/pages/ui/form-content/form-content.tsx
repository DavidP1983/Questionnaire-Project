import { Flex } from "antd";
import { CardContent } from "entities";
import { useFormState } from "entities/model/store";
import { NextButton } from "features/next-button";
import { questionnaireResult } from "features/questionnaire-result/lib/result";
import { RadioButtons } from "features/radio-buttons";
import { db } from "shared/questionnaire";

export const FormContent = () => {
    const key = useFormState(state => state.question)
    const summary = useFormState(state => state.prevQuestion)
    const { title, answers } = db.map.get(key) ?? { title: "", answers: [] }

    const resultContent = questionnaireResult({ key, title, summary })
    if (resultContent) return resultContent

    return (

        <Flex vertical gap={10} data-testid="form-content">
            <CardContent
                question={title}
                actions={<RadioButtons answers={answers} />} />
            <NextButton />
        </Flex>
    )
}