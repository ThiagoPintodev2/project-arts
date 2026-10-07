export function readSession() {
  const savedToken = localStorage.getItem('token');
  if (!savedToken) {
    return { token: null, isAuthentication: false };
  }

  try {
    const payloadPart = savedToken.split('.')[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const padded = payloadPart + '='.repeat((4 - (payloadPart.length % 4)) % 4);
    const payload = JSON.parse(atob(padded));
    const expired = !payload.exp || payload.exp * 1000 <= Date.now();

    if (expired) {
      localStorage.removeItem('token');
      return { token: null, isAuthentication: false };
    }

    return { token: savedToken, isAuthentication: true };
  } catch {
    localStorage.removeItem('token');
    return { token: null, isAuthentication: false };
  }
}
