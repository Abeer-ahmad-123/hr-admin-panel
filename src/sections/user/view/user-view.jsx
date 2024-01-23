import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';

import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { PulseLoader } from 'react-spinners';
import Scrollbar from 'src/components/scrollbar';
import UserSkelton from 'src/loading/userSkelton';
import { allUsers } from 'src/redux-toolkit/actions/userActions';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';

export default function UserPage() {
  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.user);

  const Pagination = () => {
    if (page !== users?.meta?.TotalPages) {
      dispatch(allUsers(page));
      setPage((prevPage) => prevPage + 1);
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        users: [
          ...(prevDetails?.users || []),
          ...(users?.users || []).filter(
            (newUser) => !prevDetails?.users.find((prevUser) => prevUser.id === newUser.id)
          ),
        ],
      }));
    }
  };

  useEffect(() => {
    if (inView) Pagination();
    // eslint-disable-next-line
  }, [inView]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userDetails?.map((n) => n.username);
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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                rowCount={userDetails.users?.length}
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
                <TableBody>
                  {Array.from({ length: 10 }, (_, index) => (
                    <UserSkelton key={index} />
                  ))}
                </TableBody>
              ) : (
                userDetails.users &&
                userDetails.users.map((data, index) => (
                  <TableBody key={data.id}>
                    <UserTableRow
                      key={data.id}
                      name={data.username}
                      date_joined={data.date_joined}
                      email={data.email}
                      avatarURL={data.profilePictureURL}
                      selected={selected.indexOf(data.username) !== -1}
                      handleClick={(event) => handleClick(event, data.username)}
                      // ref={index === userDetails.users.length - 1 ? refElement : null}
                    />

                    <TableEmptyRows height={77} />
                  </TableBody>
                ))
              )}
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      {page === userDetails?.meta?.TotalPages ? (
        <Stack>no more Users</Stack>
      ) : (
        <Stack
          direction="row"
          justifyContent="center"
          sx={{
            marginTop: '4rem',
          }}
          ref={ref}
        >
          <PulseLoader color="#5141df" />
        </Stack>
      )}
    </Container>
  );
}
