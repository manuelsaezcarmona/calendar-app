import { fetchConToken, fetchSinToken } from './fetch.helper';

describe('Given the fetch helper function', () => {
  let token = '';

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
    token = body.token;
  });
  /** Cuando hago estas pruebas necestito un token que puedo recuperar de la prueba anterior */
  test('fetchConToken Method return', async () => {
    // Guardo el token en el localStorage porque la funcion fetchconToken, recoge
    // el token del local storage
    const evento = '624d6ef118ac545cbc6f8a2e';
    localStorage.setItem('token', token);
    // Lo que quiero probar es que si hay token reciba un mensaje de
    // evento eliminado o no existe evento.
    // Pero si no hay token me devuelva el mensaje de "token no valido"
    const respuesta = await fetchConToken(`/events/${evento}`, {}, 'DELETE');
    const body = await respuesta.json();
    //  console.log(body);
    expect(body.msg).toBe('No existe Evento con ese ID');
  });
});
