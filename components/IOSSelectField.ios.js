import React from 'react'
import { Pressable, View } from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { SelectList } from 'react-native-dropdown-select-list'

import styles from '../style/style'
import { primaryColor } from '../utils/contants'

const IOSSelectField = ({
    options = [],
    placeholder,
    selectedValue,
    onValueChange,
    isOpen,
    onToggle,
    disabled = false,
    zIndex = 1,
}) => {
    const normalizedOptions = options.map((item) => ({
        ...item,
        value: `${item.value}`.replace(/^(จังหวัด|อำเภอ|ตำบล)\s*:\s*/, ''),
    }))
    const defaultOption = normalizedOptions.find((item) => `${item.key}` === `${selectedValue}`)
    const handleSelected = (value) => {
        if (`${value}` !== `${selectedValue}`) {
            onValueChange(value)
        }
    }

    return (
        <View
            style={{ zIndex, opacity: disabled ? 0.6 : 1 }}
            onTouchStart={(event) => event.stopPropagation()}>
            <SelectList
                data={normalizedOptions}
                save='key'
                search={false}
                maxHeight={220}
                placeholder={placeholder}
                defaultOption={defaultOption}
                dropdownShown={!disabled && isOpen}
                setSelected={handleSelected}
                onSelect={() => {
                    if (onToggle) {
                        onToggle(false)
                    }
                }}
                arrowicon={<Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={12} color='gray' />}
                boxStyles={[
                    styles.registerFieldShadow,
                    styles.inputWithIcon,
                    {
                        alignSelf: 'center',
                        width: '95%',
                        borderWidth: 0,
                        borderColor: 'transparent',
                        paddingHorizontal: 15,
                    },
                ]}
                inputStyles={{
                    color: selectedValue !== null && selectedValue !== undefined ? primaryColor : '#7C7B7B',
                    fontFamily: 'SinghaEstate-Regular',
                    fontSize: 18,
                    flex: 1,
                }}
                dropdownStyles={{
                    alignSelf: 'center',
                    width: '95%',
                    borderWidth: 1,
                    borderColor: '#E5E5E5',
                    borderRadius: 25,
                    marginTop: 0,
                    backgroundColor: 'white',
                    shadowColor: '#8F8F8F',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.12,
                    shadowRadius: 16,
                }}
                dropdownItemStyles={{
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                }}
                dropdownTextStyles={{
                    color: primaryColor,
                    fontFamily: 'SinghaEstate-Regular',
                    fontSize: 18,
                }}
            />
            {!disabled ? (
                <Pressable
                    onPress={() => {
                        if (onToggle) {
                            onToggle(!isOpen)
                        }
                    }}
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: '2.5%',
                        width: '95%',
                        height: 50,
                    }}
                />
            ) : null}
        </View>
    )
}

export default IOSSelectField
