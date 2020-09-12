import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, Text, View, TouchableOpacity, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';


export default Enderecos = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const estabelecimento_id = route.params.estabelecimento_id;
  const { colors } = useTheme();

  const Item = ({ item, onPress, style }) => (
    <TouchableHighlight underlayColor={colors.card} activeOpacity={0.4}
      onPress={onPress}
      style={[styles.item, style]}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: '90%' }}>
          <Text style={styles.title}>{item.descricao}</Text>
          <Text style={styles.title}>{item.logradouro}, {item.bairro} - {item.numero}</Text>
          <Text style={styles.title}>{item.referencia}</Text>
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
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
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
      color: colors.text
    },
  });

  useEffect(() => {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'authorization': global.AUTHORIZATION
    };
    fetch(`${global.BASE_URL}endereco-estabelecimento/?estabelecimento_id=${estabelecimento_id}`, {
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
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={renderItem}
          />
        )}
    </SafeAreaView>

  );
};
