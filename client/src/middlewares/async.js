export default ({ dispatch }) => next => action => {
    //Check to see if the action has a promise on
    //its 'payload' property
    //If it does, wait for it to resolve
    // If not, send the action on to next middleware

    if(!action.payload || !action.payload.then) {
        return next(action);
    }

    //Wait for promise to resolve
    //get it's data then create a new action
    // with that data and dispatch it
    action.payload.then(function(response) {
        const newAction = { ...action};
        dispatch(newAction);
    });
}