// Refactored version of BlurGradientBg.module.js

class Vector3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  set(x, y = x, z = x) {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  }

  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    this.z += vec.z;
    return this;
  }

  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    this.z -= vec.z;
    return this;
  }

  multiplyScalar(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    const len = this.length();
    if (len > 0) {
      this.multiplyScalar(1 / len);
    }
    return this;
  }

  clone() {
    return new Vector3(this.x, this.y, this.z);
  }
}

class Geometry {
  constructor(gl) {
    this.gl = gl;
    this.attributes = {};
    this.index = null;
    this.vao = gl.createVertexArray();
  }

  addAttribute(name, data, size, type = this.gl.FLOAT) {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

    this.attributes[name] = { buffer, size, type };
  }

  setIndex(data) {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    this.index = buffer;
  }

  bindAttributes(program) {
    this.gl.bindVertexArray(this.vao);

    Object.entries(this.attributes).forEach(([name, attr]) => {
      const location = this.gl.getAttribLocation(program, name);
      if (location === -1) return;

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attr.buffer);
      this.gl.vertexAttribPointer(location, attr.size, attr.type, false, 0, 0);
      this.gl.enableVertexAttribArray(location);
    });

    if (this.index) {
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.index);
    }
  }

  delete() {
    Object.values(this.attributes).forEach((attr) => {
      this.gl.deleteBuffer(attr.buffer);
    });

    if (this.index) {
      this.gl.deleteBuffer(this.index);
    }

    this.gl.deleteVertexArray(this.vao);
  }
}

class Renderer {
  constructor({ canvas, width = 300, height = 150, dpr = 1 }) {
    this.canvas = canvas || document.createElement("canvas");
    this.gl = this.canvas.getContext("webgl2");

    if (!this.gl) {
      throw new Error("WebGL2 not supported");
    }

    this.setSize(width, height);
    this.dpr = dpr;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  setSize(width, height) {
    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
  }

  clear(color = [0, 0, 0, 1]) {
    this.gl.clearColor(...color);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
  }

  draw({ program, geometry, mode = this.gl.TRIANGLES }) {
    geometry.bindAttributes(program);
    this.gl.useProgram(program);
    this.gl.drawElements(mode, geometry.indexCount, this.gl.UNSIGNED_SHORT, 0);
  }
}

const BlurGradientBg = {
  Vector3,
  Geometry,
  Renderer,
};

export default BlurGradientBg;
