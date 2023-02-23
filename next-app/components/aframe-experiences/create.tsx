import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Create,
    Form,
    useForm,
    Input,
    useSelect,
    Select,
} from "@pankod/refine-antd";

export const AframeExperienceCreate: React.FC<
    IResourceComponentsProps
> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const { selectProps: assetSelectProps } = useSelect({
        resource: "assets",
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
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
            </Form>
        </Create>
    );
};

