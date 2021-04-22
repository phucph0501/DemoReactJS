let initState = {
    color: "#FFFFFF"
}
export default function themeRenderer(state = initState, action) {
    switch (action.type) {
        case "CHANGE_THEME":
            console.log('themeRenderer: ' + JSON.stringify(state))
            return Object.assign({}, state, {
                color: action.payload.color
            });
        default:
            return initState;
    }
}