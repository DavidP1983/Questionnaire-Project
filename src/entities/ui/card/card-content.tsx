import { Card } from "antd";
import { ReactNode } from "react";

type Props = {
    question: string;
    actions: ReactNode;
}

export const CardContent = ({ actions, question }: Props) => {
    return (
        <Card
            data-testid='card'
            style={{ marginTop: '50px' }}
            styles={{ body: { display: "flex", flexDirection: 'column', alignItems: 'center', gap: '30px' } }}>
            <h1 className="font-bold">{question}</h1>
            {actions}
        </Card>
    )
}