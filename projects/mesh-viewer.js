import * as THREE from "three";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

const infoEl = document.getElementById("mesh-info");
const modelViewerEl = document.getElementById("mesh-model-viewer");

const setStatus = (text) => {
  if (infoEl) infoEl.textContent = text;
};

const markUnlit = (material) => {
  material.userData.gltfExtensions = material.userData.gltfExtensions || {};
  material.userData.gltfExtensions["KHR_materials_unlit"] = {};
};

function loadMeshIntoModelViewer() {
  if (!modelViewerEl) return;

  const loader = new OBJLoader();
  loader.load(
    "./mesh.obj",
    (object) => {
      const bbox = new THREE.Box3().setFromObject(object);
      const bboxSize = bbox.getSize(new THREE.Vector3());
      const diag = bboxSize.length() || 1;
      const pointSize = diag * 0.006;

      const wireframeGroup = new THREE.Group();
      wireframeGroup.name = "wireframe-view";

      const color = new THREE.Color(0xb3a369);
      let vertexCount = 0;

      object.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const geometry = child.geometry;
        const positions = geometry?.attributes?.position;
        if (positions?.count) {
          vertexCount += positions.count;
        }

        const pointsMaterial = new THREE.PointsMaterial({
          color,
          size: pointSize,
          sizeAttenuation: true,
          transparent: true,
          opacity: 0.95,
        });
        markUnlit(pointsMaterial);
        const points = new THREE.Points(geometry, pointsMaterial);
        points.frustumCulled = false;
        wireframeGroup.add(points);

        const wfGeometry = new THREE.WireframeGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.9,
        });
        markUnlit(lineMaterial);
        const lines = new THREE.LineSegments(wfGeometry, lineMaterial);
        lines.frustumCulled = false;
        wireframeGroup.add(lines);
      });

      setStatus(`Vertices: ${vertexCount.toLocaleString()}`);

      const center = bbox.getCenter(new THREE.Vector3());
      wireframeGroup.position.sub(center);

      const exporter = new GLTFExporter();
      exporter.parse(
        wireframeGroup,
        (gltf) => {
          let blob;
          if (gltf instanceof ArrayBuffer) {
            blob = new Blob([gltf], { type: "model/gltf-binary" });
          } else {
            blob = new Blob([JSON.stringify(gltf)], {
              type: "model/gltf+json",
            });
          }

          const url = URL.createObjectURL(blob);
          modelViewerEl.src = url;

          modelViewerEl.addEventListener(
            "model-visibility",
            () => URL.revokeObjectURL(url),
            { once: true },
          );
        },
        (error) => {
          console.error("Error exporting mesh to GLB:", error);
          setStatus("Error preparing mesh");
        },
        { binary: true, onlyVisible: true },
      );
    },
    undefined,
    (error) => {
      console.error("Error loading mesh:", error);
      setStatus("Error loading mesh");
    },
  );

  modelViewerEl.addEventListener("error", () => {
    setStatus("Viewer error: unsupported model format");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadMeshIntoModelViewer);
} else {
  loadMeshIntoModelViewer();
}
