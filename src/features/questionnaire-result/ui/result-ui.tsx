import { Flex, Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import { IPrevQuestion } from "entities/model/store";
import { BackButton } from "features/back-button";


type TProps = {
    status: ResultStatusType;
    title: string;
    summary: IPrevQuestion[]
}

export const ResultUI = ({ status, title, summary }: TProps) => {
    return (
        <Result
            status={status}
            title={title}
            extra={[
                <Flex key="summary" justify="center" vertical gap={10} data-testid="result">
                    <ul className="flex flex-col gap-7">
                        {
                            summary?.map((elem) => (
                                <li key={elem.answer} className="flex justify-between text-blue-800">
                                    <p> {elem.title} </p>
                                    <p> {elem.answer} </p>
                                </li>
                            ))
                        }

                    </ul>
                    <BackButton key="back">Back</BackButton>
                </Flex>
            ]} />
    )
}