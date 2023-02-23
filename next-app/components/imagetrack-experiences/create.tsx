import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Create,
    Form,
    useForm,
    Input,
    useSelect,
    Select,
    Upload,
    getValueFromEvent,
    InputNumber,
} from "@pankod/refine-antd";
import { useApiUrl } from "@pankod/refine-core";

export const ImageTrackExperienceCreate: React.FC<
    IResourceComponentsProps
> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const apiUrl = useApiUrl();

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
	        <Form.Item label="Target Image">
                    <Form.Item
                        name="targetImage"
                        valuePropName="fileList"
                        getValueFromEvent={getValueFromEvent}
                        noStyle
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Upload.Dragger
			    name="file"
			    action={`${apiUrl}/media/upload`}
                            listType="text"
			    maxCount={1}
                        >
                            <p className="ant-upload-text">
                                Drag & drop an image file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
		<Form.Item
                    label="Scale (default = 1.0)"
                    name={["scale"]}
                >
                    <InputNumber/>
                </Form.Item>
            </Form>
        </Create>
    );
};

