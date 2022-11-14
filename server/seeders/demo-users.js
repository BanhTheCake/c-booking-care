module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'banhTheCake@gmail.com',
      password: '123456',
      firstName: 'Banh',
      lastName: 'TheCake',
      address: 'Viet Nam',
      gender: true,
      roleId: 'R1',
      phoneNumber: '0123456789',
      positionId: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};