import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const icons = {
  play: (props) => <FontAwesome name="play" {...props} />,
  bookmark: (props) => <FontAwesome name="bookmark" {...props} />,
  home: (props) => <Ionicons name="home-outline" {...props} />,
  plus: (props) => <Ionicons name="add-circle-outline" {...props} />,
  profile: (props) => <Ionicons name="person-outline" {...props} />,
  leftArrow: (props) => <Ionicons name="arrow-back" {...props} />,
  menu: (props) => <Ionicons name="menu" {...props} />,
  search: (props) => <Ionicons name="search" {...props} />,
  upload: (props) => <MaterialIcons name="file-upload" {...props} />,
  rightArrow: (props) => <Ionicons name="arrow-forward" {...props} />,
  logout: (props) => <MaterialIcons name="logout" {...props} />,
  eyeHide: (props) => <Ionicons name="eye-off-outline" {...props} />,
  eye: (props) => <Ionicons name="eye-outline" {...props} />,
  dumbbell: (props) => <FontAwesome name="dumbbell" {...props} />, 
  calendar: (props) => <FontAwesome name="calendar" {...props} />,
};

export default icons;
