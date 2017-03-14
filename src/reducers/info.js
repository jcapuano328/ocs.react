let defaultInfo = {
    version: '1.0.4',
    releasedate: new Date(2017,2,14,7,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
