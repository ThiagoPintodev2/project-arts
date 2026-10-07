import { useEffect } from 'react';

import { Button, Modal, Form, Input, DatePicker, Upload } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;

function ArtModal({
  title,
  open,
  onOk,
  cancelButtonProps,
  okButtonProps,
  confirmLoading,
  disabled,
  onFinish,
  onFinishFailed,
  onCancel,
  form,
  normFile,
  work,
  mode = ''
}) {

  useEffect(() => {
    if (!open || !work) return;
  
    if (mode === 'edit-gallery') {
      form.setFieldsValue({
        title: work.title,
        description: work.description,
        date: dayjs(work.date),
      });
    } else if (mode === 'edit-biography') {
      const item = Array.isArray(work) ? work[0] : work;
      if (!item) return;
  
      form.setFieldsValue({
        title: item.name,
        description: item.biography,
      });
    }
  }, [open, work, mode, form]);

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
            rules={[{ required: !mode === 'edit-biography' ? true : false, message: 'Por favor, inserir um título.' },
            ...(mode === 'edit-biography'
              ? [{
                max: 50,
                message: 'O título deve ter o máximo de 50 caracteres.',
              }]
              : [])]}
          >
            <Input maxLength={50} showCount />
          </Form.Item>

          {
            (mode === 'create' || mode === 'edit-gallery') &&
            <Form.Item
              label="Data de Criação:"
              name="date"
              rules={[{ required: true, message: 'Por favor, inserir uma data.' }]}
            >
              <DatePicker format="DD/MM/YYYY" />
            </Form.Item>
          }

          <Form.Item
            label="Descrição:"
            name="description"
            rules={[
              { required: true, message: 'Por favor, inserir uma descrição.' },
              ...(mode === 'edit-biography'
                ? [{
                  min: 20,
                  max: 1200,
                  message: 'A biografia deve ter entre 500 e 1200 caracteres.',
                }]
                : []),
            ]}
          >
            <TextArea maxLength={1200} minLength={500} showCount style={{ resize: 'none' }} rows={4} />
          </Form.Item>

          {
            (mode === 'create' || mode === 'edit-biography') &&
            <Form.Item
              name="image_url"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[{ required: !mode === 'edit-biography' ? true : false, message: 'Por favor, selecionar uma obra.' }]}
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
    </div >
  )
}
export default ArtModal;