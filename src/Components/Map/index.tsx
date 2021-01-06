import React from 'react';
import { Button } from 'react-native';
import MapModule from '~/Types/modules';

const NewModuleButton = () => {
    const onPress = () => {
        MapModule.show('Awesome', MapModule.SHORT);
    };

    return (
        <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
        />
    );
};

export default NewModuleButton;