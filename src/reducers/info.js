let defaultInfo = {
    version: '1.0.20',
    releasedate: new Date(2019,8,28,14,34,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
