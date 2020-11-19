import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
 container:{
    flex: 1,
 },
 tweetHeaderContainer:{
     flexDirection: 'row',
     justifyContent: 'space-between',
 },
 tweetHeaderNames:{
    flexDirection: 'row',
 },
 name:{
   marginHorizontal: 5,
   fontWeight: 'bold',
 },
 username:{
    marginHorizontal: 5,
    color: 'grey' 
 },
 createdAt:{
    marginHorizontal: 5,
    color: 'grey'
 },
 content:{
     margin: 5,
     lineHeight: 18
 },
 image:{
    marginVertical: 5,
     width: "100%",
     height: 200,
     resizeMode: 'cover',
     borderRadius: 15,
     overflow: 'hidden'
 }
});

export default styles;