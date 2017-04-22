let defaultInfo = {
    version: '1.0.8',
    releasedate: new Date(2017,3,21,20,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
