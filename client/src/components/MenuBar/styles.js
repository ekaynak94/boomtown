import logo from '../../images/boomtown.svg';
const styles = theme => ({
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundSize: '70%',
    backgroundRepeat:'no-repeat',
    backgroundPosition:'center'
  },
  addMore: {
    borderRadius: 50,
  }
      
});

export default styles;