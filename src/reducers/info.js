let defaultInfo = {
    version: '1.0.12',
    releasedate: new Date(2018,7,31,18,04,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
