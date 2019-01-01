module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {
    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    fullName:  {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    },

    isSuperAdmin:  {
      required: true,
      type: 'boolean',
      description: 'Whether or not the use is super admin.',
    },
  },


  exits: {
    success: {
      description: 'New user account was created successfully.'
    },

    invalid: {
      responseType: 'badRequest',
      description: 'The provided fullName, password and/or email address are invalid.',
      extendedDescription: 'If this request was sent from a graphical user interface, the request '+
        'parameters should have been validated/coerced _before_ they were sent.'
    },

    emailAlreadyInUse: {
      statusCode: 409,
      description: 'The provided email address is already in use.',
    },
  },


  fn: async function (inputs) {

    var newEmailAddress = inputs.emailAddress.toLowerCase();

    var newUserRecord = await User.create({
      emailAddress: newEmailAddress,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      fullName: inputs.fullName,
      isSuperAdmin: inputs.isSuperAdmin
    })
      .intercept('E_UNIQUE', 'emailAlreadyInUse')
      .intercept({name: 'UsageError'}, 'invalid')
      .fetch();

    return newUserRecord;

  }


};
