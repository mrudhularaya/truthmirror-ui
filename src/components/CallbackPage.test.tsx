// import { render, screen } from '@testing-library/react';
// import CallbackPage from './CallbackPage';
// import { render, screen } from '@testing-library/react';
// import NavBar from './NavBar';

// // CallbackPage.test.tsx

// describe('CallbackPage', () => {
//     it('renders loading message', () => {
//         render(<CallbackPage />);
//         expect(screen.getByText('Loading...')).toBeInTheDocument();
//     });

//     it('renders page layout content', () => {
//         render(<CallbackPage />);
//         expect(screen.getByClass('page-layout__content')).toBeInTheDocument();
//     });
// });

// // NavBar.test.tsx

// describe('NavBar', () => {
//     it('renders navigation links', () => {
//         render(<NavBar />);
//         const links = screen.getAllByRole('link');
//         expect(links.length).toBeGreaterThan(0);
//     });

//     it('renders logo', () => {
//         render(<NavBar />);
//         expect(screen.getByAltText('Logo')).toBeInTheDocument();
//     });

//     it('renders a menu button for mobile view', () => {
//         render(<NavBar />);
//         expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
//     });
// });