const ProfilesHelper = {};

ProfilesHelper.profilePath = (id) => `/profiles/${ id }`;
ProfilesHelper.editProfilePath = (id) => `/profiles/${ id }/edit`;
ProfilesHelper.destroyProfilePath = (id) => `/profiles/${ id }/?_method=delete`;

module.exports = ProfilesHelper;




