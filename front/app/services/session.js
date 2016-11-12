import Ember from 'ember';
import config from '../config/environment';
import SessionService from 'ember-simple-auth/services/session';
import fetch from 'ember-network/fetch';

const { observer } = Ember;

export default SessionService.extend({
  currentUser: null,
  loginError: false,
  setCurrentUser: observer('isAuthenticated', function() {
    if (this.get('isAuthenticated')) {
      const globalConfig = config['ember-simple-auth'] || {};
      const serverAuthEndpoint = globalConfig.serverAuthEndpoint || '/rest-auth';
      fetch(`${serverAuthEndpoint}/me/`).then((response) => {
        return response.json();
      }, () => {
        this.set('isAuthenticated', false);
      }).then((json) => {
        this.set('currentUser', json);
      }, () => {
        console.log('failed parsing reponse for current user');
        this.set('isAuthenticated', false);
      });
    } else {
      this.set('currentUser', '');
    }
  })
});

