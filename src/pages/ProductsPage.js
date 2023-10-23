/* eslint-disable no-var */
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Container, Stack, TextField, Typography } from '@mui/material';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';
import { Modal, Radio, Divider } from 'antd';
import { ProductFilterSidebar } from '../sections/@dashboard/products';
import OrdersTable from '../layouts/orders/OrdersTable';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { useAppState } from '../context/userContext';

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.3rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    font-size: 1.3rem;
    /* padding: 0.4rem 0.6rem; */
    margin-right: 1.2rem;
    border-radius: 4px;
    border: none;
    color: whitesmoke;
    background-color: #323232;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: #272626;
    }
  }
`;

export default function ProductsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPay, setShowPay] = useState(true);
  const [value, setValue] = useState(1);
  const { isLoading: isCreatingBook, creteOrderReq } = useCreateOrder();
  const { user } = useAppState();

  const { register, formState, handleSubmit, reset } = useForm();

  const { errors } = formState;

  console.log(errors);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (e) => {
    setValue(e.target.value);
    setShowPay(e.target.value === 1);
  };

  function onSubmit(data) {
    const newBook = {
      title: data.title,
      description: data.description,
      author: data.author,
      publisher: data.publisher,
      amount: data.amount,
      copies: data.copies,
      isbn: data.isbn,
      image: data?.image[0],
      User: user?.id,
      paid: data?.amount !== undefined || data?.amount !== '',
    };
    creteOrderReq(newBook, {
      onSettled: () => {
        reset();
        setIsModalOpen(false);
      },
    });
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Bookstore </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Books
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar handleToggle={showModal} />
          </Stack>
        </Stack>
        <OrdersTable />
        <Modal
          title="Create a Book"
          open={isModalOpen}
          onOk={handleSubmit(onSubmit)}
          onCancel={() => handleCancel()}
          mask={false}
          okText={isCreatingBook ? <Spinner color="white" height={'1rem'} width={'1rem'} /> : 'Create'}
        >
          <form
            style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="outlined-basic"
              label={`Title`}
              variant="outlined"
              fullWidth
              {...register('title', { required: 'This field is required' })}
            />

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
                {...register('description', { required: 'This field is required' })}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}> </div>

            <TextField
              {...register('isbn', { required: 'This field is required' })}
              id="outlined-basic"
              label="ISBN"
              variant="outlined"
              fullWidth
            />

            <div style={{ marginBottom: '1rem' }}> </div>

            <TextField
              {...register('isbn', { required: 'This field is required' })}
              id="outlined-basic"
              label="author"
              variant="outlined"
              fullWidth
            />

            <div style={{ marginBottom: '1rem' }}> </div>

            <TextField
              {...register('publisher', { required: 'This field is required' })}
              id="outlined-basic"
              label="Publisher"
              variant="outlined"
              fullWidth
            />

            <div style={{ marginBottom: '1rem' }}> </div>

            <TextField
              {...register('copies', { required: 'This field is required' })}
              id="outlined-basic"
              label="Copies"
              variant="outlined"
              fullWidth
            />
            <Divider />
            <div>
              <h5 style={{}}>Pricing</h5>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Paid</Radio>
                <Radio value={2}>Free</Radio>
              </Radio.Group>
            </div>

            {showPay && (
              <TextField
                {...register('amount')}
                margin="dense"
                id="amount"
                label="Amount(KES)"
                type="number"
                fullWidth
                variant="outlined"
                style={{ marginTop: '1rem' }}
              />
            )}

            <div style={{ marginTop: '1rem' }}>
              <FileInput id="image" accept="*" {...register('image', { required: 'This field is required' })} />
            </div>
          </form>
        </Modal>
      </Container>
    </>
  );
}
