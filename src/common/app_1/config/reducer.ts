export  interface ConfigState {
    appName: string,
    appVersion: string
}

const initialState = {
    appName: '',
    appVersion: ''
};

const reducer = (
    state: ConfigState = initialState,
): ConfigState => state;

export default reducer;
