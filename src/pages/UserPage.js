import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import moment from 'moment/moment';
// @mui
import { Stack, Popover, MenuItem, Container, Typography } from '@mui/material';
import { Button, Spin, Tag, Table } from 'antd';
import { capitalizeString } from '../utils/formatString';
import { useUsers } from '../hooks/useUsers';
// components
import Iconify from '../components/iconify';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { formatDistanceFromNow } from '../utils/helpers';

// sections
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export default function UserPage() {
  const { data: users, isLoading: loadingUsers } = useUsers();
  const { deleteUser, isLoading } = useDeleteUser();
  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // Columns Data
  const columnsData = [
    {
      title: 'User ID',
      dataIndex: 'userIndex',
      key: 'userIndex',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Date Joined',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color="success">{status}</Tag>,
    },

    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id) => (
        <Button danger style={{ color: 'red' }} onClick={() => deleteUser(id)} disabled={isLoading}>
          Delete
        </Button>
      ),
    },
  ];

  const userData = users?.filter((user) => user?.isAdmin !== true);

  const data = userData?.map((user, index) => ({
    key: index,
    date: formatDistanceFromNow(moment(user?.created_at).format('YYYYMMDD')),
    userIndex: user?.id ?? index,
    email: user?.email,
    phone: user?.phone,
    userName: capitalizeString(user?.userName ?? 'Not Found'),
    address: user?.address,
    status: 'Active',
    id: user?.id,
  }));

  if (loadingUsers) return <Spin style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />;

  return (
    <>
      <Helmet>
        <title> User | Bookstore </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </Stack>
        <Table dataSource={data} columns={columnsData} />
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
