import PropTypes from 'prop-types';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';

const ChannalTableRow = ({ data }) => {
  // const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    // setOpen(event.currentTarget);
  };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };
  return (
    <>
      <TableRow key={data.id} hover tabIndex={-1} role="checkbox">
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={false} />
        </TableCell>

        <TableCell>{data.id}</TableCell>
        <TableCell>{data.report_type}</TableCell>
        <TableCell>{data.user_id}</TableCell>
        <TableCell>{data.post_id ?? data.comment_id}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover> */}
    </>
  );
};
ChannalTableRow.propTypes = {
  data: PropTypes.any,
};
export default ChannalTableRow;
