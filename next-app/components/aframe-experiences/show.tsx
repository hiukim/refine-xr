import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@pankod/refine-core";
import {
    Show,
    Typography,
    NumberField,
    TagField,
    TextField,
} from "@pankod/refine-antd";
import QRCode from "react-qr-code";

const { Title } = Typography;

export const AframeExperienceShow: React.FC<IResourceComponentsProps> = (props) => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: assetData, isLoading: assetIsLoading } = useOne({
        resource: "assets",
        id: record?.asset?.id || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const url = props.XR_SERVE_URL + "/aframe-xr?id=" + record?.id;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Title</Title>
            <TextField value={record?.title} />
            <Title level={5}>Asset</Title>
            {assetIsLoading ? <>Loading...</> : <>{assetData?.data?.title}</>}

            <Title level={5}>XR view</Title>
	    <div>
	      <a href={url} target="_blank">{url}</a>
	    </div>
	    <div>
	      <QRCode size={256} value={url}/>
	    </div>
        </Show>
    );
};

