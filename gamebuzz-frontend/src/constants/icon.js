import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const icon = {
    home : (props) =><Feather name="home" size={24}  {...props} />,
    profile: (props) =><Feather name="user" size={24}  {...props} />,
    feed : (props) =><MaterialIcons name="feed" size={24} {...props} />,
  }