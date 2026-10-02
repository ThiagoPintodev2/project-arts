import { Button, Modal, Form, Input, DatePicker, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

function ArtModal({
  title,
  open,
  onOk,
  onCancel,
  cancelButtonProps,
  okButtonProps,
  confirmLoading,
  disabled,
  onFinish,
  onFinishFailed,
  form,
  normFile,
  mode = ''
}) {

  return (
    <div>
      <Modal
        title={title}
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        cancelButtonProps={{
          cancelButtonProps,
          disabled: cancelButtonProps,
        }}
        okButtonProps={{ disabled: okButtonProps }}
        confirmLoading={confirmLoading}
        disabled={disabled}
      >
        <Form
          className='container-form-modal'
          form={form}
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Título:"
            name="title"
            rules={[{ required: true, message: 'Por favor, inserir um título.' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Data de Criação:"
            name="date"
            rules={[{ required: true, message: 'Por favor, inserir uma data.' }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>

          <Form.Item
            label="Descrição:"
            name="description"
            rules={[{ required: true, message: 'Por favor, inserir uma descrição.' }]}
          >
            <TextArea style={{ resize: 'none' }} rows={4} />
          </Form.Item>

          {
            mode === 'create' &&
            <Form.Item
              name="image_url"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: true, message: 'Por favor, selecionar uma obra.' }]}
            >
              <Upload
                name="image"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Selecionar Obra</Button>
              </Upload>
            </Form.Item>
          }

        </Form>
      </Modal>
    </div>
  )
}
export default ArtModal;