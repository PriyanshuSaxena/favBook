import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {G, Path} from 'react-native-svg';

const SearchIcon = ({isFocused}:{isFocused?:boolean}) => {
  return (
    <View>
    <Svg
      width="25px"
      height="25px"
      viewBox="-2 -2 34 34"
    >
      <Path
        d="M289.688 1171.25l-8.259-8.13c2.162-2.35 3.491-5.45 3.491-8.87 0-7.32-6.026-13.25-13.46-13.25-7.434 0-13.46 5.93-13.46 13.25 0 7.31 6.026 13.24 13.46 13.24a13.52 13.52 0 008.472-2.96l8.292 8.16c.405.4 1.06.4 1.464 0 .405-.39.405-1.04 0-1.44"
        transform="translate(-258 -1141)"
        fill={!isFocused ? '#aaa':'#2088F388'}
        stroke={!isFocused ? '#666':'#2088F3'}
        strokeWidth={2}
        fillRule="evenodd"
      />
    </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchIcon;
