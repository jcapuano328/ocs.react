let defaultInfo = {
    version: '1.0.10',
    releasedate: new Date(2018,7,25,8,17,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
