import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal, Spin, Table, Tag } from 'antd';
import { TextField } from '@mui/material';
import { Img } from '@chakra-ui/react';
import { useDelete } from './useDelete';
import { useBooks } from './useBooks';
import { capitalizeString } from '../../utils/formatString';
import { dollarUSLocale } from '../../utils/formatMoney';
import { useEditOrder } from '../../hooks/useEditOrder';

function OrdersTable() {
  const { editingOrder, isLoading: editingError } = useEditOrder();
  const { data: deleteOrder } = useDelete();
  const [editOrder, setEditOrder] = useState(null);
  const { books, isLoading } = useBooks();

  const { reset, register, handleSubmit } = useForm();

  const newEditOrder = editOrder;
  const orderId = newEditOrder?.id;

  // Columns Data
  const columnsData = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <div
          style={{
            height: '3rem',
            width: '3rem',
            backgroundImage: `${image}`,
            borderRadius: '4px',
            backgroundSize: 'cover',
          }}
        >
          <Img src={image} height={'100%'} />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: 'Copies',
      dataIndex: 'copies',
      key: 'copies',
      render: (copies) =>
        copies > 0 ? (
          <Tag color="processing" style={{ textTransform: 'capitalize' }}>
            {copies} copies
          </Tag>
        ) : (
          <Tag color="error" style={{ textTransform: 'capitalize' }}>
            Out of stock
          </Tag>
        ),
    },
    {
      title: 'Created By',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },

    {
      title: 'Edit',
      dataIndex: 'editId',
      key: 'editId',
      render: (data) => <Button onClick={() => setEditOrder(data)}>Edit</Button>,
    },
    {
      title: 'Action',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (id) => (
        <Button danger style={{ color: 'red' }} onClick={() => deleteOrder(id)}>
          {isLoading ? 'Deleting' : 'Delete'}
        </Button>
      ),
    },
  ];

  const data = books?.map((order, index) => ({
    key: index,
    image: order?.image,
    title: order?.title,
    publisher: order?.publisher,
    amount: order?.amount === null ? '--' : `KES ${dollarUSLocale.format(order?.amount)}`,
    copies: order?.copies,
    editId: order,
    createdAt: order.created_at,
    userName: capitalizeString(order?.Users?.userName ?? 'Not Found'),
    userPhoneNumber: order?.Users?.phone ?? '--',
    orderId: order?.id,
  }));

  function handleCancel() {
    setEditOrder(() => {});
    reset();
  }

  function onSubmit(data) {
    const newBook = {
      title: data.title === '' ? newEditOrder?.title : data.title,
      description: data.description === '' ? newEditOrder?.description : data.description,
      author: data.author === '' ? newEditOrder?.author : data.author,
      publisher: data.publisher === '' ? newEditOrder?.publisher : data.publisher,
      isbn: data.isbn === '' ? newEditOrder?.isbn : data.isbn,
      copies: data.copies === '' ? newEditOrder?.copies : Number(data.copies),
    };

    editingOrder(
      { newBook, orderId },
      {
        onSettled: () => {
          reset();
          setEditOrder(null);
        },
      }
    );
  }

  if (isLoading)
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin />
      </div>
    );

  return (
    <>
      <Table dataSource={data} columns={columnsData} />
      <Modal
        title="Edit Book"
        open={editOrder?.id}
        onOk={handleSubmit(onSubmit)}
        onCancel={() => handleCancel()}
        mask={false}
        okText={editingError ? <Spin /> : 'Edit'}
      >
        <form style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
          <TextField id="outlined-basic" label={`Title`} variant="outlined" fullWidth {...register('title')} />

          <div style={{ marginBottom: '1rem' }}> </div>

          <div>
            <h5 style={{ marginBottom: '0.4rem' }}>Description</h5>
            <textarea
              style={{
                width: '100%',
                border: '1px solid black',
                borderRadius: '4px',
                minHeight: '4rem',
              }}
              {...register('description')}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}> </div>

          <TextField {...register('isbn')} id="outlined-basic" label="ISBN" variant="outlined" fullWidth />

          <div style={{ marginBottom: '1rem' }}> </div>

          <TextField {...register('author')} id="outlined-basic" label="author" variant="outlined" fullWidth />

          <div style={{ marginBottom: '1rem' }}> </div>

          <TextField {...register('publisher')} id="outlined-basic" label="Publisher" variant="outlined" fullWidth />

          <div style={{ marginBottom: '1rem' }}> </div>

          <TextField {...register('copies')} id="outlined-basic" label="Copies" variant="outlined" fullWidth />

          <div style={{ marginBottom: '1rem' }}> </div>
        </form>
      </Modal>
    </>
  );
}

export default OrdersTable;
