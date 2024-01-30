import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';

import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { useInView } from 'react-intersection-observer';
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
  const [userDetailsRef, setUserDetailsRef] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  const dispatch = useDispatch();
  const [option, setOption] = useState('');
  const { users } = useSelector((state) => state.user);

  const Pagination = () => {
    if (page !== users?.meta?.TotalPages) {
      dispatch(allUsers(page));
    }
  };
  const appendUserDetails = () => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      users: [...(prevDetails?.users || []), ...(users?.users || [])],
    }));
    setUserDetailsRef((prevDetails) => ({
      ...prevDetails,
      users: [...(prevDetails?.users || []), ...(users?.users || [])],
    }));
    setLoading(false);
  };
  useEffect(() => {
    Pagination();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prevPage) => prevPage + 1);
    }
    // eslint-disable-next-line
  }, [inView]);

  useEffect(() => {
    if (users?.users?.length) {
      appendUserDetails();
    }
    // eslint-disable-next-line
  }, [users]);

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
    const value = event.target.value.toLowerCase();
    console.log('====> value', value);
    setFilterName(value);

    if (value.trim() === '') {
      // If input value is empty, display all users
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        users: userDetailsRef.users || [], // Display all users if available
      }));
    } else {
      // Filter users based on filterName
      const filteredUsers = (userDetailsRef?.users || []).filter(
        (user) =>
          user.username.toLowerCase().includes(value) ||
          user.date_joined.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value) ||
          (user.post_count && user.post_count.toString().toLowerCase().includes(value)) || // Ensure post_count is converted to a string
          (user.comment_count && user.comment_count.toString().toLowerCase().includes(value)) // Ensure comment_count is converted to a string
      );

      // Update userDetails with filtered users
      setUserDetails((prevDetails) => ({
        users: filteredUsers,
      }));
    }
  };

  console.log('outer function state value', filterName);
  console.log('userDeatails140', userDetails);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Users</Typography>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          users={users}
          onFilterName={handleFilterByName}
          setOption={setOption}
          option={option}
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
                  { id: 'post_count', label: 'Post Count' },
                  { id: 'comment_count', label: 'Comment Count' },

                  { id: '' },
                ]}
              />

              {loading && (
                <TableBody>
                  {Array.from({ length: 10 }, (_, index) => (
                    <UserSkelton key={index} />
                  ))}
                </TableBody>
              )}
              {userDetails.users &&
                userDetails.users.map((data, index) => (
                  <TableBody key={data.id}>
                    <UserTableRow
                      key={data.id}
                      id={data.id}
                      name={data.username}
                      date_joined={data.date_joined}
                      email={data.email}
                      post_count={data.post_count}
                      comment_count={data.comment_count}
                      avatarURL={data.profilePictureURL}
                      selected={selected.indexOf(data.username) !== -1}
                      handleClick={(event) => handleClick(event, data.username)}
                    />

                    <TableEmptyRows height={77} />
                  </TableBody>
                ))}
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      {page !== users?.meta?.TotalPages && (
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
