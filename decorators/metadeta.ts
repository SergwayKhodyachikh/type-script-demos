import 'reflect-metadata';

@controller
class Plane {
  color: string = 'red';

  @get('http://localhost:3000/api/users')
  fly(): void {
    console.log('vrrrrr');
  }
}
function get(path: string) {
  return function (target: Plane, key: string) {
    Reflect.defineMetadata('path', path, target, key);
  };
}

function controller(target: typeof Plane) {
  for (const key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key);
    const middleware = Reflect.getMetadata('middleware', target.prototype, key);
    console.log(path, middleware);
  }
}
