import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, Text, View, TouchableOpacity, SectionList, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';


export default Contatos = ({ route, navigation }) => {
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
    header: {
      marginStart: 10,
      fontSize: 25,
      backgroundColor: "#fff",
      color: 'gray'
    },
    
  });

  function getNomeContatos(groupTipoContatos) {
    let contatos = [];
    _.map(groupTipoContatos, contato => {
      contatos.push(contato.valor);
    });
    return contatos;
  }

  useEffect(() => {
    let fields = 'tipo_contato';
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'authorization': global.AUTHORIZATION
    };
    fetch(`${global.BASE_URL}contato/?estabelecimento_id=${estabelecimento_id}'&fields=${fields}`, {
      method: 'GET',
      headers: headers
    })
      .then((response) => response.json())
      .then((json) => {
        var contatosAux = [];
        var groupTiposContato = [];
        var tiposContatosAux = [];
        let data = json.rows;

        _.map(data, obj => {
          obj.tipo = obj.tipo_contato.tipo
          contatosAux.push(obj);
        });

        var groupTiposContato = _.groupBy(data, "tipo_contato.tipo");

        console.log(groupTiposContato)

        for (var prop in groupTiposContato) {
          tiposContatosAux.push({
            title: parseInt(groupTiposContato[prop][0].tipo),
            data: getNomeContatos(groupTiposContato[prop])
          })
        }
        setData(tiposContatosAux);
        setLoading(false);
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
              <Text style={styles.header}>{globalThis.TIPO_CONTATO(title)}</Text>
            )}
          />

        )}
    </SafeAreaView>

  );
};
