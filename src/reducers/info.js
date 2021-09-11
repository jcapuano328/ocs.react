let defaultInfo = {
    version: '1.0.23',
    releasedate: new Date(2021,8,11,10,4,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
