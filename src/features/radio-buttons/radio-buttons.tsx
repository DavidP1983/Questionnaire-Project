import { Radio, RadioChangeEvent } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { useFormState } from "entities/model/store";
import { TAnswers } from "shared/types";


type Props = {
    answers: TAnswers[];
}

export const RadioButtons = ({ answers }: Props) => {
    const getRadioValue = useFormState(state => state.getRadioValue)
    const radioValue = useFormState(state => state.radioValue)

    const options: CheckboxGroupProps<string>['options'] = answers;

    const onChange = ({ target: { value } }: RadioChangeEvent) => {
        getRadioValue(value)
    };


    return (
        <Radio.Group
            options={options}
            onChange={onChange}
            value={radioValue}
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} />
    )
}