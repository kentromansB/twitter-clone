import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import {API, Auth, graphqlOperation} from 'aws-amplify';
import{createTweet} from '../graphql/mutations';

import {AntDesign} from '@expo/vector-icons';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import Feed from '../components/Feed';
// import tweets from '../data/tweets';
import NewTweetButton from "../components/NewTweetButton";
import Colors from '../constants/Colors';
import ProfilePicture from '../components/ProfilePicture';
import { useNavigation } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NewTweetScreen() {

    const [tweet, setTweet] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const navigation = useNavigation();

    const onPostTweet = async () => {
        try {

          const currentUser = await Auth.currentAuthenticatedUser({bypassCache: true});

          const newTweet = {
            content: tweet,
            image: imageUrl,
            userID: currentUser.attributes.sub
          }
          await API.graphql(graphqlOperation(createTweet ,{input: newTweet}))
          navigation.goBack();
        } catch (e) {
          console.log(e);
        }
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="close" size={30} color={Colors.light.tint} />
        </TouchableOpacity>
          
          <TouchableOpacity style={styles.button} onPress={onPostTweet}>
            <Text style={styles.buttonText}> Tweet </Text>
          </TouchableOpacity>
      </View>
      <View style={styles.newTweetContainer}>
          <ProfilePicture size={60} image={'https://scontent.fmnl6-1.fna.fbcdn.net/v/t1.0-9/121300027_2468643766769347_5349814497150407643_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGI1Zqt5lX7cPhk9sfWNnzwwEAUm88EM4rAQBSbzwQzim4w0AsOYvKTghWv_lV6G5d20uhEGY7PUlRDUCjwv_lf&_nc_ohc=yw5z1JNre9AAX-j5unJ&_nc_ht=scontent.fmnl6-1.fna&oh=54edf137e9a1b74f077ad48c50525716&oe=5FD7C9F6'} />
         <View style={styles.inputContainer}>
          <TextInput 
          value={tweet} 
          onChangeText = {(value) => setTweet(value)}
          multiline={true} 
          numberOfLines={3} 
          style={styles.tweetInput} 
          placeholder={"What's happening?"}/>
          <TextInput 
          value={imageUrl}
          onChangeText={(value) => setImageUrl(value)}
          numberOfLines={3} 
          style={styles.imageInput} 
          placeholder={"Image url (optional)"}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingTop: 30,
    backgroundColor: 'white',
    
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 20
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  newTweetContainer: {
    flexDirection: 'row',
    maxHeight: 300,
    marginLeft: 15
  },
  inputContainer:{
    marginLeft: 10,
  },
  tweetInput:{
    fontSize: 20
  },
  imageInput: {

  }
});
