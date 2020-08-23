import React from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    Alert ,
    ScrollView,
    Dimensions,
    BackHandler,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { Table, Rows,TableWrapper, Cell } from 'react-native-table-component';
import {
    darkColor,
    grayColor,
    primaryColor,
    secondaryColor,
    pendingColor,
    emptyColor,
    reservColor,
    BASE_URL,
    GET_PLAN_URL,
    HEADERFORMDATA
} from '../../utils/contants'


import {
    openIndicator,
    dismissIndicator,
} from '../../actions'
import Hepler from '../../utils/Helper'

import styles from '../../style/style'

import plan1 from '../../assets/image/plan_plaza1.jpg'
import Gallery from 'react-native-image-gallery';
const DEVICE_HEIGHT = Dimensions.get('screen').height
const DEVICE_WIDTH = Dimensions.get('screen').width
class PlanScreen extends React.Component {

    state = {
        zone_id : '',
        floor_id : '',
        building_id : '',
        listData : [],
        x : 0,
        y : 0,
        tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
        tableData: [
            ['1', '2', '3', '4'],
            ['a', 'b', 'c', 'd'],
            ['1', '2', '3', '4'],
            ['a', 'b', 'c', 'f']
        ],
        plan_image : ''
    }

    ComponentLeft = () => {
        return (
            <TouchableOpacity onPress={() => this.handleBack()} style={{ padding: 10 }}>
                <Icon name='chevron-left' size={20} color='white' />
            </TouchableOpacity>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center, styles.backgroundPrimary]}>
                <Text style={[styles.text18, { color: 'white' }]}>{`รูปภาพ`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={[{ padding: 10 }]}>

            </View>
        );
    }

    handleBack = () => {
        if (this.props.navigation.isFocused()) {
            this.props.navigation.pop();
            return true;
        }
    };

    LoadData(){
        // const{ building_id,floor_id,zone_id } = this.props.route.params
        // this.props.openIndicator()
        // let formData = new FormData();
        // formData.append('building_id',building_id)
        // formData.append('floor_id',floor_id)
        // formData.append('zone_id',zone_id)
        // Hepler.post(BASE_URL + GET_PLAN_URL,formData,HEADERFORMDATA,(results) => {
        //     console.log('GET_PLAN_URL',results)
        //     if (results.status == 'SUCCESS') {
        //         this.setState({
        //             listData : results.data,
        //         })
        //         this.props.dismissIndicator()
        //     } else {
        //         this.setState({
        //             x : 0,
        //             y : 0,
        //             listData : [],
        //         })
        //         this.props.dismissIndicator()
        //     }
        // })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        const{ plan_image} = this.props.route.params
        //console.log('building',this.props.reducer.building)

        
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        const{ plan_image} = this.props.route.params
        return (
            <View style={[styles.container, { backgroundColor: 'white' }]}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={[styles.bottomRightRadius, styles.bottomLeftRadius, {
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }]}
                    statusBarStyle={{
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />

                {/* <ScrollView> */}
                      {/* <ScrollView style={{ width: DEVICE_WIDTH }} horizontal={true}  alwaysBounceVertical={true} showsHorizontalScrollIndicator={true}> */}
                        {/* <View style={{ top: 0,marginTop:0 }}> */}
                            <Gallery
                                initialPage={0}
                                images={[
                                    { source: { uri: plan_image} }
                                ]}
                            />
                           
                            {/* <Table  borderStyle={{borderWidth: 1}} borderStyle={{ borderColor: 'transparent' }}>
                                {
                                    this.state.listData.map((rowData, index) => (
                                        <TableWrapper  key={index} style={styles.row}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                <Cell style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} key={cellIndex} data={element(cellData, index)} />
                                            ))
                                        }
                                        </TableWrapper>
                                    ))
                                }
                            </Table> */}
                        {/* </View> */}
                    {/* </ScrollView> */}
           
                {/* </ScrollView> */}
              
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    openIndicator,
    dismissIndicator,
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanScreen)