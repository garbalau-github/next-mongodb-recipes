import Nav from '../../components/Nav';

const About = () => {
  return (
    <div className='container'>
      <Nav currentPage={'About'} />
      <h1>
        &copy; 2022,{' '}
        <a target='_blank' href='https://github.com/garbalau-github'>
          @garbalau-github
        </a>
      </h1>
      <p>Technologies: React, TypeScript, Next, MongoDB</p>
    </div>
  );
};

export default About;
