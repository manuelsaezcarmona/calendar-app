import { fetchSinToken } from './fetch.helper';

describe('Given the fetch helper function', () => {
  test('fetchSinToken Method return method fetch', async () => {
    /* Podemos ejecutar la funcion y evaluar lo que devuelva.
    Podemos literalmente realizar una peticiona nuestro backend */
    const respuesta = await fetchSinToken(
      '/auth/login',
      {
        email: 'jose@manu.com',
        password: '123456'
      },
      'post'
    );

    /** En este caso espero que nuestra respuesta sea una instancia de la clase Response */
    expect(respuesta instanceof Response).toBe(true);

    const body = await respuesta.json();
    expect(body.ok).toBe(true);
  });
});
