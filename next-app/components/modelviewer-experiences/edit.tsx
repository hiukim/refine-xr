import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Edit,
    Form,
    useForm,
    Input,
    useSelect,
    Select,
    InputNumber,
} from "@pankod/refine-antd";

export const ModelviewerExperienceEdit: React.FC<
    IResourceComponentsProps
> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const modelviewerExperiencesData = queryResult?.data?.data;

    const { selectProps: assetSelectProps } = useSelect({
        resource: "assets",
        defaultValue: modelviewerExperiencesData?.asset?.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Id"
                    name={["id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input readOnly disabled />
                </Form.Item>
                <Form.Item
                    label="Title"
                    name={["title"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Asset"
                    name={["asset", "id"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select {...assetSelectProps} />
                </Form.Item>
		<Form.Item
                    label="Scale"
                    name={["scale"]}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber defaultValue={1.0}/>
                </Form.Item>
            </Form>
        </Edit>
    );
};


