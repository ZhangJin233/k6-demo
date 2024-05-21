import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  cloud: {
    // Project: Default project
    projectID: 3697772,
    // Test runs with the same name groups test runs together.
    name: 'Test (20/05/2024-17:11:28)'
  }
};

export default function() {
  http.get('https://test.k6.io');
  sleep(1);
}