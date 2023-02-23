import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Edit,
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

export const ImageTrackExperienceEdit: React.FC<
    IResourceComponentsProps
> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const apiUrl = useApiUrl();

    const imageTrackExperiencesData = queryResult?.data?.data;

    const { selectProps: assetSelectProps } = useSelect({
        resource: "assets",
        defaultValue: imageTrackExperiencesData?.asset?.id,
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
        </Edit>
    );
};


