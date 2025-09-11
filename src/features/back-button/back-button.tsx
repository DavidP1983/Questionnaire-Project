import { Button } from "antd";
import { useFormState } from "entities/model/store";
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export const BackButton = ({ children }: Props) => {
    const backToMainPage = useFormState(state => state.backToMainPage)
    return (
        <Button onClick={() => backToMainPage()} style={{ margin: "20px" }}>{children}</Button>
    )
}