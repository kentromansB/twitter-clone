import { StatusBar } from 'expo-status-bar';
import React , {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Amplify ,{ Auth , API, graphqlOperation} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import config from './aws-exports';
import{ getUser } from './graphql/queries';
import { createUser } from './graphql/mutations';
import { CreateUserInput } from './API';

Amplify.configure(config)

 function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

 const getRandomImage = () => {
    return 'https://scontent.fmnl4-1.fna.fbcdn.net/v/t1.0-9/121300027_2468643766769347_5349814497150407643_o.jpg?_nc_cat=103&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeGI1Zqt5lX7cPhk9sfWNnzwwEAUm88EM4rAQBSbzwQzim4w0AsOYvKTghWv_lV6G5d20uhEGY7PUlRDUCjwv_lf&_nc_ohc=TI483L42mQYAX_VRdWn&_nc_ht=scontent.fmnl4-1.fna&oh=c3b64820e0cc970bab9f67d61cc36779&oe=5FDBBE76'
  }

  const saveUserToDB = async (user: CreateUserInput) => {
    console.log(user);
     await API.graphql(graphqlOperation(createUser, {input: user}))
  }

  useEffect(() => {
    const updateUser = async () => {
      //Get current authenticated user  
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      // console.log(userInfo);

      if(userInfo){
        //Check if user already exits in database
        const userData = await API.graphql(graphqlOperation(getUser, { id: userInfo.attributes.sub}))
        // console.log(userData)

        if(!userData.data.getUser){
          const user= {
            id: userInfo.attributes.sub,
            username: userInfo.username,
            name: userInfo.username,
            email: userInfo.attributes.email,
            image: getRandomImage()
          }
          await saveUserToDB(user);
        }
        else{
          console.log('User already exists');
        }
      }
      
      //If not, create the user in the database
    }
     updateUser();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App);
