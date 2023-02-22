import React, {useMemo} from "react";
import { ModelViewer } from "../../components/ModelViewer";
import { IResourceComponentsProps, useShow } from "@pankod/refine-core";
import {
    Show,
    Typography,
    NumberField,
    TagField,
    TextField,
} from "@pankod/refine-antd";

const { Title } = Typography;

export const AssetShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const modelURL = useMemo(() => {
      if (record && record.model && record.model[0] && record.model[0].response) {
	return record.model[0].response.url
      }
      return null;
    }, [record]);

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Title</Title>
            <TextField value={record?.title} />
            <Title level={5}>Model</Title>
            {record?.model?.map((item: any) => (
                <TextField value={item?.name} key={item?.name} />
            ))}
	    
	    {modelURL && (
	      <div>
	      <ModelViewer modelURL={modelURL} />
	      </div>
	    )}
        </Show>
    );
};

