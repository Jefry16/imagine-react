import { Col, Row, Form, Button, Input, InputNumber, Select } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";
import { useState } from "react";
import { useFetch, usePostHttp } from "../../hooks/http";
import cancelButtonStyles from "../../styles/components/cancel-button";
import inputStyle, { inputNumberStyle } from "../../styles/components/input";
import labelStyle from "../../styles/components/label";
import submitButtonStyle from "../../styles/components/submit-button";

const { Item } = Form;

export default function NewProduct(props: {
  onClose: Function;
  setRefetch: Function;
  api: NotificationInstance;
}) {
  const [formData, setFormData] = useState();
  const { mutate, isLoading } = usePostHttp(
    "consumables",
    formData,
    {},
    {
      onSuccess: () => {
        props.onClose();
        props.setRefetch();
      },
      onError: (x: any) => {
        if (x.response.status === 400 || x.response.status === 500) {
          props.api.error({ message: "Algo salio mal" });
          props.onClose();
        }
      },
    }
  );
  const { data: sizes } = useFetch("sizes", {});
  const { data: brands } = useFetch("brands", {});
  const { data: categoriesData } = useFetch("categories?name=%%", {});
  const [subCategories, setSubCategories] = useState<
    { label: string; value: string }[]
  >([]);

  const categories = categoriesData?.data.map((cat: any) => ({
    label: cat.name,
    value: cat.id,
    subCategories: cat.subCategories,
  }));

  const formatSubCategories = (id: number) => {
    const category = categories.find((c: any) => c.value == id);
    const subCategories = category.subCategories.map((sub: any) => ({
      label: sub,
      value: sub,
    }));
    setSubCategories(subCategories);
  };
  return (
    <Form
      onFinish={async () => {
        mutate();
      }}
    >
      <Row>
        <Col span={24}>
          <Item
            label={<label style={labelStyle}>Nombre</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Añada un nombre" }]}
          >
            <Input
              style={inputStyle}
              onChange={({ target }) =>
                setFormData((prev: any) => ({ ...prev, name: target.value }))
              }
            />
          </Item>
          <Item
            label={<label style={labelStyle}>Precio</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            // rules={[
            //   { required: true, message: "Añada un precio" },
            //   {
            //     async validator(_, value) {
            //       if (value < 0) return Promise.reject();
            //     },
            //     message: "El precio no puede ser menor que cero",
            //   },
            // ]}
          >
            <InputNumber
              onChange={(value) =>
                setFormData((prev: any) => ({ ...prev, price: value }))
              }
              style={{ ...inputNumberStyle }}
            />
          </Item>
          <Item
            label={<label style={labelStyle}>Tamaño</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Añada un tamaño" }]}
          >
            <Select
              onChange={(value) =>
                setFormData((prev: any) => ({ ...prev, sizeId: value }))
              }
              options={sizes?.data.map((size: any) => ({
                label: size.name,
                value: size.id,
              }))}
              style={{ ...inputNumberStyle }}
            />
          </Item>

          <Item
            label={<label style={labelStyle}>Marcas</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Añada una marca" }]}
          >
            <Select
              onChange={(value) =>
                setFormData((prev: any) => ({ ...prev, brandId: value }))
              }
              options={brands?.data.map((size: any) => ({
                label: size.name,
                value: size.id,
              }))}
              style={{ ...inputNumberStyle }}
            />
          </Item>
          <Item
            label={<label style={labelStyle}>Categoría</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Añada una categoría" }]}
          >
            <Select
              onChange={(id) => {
                formatSubCategories(id);
                setFormData((prev: any) => ({ ...prev, categoryId: id }));
              }}
              options={categories}
              style={{ ...inputNumberStyle }}
            />
          </Item>

          <Item
            label={<label style={labelStyle}>Sub-categoría</label>}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Añada una sub-categoría" }]}
          >
            <Select
              onChange={(id) =>
                setFormData((prev: any) => ({ ...prev, subCategory: id }))
              }
              options={subCategories}
              style={{ ...inputNumberStyle }}
            />
          </Item>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}
          >
            <Button
              style={cancelButtonStyles}
              children="Cancelar"
              onClick={() => props.onClose()}
              htmlType="button"
            />
            <Button
              loading={isLoading}
              style={submitButtonStyle}
              type="primary"
              children="Guardar"
              htmlType="submit"
            />
          </div>
        </Col>
      </Row>
    </Form>
  );
}
