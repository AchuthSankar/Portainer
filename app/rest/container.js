angular.module('portainer.rest')
.factory('Container', ['$resource', 'Settings', 'EndpointProvider', function ContainerFactory($resource, Settings, EndpointProvider) {
  'use strict';
  return $resource(Settings.url + '/:endpointId/containers/:id/:action', {
    name: '@name',
    endpointId: EndpointProvider.endpointID
  },
  {
    query: {method: 'GET', params: {all: 0, action: 'json', filters: '@filters' }, isArray: true},
    get: {method: 'GET', params: {action: 'json'}},
    stats: {method: 'GET', params: {id: '@id', stream: false, action: 'stats'}, timeout: 5000},
    /*
    stop: {method: 'POST', params: {id: '@id', t: 5, action: 'stop'}},
    kill: {method: 'POST', params: {id: '@id', action: 'kill'}},
    remove: {
      method: 'DELETE', params: {id: '@id', v: 0},
      transformResponse: genericHandler
    },
    pause: {
      //method: 'POST', params: {id: '@id', action: 'pause'}
      throw new Error('Not supported. Please use docker service.')
    },
    unpause: {
      //method: 'POST', params: {id: '@id', action: 'unpause'}
      throw new Error('Not supported. Please use docker service.')
    },
    restart: {
      //method: 'POST', params: {id: '@id', t: 5, action: 'restart'}
      throw new Error('Not supported. Please use docker service.')
    },
    start: {
      //method: 'POST', params: {id: '@id', action: 'start'},
      //transformResponse: genericHandler
      throw new Error('Not supported. Please use docker service.')
    },
    create: {
      //method: 'POST', params: {action: 'create'},
      //transformResponse: genericHandler
      throw new Error('Not supported. Please use docker service.')
    },
    rename: {
      //method: 'POST', params: {id: '@id', action: 'rename', name: '@name'},
      //transformResponse: genericHandler
      throw new Error('Not supported. Please use docker service.')
    },
    */
    exec: {
      method: 'POST', params: {id: '@id', action: 'exec'},
      transformResponse: genericHandler
    }
  });
}]);
