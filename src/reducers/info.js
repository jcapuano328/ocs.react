let defaultInfo = {
    version: '1.0.7',
    releasedate: new Date(2017,2,19,9,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
