// ARCADINS — harnais de test de charge (S3). Exécuter avec k6 :
//   BASE_URL=https://<preview> k6 run perf/k6-load.js
//   k6 run -e STAGE=100k perf/k6-load.js
//
// Paliers : 100 → 1 000 → 10 000 → 100 000 VUs. Seuils (SLO) : p95<800ms,
// p99<1500ms, erreurs<1 %. Les paliers 10k/100k requièrent k6 Cloud ou une
// exécution distribuée (une machine ne génère pas 100k VUs). Jamais contre la
// production sans autorisation.
import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://localhost:3000";

const PROFILES = {
  smoke: [{ duration: "30s", target: 5 }],
  "100": [{ duration: "1m", target: 100 }, { duration: "2m", target: 100 }, { duration: "30s", target: 0 }],
  "1k": [{ duration: "2m", target: 1000 }, { duration: "3m", target: 1000 }, { duration: "1m", target: 0 }],
  "10k": [{ duration: "3m", target: 10000 }, { duration: "5m", target: 10000 }, { duration: "2m", target: 0 }],
  "100k": [{ duration: "5m", target: 100000 }, { duration: "10m", target: 100000 }, { duration: "3m", target: 0 }],
};

export const options = {
  stages: PROFILES[__ENV.STAGE || "smoke"],
  thresholds: {
    http_req_duration: ["p(95)<800", "p(99)<1500"],
    http_req_failed: ["rate<0.01"],
  },
};

export default function loadTest() {
  const home = http.get(`${BASE_URL}/`);
  check(home, { "home 200": (r) => r.status === 200 });

  const ready = http.get(`${BASE_URL}/api/ready`);
  check(ready, { "ready 200/503": (r) => r.status === 200 || r.status === 503 });

  sleep(1);
}
