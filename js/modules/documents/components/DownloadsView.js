import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView
} from 'react-native';
import SearchCellView from './SearchCellView'

class DownloadsView extends Component {
	static navigationOptions = {
		headerTitle: 'Downloads',
    }

	render() {
        const { router, user } = this.props;
        let icon = require('../../../images/icons/picture.png');
		return (
			<View style={styles.container}>
                <ScrollView>
                    {/* <FlatList 
                        style={{marginHorizontal: 5}}
                        data={this.state.data}
                        numColumns={3}
                        columnWrapperStyle={{marginTop: 5, marginLeft: 5}}
                        renderItem={({item}) => this._renderItem(item)}
                    />
                <Text style={{padding:10,color: 'gray'}}>No search result.</Text>*/}
                <SearchCellView
        icon={icon}
        title='IIS settings.png'
        description='IIS settings' 
        />
        <SearchCellView
        icon={icon}
        title='spinner.png'
        description='' 
        />
        <SearchCellView
        icon={icon}
        title='logo.jpg'
        description='' 
        />
        <SearchCellView
        icon={icon}
        title='sublime.jpeg'
        description='' 
        />
                </ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		// alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
});

export default DownloadsView;