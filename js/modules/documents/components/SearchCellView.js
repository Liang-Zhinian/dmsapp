
import React from 'react'
import { View, TouchableHighlight, StyleSheet, Image, Text } from 'react-native'
import { default as Icon } from 'react-native-vector-icons/MaterialIcons';
import getIcon from '../lib/icon';

type Props = {
  title: string,
  description: string,
  type: string,
  onPress: () => void,
  onPressInfo: () => void,
}

export default function SearchCellView(props: Props) {
  let { title, description, type, onPress, onPressInfo } = props;
  console.log(type);

  return (
    // <TouchableHighlight
    //   onPress={onPress}
    //   underlayColor='whitesmoke'
    //   testID='repoCell'
    //   accessibilityLabel='repoCell'
    // >
    //   <View style={{margin: 20}}>
    //     <CellTitleText>{title}</CellTitleText>
    //     <CellDescriptionText>{description}</CellDescriptionText>
    //     <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
    //       <Badge
    //         iconName='fiber-manual-record'
    //         iconColor={languageColor}
    //         label={language}
    //       />
    //       <Badge iconName='star' iconColor='grey' label={starCount} />
    //     </View>
    //   </View>
    // </TouchableHighlight>
    <TouchableHighlight
      onPress={onPress}
      underlayColor='#dddddd'
      testID='docuCell'
      accessibilityLabel='docuCell'
    >
      <View>
        <View style={styles.rowContainer}>
          {/* <Image style={styles.thumb} source={icon} ></Image> */}
          {getIcon(type)}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{description}</Text>
          </View>
          <TouchableHighlight
            onPress={onPressInfo}>
            <Icon name='info-outline'
              size={30} /></TouchableHighlight>
        </View>
        <View style={styles.separator} />
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  thumb: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  content: {
    fontSize: 12,
    color: 'black',
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 15,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },

});
