import logo from '../../images/boomtown.svg';
const styles = theme => ({
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundSize: '70%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  share: {
    borderRadius: 50
  },
  link: {
    color: theme.palette.secondary.main,
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: '0.75em'
  }
});

export default styles;
