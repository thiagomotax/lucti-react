import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, Text, View, TouchableOpacity, SectionList, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
// import { AsyncStorage } from 'react-native';

const storeData = async (id) => {
  try {
    await AsyncStorage.setItem(
      'localidade_id',
      id
    );
  } catch (error) {
    // Error saving data
  }
};

export default Contatos = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { colors } = useTheme();

  const Item = ({ item, onPress, style }) => (
    <TouchableHighlight underlayColor={colors.card} activeOpacity={0.4}
      onPress={onPress}
      style={[styles.item, style]}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: '90%' }}>
          <Text style={{ color: colors.text }}>{item}</Text>
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
          console.log("item id eh", item.id)
          // storeData(item.id)
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
    header: {
      marginStart: 10,
      fontSize: 25,
      backgroundColor: "#fff",
      color: 'gray'
    },

  });

  function getCidades(groupEstado) {
    let cidades = [];
    _.map(groupEstado, cidade => {
      cidades.push(cidade.nome);
    });
    return cidades;
  }

  useEffect(() => {
    let fields = 'cidade';
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'authorization': global.AUTHORIZATION
    };
    fetch(`${global.BASE_URL}localidade/?fields=${fields}`, {
      method: 'GET',
      headers: headers
    })
      .then((response) => response.json())
      .then((json) => {
        let data = json.rows;
        var cidadesAux = [];
        var estadosAux = [];

        _.map(data, obj => {
          obj.cidade.localidade_id = obj.id;
          cidadesAux.push(obj.cidade);
        });

        var groupEstado = _.groupBy(cidadesAux, "estado_id");
        for (var prop in groupEstado) {
          estadosAux.push({
            title: groupEstado[prop][0].estado.nome,
            data: getCidades(groupEstado[prop])
          })
        }
        estadosAux = _.orderBy(estadosAux, ['nomeEstado'], ['asc']);

        setData(estadosAux);
        setLoading(false);
        console.log(estadosAux)
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ?
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color={colors.card} />
        </View> : (
          <SectionList
            sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={renderItem}
            renderSectionHeader={({ section: { title }, }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />

        )}
    </SafeAreaView>

  );
};
