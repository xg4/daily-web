import { Modal, ModalProps } from 'antd'
import React, { useState } from 'react'

interface ModalFormProps extends ModalProps {
  trigger: React.ReactElement
  children: React.ReactElement
}

export default function ModalForm(props: ModalFormProps) {
  const { trigger, onCancel, children, footer, destroyOnClose, ...restProps } =
    props
  const [visible, setVisible] = useState(false)

  const cloneTrigger = React.cloneElement(trigger, {
    onClick(...args: any[]) {
      trigger.props.onClick && trigger.props.onClick(...args)
      setVisible((bool) => !bool)
    },
  })

  const cloneChildren = React.cloneElement(children, {
    onFinish() {
      setVisible(false)
    },
  })

  return (
    <>
      {cloneTrigger}
      <Modal
        {...restProps}
        destroyOnClose={destroyOnClose ?? true}
        visible={visible}
        onCancel={(e) => {
          setVisible(false)
          onCancel && onCancel(e)
        }}
        footer={null}
      >
        {cloneChildren}
      </Modal>
    </>
  )
}
