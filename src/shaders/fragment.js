const fragment = `
uniform float sWidth;
uniform float sHeight;
uniform vec2 u_mouse;
uniform float zoom;
uniform vec2 pad;

vec2 product(vec2 a, vec2 b) {
  return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

float run(vec2 s, vec2 pos) {
  vec2 sx;
  for (int i = 0; i < 50; ++i) {
    s = product(s, s) + pos;

    if (s.x > 2.0 || s.y > 2.0) {
      sx = product(s, s) + pos;
      s = sx - s;
      break;
    }
  }

  return 1.0 / distance(s, vec2(0.0, 0.0));
}

void main() {
  vec2 z = (gl_FragCoord.xy / sWidth * 4.0);
  float res = sWidth / sHeight;
  vec2 z_ready = vec2(z.x - (1.9 - pad.x) * res, z.y - (2.0 - pad.y) * 1.0 / res) / zoom;
  float opacity = run(z_ready, vec2(1.0 - zoom, 0.0));

  gl_FragColor = vec4(vec3(opacity), 1.0);
}
`

export default fragment;