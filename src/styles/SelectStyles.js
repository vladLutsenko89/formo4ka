export const customSelectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#1f2937',
    borderColor: '#2D5E3D',
    borderWidth: '2px',
    '&:hover': {
      borderColor: '#2D5E3D',
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#1f2937',
    border: '2px solid #2D5E3D',
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: '250px',
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected
      ? '#2D5E3D'
      : isFocused
        ? '#2D5E3D80'
        : '#1f2937',
    color: 'white',
    '&:active': {
      backgroundColor: '#2D5E3D',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: 'white',
  }),
  input: (base) => ({
    ...base,
    color: 'white',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9ca3af',
  }),
};
