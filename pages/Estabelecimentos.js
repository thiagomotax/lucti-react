import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, Image, Text, View, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default Estabelecimentos = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const categoria_id = route.params.categoria_id;

  const Item = ({ item, onPress, style }) => (
    <TouchableHighlight underlayColor={colors.card} activeOpacity={0.4}
    onPress={onPress} style={[styles.item, style]}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: '30%' }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: item.logo
            }}
          />
        </View>
        <View style={{ width: '60%' }}>
          <Text style={styles.title}>{item.nome_fantasia}</Text>
          <Text style={styles.title}>{item.categoria_principal}</Text>
          <Text style={styles.title}>{item.enderecos[0].logradouro}, {item.enderecos[0].bairro} - {item.enderecos[0].numero}</Text>
        </View>
        <View style={{ width: '10%', justifyContent: 'center' }}>
          <Icon
            name='chevron-right'
            type='font-awesome-5'
            size={20}
            color={colors.text}
          />
        </View>
      </View>
    </TouchableHighlight >
  );

  const renderItem = ({ item }) => {
    const backgroundColor = colors.card;
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
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
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
    let fields = 'estabelecimento,categorias_estabelecimento,enderecos';
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'authorization': global.AUTHORIZATION
    };
    fetch(`${global.BASE_URL}estabelecimento/?categoria_id=${categoria_id}'&fields=${fields}`, {
      method: 'GET',
      headers: headers
    })
      .then((response) => response.json())
      .then((json) => setData(json.rows))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
     {isLoading ? 
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={colors.card} />
      </View> : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={({ id }, index) => id.toString()}
        />
      )}
    </SafeAreaView>

  );
};
