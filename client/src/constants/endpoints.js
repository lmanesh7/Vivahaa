const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

const endpoints = {
  auth: {
    login: {
      method: HTTP_METHODS.POST,
      url: () => '/auth'
    }
  },
  user: {
    profile: {
      method: HTTP_METHODS.GET,
      url: (id) => `api/users/${id}`
    }
  },
  venues: {
    all: {
      method: HTTP_METHODS.GET,
      url: () => '/venues/all'
    },
    byId: {
      method: HTTP_METHODS.GET,
      url: (id) => `venues/${id}`
    },
    create: {
      method: HTTP_METHODS.POST,
      url: () => '/venues'
    },
    update: {
      method: HTTP_METHODS.PUT,
      url: (id) => `venues/${id}`
    },
    delete: {
      method: HTTP_METHODS.DELETE,
      url: (id) => `venues/${id}`
    },
    byUserId: {
      method: HTTP_METHODS.GET,
      url: (userId) => `venues/user/${userId}`
    }
  },
  decorators: {
    all: {
      method: HTTP_METHODS.GET,
      url: () => '/decorators/all'
    },
    byId: {
      method: HTTP_METHODS.GET,
      url: (id) => `decorators/${id}`
    },
    create: {
      method: HTTP_METHODS.POST,
      url: () => '/decorators'
    },
    update: {
      method: HTTP_METHODS.PUT,
      url: (id) => `decorators/${id}`
    },
    delete: {
      method: HTTP_METHODS.DELETE,
      url: (id) => `decorators/${id}`
    },
    byUserId: {
      method: HTTP_METHODS.GET,
      url: (userId) => `decorators/user/${userId}`
    }
  },
  photos:{
    all: {
      method: HTTP_METHODS.GET,
      url: () => '/photo/all'
    },
    create: {
      method: HTTP_METHODS.POST,
      url: () => '/photo'
    },
    byUserId: {
      method: HTTP_METHODS.GET,
      url: (userId) => `photo/user/${userId}`
    },
    delete: {
      method: HTTP_METHODS.DELETE,
      url:(id) => `/photo/delete/${id}`
    }
  },
  mehendiArtists: {
    all: {  
      method: HTTP_METHODS.GET,
      url: () => '/mehendi-artists/all'
    },
    byId: {
      method: HTTP_METHODS.GET,
      url: (id) => `mehendi-artists/${id}`
    },
    create: {
      method: HTTP_METHODS.POST,
      url: () => '/mehendi-artists'
    },
    update: {
      method: HTTP_METHODS.PUT,
      url: (id) => `mehendi-artists/${id}`
    },
    delete: {
      method: HTTP_METHODS.DELETE,
      url: (id) => `mehendi-artists/${id}`
    },
    byUserId: {
      method: HTTP_METHODS.GET,
      url: (userId) => `mehendi-artists/user/${userId}`
    }
  }
}

export default endpoints;
