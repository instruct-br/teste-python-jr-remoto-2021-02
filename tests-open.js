import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,
  iterations: 1,
};

const BASE_URL = __ENV.API_BASE;
const HEADERS = {'Content-Type': 'application/json'};

const convertResponseJson = (request) => {
  try {
    return JSON.parse(request.body)
  } catch (error) {
    return false;
  }
}

export default () => {
  group('Consulta Organizações', function() {
    // Consulta org que não existe
    let query1 = http.get(`${BASE_URL}/orgs/abcdef1235673/`, { headers: HEADERS });
    check(query1, {
      'Consulta se org que não existe retorna 404': (r) => r.status === 404
    });
    // Consulta org que existe
    let query2 = http.get(`${BASE_URL}/orgs/instruct-br/`, { headers: HEADERS });
    check(query2, {
      'Consulta se org que existe retorna 200': (r) => r.status === 200
    });
    check(query2, {
      'Consulta repositórios retornados': (r) => {
        const repos = ["grua", "katacoda-scenarios", "puppet_auditor"];
        return convertResponseJson(r).top_3_repositories.every(
          (x) => repos.includes(x.name)
        );
      }
    });
    // Lista todas as organizações salvas
    let query3 = http.get(`${BASE_URL}/orgs/`, { headers: HEADERS });
    check(query3, {
      'Lista todas organizações no cache': (r) => {
        let data = convertResponseJson(r)
        return data.filter((d) => d.slug === "instruct-br").length === 1
      }
    });
  });
  group('Deleta Organização', function() {
    // Deleta org que não existe
    let query1 = http.del(`${BASE_URL}/orgs/abcdef1235673/`, { headers: HEADERS });
    check(query1, {
      'Deleta org não existente retorna 404': (r) => r.status === 404
    });
    // Deleta org que existe
    let query2 = http.del(`${BASE_URL}/orgs/instruct-br/`, { headers: HEADERS });
    check(query2, {
      'Deleta org existente': (r) => [200, 204].includes(r.status)
    });
    // Lista todas as organizações salvas
    let query3 = http.get(`${BASE_URL}/orgs/`, { headers: HEADERS });
    check(query3, {
      'Lista todas organizações no cache após executar delete': (r) => {
        let data = convertResponseJson(r)
        return data.filter((d) => d.slug === "instruct-br").length === 0
      }
    });
  });
}
