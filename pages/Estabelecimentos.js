import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, Image, Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import { Icon } from 'react-native-elements';


export default Estabelecimentos = ({ route, navigation }) => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const categoria_id = route.params.categoria_id;

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: '30%' }}>
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: item.logo
            }}
          />
        </View>
        <View style={{ width: '60%' }}>
          <Text style={styles.title}>{item.nome_fantasia}</Text>
          <Text style={styles.title}>{item.categoria_principal}</Text>
          <Text style={{marginTop: 15, marginLeft: 5, color: '#FFF'}}>{item.enderecos[0].logradouro}, {item.enderecos[0].bairro} - {item.enderecos[0].numero}</Text>
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
      {/* <Text>{categoria_id}</Text> */}
    </TouchableOpacity >
  );

  const renderItem = ({ item }) => {
    const backgroundColor = "#478481";
    return (
      <Item
        item={item}
        onPress={() =>
          navigation.push('Estabelecimento', {
            estabelecimento_id: item.id
          })
        }
        style={{ backgroundColor }}
      />
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      borderRadius: 4,
      margin: 10
    },
    logo: {
      padding: 0
    },
    title: {
      margin: 3,
      fontSize: 16,
      color: '#FFF'
    },
  });


  useEffect(() => {
    fetch('http://192.168.0.102:8095/app/estabelecimento/?categoria_id=' + categoria_id + '&fields=estabelecimento,categorias_estabelecimento,enderecos', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': '4484143ee88b64dba8d0e6a39b818c90D',
        // 'categoria_id': parseInt(categoria_id),
        // 'fields': "estabelecimento,categorias_estabelecimento,enderecos",
        // 'columns': "categoria_principal",
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json.rows))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>

  );
};
