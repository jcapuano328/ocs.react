let defaultInfo = {
    version: '1.0.11',
    releasedate: new Date(2018,7,29,18,17,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
