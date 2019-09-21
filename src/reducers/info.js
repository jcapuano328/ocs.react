let defaultInfo = {
    version: '1.0.16',
    releasedate: new Date(2019,8,21,8,30,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
