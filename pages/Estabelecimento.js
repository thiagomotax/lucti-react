import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, FlatList, StatusBar, TouchableWithoutFeedback, Image, Text, View, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

export default Estabelecimento = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const estabelecimento_id = route.params.estabelecimento_id;
  const [modalVisible, setModalVisible] = useState(false);

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      color: colors.text
    },
    container2: {
      flex: 1,
      top: 10
    },
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
    },
    tinyLogo: {
      width: 110,
      height: 100,
      borderRadius: 3,
      margin: 1
    },
  });

  const Item = (props, { item, onPress }) => (
    <TouchableHighlight underlayColor={colors.card} activeOpacity={0.4}
      style={[styles.item]} onPress={() => {
        props.route == 'Horario' ?
          setModalVisible(true)
          : (
            navigation.push(props.route, {
              estabelecimento_id: estabelecimento_id
            }))
      }}>
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

  const Header = (props) => (
    <SafeAreaView style={{height: 110}}>
      <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10 }}>
        <View style={{ width: '30%' }}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: data.logo,
            }}
          />
        </View>
        <View style={{ width: '70%', marginStart: 12 }}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18 }}>{data.nome_fantasia}</Text>
          <Text style={{color: 'black' }}>{data.categoria_principal}</Text>
        </View>
      </View>
    </SafeAreaView>
  );

  useEffect(() => {
    let fields = 'estabelecimento,categorias_estabelecimento,enderecos,contatos';
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
    <SafeAreaView style={styles.container2}>
      {isLoading ?
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color={colors.card} />
        </View> : (

          <View>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { this.setModalVisible(false) }}

              >
                <TouchableWithoutFeedback
                  onPress={() => { setModalVisible(false); }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>Horário de funcionamento</Text>
                      <Text style={styles.modalText}>{data.horario_funcionamento}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>

            <Header />

            <Item route="Horario" title='Horário de funcionamento' description={data.horario_funcionamento ? data.horario_funcionamento : ''} />

            <Item route="Enderecos" title={data.enderecos ? `Enderecos (${data.enderecos.length})` : 'Endereços'} description={data.enderecos ? `${data.enderecos[0].logradouro}, ${data.enderecos[0].bairro} - ${data.enderecos[0].numero}` : 'Não há endereços cadastrados'} />

            <Item route="Contatos" title={data.contatos ? `Contatos (${data.contatos.length})` : 'Contatos'} description={data.contatos ? 'Comunique-se conosco' : 'Não há contatos cadastrados'} />

            <Item route="Enderecos" title='Catálogo' description='Acesse nosso catálogo' />
          </View>
        )}
    </SafeAreaView>

  );
};
