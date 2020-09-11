import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, Image, Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { Icon } from 'react-native-elements';


export default Estabelecimento = ({ route, navigation }) => {


  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const estabelecimento_id = route.params.estabelecimento_id;



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      borderRadius: 4,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 5,
      padding: 5,
      backgroundColor: '#478481',
      height: 80,
      padding: 15
    },
    logo: {
      padding: 0
    },
    title: {
      margin: 3,
      fontSize: 16,
      color: '#FFF'
    },
    label: {
      fontWeight: '200',
      fontSize: 13,
      color: '#FFF'
    },
    description: {
      fontWeight: '800',
      fontSize: 17,
      color: '#FFF'
    }
  });


  useEffect(() => {
    fetch('http://192.168.0.102:8095/app/estabelecimento/' + estabelecimento_id + '?fields=categoria,enderecos,contatos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': '4484143ee88b64dba8d0e6a39b818c90D',
      },
    })
      .then(response => response.json())
      .then(response => {
        setData(response);

      })
    // .then((json) => setData(json.rows))
    // .catch((error) => console.error(error))
    // .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={[styles.item]} onPress={() =>
        navigation.push('Estabelecimentos', {
          estabelecimento_id: estabelecimento_id
        })
      }>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ width: '90%' }}>
            <Text style={[styles.label]}>Horário de funcionamento</Text>
            <Text style={[styles.description]}>{data.horario_funcionamento ? data.horario_funcionamento : ''}</Text>

          </View>
          <View style={{ width: '10%', justifyContent: 'center' }}>
            <Icon
              name='chevron-right'
              type='font-awesome-5'
              size={20}
              color='#FFF'
            />
          </View>
        </View>
      </TouchableOpacity >

      <TouchableOpacity style={[styles.item]} onPress={() =>
        navigation.push('Enderecos', {
          estabelecimento_id: estabelecimento_id
        })
      }>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ width: '90%' }}>
            <Text style={[styles.label]}>Endereços ({data.enderecos ? data.enderecos.length : ''})</Text>
            <Text style={[styles.description]}>{data.enderecos ? (data.enderecos[0].logradouro, data.enderecos[0].bairro) : ''}</Text>

          </View>
          <View style={{ width: '10%', justifyContent: 'center' }}>
            <Icon
              name='chevron-right'
              type='font-awesome-5'
              size={20}
              color='#FFF'
            />
          </View>
        </View>
      </TouchableOpacity >

      <TouchableOpacity style={[styles.item]} onPress={() =>
        navigation.push('Estabelecimentos', {
          estabelecimento_id: estabelecimento_id
        })
      }>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ width: '90%' }}>
            <Text style={[styles.label]}>Contatos ({data.contatos ? data.contatos.length : ''})</Text>
            <Text style={[styles.description]}>{data.contatos ? 'Comunique-se conosco' : ''}</Text>

          </View>
          <View style={{ width: '10%', justifyContent: 'center' }}>
            <Icon
              name='chevron-right'
              type='font-awesome-5'
              size={20}
              color='#FFF'
            />
          </View>
        </View>
      </TouchableOpacity >

      <TouchableOpacity style={[styles.item]} onPress={() =>
        navigation.push('Estabelecimentos', {
          estabelecimento_id: estabelecimento_id
        })
      }>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ width: '90%' }}>
            <Text style={[styles.label]}>Catálogo</Text>
            <Text style={[styles.description]}>{data ? 'Acesse o catálogo' : ''}</Text>

          </View>
          <View style={{ width: '10%', justifyContent: 'center' }}>
            <Icon
              name='chevron-right'
              type='font-awesome-5'
              size={20}
              color='#FFF'
            />
          </View>
        </View>
      </TouchableOpacity >

      {/* <Item titulo="Content" mensagem="Message" /> */}
    </SafeAreaView>

  );
};
