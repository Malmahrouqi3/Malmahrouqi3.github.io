import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

class ThreeJSViewer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      console.error(`Container ${containerId} not found`);
      return;
    }

    this.models = [];
    this.currentModelIndex = 0;
    this.animationFrameId = null;
    this.onWindowResize = this.onWindowResize.bind(this);
    this.init();
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1f2020);
    this.scene.fog = new THREE.Fog(0x1f2020, 100, 1000);

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000,
    );
    this.camera.position.set(1.8, 1.5, 1.8);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, -5, -5);
    this.scene.add(directionalLight2);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = true;
    this.controls.autoRotate = false;

    window.addEventListener("resize", this.onWindowResize, false);

    console.log(
      "ThreeJSViewer initialized with camera at",
      this.camera.position,
    );
    this.animate();
  }

  loadOBJ(objPath, options = {}) {
    const loader = new OBJLoader();

    console.log(`Loading OBJ file: ${objPath}`);

    loader.load(
      objPath,
      (object) => {
        console.log(`OBJ loaded: ${objPath}`);

        const material = new THREE.MeshPhongMaterial({
          color: options.color || 0xb3a369,
          shininess: 30,
          flatShading: options.flatShading || false,
        });

        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);

        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = (options.targetSize || 3) / maxDim;
        object.scale.multiplyScalar(scale);

        console.log(
          `Bounding box size: ${size.x}, ${size.y}, ${size.z}, scaled by ${scale}`,
        );

        const childrenToRemove = [];
        this.scene.children.forEach((child) => {
          if (
            child.type !== "AmbientLight" &&
            child.type !== "DirectionalLight"
          ) {
            childrenToRemove.push(child);
          }
        });
        childrenToRemove.forEach((child) => this.scene.remove(child));

        this.scene.add(object);
        this.currentObject = object;

        this.controls.update();
      },
      (xhr) => {
        console.log(
          `Loading progress: ${((xhr.loaded / xhr.total) * 100).toFixed(2)}%`,
        );
      },
      (error) => {
        console.error(`Error loading OBJ (${objPath}):`, error);
      },
    );
  }

  onWindowResize() {
    this.camera.aspect =
      this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.clientWidth,
      this.container.clientHeight,
    );
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  setModel(index) {
    if (index >= 0 && index < this.models.length) {
      this.currentModelIndex = index;
      const model = this.models[index];
      console.log(`Switching to model: ${model.name}`);
      this.loadOBJ(model.path, {
        color: model.color,
        targetSize: 2.5,
        flatShading: false,
      });
      this.updateModelName();
    }
  }

  nextModel() {
    this.currentModelIndex = (this.currentModelIndex + 1) % this.models.length;
    this.setModel(this.currentModelIndex);
  }

  previousModel() {
    this.currentModelIndex =
      (this.currentModelIndex - 1 + this.models.length) % this.models.length;
    this.setModel(this.currentModelIndex);
  }

  updateModelName() {
    const nameDisplay = document.getElementById("model-name");
    if (nameDisplay) {
      nameDisplay.textContent = this.models[this.currentModelIndex].name;
    }
  }

  toggleAutoRotate() {
    this.controls.autoRotate = !this.controls.autoRotate;
  }

  destroy() {
    window.removeEventListener("resize", this.onWindowResize);
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(
          this.renderer.domElement,
        );
      }
      this.renderer = null;
    }

    if (this.scene) {
      this.scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }

        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => {
              if (mat && typeof mat.dispose === "function") {
                mat.dispose();
              }
            });
          } else if (typeof object.material.dispose === "function") {
            object.material.dispose();
          }
        }
      });
      this.scene = null;
    }

    this.container = null;
    this.camera = null;
    this.currentObject = null;
    this.models = null;
    this.onWindowResize = null;

    console.log("ThreeJSViewer destroyed and resources cleaned up");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const viewer = new ThreeJSViewer("threejs-viewer");

  viewer.models = [
    {
      path: "./elliptical.obj",
      color: 0xb3a369,
      name: "Elliptical Nosecone",
    },
    {
      path: "./haack.obj",
      color: 0xff6b6b,
      name: "Haack Nosecone",
    },
    {
      path: "./parabolic.obj",
      color: 0x4ecdc4,
      name: "Parabolic Nosecone",
    },
    {
      path: "./power.obj",
      color: 0xa3e289,
      name: "Power Series Nosecone",
    },
  ];

  viewer.setModel(0);

  const prevBtn = document.getElementById("prev-model-btn");
  const nextBtn = document.getElementById("next-model-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      viewer.previousModel();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      viewer.nextModel();
    });
  }
});
