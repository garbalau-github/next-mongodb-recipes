import Nav from '../../components/Nav';

const About = () => {
  return (
    <div className='container'>
      <Nav />
      <br />
      <h2>
        &copy; 2022,{' '}
        <a
          style={{ color: 'royalblue' }}
          target='_blank'
          href='https://github.com/garbalau-github'
        >
          @garbalau-github
        </a>
      </h2>
    </div>
  );
};

export default About;
