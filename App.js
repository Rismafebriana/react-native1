import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput} from 'react-native';

const Data = () => [
  {id:1, text: 'Item One'},
  {id:2, text: 'Item Two'},
  {id:3, text: 'Item Three'},
];

const App=()=>{
  const [data,setdata]=useState(Data);
  const [isRender,setisRender]=useState(false);
  const [isModalVisible, setisModalVisible]=useState(false);
  const [inputText, setinputText]=useState();
  const [editItem,seteditItem]=useState();

  const onPressItem=(item)=>{
    setisModalVisible(true);
    setinputText(item.text)
    seteditItem(item.id)
  }

  const renderItem=({item,index})=>{  
    return(
      <TouchableOpacity style={styles.item}
      onPress={()=> onPressItem(item)}>
        <Text style={styles.text}>{item.text}</Text>
      </TouchableOpacity>
    )
  }

  const handleEditItem=(editItem)=>{
  const newData=data.map(item=>{
    if (item.id==editItem){
  item.text=inputText;
    }
    return item;
  })
  setdata(newData);
  setisRender(!isRender);
  }

  const onPressSaveEdit=()=>{
    handleEditItem(editItem); //save
    handleModalVisible(false); //close
  }

    return(
  <SafeAreaView style={styles.container}>
    <FlatList 
      data={data}
      keyExtractor={(item)=>item.id.toString()}
      renderItem={renderItem}
      extraData={isRender}/>
  
    <Modal animationType='fade'
      visible={isModalVisible}
      onRequestClose={()=> setisModalVisible(false)}>
    
    <View style={styles.modalView}>
    <Text style={styles.textInput}>Change Text:</Text>
    <TextInput style={styles.textInput} 
      onChangeText={(text)=> setinputText(text)} 
      defaultValue={inputText}
      editable={true}
      multiline={false}
      maxLength={200}/>
    <TouchableOpacity 
      onPress={()=> onPressSaveEdit()}
      style={StyleSheet.touchableSave}>
    <Text style={styles.text}>Save</Text>
    </TouchableOpacity>
    </View>

    </Modal>
      </SafeAreaView>
    )
  }

    const styles=StyleSheet.create({
    container:{
    flex:1
  },
    item:{
    borderBottomWidth:1,
    borderBottomColo:'grey',
    alignItems:'flex-start'
  },
    text:{
    marginVertical:30,
    fontSize:25,
    fontWeight:'bold',
    marginleft:10
  },
    textInput:{
    width:'90',
    height:70,
    borderColor:'grey',
    borderEndWidth:1,
    fontSize:25
  },
    modalView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
    touchableSave:{
    backgroundColor:'blue',
    paddingHorizontal:100,
    alignItems:'center',
    marginTop:20
  }
});

export default App;