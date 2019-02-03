import { connect } from 'react-redux';
import Profile from './Profile';
import { setUsername } from '../../redux/Profile/actions';

const mapDispatchToProps = { setUsername };

export default connect(
  null,
  mapDispatchToProps
)(Profile);
