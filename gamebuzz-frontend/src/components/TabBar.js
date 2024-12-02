import { View, Platform ,StyleSheet , LayoutChangeEvent} from 'react-native';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export function TabBar({ state, descriptors, navigation }) {

  const [dimensions, setDimensions] = useState({height : 20,width:100})

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabbarLayout = (e)=>{
    setDimensions({
      height:e.nativeEvent.layout.height,
      width:e.nativeEvent.layout.width,
    })
  }

  const tabPositonX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(()=>{
    return {
      transform:[{translateX : tabPositonX.value}]
    }
  })

  return (
    <View onLayout={onTabbarLayout} style={styles.tabbar}>
      <Animated.View
        style={[animatedStyle,{
          position:"absolute",
          backgroundColor : '#723FEB',
          borderRadius:30,
          marginHorizontal:12,
          height: dimensions.height -15,
          width: buttonWidth - 25,
        }]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositonX.value = withSpring(buttonWidth * index,{duration : 1500})
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (

          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? "#FFF" : "#222"}
            label={label}
          />
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  tabbar:{
    position : 'absolute',
    bottom : 50,
    flexDirection: 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    backgroundColor : '#fff',
    marginHorizontal : 50,
    paddingVertical:15,
    borderRadius:35,
    shadowColor:'#000',
    shadowOffset : {width : 0,height:10},
    shadowRadius : 10,
    shadowOpacity : 0.1
  },
})