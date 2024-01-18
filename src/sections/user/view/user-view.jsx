import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import UserData from 'src/httpRequests';
// import { users } from 'src/_mock/user';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import UserSkelton from 'src/loading/userSkelton';
import { useTheme } from '@mui/material/styles';
// import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { allUsers } from 'src/redux-toolkit/actions/userActions';

// import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [userData, setUserData] = useState(null);
  const theme = useTheme();

  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(allUsers());
  }, [dispatch]);
  // useEffect(() => {
  //   UserData()
  //     .then((data) => setUserData(data.data.users))
  //     .catch((error) => {
  //       console.error('Error in AnotherComponent:', error);
  //     });
  // }, []);

  // console.log('++++++>>>>>>>', userData?.length);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users?.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  console.log('>>>>>++++', selected);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  // const dataFiltered = applyFilter({
  //   inputData: userData,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  // console.log('the user data for the user  is ', userData);

  console.log(loading ? 'loading-true' : 'loading-false');

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>

        <Button
          sx={{
            boxShadow: theme.shadows[20],
          }}
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          {/* {loading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <UserSkelton key={index} />
              ))}
            </div>
          ) : ( */}

          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                // order={order}
                // orderBy={orderBy}
                rowCount={users.users?.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'dateofjoining', label: 'Joining Date' },
                  { id: 'email', label: 'E-mail' },

                  { id: '' },
                ]}
              />

              {loading ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {Array.from({ length: 10 }, (_, index) => (
                    <UserSkelton key={index} />
                  ))}
                </div>
              ) : (
                users.users &&
                users.users.map((data) => (
                  <TableBody key={data.id}>
                    <UserTableRow
                      key={data.id}
                      name={data.username}
                      date_joined={data.date_joined}
                      email={data.email}
                      avatarURL={data.profilePictureURL}
                      selected={selected.indexOf(data.username) !== -1}
                      handleClick={(event) => handleClick(event, data.username)}
                    />
                    {/* ))} */}

                    <TableEmptyRows
                      height={77}
                      // emptyRows={emptyRows(page, rowsPerPage, userData?.length)}
                    />

                    {/* {notFound && <TableNoData query={filterName} />} */}
                  </TableBody>
                ))
              )}
            </Table>
          </TableContainer>
          {/* )} */}
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
