import 'react-native-gesture-handler';

import * as React from 'react';
import { colors, Icon } from 'react-native-elements';

import { Button, View, Text, TouchableOpacity, Image } from 'react-native';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';

const MyTheme = {
  colors: {
    // primary: '#478481',
    background: '#FFFFFF',
    card: '#478481',
    text: '#FFFFFF',
    border: 'rgb(199, 199, 204)',
  },
};
import Home from './pages/Home';
import Farmacias from './pages/Farmacias';
import Contatos from './pages/Contatos';
import Estabelecimentos from './pages/Estabelecimentos';
import Estabelecimento from './pages/Estabelecimento';
import Enderecos from './pages/Enderecos';

global.BASE_URL = 'http://192.168.0.102:8095/app/';
global.AUTHORIZATION = '4484143ee88b64dba8d0e6a39b818c90D';
global.TIPO_CONTATO =  ((tipo) => {
  return tipo == 0 ? 'Link' : tipo == 1 ? 'Email' : tipo == 2 ? 'Celular' : '';

});


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {

  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}

function homeScreenStack({ navigation }) {
  const { colors } = useTheme();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Lucti', //Set Header Title
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
          headerStyle: {
            backgroundColor: colors.card, //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
      <Stack.Screen //adicionar na stack dessa pagina pra conseguir
        name="Estabelecimentos"
        component={Estabelecimentos}
        options={{
          title: 'Estabelecimentos', //Set Header Title

        }} />
      <Stack.Screen //adicionar na stack dessa pagina pra conseguir
        name="Estabelecimento"
        component={Estabelecimento}
        options={{
          title: 'Estabelecimento', //Set Header Title
        }} />
      <Stack.Screen //adicionar na stack dessa pagina pra conseguir
        name="Enderecos"
        component={Enderecos}
        options={{
          title: 'Enderecos', //Set Header Title
        }} />
      <Stack.Screen //adicionar na stack dessa pagina pra conseguir
        name="Contatos"
        component={Contatos}
        options={{
          title: 'Contatos', //Set Header Title
        }} />
    </Stack.Navigator>
  );
}

function farmaciaScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Farmacias"
      screenOptions={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
          backgroundColor: '#478481', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        }
      }}>
      <Stack.Screen
        name="Farmacias"
        component={Farmacias}
        options={{
          title: 'Home', //Set Header Title

        }} />
    </Stack.Navigator>
  );
}

function App() {
  return (

    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
          backgroundColor: '#478481',
          labelStyle: {
            fontFamily: 'Serif',
            color: 'white',
          },

        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: 'Home',
            drawerIcon: () => (
              <Icon
                name='home'
                type='font-awesome-5'
                size={20}
                color='#478481'
                containerStyle={{ backgroundColor: '#E5F2ED', padding: 5, borderRadius: 5 }}
              />
            )
          }}
          component={homeScreenStack} />
        <Drawer.Screen
          name="TrocarCidade"
          options={{
            drawerLabel: 'Trocar cidade',
            drawerIcon: () => (
              <Icon
                name='exchange-alt'
                type='font-awesome-5'
                size={20}
                color='#478481'
                containerStyle={{ backgroundColor: '#E5F2ED', padding: 5, borderRadius: 5 }}
              />
            )
          }}
          component={farmaciaScreenStack} />
        <Drawer.Screen
          name="Farmacias"
          options={{
            drawerLabel: 'Farmácias de plantão',
            drawerIcon: () => (
              <Icon
                name='pills'
                type='font-awesome-5'
                size={20}
                color='#478481'
                containerStyle={{ backgroundColor: '#E5F2ED', padding: 5, borderRadius: 5 }}
              />
            )
          }}
          component={farmaciaScreenStack} />
        <Drawer.Screen
          name="FaleConosco"
          options={{
            drawerLabel: 'Fale Conosco',
            drawerIcon: () => (
              <Icon
                name='headset'
                type='font-awesome-5'
                size={20}
                color='#478481'
                containerStyle={{ backgroundColor: '#E5F2ED', padding: 5, borderRadius: 5 }}
              />
            )
          }}
          component={farmaciaScreenStack} />
        <Drawer.Screen
          name="AvaliarApp"
          options={{
            drawerLabel: 'Avaliar App',
            drawerIcon: () => (
              <Icon
                name='star'
                type='font-awesome-5'
                size={20}
                color='#478481'
                containerStyle={{ backgroundColor: '#E5F2ED', padding: 5, borderRadius: 5 }}
              />
            )
          }}
          component={farmaciaScreenStack} />
        <Drawer.Screen
          name="RecomendarApp"
          options={{
            drawerLabel: 'Recomendar App',
            drawerIcon: () => (
              <Icon
                name='share'
                type='font-awesome-5'
                size={20}
                color='#478481'
                containerStyle={{ backgroundColor: '#E5F2ED', padding: 5, borderRadius: 5 }}
              />
            )
          }}
          component={farmaciaScreenStack} />
        <Drawer.Screen
          name="TermosDeUso"
          options={{
            drawerLabel: 'Termos de Uso',
            drawerIcon: () => (
              <Icon
                name='scroll'
                type='font-awesome-5'
                size={20}
                color='#478481'
                containerStyle={{ backgroundColor: '#E5F2ED', padding: 5, borderRadius: 5 }}
              />
            )
          }}
          component={farmaciaScreenStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// const RowMenu = (props) => {
//   return (
//     <Drawer.Screen
//       name={props.name}
//       options={{
//         drawerLabel: 'test',
//         drawerIcon: () => (
//           <Icon
//             name={props.icon}
//             type='font-awesome-5'
//             size={20}
//             color='#478481'
//             containerStyle={{ backgroundColor: '#E5F2ED', padding: 5, borderRadius: 5 }}
//           />
//         )
//       }}
//       component={farmaciaScreenStack} />
//   );
// }


export default App;