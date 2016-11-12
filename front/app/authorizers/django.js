import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize(sessionData, block) {
    const csrftoken = Cookies.get('csrftoken');
    block('X-CSRFToken', csrftoken);
  }
});
