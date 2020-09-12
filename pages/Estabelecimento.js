import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StatusBar, Image, Text, View, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { colors, Icon } from 'react-native-elements';
import { color } from 'react-native-reanimated';


export default Estabelecimento = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { colors } = useTheme();
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
      backgroundColor: colors.card,
      height: 80,
      padding: 15
    },
    logo: {
      padding: 0
    },
    title: {
      margin: 3,
      fontSize: 16,
      color: colors.text
    },
    label: {
      fontWeight: '200',
      fontSize: 13,
      color: colors.text
    },
    description: {
      fontWeight: '800',
      fontSize: 17,
      color: colors.text
    }
  });

  const Item = (props, { item, onPress }) => (
    <TouchableHighlight underlayColor={colors.card} activeOpacity={0.4}
    style={[styles.item]} onPress={() =>
      navigation.push(props.route, {
        estabelecimento_id: estabelecimento_id
      })
    }>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ width: '90%' }}>
          <Text style={[styles.label]}>{props.title ? props.title : ''}</Text>
          <Text style={[styles.description]}>{props.description ? props.description : ''}</Text>
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


  useEffect(() => {
    let fields = 'estabelecimento,categorias_estabelecimento,enderecos';
    let headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'authorization': global.AUTHORIZATION
    };
    fetch(`${global.BASE_URL}estabelecimento/${estabelecimento_id}?fields=${fields}`, {
      method: 'GET',
      headers: headers
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Item route="Enderecos" title='Horário de funcionamento' description={data.horario_funcionamento ? data.horario_funcionamento : ''} />

      <Item route="Enderecos" title={data.enderecos ? `Enderecos (${data.enderecos.length})` : 'Endereços'} description={data.enderecos ? `${data.enderecos[0].logradouro}, ${data.enderecos[0].bairro} - ${data.enderecos[0].numero}` : 'Não há endereços cadastrados'} />

      <Item route="Enderecos" title={data.contatos  ?  `Contatos (${data.contatos.length})` : 'Contatos'} description={data.contatos ? 'Comunique-se conosco' : 'Não há contatos cadastrados'}/>

      <Item route="Enderecos" title='Catálogo' description='Acesse nosso catálogo' />
    </SafeAreaView>

  );
};
