let defaultInfo = {
    version: '1.0.22',
    releasedate: new Date(2020,11,17,8,56,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
