import Ember from 'ember';
import config from './config/environment';
import sections from './sections';

const Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  sections.forEach((section) => {
    const opts = section.opts || {};
    this.route(section.route, opts);
  });
  this.route('login');
  this.route('logout');
});
