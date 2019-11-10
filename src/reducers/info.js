let defaultInfo = {
    version: '1.0.21',
    releasedate: new Date(2019,10,10,9,49,0)//new Date()
};

module.exports = (state = defaultInfo, action) => {
    switch (action.type) {
    default:
        return {...defaultInfo};
    }
}
