import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Popover from '@mui/material/Popover';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, deleteComment } from 'src/redux-toolkit/actions/reportsAction';
import { useAuth } from 'src/hooks/interceptors';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import DeleteModal from './DeleteModal';

const ReportTableRow = ({ data }) => {
  const [open, setOpen] = useState(null);
  const [delData, setDelData] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [totalReports, setTotalReports] = useState([]);
  const authToken = useSelector((state) => state?.auth?.accessToken);
  // const { reportedPostComment } = useSelector((state) => state?.reports);

  const { setupApiInterceptor } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const openDeleteModal = () => {
    setClicked(!clicked);

    handleCloseMenu();
  };

  useEffect(() => {
    setTotalReports(data);
    // eslint-disable-next-line
  }, [data]);

  const handleClick = () => {
    try {
      navigate(`/reports/${data.postId ? 'post' : 'comment'}/${data.postId || data.commentId}`); // Navigate to channel detail page with channel ID
    } catch (error) {
      // showErrorAlert(error);
    }
  };

  useEffect(() => {
    if (delData === true && data?.postId) {
      /// diapatch delte action here

      dispatch(deletePost({ authToken, setupApiInterceptor, postId: data?.postId }));
    }
    // eslint-disable-next-line
  }, [delData, data?.postId]);

  useEffect(() => {
    if (delData === true && data?.commentId) {
      dispatch(deleteComment({ authToken, setupApiInterceptor, commentId: data?.commentId }));
    }
    // eslint-disable-next-line
  }, [clicked, data?.commentId]);

  return (
    <>
      <TableRow key={totalReports?.id} hover tabIndex={-1} role="checkbox">
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={false} />
        </TableCell>

        <TableCell>{totalReports?.id}</TableCell>
        <TableCell>{totalReports?.reportType}</TableCell>
        <TableCell>{totalReports?.userId}</TableCell>
        <TableCell>{totalReports?.postId ?? totalReports?.commentId}</TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem id={data.postId || data.commentId} onClick={handleClick}>
          <Iconify icon="eva:eye-outline" sx={{ mr: 2 }} /> {/* Use the "View" icon */}
          View
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={openDeleteModal}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <DeleteModal
        clicked={clicked}
        setClicked={setClicked}
        delData={delData}
        setDelData={setDelData}
      />
    </>
  );
};
ReportTableRow.propTypes = {
  data: PropTypes.any,
};
export default ReportTableRow;
