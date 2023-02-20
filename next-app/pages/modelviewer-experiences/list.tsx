import React from "react";
import {
    IResourceComponentsProps,
    BaseRecord,
    useMany,
} from "@pankod/refine-core";
import {
    useTable,
    List,
    Table,
    Space,
    EditButton,
    ShowButton,
    DeleteButton,
} from "@pankod/refine-antd";

export const ModelviewerExperienceList: React.FC<
    IResourceComponentsProps
> = () => {
    const { tableProps } = useTable({
        syncWithLocation: true,
    });

    const { data: assetData, isLoading: assetIsLoading } = useMany({
        resource: "assets",
        ids: tableProps?.dataSource?.map((item) => item?.asset?.id) ?? [],
        queryOptions: {
            enabled: !!tableProps?.dataSource,
        },
    });

    return (
        <List>
            <Table {...tableProps} rowKey="id">
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="title" title="Title" />
                <Table.Column
                    dataIndex={["asset", "id"]}
                    title="Asset"
                    render={(value) =>
                        assetIsLoading ? (
                            <>Loading...</>
                        ) : (
                            assetData?.data?.find((item) => item.id === value)
                                ?.title
                        )
                    }
                />
                <Table.Column
                    title="XR Experience"
                    dataIndex="experience"
                    render={(_, record: BaseRecord) => (
                        <Space>
			     <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <DeleteButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};

