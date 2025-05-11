export interface UsageEvent {
    eventType: string;
    timestamp: string;
  }
  
  export interface RegisterPayload {
    email: string;
  }
  
  export interface UsagePayload {
    apiKey: string;
    eventType: string;
  }
  
  export interface RegisterResponse {
    apiKey: string;
  }