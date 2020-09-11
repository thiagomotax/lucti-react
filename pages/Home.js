import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, Text, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer, useNavigation  } from '@react-navigation/native';

import { Icon } from 'react-native-elements';


export default Home = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: '20%' }}>
          <Icon
            name={item.icone_nome}
            type='font-awesome-5'
            size={20}
            color='#478481'
            containerStyle={{ backgroundColor: '#E5F2ED', padding: 5, width: '80%', borderRadius: 5 }}
          />
        </View>
        <View style={{ width: '70%' }}>
          <Text style={styles.title}>{item.nome}</Text>
        </View>
        <View style={{ width: '10%', margin: 5 }}>
          <Icon
            name='chevron-right'
            type='font-awesome-5'
            size={20}
            color='#FFF'
          />
        </View>


      </View>

    </TouchableOpacity >
  );

  const renderItem = ({ item }) => {
    const backgroundColor = "#478481";
    return (
      <Item
        item={item}
        onPress={() =>
          navigation.push('Estabelecimentos', {
            categoria_id: item.id
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
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 10,
      borderRadius: 4
    },
    title: {
      fontSize: 16,
      margin: 5,
      color: '#FFF'
    },
  });


  useEffect(() => {
    fetch('http://192.168.0.102:8095/app/categoria', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'authorization': '4484143ee88b64dba8d0e6a39b818c90D'
      }
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
