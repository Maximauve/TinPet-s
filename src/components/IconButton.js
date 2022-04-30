/* eslint-disable prettier/prettier */
import React from "react";
import { TouchableOpacity } from "react-native";
import { func, string } from "prop-types";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./styles/IconButton_styles";

const colors = {
    white: "#fff",
    black: "#000",
    nope: "#E5566D",
    like: "#4CCC93",
    favorite: "#3CA3FF",
};

const IconButton = ({ onPress, name, backgroundColor, color }) => (
  <TouchableOpacity
    style={[styles.singleButton, { backgroundColor }]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Icon
      name={name}
      size={20}
      color={color}
    />
  </TouchableOpacity>
);

IconButton.propTypes = {
  onPress: func.isRequired,
  name: string.isRequired,
  color: string,
  backgroundColor: string,
};

IconButton.defaultProps = {
  color: colors.white,
  backgroundColor: colors.heartColor,
};

export default IconButton;
