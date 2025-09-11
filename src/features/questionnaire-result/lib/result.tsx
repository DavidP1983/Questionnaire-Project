import { ResultStatusType } from "antd/es/result";
import { IPrevQuestion } from "entities/model/store";
import { keys } from "shared/config";
import { ResultUI } from "../ui";


type TProps = {
    key: string;
    title: string;
    summary: IPrevQuestion[]
}

export const questionnaireResult = ({ key, title, summary }: TProps) => {

    if (keys.includes(key)) {
        const map = {
            decline: "error",
            accepted: "success",
            junior: "error"
        }

        const status = map[key as keyof typeof map] as ResultStatusType;
        return <ResultUI status={status} title={title} summary={summary} />
    }
    return null
}