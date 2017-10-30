import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions,
    FlatList,
    ScrollView,
    Image
} from 'react-native'

const {width, height} = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome'
// import {getAll} from '../api/api'
// import SearchBar from '../../components/SearchBar'

class SearchView extends Component {
    constructor(props){
        super(props)
        this.state = {
            text: '',
            data: ''
        }
    }

    static navigationOptions = {
        // headerVisible: false,
        headerTitle: 'Search result',
    }

    filter(text){
        const data = []; //getAll()
        const newData = data.filter(function(item){
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            data: newData,
            text: text,
        })
    }
    deleteData(){
        this.setState({text: '', data: ''})
    }
    _renderItem(item){
        const {navigate} = this.props.navigation
        return (
            <TouchableWithoutFeedback onPress={
                () => navigate('Details', {item: item})}
            >
                <Image style={{width: 120, height: 180}} source={{uri: item.image}}/>
            </TouchableWithoutFeedback>
        )
    }
    render(){
        const {goBack} = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon 
                        name="search"
                        color="grey"
                        size={18}
                        style={styles.searchIcon}
                    />
                    <TextInput 
                        value={this.state.text}
                        onChangeText={(text) => this.filter(text)}
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="grey"
                        keyboardAppearance="dark"
                        autoFocus={true}
                    />
                    {this.state.text ? 
                    <TouchableWithoutFeedback onPress={() => this.deleteData()}>
                        <Icon 
                            name="times-circle"
                            color="grey"
                            size={18}
                            style={styles.iconInputClose}
                        />
                    </TouchableWithoutFeedback>
                    : null}
                    <TouchableWithoutFeedback style={styles.cancelButton} onPress={() => goBack()}>
                        <View style={styles.containerButton}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView>
                    <FlatList 
                        style={{marginHorizontal: 5}}
                        data={this.state.data}
                        numColumns={3}
                        columnWrapperStyle={{marginTop: 5, marginLeft: 5}}
                        renderItem={({item}) => this._renderItem(item)}
                    />
                <Text style={{padding:10,color: 'gray'}}>No search result.</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#181818'
    },
    header: {
        height: 50,
        backgroundColor: '#8a8482',
        borderBottomWidth: 1,
        borderColor: '#3a3a3a',
        paddingTop: 5,
        paddingBottom: 5,
        // marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    searchIcon: {
        position: 'absolute',
        top: 15,
        left: 15,
        zIndex: 1,
        backgroundColor:'transparent',
        color: 'white',
    },
    iconInputClose: {
        position: 'absolute',
        top: 15,
        right: 70,
        backgroundColor: 'transparent',
        zIndex: 1,
        color: 'white',
    },
    input: {
        width: width - (width / 5),
        height: 35,
        backgroundColor: '#323232',
        marginHorizontal: 10,
        paddingLeft: 30,
        borderRadius: 3,
        color: 'white',
        paddingTop: 0,
        paddingBottom: 0,
    },
    cancelButtonText: {
        color: 'white'
    },
    image: {
        marginRight: 5,
        width: 115,
        height: 170
    }
})

export default SearchView