import React from 'react';
import {useNavigate} from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Upload,
    message,
    Card,
    Space,
    Typography
} from 'antd';
import {ArrowLeftOutlined, UploadOutlined} from '@ant-design/icons';
import classes from './ProductCreate.module.scss';
import {useProductsStore} from "../../../store/ProductStore";

const {Title} = Typography;
const {TextArea} = Input;

interface FormValues {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

const ProductCreate = () => {
    const {addNewProduct} = useProductsStore()
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: FormValues) => {
        try {
            const newProduct = {
                ...values,
                id: Date.now(),
                like: false,
                rating: {
                    rate: 0,
                    count: 0
                },
            };

            addNewProduct(newProduct);

            message.success('Product created successfully!');

            navigate('/');
        } catch (error) {
            message.error('Failed to create product');
        }
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className={classes.wrapper}>
            <Card className={classes.card}>
                <Space direction="vertical" size="middle" style={{width: '100%'}}>
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined/>}
                        onClick={() => navigate(-1)}
                        className={classes.backButton}
                    >
                        Back to products
                    </Button>

                    <Title level={3} className={classes.title}>Create New Product</Title>

                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item name="title" rules={[{required: true}, {min: 3}, {max: 100}]}>
                            <Input placeholder="Product title"/>
                        </Form.Item>

                        <Form.Item name="description" rules={[{required: true}, {min: 10}, {max: 500}]}>
                            <TextArea rows={4} showCount maxLength={500}/>
                        </Form.Item>

                        <Form.Item name="price" rules={[{required: true}, {type: 'number', min: 0.01}]}>
                            <InputNumber
                                style={{width: '100%'}}
                                formatter={value => `$ ${value}`}
                                parser={value => value!.replace(/\$\s?|(,*)/g, '')}
                            />
                        </Form.Item>

                        <Form.Item name="category" rules={[{required: true}]}>
                            <Input placeholder="Category"/>
                        </Form.Item>

                        <Form.Item
                            name="image"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{required: true}]}
                        >
                            <Upload listType="picture" beforeUpload={() => false} accept="image/*" maxCount={1}>
                                <Button icon={<UploadOutlined/>}>Upload image</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" size="large" block>
                                Create Product
                            </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Card>
        </div>
    );
};

export default ProductCreate;