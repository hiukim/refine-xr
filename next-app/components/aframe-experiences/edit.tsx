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

export const AframeExperienceEdit: React.FC<
    IResourceComponentsProps
> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const aframeExperiencesData = queryResult?.data?.data;

    const { selectProps: assetSelectProps } = useSelect({
        resource: "assets",
        defaultValue: aframeExperiencesData?.asset?.id,
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
                    label="Scale (default = 1.0)"
                    name={["scale"]}
                >
                    <InputNumber/>
                </Form.Item>
		<Form.Item
                    label="Sky Color (default = #FFFFFF)"
                    name={["skyColor"]}
		>
                    <Input/>
		</Form.Item>
            </Form>
        </Edit>
    );
};


