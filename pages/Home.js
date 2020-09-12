import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, Text, TouchableHighlight, View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';


export default Home = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { colors } = useTheme();

  const Item = ({ item, onPress, style }) => (
    <TouchableHighlight underlayColor={colors.card} activeOpacity={0.4}
      onPress={onPress} style={[styles.item, style]}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: '20%' }}>
          <Icon
            name={item.icone_nome}
            type='font-awesome-5'
            size={20}
            color={colors.card}
            containerStyle={{ backgroundColor: colors.background, padding: 5, width: '80%', borderRadius: 5 }}
          />
        </View>
        <View style={{ width: '70%' }}>
          <Text style={styles.title}>{item.nome}</Text>
        </View>
        <View style={{ width: '10%', padding: 5 }}>
          <Icon
            name='chevron-right'
            type='font-awesome-5'
            size={20}
            color={colors.background}
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
      color: '#FFF'
    },
  });

  useEffect(() => {
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'authorization': global.AUTHORIZATION
    };
    fetch(`${global.BASE_URL}categoria`, {
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
