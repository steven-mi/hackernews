module.exports = {
    id: {
        type: 'uuid',
        primary: true
    },
    title: {
        type: 'string',
        required: true
    },
    voters: {
        type: "relationship",
        target: "User",
        relationship: "UPVOTED_BY",
        direction: "out",
    },
    author: {
        type: 'relationship',
        target: 'User',
        relationship: 'WROTE',
        direction: 'in'
    }
};
