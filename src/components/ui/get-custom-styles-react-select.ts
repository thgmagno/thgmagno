import { StylesConfig } from 'react-select'

interface TechnologyOption {
  value: number
  label: string
}

export const getCustomStylesReactSelect = (
  isDarkMode: boolean,
): StylesConfig<TechnologyOption, true> => ({
  control: (base, state) => ({
    ...base,
    backgroundColor: isDarkMode ? '#27272A' : '#fff',
    borderColor: isDarkMode ? '#52525B' : '#ddd',
    boxShadow: state.isFocused ? 'none' : 'none',
    '&:hover': {
      borderColor: isDarkMode ? '#52525B' : '#ddd',
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? isDarkMode
        ? '#121212'
        : '#d4d4d4'
      : state.isFocused
        ? isDarkMode
          ? '#374151'
          : '#e2e2e2'
        : isDarkMode
          ? '#2d2d2d'
          : '#ffffff',
    color: state.isSelected ? 'white' : 'inherit',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: isDarkMode ? '#121212' : '#d4d4d4',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: isDarkMode ? 'white' : 'black',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: isDarkMode ? 'white' : 'black',
    ':hover': {
      backgroundColor: isDarkMode ? '#4e4e4e' : '#a1a1a1',
      color: 'white',
    },
  }),
})
