import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
export default function () {
    const navigate = useNavigate()
    return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button onClick={() => navigate('')} type="primary">Back Home</Button>}
    />
}
