import { Icon, Input, Item, View } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import commonColor from "../../../native-base-theme/variables/commonColor";

const Search = (props)=>{
  return(
    <View style={styles.searchContainer} >
      <Icon name="search" style={styles.icon} />
      <Input style={styles.input} {...props}
      />
      {/* <Icon name="close" style={styles.icon}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer:{
    // borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 26,
    // marginTop: 12,
    height: 40,
    flexDirection: 'row',
    width:'70%',
    // justifyContent:'space-around',
    alignItems: 'center',
    alignContent: 'space-around',
    backgroundColor:commonColor.inputBackground,
  },
  icon:{
    marginHorizontal:10,
    color:commonColor.inverseTextColor,
    fontSize:22,
  }
})

export default Search;
