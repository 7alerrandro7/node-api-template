'use restrict';

module.exports = function (sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: DataTypes.STRING(255),
            email: DataTypes.STRING(255),
            password: DataTypes.STRING(255),
        },
        {
            tableName: 'users',
            paranoid: false,
            timestamps: true,
            freezeTableName: true,
            underscored: true,
        });

    return Users;
};
