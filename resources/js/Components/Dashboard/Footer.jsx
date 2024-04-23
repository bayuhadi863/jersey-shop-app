import { Container, Group } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
// import classes from '../../../css/footer.css';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <a
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </a>
  ));

  return (
    <div className='ms-52 border-t-gray-300 border-t bg-white'>
      <Container className='flex items-center justify-between py-4'>
        <MantineLogo size={28} />
        <Group>{items}</Group>
      </Container>
    </div>
  );
}