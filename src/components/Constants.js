export const series = [
  {
    name: 'Users',
    type: 'column',
    fill: 'solid',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
  },
  {
    name: 'Channels',
    type: 'area',
    fill: 'gradient',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
  },
  {
    name: 'Reported Data',
    type: 'line',
    fill: 'solid',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
  },
];
export const labels = [
  '01/01/2003',
  '02/01/2003',
  '03/01/2003',
  '04/01/2003',
  '05/01/2003',
  '06/01/2003',
  '07/01/2003',
  '08/01/2003',
  '09/01/2003',
  '10/01/2003',
  '11/01/2003',
];

export const TextFieldStyle = {
  borderRadius: '10px',
  backgroundColor: 'white',
  border: 'none',
};
export const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
};
export const submitButton = {
  backgroundColor: '#571CE0',
  color: 'white',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#571CE0',
    boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.2)',
  },
  '&:disabled': {
    backgroundColor: 'gray',
    color: 'white',
  },
};

export const deleteButton = {
  backgroundColor: 'red',
  color: 'white',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: 'red',
    boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.2)',
  },
  '&:disabled': {
    backgroundColor: 'gray',
    color: 'white',
  },
};
export const title = {
  border: '1px solid #571CE0',

  height: '3rem',
  borderRadius: '5px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
};
export const cardHeaderPieChart = {
  textAlign: ' center',
  mb: 5,
};
export const appViewGrid = {
  display: 'flex',
  cursor: 'pointer',
};
