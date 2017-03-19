let defaultInfo = {
    version: '1.0.5',
    releasedate: new Date(2017,2,18,16,0,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
