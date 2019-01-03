module.exports = {


  friendlyName: 'Generate test users',


  description: '',


  fn: async function () {

    const faker = require('faker');

    sails.log('Running custom shell script... (`sails run generate-test-users`)');

    let admins = [{
      fullName: 'admin',
      emailAddress: 'admin@admin.com',
      password: await sails.helpers.passwords.hashPassword('admin1!'),
      isSuperAdmin: true
    },{
      fullName: 'admin1',
      emailAddress: 'admin1@admin.com',
      password: await sails.helpers.passwords.hashPassword('admin1!'),
      isSuperAdmin: true
    },{
      fullName: 'admin2',
      emailAddress: 'admin2@admin.com',
      password: await sails.helpers.passwords.hashPassword('admin1!'),
      isSuperAdmin: true
    }]

    let users = [];

    for(let i=0; i<100; i++) {
      users.push({
        fullName: faker.name.findName(),
        emailAddress: faker.internet.email().toLocaleLowerCase(),
        password: await sails.helpers.passwords.hashPassword('admin1!')
      })
    }

    let all = [
      ...admins,
      ...users
    ];

    sails.log(all);


    await User.createEach(all)
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid');


    sails.log('User records Generated');
  }


};

