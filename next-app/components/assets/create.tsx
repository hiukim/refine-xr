import React from "react";
import { IResourceComponentsProps } from "@pankod/refine-core";
import {
    Create,
    Form,
    useForm,
    Input,
    useSelect,
    Select,
    DatePicker,
    Upload,
    getValueFromEvent,
} from "@pankod/refine-antd";
import { useApiUrl } from "@pankod/refine-core";
import dayjs from "dayjs";

export const AssetCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm();

    const apiUrl = useApiUrl();

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
	        <Form.Item label="3D model">
                    <Form.Item
                        name="model"
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
                            //multiple
                            //beforeUpload={() => false}
                        >
                            <p className="ant-upload-text">
                                Drag & drop a .glb file in this area
                            </p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
	    </Form>
        </Create>
    );
};

export default {
};

