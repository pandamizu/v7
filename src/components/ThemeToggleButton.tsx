import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 font-semibold text-white bg-primary-500 rounded-md hover:bg-primary-600 dark:bg-secondary-500 dark:hover:bg-secondary-600"
    >
      {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    </button>
  );
}
