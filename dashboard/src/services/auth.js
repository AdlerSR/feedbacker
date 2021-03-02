export default httpClient => ({
  login: async ({ email, password }) => {
    const res = await httpClient.post('/auth/login', { email, password });
    let errors = null;

    if (!res.data) {
      errors = {
        status: res.request.status,
        statusText: res.request.statusText,
      };
    }

    return { data: res.data, errors };
  },
});
