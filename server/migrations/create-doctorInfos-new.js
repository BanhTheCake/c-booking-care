module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'DoctorInfos',
          'specialtiesId',
          {
            type: Sequelize.INTEGER
          }
        ),
        queryInterface.addColumn(
          'DoctorInfos',
          'clinicId',
          {
            type: Sequelize.INTEGER
          }
        ),
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('DoctorInfos', 'specialtiesId'),
        queryInterface.removeColumn('DoctorInfos', 'clinicId')
      ]);
    }
  };