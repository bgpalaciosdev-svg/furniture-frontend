'use client';

import { useState } from 'react';
import { apiService, API_ENDPOINTS } from '../services';

export default function ApiTest() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testHealthEndpoint = async () => {
    setLoading(true);
    setTestResult('');

    try {
      const response = await apiService.get(API_ENDPOINTS.TEST.HEALTH);
      setTestResult(`✅ Backend connection successful!\nResponse: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setTestResult(`❌ Backend connection failed!\nError: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testProductsEndpoint = async () => {
    setLoading(true);
    setTestResult('');

    try {
      const response = await apiService.get(API_ENDPOINTS.PRODUCTS.LIST);
      setTestResult(`✅ Products API connection successful!\nResponse: ${JSON.stringify(response, null, 2)}`);
    } catch (error) {
      setTestResult(`❌ Products API connection failed!\nError: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">API Connection Test</h1>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={testHealthEndpoint}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 mr-4"
        >
          {loading ? 'Testing...' : 'Test Health Endpoint'}
        </button>
        
        <button
          onClick={testProductsEndpoint}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Testing...' : 'Test Products Endpoint'}
        </button>
      </div>

      {testResult && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Test Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{testResult}</pre>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Environment Variables:</h3>
        <ul className="text-sm text-yellow-700">
          <li><strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'Not set'}</li>
          <li><strong>API Version:</strong> {process.env.NEXT_PUBLIC_API_VERSION || 'Not set'}</li>
          <li><strong>Socket URL:</strong> {process.env.NEXT_PUBLIC_SOCKET_URL || 'Not set'}</li>
        </ul>
      </div>
    </div>
  );
}
